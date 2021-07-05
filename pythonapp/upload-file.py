from flask import *  
from werkzeug.utils import secure_filename
app = Flask(__name__)  
 
# @app.route('/')  
# def upload():  
#     return render_template("file_upload_form.html")  
 
@app.route('/upload', methods = ['POST'])  
def success():  
    if request.method == 'POST':  
        f = request.files['files']  
        f.save("upload-dir/" + f.filename)  
        # return render_template( name = f.filename) 
        return "success" 
  

if __name__ == '__main__':  
    app.run(debug = True)  