#Flask Applcation
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)


# @app.route('/')
# @cross_origin()
# def index():
#     response = "text" "World"
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

@app.route('/hello')
def hello():
    return 'Hello, World'


# from flask import Flask
# from flask_cors import CORS, cross_origin
# app = Flask(__name__)
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route("/")
# @cross_origin()
# def helloWorld():
#   return "Hello, cross-origin-world!"


from flask import Flask, jsonify

@app.route("/", methods=["GET"])
@cross_origin()
def get_example():
    """GET in server"""
    response = jsonify(message="Simple server is running")
    return response


