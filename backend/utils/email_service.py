# utils/email_service.py
from flask_mail import Message
from app import mail  # import mail from your app init

def send_otp_email(recipient: str, otp: int):
    msg = Message(
        subject="Your OTP Code",
        sender="your_email@gmail.com",
        recipients=[recipient],
        body=f"Your OTP is {otp}. It will expire in 5 minutes."
    )
    mail.send(msg)
