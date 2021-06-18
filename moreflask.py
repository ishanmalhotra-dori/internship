from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/user')
def hello():
    return 'users'

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    if username == "ishan":
        return 'User is smart'
    else:
        return "not smart user"

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)