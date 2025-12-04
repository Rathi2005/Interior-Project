from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timezone, timedelta
import random
from flask_mail import Message
from extensions import mail

auth_bp = Blueprint("auth", __name__)

# Temporary OTP store
otp_store = {}

# ---------------------------
# Register
# ---------------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username, email, password = data.get("username"), data.get("email"), data.get("password")

    if current_app.db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = generate_password_hash(password)
    current_app.db.users.insert_one({
        "email": email,
        "password": hashed_pw,
        "username": username,
        "createdAt": datetime.now(timezone.utc)
    })

    return jsonify({"message": "User registered successfully"}), 201


# ---------------------------
# Login → Generate OTP
# ---------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email, password = data.get("email"), data.get("password")

    user = current_app.db.users.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate OTP
    '''
    otp = random.randint(100000, 999999)
    expiry = datetime.now(timezone.utc) + timedelta(minutes=5)
    otp_store[email] = {"otp": otp, "expiry": expiry}

    # Send OTP using SMTP
    msg = Message(subject="Your OTP Code", recipients=[email])
    msg.body = f"Your OTP is {otp}. It will expire in 5 minutes."
    mail.send(msg)

    print("OTP for testing:", otp)

    return jsonify({"otpSent": True, "message": "OTP sent"}), 200
    '''

    token = create_access_token(identity=email, expires_delta=timedelta(hours=1))

    print("🟢 TOKEN GENERATED:", token)
    print("--------------------------\n")

    return jsonify({
        "token": token,
        "email": email,
        "message": "Login successful"
    }), 200


'''
# ---------------------------
# Verify OTP → JWT
# ---------------------------
@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json

    print("\n--------------------------")
    print("🔵 VERIFY OTP HIT")
    print("📥 REQUEST DATA:", data)
    print("📦 OTP STORE:", otp_store)
    print("--------------------------")

    email = data.get("email")
    otp = str(data.get("otp"))

    print("📌 EMAIL RECEIVED:", email)
    print("📌 OTP RECEIVED:", otp)

    if email not in otp_store:
        print("❌ OTP NOT FOUND FOR EMAIL:", email)
        return jsonify({"message": "OTP not found"}), 400

    record = otp_store[email]
    print("📦 STORED RECORD:", record)

    if datetime.now(timezone.utc) > record["expiry"]:
        print("❌ OTP EXPIRED")
        del otp_store[email]
        return jsonify({"message": "OTP expired"}), 400

    if str(record["otp"]) != otp:
        print("❌ INVALID OTP. EXPECTED:", record["otp"])
        return jsonify({"message": "Invalid OTP"}), 400

    print("🟢 OTP MATCHED → CREATING TOKEN")

    del otp_store[email]

    token = create_access_token(identity=email, expires_delta=timedelta(hours=1))

    print("🟢 TOKEN GENERATED:", token)
    print("--------------------------\n")

    return jsonify({
        "token": token,
        "email": email,
        "message": "Login successful"
    }), 200

# ---------------------------
# Resend OTP
# ---------------------------
@auth_bp.route("/resend-otp", methods=["POST"])
def resend_otp():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email required"}), 400

    otp = random.randint(100000, 999999)
    expiry = datetime.now(timezone.utc) + timedelta(minutes=5)
    otp_store[email] = {"otp": otp, "expiry": expiry}

    msg = Message(subject="Your OTP Code", recipients=[email])
    msg.body = f"Your OTP is {otp}. It expires in 5 minutes."
    mail.send(msg)

    print("Resent OTP:", otp)

    return jsonify({"message": "OTP resent successfully"}), 200
'''

# ---------------------------
# Protected route
# ---------------------------
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify({"message": "Welcome to your profile!", "user": current_user}), 200
