"""
Use a seperate .py file to migrate data, when using mysql as database manage 
system. 

"""

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
#主文件中导入app初始化manage
from flaskblog import create_app, db

#导入需要迁移的数据库模型
from flaskblog.models import User, Post

app = create_app()

#让python支持命令行工作
manager = Manager(app)
#使用migrate绑定app和db
migrate = Migrate(app,db)
#添加迁移脚本的命令到manager中
manager.add_command('db',MigrateCommand)

if __name__ == '__main__':
    manager.run()