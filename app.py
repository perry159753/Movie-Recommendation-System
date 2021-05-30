#[-------------------------------------Start importing libraries----------------------------------------]
from flask import Flask, jsonify, request, Response
import mysql.connector
import datetime
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity,
    create_refresh_token,
    jwt_refresh_token_required
)
import os
#[-------------------------------------End importing libraries------------------------------------------]
app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'team-reactifiers'
jwt = JWTManager(app)
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="movie"
)
c=mydb.cursor()
#[-------------------------------------API functions----------------------------------------------------]
@app.route("/auth", methods=["Post"])
def authenticate():
    username = request.args.get("username")
    password = request.args.get("password")

    c.execute("select * from login where username=%s and password=%s",(username,password))
    if not c.fetchall():
        return(jsonify({'data':None,'error':"Username Doesn't Exist"}))
    else:
        
        ret = {
            'access_token': create_access_token(identity=username,expires_delta=datetime.timedelta(days=30)),
            'refresh_token': create_refresh_token(identity=username)
        }
        return jsonify(ret),200
        
#[------------------------------------End API functions------------------------------------------------]
if __name__ == '__main__':
    app.run(debug=True)