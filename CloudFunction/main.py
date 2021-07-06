import firebase_admin
from firebase_admin import firestore
from google.cloud import storage
import json

firebase_admin.initialize_app()

db = firestore.client()
def hello_gcs(event, context):
    try:
        file = event
        filename=file['name']
        print(f"Processing file: {file['name']}.")
        print(filename)
        gcs_client = storage.Client()
        bucket = gcs_client.bucket('json_file_upload')
        #Getting that File
        blob = bucket.get_blob(filename)
        #Reading
        fileData = json.loads(blob.download_as_string())
        print(fileData)
        #Push to Firebase
        db.collection(u'json_files').document(filename).set(fileData,merge=True)

        return {"success": "True"}
    except Exception as e:
        return {"failure": "True"}
