from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

profiles_bp = Blueprint("profiles", __name__)

@profiles_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    
    # Find a single user instead of all matching users
    profile = current_app.db.users.find_one({"email": user_email}, {"_id": 0, "password": 0})
    
    if not profile:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(profile), 200
 