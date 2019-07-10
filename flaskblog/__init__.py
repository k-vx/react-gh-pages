from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, current_user
from flask_mail import Mail
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from flaskblog.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
# if a view add decorator 'login_required', but not logged in, then will redirenct to this view
login_manager.login_view = 'users.login'  
login_manager.login_message_category = 'info' # add some style to flash msg
admin = Admin(template_mode='bootstrap3', url='/leoadmin')
mail = Mail()

# Create customized model view class
class CustomGeneralModelView(ModelView):
    can_view_details = False

    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin

class HideSomeColumnModelView(CustomGeneralModelView):
    # hide content column for Post
    # hide description, solution for solution
    column_exclude_list = ['content', 'description', 'solution']

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    # init admin
    admin.init_app(app)
    from flaskblog.models import (User, Post, PostCategory, Solution, 
    SolutionCategory,
    )
    admin.add_view(CustomGeneralModelView(User, db.session))
    admin.add_view(HideSomeColumnModelView(Post, db.session))
    admin.add_view(CustomGeneralModelView(PostCategory, db.session))
    admin.add_view(HideSomeColumnModelView(Solution, db.session))
    admin.add_view(CustomGeneralModelView(SolutionCategory, db.session))


    # import instance of blueprint
    from flaskblog.users.routes import users
    from flaskblog.posts.routes import posts
    from flaskblog.main.routes import main
    from flaskblog.errors.handlers import errors
    from flaskblog.solutions.routes import solutions
    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(main)
    app.register_blueprint(errors)
    app.register_blueprint(solutions)

    return app