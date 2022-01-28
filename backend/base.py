from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from PIL import Image
import base64
import numpy as np
from scipy.io.wavfile import write
import librosa
# import io
import json
# import pydub
import os
# import audio2numpy as a2n 
# import sounddevice as sd
from utilities.gabor import Gabor, Gabor_preprocess, Gabor_postprocess
from utilities.noise_filter import noise_reduction, sound_enhancement
from flask_mongoengine import MongoEngine # pip install flask-mongoengine
import time


current_path = os.getcwd()
current_path = current_path.replace("\\", "\\\\") + "\\\\"

def audio_preprocess(data):
    if (len(data.shape) != 1):
        data = data[:,0]
    return data


api = Flask(__name__)
CORS(api)

'''
# ---------- connect mongoDB atlas -----------
print("connecting to Database, please wait for awhile...")
DB_URI = "" # connect your mongoDB here
api.config["MONGODB_HOST"] = DB_URI
db = MongoEngine(api)
print(db)
print("successfully connect to mongoDB atlas!")


class LogIn_user(db.Document):
    username = db.StringField()
    password = db.StringField()

all_user = LogIn_user.objects() # retrieve all the existed user
print("retrieve all existed user's information! ready to server LogIn page!")

'''

@api.route('/api/login', methods=['POST'])
def validate_login():
    isUser = False
    forms = request.form
    form_dict = forms.to_dict()
    curr_user = form_dict.get('user')
    curr_psw = form_dict.get('psw')

    userExist, passwordCorrect = False, False

    for user in all_user: # iterate through all the existed user
        print(user.username, user.password)
        if (curr_user == user.username):
            userExist = "true"
            if (curr_psw == user.password):
                passwordCorrect = "true"

    response = {
        "userExist" : userExist,
        "passwordCorrect" : passwordCorrect
    }

    return response


@api.route('/api/retrieve', methods=['POST', 'GET'])
def retrieve_data():
    # retrieve_data = speed_adjust_storage.objects()

    tf_image = tf_storage.objects().order_by('-timestamp')
    speed_adjust = speed_adjust_storage.objects().order_by('-timestamp')
    filter_operation = filter_storage.objects().order_by('-timestamp')

    tf_image = tf_image[0:5]
    speed_adjust = speed_adjust[0:5]
    filter_operation = filter_operation[0:5]

    init_pool = []
    for i in range(len(speed_adjust)):
        init_pool.append(speed_adjust[i])

    for i in range(len(filter_operation)):
        init_pool.append(filter_operation[i])

    for i in range(len(tf_image)):
        init_pool.append(tf_image[i])
    
    print(init_pool)
    final_pool = []

    for k in range(min(5,len(init_pool))):
        latest_timestamp = 0.0
        index = 0
        i = 0
        for item in init_pool:
            if float(item.timestamp) > latest_timestamp:
                latest_timestamp = float(item.timestamp)
                index = i
            i += 1
        print(len(init_pool))
        print(index)
        final_pool.append(init_pool[index])
        del init_pool[index]

    
    retrieve_data1 = final_pool[0]
    retrieve_data2 = final_pool[1]
    retrieve_data3 = final_pool[2]
    retrieve_data4 = final_pool[3]
    retrieve_data5 = final_pool[4]

    response1 = {
        "data1" : retrieve_data1.data1,
        "operation" : retrieve_data1.operation,
        "filename" : retrieve_data1.filename,
        "params" : retrieve_data1.params
    }
    response2 = {
        "data1" : retrieve_data2.data1,
        "operation" : retrieve_data2.operation,
        "filename" : retrieve_data2.filename,
        "params" : retrieve_data2.params
    }
    response3 = {
        "data1" : retrieve_data3.data1,
        "operation" : retrieve_data3.operation,
        "filename" : retrieve_data3.filename,
        "params" : retrieve_data3.params
    }
    response4 = {
        "data1" : retrieve_data4.data1,
        "operation" : retrieve_data4.operation,
        "filename" : retrieve_data4.filename,
        "params" : retrieve_data4.params
    }
    response5 = {
        "data1" : retrieve_data5.data1,
        "operation" : retrieve_data5.operation,
        "filename" : retrieve_data5.filename,
        "params" : retrieve_data5.params
    }

    response = {
        "item1" : response1,
        "item2" : response2,
        "item3" : response3,
        "item4" : response4,
        "item5" : response5,
    }

    return response

'''
class tf_storage(db.Document):
    username = db.StringField()
    data1 = db.StringField()
    operation = db.StringField()
    timestamp = db.StringField()
    filename = db.StringField()
    params = db.StringField()
'''

