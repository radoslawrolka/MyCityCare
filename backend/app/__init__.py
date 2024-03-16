from flask import Flask
from config import Config
import pymysql

app = Flask(__name__)
app.config.from_object(Config)
app.config['mysql'] = pymysql.connect(host=app.config['HOST'], user=app.config['USER'], password=app.config['PASSWORD'], database=app.config['DATABASE'])

from app import routes, MySQL_Points_db