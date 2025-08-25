from flask import Blueprint, request, jsonify, current_app
# from app.extensions import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity

consultations_bp = Blueprint("consultations", __name__)

@consultations_bp.route("/consultations", methods=["GET"])
@jwt_required()
def get_consultations():
    user_email = get_jwt_identity()  # Extracted from JWT token
    consultations = list(current_app.db.contacts.find({"email": user_email}, {"_id": 0}))
    
    return jsonify(consultations), 200
 