"""
AIStudio AI Worker — Configuration
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Redis
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_password: str = ""

    # MySQL
    db_host: str = "localhost"
    db_port: int = 3306
    db_name: str = "aistudio"
    db_user: str = "root"
    db_password: str = "root"

    # Storage
    storage_path: str = "../storage"

    # Provider API Keys
    nvidia_api_key: str = ""
    huggingface_api_key: str = ""
    togetherai_api_key: str = ""

    # Worker
    worker_poll_interval: int = 2
    worker_max_retries: int = 3

    # Queue
    queue_name: str = "aistudio:generation:queue"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
