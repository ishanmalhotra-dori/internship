from flask import *  
from werkzeug.utils import secure_filename
import os
from os import path
UPLOADS = "/Users/ishanmalhotra/Desktop/Dori/upload-dir"
dir_list = os.listdir(UPLOADS)

app = Flask(__name__)
@app.route('/files', methods = ['GET'])
def file_lookup():
    return jsonify(Filename=dir_list)
@app.route('/get-file', methods = ['GET'])
def get_file():
    fl = request.args.get('file-path')
    
    if path.exists(UPLOADS + "/" + fl):
        return send_file(fl)
        return jsonify(status="success")
    else:
        return jsonify(status="failure, no such file exists")
    


