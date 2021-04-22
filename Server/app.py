from flask import Flask,request
from flask import render_template
import time
import sys
import os
import requests
import json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime,timedelta
from flask_socketio import SocketIO, emit
import base64
from os.path import dirname, abspath 
import configparser
import threading
import os
from flask_cors import cross_origin
from functools import wraps
import secrets
d = dirname(dirname(abspath(__file__)))
sys.path.append(d)

config = configparser.ConfigParser()

currentPath = os.path.dirname(os.path.abspath(__file__))
config.read(currentPath + '/Config.ini')
DatabaseIP = config.get('Setting','DatabaseIP')
DBusername = config.get('Setting','DBusername')
DBpassword = config.get('Setting','DBpassword')

#------------------------------------------------------------------------------------------------------
app = Flask(__name__)
CORS(app)
CORS(app,resources={r"/*":{"origins":"*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://'+DBusername+':'+DBpassword+'@'+DatabaseIP+':3306/sensordb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
db.init_app(app)


def loginCheck(func):
	@wraps(func)  # 保留源信息，本质是endpoint装饰，否则修改函数名很危险
	def inner(*args, **kwargs):  # 接收参数，*args接收多余参数形成元组，**kwargs接收对于参数形成字典
		_username = request.form['username']
		_password = request.form['password']
		print(_username,_password)
		
		return func(*args, **kwargs)  # 登录成功就执行传过来的函数
	return inner


#刪除工作指令
@app.route("/Login", methods=['POST'])
@loginCheck
def Login():
	#使用ID來刪除物件
	_username = request.form['username']
	_password = request.form['password']
	print(_username,_password)
	token = secrets.token_hex(16)
	# #刪除指定的DB指令
	# db.session.delete(scheduleCommand)
	# db.session.commit()
	return token

if __name__ == "__main__":
	app.run(host='0.0.0.0',port=8000)
