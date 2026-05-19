"""
AIStudio AI Worker — NVIDIA NIMs Provider
"""

import time
import base64
import httpx
import logging
from providers.base import BaseProvider, GenerationResult

logger = logging.getLogger(__name__)


class NvidiaProvider(BaseProvider):
    """
    NVIDIA NIMs — Enterprise AI image generation.
    Requires an API key from build.nvidia.com.
    """

    def __init__(self, api_key: str = "", api_url: str = ""):
        super().__init__(
            name="NVIDIA NIMs",
            api_key=api_key,
            api_url=api_url or "https://ai.api.nvidia.com/v1",
        )

    async def generate(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 1024,
        height: int = 1024,
        model: str = "sdxl",
        **kwargs,
    ) -> GenerationResult:
        """Generates image via NVIDIA NIMs API."""
        start = time.time()

        if not self.api_key:
            return GenerationResult(success=False, error="NVIDIA API key not configured")

        try:
            # Map model codes to NVIDIA model endpoints
            model_map = {
                "sdxl": "stabilityai/stable-diffusion-xl",
                "flux-schnell": "black-forest-labs/flux-schnell",
            }
            model_path = model_map.get(model, "stabilityai/stable-diffusion-xl")

            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "width": width,
                "height": height,
                "steps": 30,
                "cfg_scale": 7.5,
                "seed": int(time.time()) % 2147483647,
            }

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            url = f"{self.api_url}/genai/{model_path}"
            logger.info(f"[NVIDIA] Generating with {model_path}: {prompt[:80]}...")

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(url, json=payload, headers=headers)

                if response.status_code == 200:
                    data = response.json()
                    # NVIDIA returns base64 images
                    image_b64 = data.get("artifacts", [{}])[0].get("base64", "")
                    if not image_b64:
                        image_b64 = data.get("image", "")

                    if image_b64:
                        image_data = base64.b64decode(image_b64)
                        elapsed = int((time.time() - start) * 1000)
                        logger.info(f"[NVIDIA] Generated in {elapsed}ms")
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
                    logger.error(f"[NVIDIA] Failed: {error}")
                    return GenerationResult(success=False, error=error)

        except Exception as e:
            logger.error(f"[NVIDIA] Exception: {e}")
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
