import os
import secrets
from PIL import Image

from flask import url_for, current_app
from flask_mail import Message

from flaskblog import mail

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, 'static/profile_pics', picture_fn)

    # resize picture size to 125 * 125
    output_size = (125, 125)
    i = Image.open(form_picture)
    # pic is small than 125*125 will not change, and larger size picture will keep it's ratio
    i.thumbnail(output_size) 
    i.save(picture_path)

    return picture_fn

def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender='851958789@qq.com', recipients=[user.email])
    # _external=True to get an absolute url
    msg.body = f'''To reset your password, visit the following link:
{url_for('reset_token', token=token, _external=True)}

If you did not make this request then simply ignore this email and no changes will be made.'''
    print('before send')
    mail.send(msg)