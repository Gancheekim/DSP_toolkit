from scipy.io import wavfile
import numpy as np
import math
from playsound import playsound
from scipy.io.wavfile import read, write
import librosa

# def updown_sampling(data, speed):
# 	rate = 1/speed # > 1 is slow down, < 1 is fasten
# 	print(speed)

# 	if rate > 1: # upsampling
# 		new_data = np.zeros((round(rate*len(data))))
# 		for i in range(0, len(data)):
# 			new_data[round(rate*i) : round(rate*i + (rate-1))] = rate*data[i] 
# 		return new_data

# 	elif rate < 1: # downsampling
# 		decrease_speed = 5
# 		new_data = np.zeros((round(decrease_speed*len(data))))
# 		for i in range(0, len(data)):
# 			new_data[round(decrease_speed*i) : round(decrease_speed*i + (decrease_speed-1))] = data[i] * decrease_speed

# 		increase_speed = int(speed*5)
# 		new_data1 = np.zeros((round(len(new_data)/increase_speed)))
# 		for i in range(0, len(new_data1)):
# 			new_data1[i] = new_data[increase_speed*i] * increase_speed
# 		return new_data1
# 	elif rate == 1:
# 		return data

def updown_sampling_preprocess(data):
	if (len(data.shape) != 1):
		data = data[:,0]
	return data

if __name__ == '__main__':
	fs, data1 = wavfile.read('../../Chord.wav')
	# data1 = read('../../Chord.wav')
	data = data1.astype(np.float)
	fs = 44100
	data = updown_sampling_preprocess(data)

	speed = 0.6
	# new_data = updown_sampling(data, speed)
	new_data = librosa.effects.time_stretch(data, speed)

	scaled = np.int16(new_data/np.max(np.abs(new_data)) * 32767) #
	print(data.shape)
	print(scaled.shape)
	write('haha.wav', fs, scaled)
	print('write ok!')
