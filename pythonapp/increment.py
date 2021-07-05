from flask import Flask
from flask_cors import CORS, cross_origin



from multiprocessing import Value


from flask import  jsonify


counter = Value('i', 0)
app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=["GET"])
@cross_origin()

def get_example():
    with counter.get_lock():
        counter.value += 1
        out = counter.value

    return jsonify(out)
