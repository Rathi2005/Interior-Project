from datetime import datetime

def contact_schema(data):
    now = datetime.now().isoformat()
    return {
        "fullName": data.get("fullName"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "category": data.get("category"),
        "address": data.get("address"),
        "projectDescription": data.get("projectDescription"),
        "status": "pending",  # Default status for new consultations
        "createdAt": now,
        "updatedAt": now
    }