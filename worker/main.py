"""
AIStudio AI Worker — Main Entry Point

Polls Redis queue for generation jobs, processes them through
AI providers, and updates the database with results.

Usage:
    python main.py
"""

import asyncio
import json
import logging
import signal
import sys
import time
from contextlib import asynccontextmanager

import redis
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import (
    get_generation_by_uuid,
    insert_log,
    insert_variant,
    update_generation_status,
)
from processing import basic_upscale, save_generated_image
from providers import registry

# ── Logging ─────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-7s │ %(name)-20s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("aistudio.worker")

# ── Redis Connection ────────────────────────────
redis_client = redis.Redis(
    host=settings.redis_host,
    port=settings.redis_port,
    password=settings.redis_password or None,
    decode_responses=True,
)

# ── Worker State ────────────────────────────────
_running = True


def signal_handler(sig, frame):
    global _running
    logger.info("Shutdown signal received, finishing current job...")
    _running = False


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


# ══════════════════════════════════════════════════
# GENERATION PIPELINE
# ══════════════════════════════════════════════════

async def process_generation(generation_uuid: str):
    """
    Full generation pipeline:
    1. Fetch generation from DB
    2. Validate input image
    3. Build enhanced prompt from presets
    4. Route to AI provider
    5. Generate image
    6. Save output & create variants
    7. Basic upscale
    8. Update DB with results
    """
    start_time = time.time()
    logger.info(f"{'═' * 50}")
    logger.info(f"Processing generation: {generation_uuid}")

    # ── Step 1: Fetch from DB ───────────────────
    gen = get_generation_by_uuid(generation_uuid)
    if not gen:
        logger.error(f"Generation {generation_uuid} not found in database")
        return

    generation_id = gen["id"]
    insert_log(generation_id, "STARTED", "Generation processing started")
    update_generation_status(generation_uuid, "PROCESSING")

    try:
        # ── Step 2: Build prompt ────────────────
        prompt = gen.get("prompt", "")
        if not prompt:
            prompt = "professional product photography, studio lighting, white background, commercial quality"

        # Enhance the prompt with studio photography keywords
        enhanced_prompt = (
            f"{prompt}, "
            "ultra high quality, 8K resolution, professional studio photograph, "
            "commercial product shot, sharp focus, perfect lighting, "
            "award-winning photography, masterful composition"
        )

        negative_prompt = (
            "blurry, low quality, distorted, deformed, ugly, bad anatomy, "
            "watermark, text, logo, grainy, noisy, oversaturated, "
            "bad proportions, poorly rendered, amateur"
        )

        update_generation_status(generation_uuid, "PROCESSING", enhanced_prompt=enhanced_prompt)
        insert_log(generation_id, "PROMPT_BUILT", f"Enhanced prompt: {enhanced_prompt[:100]}...")

        # ── Step 3: Select provider ─────────────
        provider_code = gen.get("provider_code", "pollinations")
        model_code = gen.get("model_code", "flux-schnell")

        provider = registry.get(provider_code)
        if not provider:
            logger.warning(f"Provider '{provider_code}' not available, falling back to Pollinations")
            provider = registry.get_fallback()
            provider_code = "pollinations"

        insert_log(generation_id, "PROVIDER_SELECTED", f"Using {provider.name} with model {model_code}")

        # ── Step 4: Generate image ──────────────
        logger.info(f"Generating with {provider.name}...")
        result = await provider.generate(
            prompt=enhanced_prompt,
            negative_prompt=negative_prompt,
            width=1024,
            height=1024,
            model=model_code,
        )

        if not result.success:
            # Try fallback provider if the primary one fails
            if provider_code != "pollinations":
                logger.warning(f"{provider.name} failed: {result.error}. Trying Pollinations fallback...")
                insert_log(generation_id, "FALLBACK", f"Primary provider failed, trying Pollinations")
                provider = registry.get_fallback()
                result = await provider.generate(
                    prompt=enhanced_prompt,
                    negative_prompt=negative_prompt,
                    width=1024,
                    height=1024,
                    model="flux",
                )

            if not result.success:
                raise RuntimeError(f"All providers failed: {result.error}")

        insert_log(generation_id, "IMAGE_GENERATED", f"Generated in {result.generation_time_ms}ms")

        # ── Step 5: Save output ─────────────────
        # We need the user UUID from the generation record
        # For now, use a simple approach
        user_uuid = str(gen.get("user_id", "unknown"))

        saved = save_generated_image(
            image_data=result.image_data,
            user_uuid=user_uuid,
            generation_uuid=generation_uuid,
            variant_index=0,
        )

        # Insert variant record
        insert_variant(
            generation_id=generation_id,
            image_url=saved["image_path"],
            width=saved["width"],
            height=saved["height"],
        )
        insert_log(generation_id, "IMAGE_SAVED", f"Saved at {saved['image_path']}")

        # ── Step 6: Upscale ─────────────────────
        update_generation_status(generation_uuid, "UPSCALING")
        insert_log(generation_id, "UPSCALING", "Starting basic upscale (2x)")

        try:
            upscale_path = basic_upscale(saved["image_path"], scale=2.0)
            insert_log(generation_id, "UPSCALE_DONE", f"Upscaled: {upscale_path}")
        except Exception as e:
            logger.warning(f"Upscale failed (non-critical): {e}")
            upscale_path = saved["image_path"]

        # ── Step 7: Complete ────────────────────
        total_time = int((time.time() - start_time) * 1000)
        update_generation_status(
            generation_uuid,
            "SUCCESS",
            output_image=saved["image_path"],
            generation_time=total_time,
        )
        insert_log(generation_id, "COMPLETED", f"Total pipeline time: {total_time}ms")

        logger.info(f"✓ Generation {generation_uuid} completed in {total_time}ms")

    except Exception as e:
        logger.error(f"✗ Generation {generation_uuid} failed: {e}")
        update_generation_status(
            generation_uuid,
            "FAILED",
            failed_reason=str(e),
        )
        insert_log(generation_id, "FAILED", str(e))


