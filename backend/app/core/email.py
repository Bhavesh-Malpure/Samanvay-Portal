import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_password_reset_email(
    recipient_email: str,
    reset_link: str,
):
    message = EmailMessage()

    message["Subject"] = "Samanvay Portal - Reset Your Password"
    message["From"] = settings.MAIL_FROM
    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

We received a request to reset your Samanvay Portal password.

Click the link below to reset your password:

{reset_link}

This link will expire in {settings.RESET_TOKEN_EXPIRE_MINUTES} minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
Samanvay Portal Team
"""
    )

    with smtplib.SMTP(
        settings.MAIL_HOST,
        settings.MAIL_PORT,
    ) as server:
        server.starttls()

        server.login(
            settings.MAIL_USERNAME,
            settings.MAIL_PASSWORD,
        )

        server.send_message(message)