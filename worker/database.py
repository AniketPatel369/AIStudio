"""
AIStudio AI Worker — Database Connection
Direct MySQL connection for reading/updating generation status.
"""

import pymysql
import pymysql.cursors
from config import settings
import logging

logger = logging.getLogger(__name__)


def get_connection():
    """Creates a new MySQL connection."""
    return pymysql.connect(
        host=settings.db_host,
        port=settings.db_port,
        user=settings.db_user,
        password=settings.db_password,
        database=settings.db_name,
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )


def get_generation_by_uuid(uuid: str) -> dict | None:
    """Fetches a generation record by UUID."""
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT g.*, p.code as provider_code, p.api_url as provider_url,
                       m.code as model_code, m.name as model_name
                FROM generations g
                LEFT JOIN providers p ON g.provider_id = p.id
                LEFT JOIN models m ON g.model_id = m.id
                WHERE g.uuid = %s
                """,
                (uuid,),
            )
            return cursor.fetchone()
    finally:
        conn.close()


def update_generation_status(uuid: str, status: str, **kwargs):
    """Updates generation status and optional fields."""
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            fields = ["status = %s"]
            values = [status]

            if "output_image" in kwargs:
                fields.append("output_image = %s")
                values.append(kwargs["output_image"])
            if "enhanced_prompt" in kwargs:
                fields.append("enhanced_prompt = %s")
                values.append(kwargs["enhanced_prompt"])
            if "generation_time" in kwargs:
                fields.append("generation_time = %s")
                values.append(kwargs["generation_time"])
            if "failed_reason" in kwargs:
                fields.append("failed_reason = %s")
                values.append(kwargs["failed_reason"])

            values.append(uuid)
            sql = f"UPDATE generations SET {', '.join(fields)} WHERE uuid = %s"
            cursor.execute(sql, values)
            logger.info(f"Updated generation {uuid} → {status}")
    finally:
        conn.close()


def insert_variant(generation_id: int, image_url: str, width: int, height: int):
    """Inserts a generation variant record."""
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO generation_variants (generation_id, image_url, width, height)
                VALUES (%s, %s, %s, %s)
                """,
                (generation_id, image_url, width, height),
            )
    finally:
        conn.close()


def insert_log(generation_id: int, step_name: str, message: str):
    """Inserts a generation log entry."""
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO generation_logs (generation_id, step_name, log_message)
                VALUES (%s, %s, %s)
                """,
                (generation_id, step_name, message),
            )
    finally:
        conn.close()