@api.route('/api/TF-spectrum', methods=['POST'])
def TF_spectrum():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = audio.read()
    while (len(audio)%16 != 0):
        audio += b'\x00'
    audio = np.fromstring(audio, np.int16)

    forms = request.form
    forms_dict = forms.to_dict()
    lowerBound_freq = float(forms_dict.get('lowerbound'))
    upperBound_freq = float(forms_dict.get('upperbound'))
    timeDuration = float(forms_dict.get('timeDuration'))
    filename = forms_dict.get('fileName')
    filename = filename.replace(".wav",".jpg")

    fs = int(audio.shape[0]/timeDuration)
    sgm = 200

    [audio, tau, t, f] = Gabor_preprocess(audio, fs, lowerBound_freq, upperBound_freq, sgm)

    print('doing gabor transform...')
    tf_spectrum, row, col = Gabor(audio, tau, t, f, sgm)

    horizontal_scale_forPlot = 8
    Gabor_postprocess(tf_spectrum, horizontal_scale_forPlot, t, f, lowerBound_freq, upperBound_freq)

    print('done, send back the response of an image')
    # tf_spectrum = np.abs(tf_spectrum)
    # tf_spectrum = 1.2*255*tf_spectrum/ np.max(tf_spectrum)

    # img1 = Image.fromarray(tf_spectrum)
    # img1 = img1.convert('RGB')
    # width, height = img1.size
    # img1.save('temp.jpg')

    # return output image
    img = cv2.imread("temp.jpg")
    retval, buffer = cv2.imencode('.jpg', img)
    buffer_string = base64.b64encode(buffer)
    buffer_string = buffer_string.decode('utf-8')

    response = {
        "img" : buffer_string,
        # "width" : str(width),
        "low" : str(lowerBound_freq),
        "high" : str(upperBound_freq)
    }

    # store to database
    # tf_storage(username='admin',
    #                      data1 = buffer_string,
    #                      operation = "1",
    #                      timestamp = str(time.time()),
    #                      filename = filename,
    #                      params = "").save()

    return response

'''
class speed_adjust_storage(db.Document):
    username = db.StringField()
    data1 = db.StringField()
    operation = db.StringField()
    timestamp = db.StringField()
    filename = db.StringField()
    params = db.StringField()
'''

@api.route('/api/speed-adjustment', methods=['POST'])
def speed_adjustment():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    print(audio)
    audio = audio.read()
    while (len(audio)%16 != 0):
        audio += b'\x00'
    audio = np.fromstring(audio, np.int16)
    audio = audio.astype(np.float32)

    forms = request.form
    forms_dict = forms.to_dict()
    speed = float(forms_dict.get('speed'))
    timeDuration = float(forms_dict.get('timeDuration'))
    filename = forms_dict.get('fileName')

    fs = int(audio.shape[0]/timeDuration)

    data = audio_preprocess(audio)
    new_data = librosa.effects.time_stretch(data, speed)

    new_data = new_data.astype(np.int16) # type cast back to int16
    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767) #32767

    # for write .wav:
    write('processed.wav', fs, scaled_audio)
    with open("processed.wav","rb") as binary_file:
        data = binary_file.read()
        audio_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": audio_file}
    res = api.response_class(response=json.dumps(data1), status=200, mimetype='application/json')

    # store to database
    # speed_adjust_storage(username='admin',
    #                      data1 = audio_file,
    #                      operation = "2",
    #                      timestamp = str(time.time()),
    #                      filename = filename,
    #                      params = str(speed)).save()

    return res

'''
class filter_storage(db.Document):
    username = db.StringField()
    data1 = db.StringField()
    operation = db.StringField()
    timestamp = db.StringField()
    filename = db.StringField()
    params = db.StringField()
'''

@api.route('/api/reduction-enhancement', methods=['POST'])
def reduction_enhancement():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = np.fromstring(audio.read(), np.int16)

    forms = request.form
    form_dict = forms.to_dict()
    mode = form_dict.get('mode')
    intervalSize = int(form_dict.get('intervalSize')) # this is L (filter length)
    decaySpeed = float(form_dict.get('decaySpeed')) # this is sigma
    timeDuration = float(form_dict.get('timeDuration'))
    filename = form_dict.get('fileName')

    fs = int(audio.shape[0]/timeDuration)

    if (mode == "reduction"):
        new_data = noise_reduction(audio, intervalSize, decaySpeed)
    elif (mode == "enhancement"):
        new_data = sound_enhancement(audio, intervalSize, decaySpeed)

    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767)
    write('temp.wav', fs, scaled_audio)

    with open("temp.wav","rb") as binary_file:
        data = binary_file.read()
        wav_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": wav_file}
    res = api.response_class(response=json.dumps(data1), status=200, mimetype='application/json')

    # store to database
    # filter_storage(username='admin',
                         # data1 = wav_file,
                         # operation = "3",
                         # timestamp = str(time.time()),
                         # filename = filename,
                         # params = mode).save()

    return res