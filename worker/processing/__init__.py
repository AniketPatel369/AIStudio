"""
AIStudio AI Worker — Image Processing Pipeline
Handles saving, resizing, thumbnail generation, and basic enhancement.
"""

import os
import io
import logging
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance
from config import settings

logger = logging.getLogger(__name__)


def ensure_dirs():
    """Creates all required storage directories."""
    base = Path(settings.storage_path)
    for subdir in ["uploads", "generated", "upscaled", "thumbnails", "temp"]:
        (base / subdir).mkdir(parents=True, exist_ok=True)


def save_generated_image(
    image_data: bytes,
    user_uuid: str,
    generation_uuid: str,
    variant_index: int = 0,
) -> dict:
    """
    Saves a generated image and creates a thumbnail.
    Returns paths and dimensions.
    """
    ensure_dirs()
    base = Path(settings.storage_path)

    # Save full-size generated image
    filename = f"{generation_uuid}_v{variant_index}.png"
    gen_dir = base / "generated" / user_uuid
    gen_dir.mkdir(parents=True, exist_ok=True)
    gen_path = gen_dir / filename

    # Open and process image
    img = Image.open(io.BytesIO(image_data))
    img = img.convert("RGB")

    # Light enhancement: slight sharpness and contrast boost
    img = ImageEnhance.Sharpness(img).enhance(1.1)
    img = ImageEnhance.Contrast(img).enhance(1.05)

    # Save full resolution
    img.save(str(gen_path), "PNG", quality=95)
    width, height = img.size

    # Save thumbnail (400px wide)
    thumb_dir = base / "thumbnails" / user_uuid
    thumb_dir.mkdir(parents=True, exist_ok=True)
    thumb_path = thumb_dir / f"{generation_uuid}_v{variant_index}_thumb.jpg"

    thumb = img.copy()
    thumb.thumbnail((400, 400), Image.Resampling.LANCZOS)
    thumb.save(str(thumb_path), "JPEG", quality=80)

    logger.info(f"Saved generated image: {gen_path} ({width}x{height})")

    return {
        "image_path": str(gen_path),
        "thumb_path": str(thumb_path),
        "width": width,
        "height": height,
    }


def basic_upscale(image_path: str, scale: float = 2.0) -> str:
    """
    Basic upscale using Pillow (LANCZOS resampling).
    For production, integrate Real-ESRGAN or SUPIR.
    """
    ensure_dirs()
    base = Path(settings.storage_path)

    img = Image.open(image_path)
    new_width = int(img.width * scale)
    new_height = int(img.height * scale)

    upscaled = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Light sharpening after upscale
    upscaled = upscaled.filter(ImageFilter.SHARPEN)

    # Save upscaled
    filename = Path(image_path).stem + f"_x{int(scale)}.png"
    upscale_dir = base / "upscaled"
    upscale_path = upscale_dir / filename
    upscaled.save(str(upscale_path), "PNG", quality=95)

    logger.info(f"Upscaled to {new_width}x{new_height}: {upscale_path}")
    return str(upscale_path)


def validate_input_image(image_path: str) -> dict:
    """
    Validates an uploaded input image.
    Returns image info or raises an error.
    """
    try:
        img = Image.open(image_path)
        width, height = img.size
        format_name = img.format or "UNKNOWN"

        if width < 64 or height < 64:
            raise ValueError("Image too small (minimum 64x64)")
        if width > 8192 or height > 8192:
            raise ValueError("Image too large (maximum 8192x8192)")

        file_size = os.path.getsize(image_path)
        if file_size > 10 * 1024 * 1024:
            raise ValueError("File size exceeds 10MB limit")

        return {
            "valid": True,
            "width": width,
            "height": height,
            "format": format_name,
            "file_size": file_size,
        }
    except Exception as e:
        return {"valid": False, "error": str(e)}
