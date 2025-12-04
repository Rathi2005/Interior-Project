from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import config
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from extensions import mail

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Import routes AFTER app initialization
from routes.auth_routes import auth_bp
from routes.contact_route import contact_bp
from routes.consultation_routes import consultations_bp
from routes.profile_routes import profiles_bp

# MongoDB setup
client = MongoClient(config.MONGO_URI)
db = client[config.DB_NAME]
app.db = db

# JWT configuration
app.config["JWT_SECRET_KEY"] = os.getenv("ACCESS_TOKEN_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
jwt = JWTManager(app)

# Mail configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_USERNAME")
mail.init_app(app)

@app.route("/")
def home():
    return "Welcome to the Flask Backend API!"

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(consultations_bp, url_prefix="/api")
app.register_blueprint(profiles_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=True)



# for railway deployment
# if __name__ == "__main__":
#     import os
#     port = int(os.environ.get("PORT", 8080))
#     app.run(host="0.0.0.0", port=port)

