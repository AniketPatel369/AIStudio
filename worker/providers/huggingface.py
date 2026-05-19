"""
AIStudio AI Worker — HuggingFace Inference API Provider
"""

import time
import httpx
import logging
from providers.base import BaseProvider, GenerationResult

logger = logging.getLogger(__name__)


class HuggingFaceProvider(BaseProvider):
    """
    HuggingFace Inference API — Free tier image generation.
    Supports multiple models via the inference API.
    """

    def __init__(self, api_key: str = "", api_url: str = ""):
        super().__init__(
            name="HuggingFace",
            api_key=api_key,
            api_url=api_url or "https://api-inference.huggingface.co",
        )

    async def generate(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 1024,
        height: int = 1024,
        model: str = "juggernautxl",
        **kwargs,
    ) -> GenerationResult:
        """Generates image via HuggingFace Inference API."""
        start = time.time()

        if not self.api_key:
            return GenerationResult(success=False, error="HuggingFace API key not configured")

        try:
            # Map model codes to HuggingFace model IDs
            model_map = {
                "juggernautxl": "RunDiffusion/Juggernaut-XL-v9",
                "flux-schnell": "black-forest-labs/FLUX.1-schnell",
                "sdxl": "stabilityai/stable-diffusion-xl-base-1.0",
                "realvisxl": "SG161222/RealVisXL_V4.0",
            }
            model_id = model_map.get(model, "RunDiffusion/Juggernaut-XL-v9")

            payload = {
                "inputs": prompt,
                "parameters": {
                    "negative_prompt": negative_prompt,
                    "width": width,
                    "height": height,
                    "num_inference_steps": 30,
                    "guidance_scale": 7.5,
                },
            }

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }

            url = f"{self.api_url}/models/{model_id}"
            logger.info(f"[HuggingFace] Generating with {model_id}: {prompt[:80]}...")

            async with httpx.AsyncClient(timeout=180.0) as client:
                response = await client.post(url, json=payload, headers=headers)

                if response.status_code == 200:
                    # HuggingFace returns raw image bytes
                    content_type = response.headers.get("content-type", "")
                    if "image" in content_type:
                        elapsed = int((time.time() - start) * 1000)
                        logger.info(f"[HuggingFace] Generated in {elapsed}ms")
                        return GenerationResult(
                            success=True,
                            image_data=response.content,
                            width=width,
                            height=height,
                            generation_time_ms=elapsed,
                        )
                    else:
                        return GenerationResult(
                            success=False,
                            error=f"Unexpected content type: {content_type}",
                        )

                elif response.status_code == 503:
                    # Model is loading
                    data = response.json()
                    est_time = data.get("estimated_time", 30)
                    error = f"Model loading, estimated wait: {est_time}s"
                    logger.warning(f"[HuggingFace] {error}")
                    return GenerationResult(success=False, error=error)

                else:
                    error = f"HTTP {response.status_code}: {response.text[:200]}"
                    logger.error(f"[HuggingFace] Failed: {error}")
                    return GenerationResult(success=False, error=error)

        except Exception as e:
            logger.error(f"[HuggingFace] Exception: {e}")
            return GenerationResult(success=False, error=str(e))

    async def health_check(self) -> bool:
        if not self.api_key:
            return False
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(
                    f"{self.api_url}/status",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                )
                return resp.status_code in (200, 401)  # 401 = key valid but unauthorized endpoint
        except Exception:
            return False
