#Flask Applcation
from flask import Flask 
from flask import send_file

app = Flask(__name__)

@app.route("/")
def me_api():

    fl = "test.png"
    return send_file(fl)
    