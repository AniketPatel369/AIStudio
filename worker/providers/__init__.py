"""
AIStudio AI Worker — Provider Registry
"""

from providers.base import BaseProvider
from providers.pollinations import PollinationsProvider
from providers.nvidia import NvidiaProvider
from providers.huggingface import HuggingFaceProvider
from providers.togetherai import TogetherAIProvider
from config import settings
import logging

logger = logging.getLogger(__name__)


class ProviderRegistry:
    """Registry managing all available AI providers."""

    def __init__(self):
        self._providers: dict[str, BaseProvider] = {}
        self._initialize()

    def _initialize(self):
        """Initializes all configured providers."""
        # Pollinations — always available (free, no key)
        self._providers["pollinations"] = PollinationsProvider()

        # NVIDIA — requires API key
        if settings.nvidia_api_key:
            self._providers["nvidia"] = NvidiaProvider(api_key=settings.nvidia_api_key)
            logger.info("NVIDIA provider configured")

        # HuggingFace — requires API key
        if settings.huggingface_api_key:
            self._providers["huggingface"] = HuggingFaceProvider(api_key=settings.huggingface_api_key)
            logger.info("HuggingFace provider configured")

        # TogetherAI — requires API key
        if settings.togetherai_api_key:
            self._providers["togetherai"] = TogetherAIProvider(api_key=settings.togetherai_api_key)
            logger.info("TogetherAI provider configured")

        logger.info(f"Initialized {len(self._providers)} providers: {list(self._providers.keys())}")

    def get(self, code: str) -> BaseProvider | None:
        """Gets a provider by code."""
        return self._providers.get(code)

    def get_fallback(self) -> BaseProvider:
        """Returns the fallback provider (Pollinations)."""
        return self._providers["pollinations"]

    def list_available(self) -> list[str]:
        """Lists all available provider codes."""
        return list(self._providers.keys())

    async def health_check_all(self) -> dict[str, bool]:
        """Runs health checks on all providers."""
        results = {}
        for code, provider in self._providers.items():
            results[code] = await provider.health_check()
        return results


# Singleton
registry = ProviderRegistry()
