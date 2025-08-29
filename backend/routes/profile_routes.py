from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

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

@profiles_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_email = get_jwt_identity()
    data = request.get_json()
    
    # Update the user profile with provided data
    update_data = {}
    
    if 'username' in data:
        update_data['username'] = data['username']
    
    if 'email' in data:
        update_data['email'] = data['email']
    
    # Add updatedAt timestamp
    update_data['updatedAt'] = datetime.datetime.utcnow()
    
    # Only update if there are fields to update
    if update_data:
        result = current_app.db.users.update_one(
            {"email": user_email},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
    
    # Return success response
    return jsonify({"message": "Profile updated successfully"}), 200


 