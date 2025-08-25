from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
from models.contact_model import contact_schema

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/submit", methods=["POST"])
def submit_contact():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        contact_data = contact_schema(data)
        result = current_app.db.contacts.insert_one(contact_data)
        return jsonify({
            "message": "Contact form submitted successfully",
            "id": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
