class Config:
    SECRET_KEY = 'a10a1dd17fc6a7797a69f4141bdd5379'
    #SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db' # relative path from current file
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:z13547842355@127.0.0.1/flaskblog_db'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True

    # MAIL_SUPPRESS_SEND'] = False    # 发送邮件，为True则不发送
    MAIL_SERVER = 'smtp.qq.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERMANE = '851958789@qq.com'
    MAIL_PASSWORD = 'jpmtsdrlavykbbab'
