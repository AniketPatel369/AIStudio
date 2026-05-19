"""
AIStudio AI Worker — TogetherAI Provider
"""

import time
import base64
import httpx
import logging
from providers.base import BaseProvider, GenerationResult

logger = logging.getLogger(__name__)


class TogetherAIProvider(BaseProvider):
    """
    TogetherAI — Affordable AI image generation with various models.
    Requires an API key from together.ai.
    """

    def __init__(self, api_key: str = "", api_url: str = ""):
        super().__init__(
            name="TogetherAI",
            api_key=api_key,
            api_url=api_url or "https://api.together.xyz/v1",
        )

    async def generate(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 1024,
        height: int = 1024,
        model: str = "realvisxl",
        **kwargs,
    ) -> GenerationResult:
        """Generates image via TogetherAI API."""
        start = time.time()

        if not self.api_key:
            return GenerationResult(success=False, error="TogetherAI API key not configured")

        try:
            # Map model codes to TogetherAI model IDs
            model_map = {
                "realvisxl": "SG161222/RealVisXL_V4.0",
                "flux-schnell": "black-forest-labs/FLUX.1-schnell",
                "sdxl": "stabilityai/stable-diffusion-xl-base-1.0",
            }
            model_id = model_map.get(model, "SG161222/RealVisXL_V4.0")

            payload = {
                "model": model_id,
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "width": width,
                "height": height,
                "steps": 30,
                "n": 1,
                "response_format": "b64_json",
            }

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }

            url = f"{self.api_url}/images/generations"
            logger.info(f"[TogetherAI] Generating with {model_id}: {prompt[:80]}...")

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(url, json=payload, headers=headers)

                if response.status_code == 200:
                    data = response.json()
                    images = data.get("data", [])
                    if images and images[0].get("b64_json"):
                        image_data = base64.b64decode(images[0]["b64_json"])
                        elapsed = int((time.time() - start) * 1000)
                        logger.info(f"[TogetherAI] Generated in {elapsed}ms")
                        return GenerationResult(
                            success=True,
                            image_data=image_data,
                            width=width,
                            height=height,
                            generation_time_ms=elapsed,
                        )
                    else:
                        return GenerationResult(success=False, error="No image in response")
                else:
                    error = f"HTTP {response.status_code}: {response.text[:200]}"
                    logger.error(f"[TogetherAI] Failed: {error}")
                    return GenerationResult(success=False, error=error)

        except Exception as e:
            logger.error(f"[TogetherAI] Exception: {e}")
            return GenerationResult(success=False, error=str(e))

    async def health_check(self) -> bool:
        if not self.api_key:
            return False
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(
                    f"{self.api_url}/models",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                )
                return resp.status_code == 200
        except Exception:
            return False
