"""
AIStudio AI Worker — Pollinations Provider (Free, No API Key Required)
"""

import time
import httpx
import logging
from urllib.parse import quote
from providers.base import BaseProvider, GenerationResult

logger = logging.getLogger(__name__)


class PollinationsProvider(BaseProvider):
    """
    Pollinations.ai — Free AI image generation.
    Uses a simple URL-based API that returns images directly.
    """

    def __init__(self, api_key: str = "", api_url: str = ""):
        super().__init__(
            name="Pollinations",
            api_key=api_key,
            api_url=api_url or "https://image.pollinations.ai",
        )

    async def generate(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 1024,
        height: int = 1024,
        model: str = "flux",
        **kwargs,
    ) -> GenerationResult:
        """Generates image via Pollinations URL API."""
        start = time.time()

        try:
            # Build the Pollinations URL
            encoded_prompt = quote(prompt)
            url = (
                f"{self.api_url}/prompt/{encoded_prompt}"
                f"?width={width}&height={height}"
                f"&model={model}"
                f"&nologo=true&enhance=true"
                f"&seed={int(time.time())}"
            )

            if negative_prompt:
                url += f"&negative={quote(negative_prompt)}"

            logger.info(f"[Pollinations] Generating: {prompt[:80]}...")

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.get(url)

                if response.status_code == 200:
                    elapsed = int((time.time() - start) * 1000)
                    logger.info(f"[Pollinations] Generated in {elapsed}ms")
                    return GenerationResult(
                        success=True,
                        image_data=response.content,
                        width=width,
                        height=height,
                        generation_time_ms=elapsed,
                    )
                else:
                    error = f"HTTP {response.status_code}: {response.text[:200]}"
                    logger.error(f"[Pollinations] Failed: {error}")
                    return GenerationResult(success=False, error=error)

        except Exception as e:
            logger.error(f"[Pollinations] Exception: {e}")
            return GenerationResult(success=False, error=str(e))

    async def health_check(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(f"{self.api_url}/prompt/test?width=64&height=64&nologo=true")
                return resp.status_code == 200
        except Exception:
            return False
