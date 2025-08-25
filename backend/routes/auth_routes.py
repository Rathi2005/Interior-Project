from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timezone


auth_bp = Blueprint("auth", __name__)

# Register
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username, email, password = data.get("username"), data.get("email"), data.get("password")

    if current_app.db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = generate_password_hash(password)
    current_app.db.users.insert_one({"email": email, "password": hashed_pw, "username": username, "rawPassword": password, "createdAt": datetime.now(timezone.utc)})

    return jsonify({"message": "User registered successfully"}), 201

# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email, password = data.get("email"), data.get("password")

    user = current_app.db.users.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=email)
    return jsonify({"message": "Login successful", "token": token, "email": email}), 200

# Protected route
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify({"message": "Welcome to your profile!", "user": current_user}), 200
