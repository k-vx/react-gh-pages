# use_mysql_as_db

## django orm 的原理

django并不直接操作数据库，而是使用python的database driver。目前`mysqlclient`包支持python3，且在django的settings.py中不需要其他额外的配置，只用设置好`DATABASES`就可以用。

如果mac下`pip install mysqlcient`报错，试试`LDFLAGS=-L/usr/local/opt/openssl/lib pip install mysqlclient`