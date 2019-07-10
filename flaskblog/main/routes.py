from flask import Blueprint, render_template, request

from flaskblog.models import Post, PostCategory

main = Blueprint('main', __name__)

@main.route('/')
@main.route('/home')
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=20)
    post_categories = PostCategory.query.all()
    return render_template('main/home.html', posts=posts, post_categories=post_categories)

@main.route('/post/<string:category>')
def posts_by_category(category):
    page = request.args.get('page', 1, type=int)
    category = PostCategory.query.filter_by(name=category).first_or_404()
    posts = Post.query.filter_by(category=category).order_by(Post.date_posted.desc()).paginate(page=page, per_page=20)
    post_categories = PostCategory.query.all()
    return render_template('main/home.html', posts=posts, post_categories=post_categories, category=category)

@main.route('/about')
def about():
    return render_template('main/about.html', title='About')
