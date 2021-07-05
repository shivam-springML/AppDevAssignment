from flask import Blueprint, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import json
from datetime import datetime
from werkzeug import secure_filename
from google.cloud import storage
from authorize.authorize import authorize_user
import firebase_admin

api = Blueprint('api', __name__)

# cred = credentials.ApplicationDefault()
# default_app = initialize_app(cred, {
#   'projectId': 'springmltraining', 
#   })
# db = firestore.client()

# cred = credentials.Certificate('/home/shivam/Downloads/springML.json')
default_app = firebase_admin.initialize_app()
db = firestore.client()
# appointment_ref = db.collection('Vaccine_Appointment_Shivam')


@api.route('/')
def index():
    return "This is Upload APP"

@api.route('/test')
def test():
    return json.dumps({
        'status':'OK'
    })

@api.route('/uploadFile', methods=['POST'])
# @authorize_user
def FileUpload(**kwargs):
    # print(request.data)
    try:
        file_ = request.files['file']
        file_name = file_.filename
        file_content = file_.read()
        print(file_name)
        print(file_content)
        client = storage.Client()
        bucket = client.bucket('json_file_upload')
        bucket.blob(file_name).upload_from_string(file_content)

        return {'task': 'Success'}, 200
    except:
        return {'task': 'Failed'}, 400

@api.route('/getFiles', methods=['POST'])
def getFiles(**kwargs):
    try:
      
        email = request.json.get('email')
        print(email)
        files = db.collection('json_files').where(u"email", "==", email)
        file_names = [doc.id for doc in files.stream()]
        print(file_names)
        file={'file':file_names}
        return json.dumps(file)
    except Exception as e:
        return {}
