#Flask Applcation
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return {"text": "World"}

@app.route('/hello')
def hello():
    return 'Hello, World'




