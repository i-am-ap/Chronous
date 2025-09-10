from flask import Blueprint, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()  # create db here
migrate = Migrate()  # create migrate here

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Set up CORS with specific origins
    # CORS(app, resources={r"/api/*": {"origins": [
    # "http://localhost:5173",
    # "https://chronous-2649.vercel.app"
    # ]}})

    # CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for simplicity; adjust in production

    # api = Blueprint("api", __name__, url_prefix="/api")

    # Allow all origins (for now)
    # CORS(app, resources={r"/api/*": {"origins": "*"}})   # <-- add this
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db) # initialize migrate here

    # Import and register blueprints **after db.init_app** and inside app context
    with app.app_context():
        from .routes import api  # import here to avoid circular import
        from . import models
        db.create_all()
        app.register_blueprint(api)

    if test_config:
        app.config.update(test_config)

    return app
