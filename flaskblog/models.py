from datetime import datetime

from markdown import markdown

from flask import current_app
from flask_login import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from flaskblog import db, login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    is_admin = db.Column(db.Boolean, default=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    # backref is like add a colunm to post, name of that colunm is 'author'
    # with this field, we can access all posts of a individual user.
    # In relationship, we actually referencing the Post class, so 'Post'
    # is capitalized. But in Foreignkey, we actually referencing the table,
    # so it's all lower case.
    posts = db.relationship('Post', backref='author', lazy=True)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        # create json web signature with user_id in header
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verity_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['useri_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # 不知道怎么实现不同的分类每个sub_id分别自动增加，暂时用手写
    sub_id = db.Column(db.Integer, nullable=True, default=1)
    title = db.Column(db.String(120), unique=True, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    # user in Foreignkey is table name
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('post_category.id'), nullable=False)

    def post_content_render_markdown(self):
        return markdown(self.content, extensions=[
                'markdown.extensions.extra',
                'markdown.extensions.codehilite',
            ])

    def __repr__(self):
        return f"Post('{self.title}', {self.category.name}, '{self.date_posted}')"


class PostCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    posts = db.relationship('Post', backref='category', lazy=True)

    def __repr__(self):
        return f"Post Category('{self.id}', '{self.name}')"

class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # 不知道怎么实现不同的分类每个sub_id分别自动增加，暂时用手写
    sub_id = db.Column(db.Integer, nullable=True, default=1)
    title = db.Column(db.String(120), unique=True, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=False)
    solution = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('solution_category.id'), nullable=False)

    def description_render_markdown(self):
        return markdown(self.description, extensions=[
                'markdown.extensions.extra',
                'markdown.extensions.codehilite',
            ])

    def solution_render_markdown(self):
        return markdown(self.solution, extensions=[
                'markdown.extensions.extra',
                'markdown.extensions.codehilite',
            ])

    def __repr__(self):
        return f"Solution('{self.title}', '{self.date_posted}')"

class SolutionCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    solutions = db.relationship('Solution', backref='category', lazy=True)

    def __repr__(self):
        return f"Solution Category('{self.id}', '{self.name}')"