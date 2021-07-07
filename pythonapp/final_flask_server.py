from flask import *  
from werkzeug.utils import secure_filename
import os
from os import path
from flask_cors import CORS, cross_origin
UPLOADS = "/Users/ishanmalhotra/Desktop/Dori/pythonapp/upload-dir"
dir_list = os.listdir(UPLOADS)


app = Flask(__name__)
cors = CORS(app)


@app.route('/access-files', methods = ['GET'])
@cross_origin()
def file_lookup():
    return jsonify(Filename=dir_list,status = "SUCCESS")

@app.route("/hello-world", methods=["GET"])
@cross_origin()
def get_example():
    """GET in server"""
    response = jsonify(message=["Simple server is running"])
    return response

@app.route('/upload', methods = ['POST'])  
@cross_origin()
def success():  
    if request.method == 'POST':  
        f = request.files['files']  
        f.save("upload-dir/" + f.filename)  
        # return render_template( name = f.filename) 
        return "success" 
  
@app.route('/get-file', methods = ['GET'])
def get_file():
    fl = request.args.get('file-path')
    
    if path.exists(UPLOADS + "/" + fl):
        
        response = Response()
        # response.headers["Acces"]
        return send_file(fl)
        
    else:
        return jsonify(status="failure, no such file exists")

if __name__ == '__main__':  
    app.run(debug = True)  


