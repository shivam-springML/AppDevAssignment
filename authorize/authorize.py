from functools import wraps
from flask import abort,request
from firebase_admin import auth

def authorize_user(f):
    @wraps(f)
    def decorated_function(*args, **kws):
            if not 'Authorization' in request.headers:
                print("No header Authorization")
                abort(401)
            user = None
            data = request.headers['Authorization']
            authToken = str(data)
            try:
                user = auth.verify_id_token(authToken)
                print(user)
            except Exception as identifier:
                print(identifier)
                abort(401)

            return f(*args, **kws)            
    return decorated_function