from flask import *  
from werkzeug.utils import secure_filename
import os
from os import path
import torch
from flask_cors import CORS, cross_origin
import boto3
import logging
from botocore.exceptions import ClientError
import os


#Constants
BUCKET = 'ishandoriinternship'
UPLOADS_LOCAL = "/Users/ishanmalhotra/Desktop/internship-master/pythonapp/dori"
UPLOADS_PREDICTED = "/Users/ishanmalhotra/Desktop/internship-master/pythonapp/predicted-dir"



s3 = boto3.resource('s3')
app = Flask(__name__)
cors = CORS(app)
dir_list = os.listdir(UPLOADS_LOCAL)
s3_client = boto3.client('s3')







#API
# @app.route('/access-files', methods = ['GET'])
# @cross_origin()
# def file_lookup():
#     return jsonify(Filename=dir_list,status = "SUCCESS")

@app.route("/hello-world", methods=["GET"])
@cross_origin()
def get_example():
    """GET in server"""
    response = jsonify(message=["Simple server is running"])
    return response

# @app.route('/upload', methods = ['POST'])  
# @cross_origin()
# def success():  
#     if request.method == 'POST':  
#         f = request.files['files']  
#         f.save("upload-dir/" + f.filename)  
#         # return render_template( name = f.filename) 
#         return "success" 
  
@app.route('/get-file-local', methods = ['GET'])
def get_file():
    dir_list = os.listdir(UPLOADS_LOCAL)

    fl = request.args.get('file-path')
    
    if path.exists(UPLOADS_LOCAL + "/" + fl):
        
        response = Response()
        # response.headers["Acces"]
        return send_file(fl)
        
    else:
        return jsonify(status="failure, no such file exists")


@app.route('/access-files', methods=['GET'])
@cross_origin()
def list_files():
    response = s3_client.list_objects_v2(
    Bucket=BUCKET
    )
    res = []
    for x in response['Contents']:
        file = x['Key'].split('/')
        if file[0] == "dori":
            res.append(file[1])
    return jsonify(dir = res)


@app.route('/get-predictions', methods = ['POST'])
@cross_origin()
def get_prediction():  
    if request.method == 'POST':  
        f = request.files['files']  
        f.save("upload-dir/" + f.filename)  
        # return render_template( name = f.filename) 
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s') 
        img = "upload-dir/" + f.filename
        print(img)
        print(f)
        results = model(img)
        results.save("predictions-dir/")
        upload_file("predictions-dir/" + f.filename,'ishandoriinternship',"dori/predicted/" + f.filename)
        return send_file("predictions-dir/" + f.filename) 


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    if request.method == 'POST':
        f = request.files['files']
        if f:
                # filename = secure_filename(img.filename)
                f.save("dori/" + f.filename)
                upload_file("dori/" + f.filename,'ishandoriinternship',"dori/")
                return "success"
              




def upload_file(file_name, bucket, object_name=None):

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True
    
if __name__ == '__main__':  
    app.run(debug = True)  


