from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import config
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

from routes.auth_routes import auth_bp  
from routes.contact_route import contact_bp 
from routes.consultation_routes import consultations_bp
from routes.profile_routes import profiles_bp


# MongoDB client setup
client = MongoClient(config.MONGO_URI)
db = client[config.DB_NAME]
app.db = db  # Make the database accessible in the app context

# JWT config
app.config["JWT_SECRET_KEY"] = os.getenv("ACCESS_TOKEN_SECRET")  # change in production
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)  # 1 hour token expiry
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Welcome to the Flask Backend API!"

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(consultations_bp, url_prefix="/api")
app.register_blueprint(profiles_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
 