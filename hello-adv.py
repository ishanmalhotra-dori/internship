#Flask Applcation
from flask import Flask
app = Flask(__name__)

@app.route("/")
def me_api():
    return {
        "username": "ishan",
        "school": "uchicago",
        "age": "20"
    }