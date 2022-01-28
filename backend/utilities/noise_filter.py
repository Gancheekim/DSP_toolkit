from scipy.io import wavfile
import numpy as np
import math
# from playsound import playsound
from scipy.io.wavfile import write
import matplotlib.pyplot as plt

def noise_reduction(data, L, sigma):
	temp = np.arange(-L,L+1)
	for n in range(2*L + 1):
		temp[n] = math.exp(-sigma*abs(temp[n]))
	C = 1/(1/np.sum(temp))

	h = np.zeros(2*L + 1)
	for n in range(-L,L+1):
		h[n+L] = C*math.exp(-sigma*abs(n))

	new_data = np.convolve(data, h, 'same')
	return new_data

def sound_enhancement(data, L, sigma):
	temp = np.arange(-L,L+1)
	for n in range(2*L + 1):
		temp[n] = math.exp(-sigma*abs(temp[n]))
	C = 1/(1/np.sum(temp))

	h = np.zeros(2*L + 1)
	sgn = np.ones(2*L + 1)
	sgn[0:L-1] *= -1
	sgn[L] = 0

	for n in range(-L,L+1):
		h[n+L] = C * math.exp(-sigma*abs(n)) * sgn[n+L]

	new_data = np.convolve(data, h, 'same')
	return new_data


if __name__ == '__main__':
	fs, data = wavfile.read('../../sample.wav')
	print(data.shape)

	if (len(data.shape) != 1):
		data = data[:,0]
	print(data.shape)

	L, sigma = 15, 2.1
	# new_data = noise_reduction(data, L, sigma);
	new_data = sound_enhancement(data, L, sigma);

	scaled = np.int16(new_data/np.max(np.abs(new_data)) * 32767)
	write('test3.wav', fs, scaled)
