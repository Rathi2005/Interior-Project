# utils/otp_service.py
import random
import datetime

# Temporary in-memory store {email: {"otp":123456, "expiry":datetime}}
otp_store = {}

def generate_otp(email: str) -> int:
    otp = random.randint(100000, 999999)
    expiry = datetime.datetime.now() + datetime.timedelta(minutes=5)
    otp_store[email] = {"otp": otp, "expiry": expiry}
    return otp

def verify_otp(email: str, otp: str):
    if email not in otp_store:
        return False, "OTP not found"

    record = otp_store[email]

    if datetime.datetime.now() > record["expiry"]:
        return False, "OTP expired"

    if str(record["otp"]) != str(otp):
        return False, "Invalid OTP"

    # OTP valid → remove after use
    del otp_store[email]
    return True, "OTP verified"
