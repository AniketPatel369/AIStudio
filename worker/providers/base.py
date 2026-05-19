"""
AIStudio AI Worker — Base Provider Interface
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional
import logging

logger = logging.getLogger(__name__)


@dataclass
class GenerationResult:
    """Result from an AI provider generation."""
    success: bool
    image_data: Optional[bytes] = None
    width: int = 1024
    height: int = 1024
    error: Optional[str] = None
    generation_time_ms: int = 0


class BaseProvider(ABC):
    """Abstract base class for all AI providers."""

    def __init__(self, name: str, api_key: str = "", api_url: str = ""):
        self.name = name
        self.api_key = api_key
        self.api_url = api_url

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 1024,
        height: int = 1024,
        model: str = "",
        **kwargs,
    ) -> GenerationResult:
        """Generates an image from a prompt."""
        pass

    @abstractmethod
    async def health_check(self) -> bool:
        """Checks if the provider is available."""
        pass

    def __repr__(self):
        return f"<{self.__class__.__name__} name={self.name}>"