# ══════════════════════════════════════════════════
# WORKER LOOP
# ══════════════════════════════════════════════════

async def worker_loop():
    """Main worker loop that polls Redis queue for jobs."""
    logger.info("=" * 60)
    logger.info("  AIStudio AI Worker Started")
    logger.info(f"  Providers: {registry.list_available()}")
    logger.info(f"  Queue: {settings.queue_name}")
    logger.info(f"  Poll interval: {settings.worker_poll_interval}s")
    logger.info("=" * 60)

    while _running:
        try:
            # BLPOP with timeout — blocks until job available or timeout
            job = redis_client.blpop(settings.queue_name, timeout=settings.worker_poll_interval)

            if job:
                _, generation_uuid = job
                logger.info(f"Job received: {generation_uuid}")
                await process_generation(generation_uuid)
            # else: timeout, loop continues

        except redis.ConnectionError:
            logger.error("Redis connection lost. Retrying in 5s...")
            await asyncio.sleep(5)
        except Exception as e:
            logger.error(f"Worker error: {e}")
            await asyncio.sleep(2)

    logger.info("Worker stopped gracefully.")


# ══════════════════════════════════════════════════
# FASTAPI APP (Health & Status Endpoints)
# ══════════════════════════════════════════════════

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Start the worker loop as a background task."""
    task = asyncio.create_task(worker_loop())
    yield
    global _running
    _running = False
    task.cancel()


app = FastAPI(
    title="AIStudio AI Worker",
    description="Background worker for AI image generation",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "service": "AIStudio AI Worker",
        "status": "running" if _running else "stopping",
        "providers": registry.list_available(),
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    redis_ok = False
    try:
        redis_ok = redis_client.ping()
    except Exception:
        pass

    provider_health = await registry.health_check_all()

    return {
        "status": "healthy" if redis_ok else "degraded",
        "redis": redis_ok,
        "providers": provider_health,
        "queue_length": redis_client.llen(settings.queue_name) if redis_ok else -1,
    }


@app.get("/providers")
async def list_providers():
    """Lists available providers and their health."""
    return {
        "providers": registry.list_available(),
        "health": await registry.health_check_all(),
    }


# ══════════════════════════════════════════════════
# ENTRY POINT
# ══════════════════════════════════════════════════

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=False,
        log_level="info",
    )
