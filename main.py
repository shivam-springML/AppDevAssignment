import logging
from flask import Flask, Blueprint, render_template, send_from_directory
from flask_cors import CORS
from api import api

app = Flask(__name__ , static_folder='VaccineAppointment/dist/VaccineAppointment')
VaccineAppointment = Blueprint('VaccineAppointment', __name__,
                    template_folder='VaccineAppointment/dist/VaccineAppointment')
app.register_blueprint(VaccineAppointment)
app.register_blueprint(api, url_prefix='/upload/')

CORS(app)



# @app.route('/')
# def hello_world():
#     return 'Upload File Flask App'
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/assets/<path:filename>')
def custom_static_for_assets(filename):
    return send_from_directory('VaccineAppointment/dist/VaccineAppointment/assets', filename)


@app.route('/<path:filename>')
def custom_static(filename):
    return send_from_directory('VaccineAppointment/dist/VaccineAppointment/', filename)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    
    # app.run(host='127.0.0.1', port=5000, debug=True)
    app.run(host="0.0.0.0", port=8080, debug=False)
