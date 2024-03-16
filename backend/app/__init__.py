from flask import Flask, request, jsonify
from config import Config
from flask_cors import CORS

app = Flask(__name__, template_folder='../templates')
app.config.from_object(Config)
CORS(app)

from app import routes
