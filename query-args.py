from flask import Flask
from flask import send_file,request


app = Flask(__name__)
correct_fl = "site.html"
incorrect_fl = "site2.html"
@app.route('/')
def query_example():
    user = request.args.get('username')

    if user == 'ishan':
        return send_file(correct_fl)
    else:
        return send_file(incorrect_fl)
        
        