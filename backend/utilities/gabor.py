# Gabor Transform
import numpy as np
import math
import matplotlib.pyplot as plt
import cmath
import time
import pyfftw
import multiprocess


def Gabor(x, tau, t, f, sgm):
	start_time = time.time()

	dt = t[1]-t[0]
	dtau = tau[1] - tau[0]

	df = f[1] - f[0]
	S = round(dt/dtau)
	c0 = int(t[0])
	m0 = int(f[0])
	n0 = int(tau[0])

	C = int(t[-1]/dt -c0+1)
	F = int(f[-1]/df -m0+1)
	T = int(tau[-1]/dtau - n0 + 1)
	X = np.zeros((F,C), dtype=complex)

	N = int(1/(df*dtau))
	B = 1.9143/(sgm**0.5)
	Q = int(B/dtau)	
	
	# planning for FFTW:
	x1 = pyfftw.empty_aligned(N+1, dtype=np.complex128) # initiate input array 
	X1 = pyfftw.empty_aligned(N+1, dtype=np.complex128) # initiate output
	# Configure PyFFTW to use all cores (the default is single-threaded)
	fftw_object = pyfftw.FFTW(x1, X1, direction="FFTW_FORWARD", flags=("FFTW_ESTIMATE",), threads=multiprocess.cpu_count()) 
	# Turn on the cache for optimum performance
	pyfftw.interfaces.cache.enable()

	for n in range(c0,c0+C-1):
		# zeroed both the input and output of FFT at the start of each loop
		temp = np.zeros(N+1)
		x1[:] = temp + 0j
		X1[:] = temp + 0j

		# now assigning values to input
		for q in range(0,int(2*Q)):
			if (n*S-Q+q >= 0) and (n*S-Q+q <= len(tau)-1):
				x1[q] = math.exp(-sgm* math.pi* ((Q-q)* dtau)**2)* x[int(n*S-Q+q)]

		fftw_object() # perform FFT

		for m in f:
			# print(int(m%N))
			# print(m)
			# print(m0)
			# print(n)
			X[m-m0,n] = X1[int(m%N)]* cmath.exp(0 + 2j* math.pi* (Q-n*S) * m/N)* dt

	X = sgm**(1/4) * X
	print(f"total execute time: {round(time.time()-start_time,2)}")

	return X, F, C

def Gabor_preprocess(data, fs, lowerBound_freq, upperBound_freq, sgm):
	if (len(data.shape) != 1):
		data = data[:,0]


	dtau = 1/fs	
	tau = np.empty([round(len(data)/fs/dtau)], dtype=float)
	for i in range(round(len(data)/fs/dtau)):
		tau[i] = i * dtau

	dt = 0.02
	df = 1

	total_seconds = round(len(tau)/fs,1)

	t = np.arange(0, round(max(tau)/dt), dtype=float)
	t *= dt
	f = np.arange(lowerBound_freq, upperBound_freq, df, dtype=int)
	sgm = 200

	return data, tau, t, f

def Gabor_postprocess(y, horizontal_scale_forPlot, t, f, lowerBound_freq, upperBound_freq):
	y1 = np.zeros((len(f),len(t)*horizontal_scale_forPlot), dtype=complex)
	for n in range(0,len(t)):
	    for k in range(n*horizontal_scale_forPlot, (n+1)*horizontal_scale_forPlot-1):
	        y1[:,k] = y[:,n]

	fig = plt.figure()
	figure_width = round(len(t)/20, 2)
	figure_height = 7
	fig.set_size_inches(figure_width, figure_height)

	# setting up x-axes
	interval = 0.5
	total_xticks = int(max(t)/interval)
	truncated_len = int((max(t)%interval)/max(t) * y1.shape[1])
	xticks_indice = np.arange(0, y1.shape[1] - truncated_len , int((y1.shape[1]- truncated_len)/total_xticks))
	plt.xticks(xticks_indice, np.arange(0, (total_xticks+1)*interval, interval))

	# setting up y-axes
	plt.ylim(lowerBound_freq, upperBound_freq+1)
	interval = 500
	total_yticks = int(max(f)/interval)
	truncated_len = int((max(f)%interval)/max(f) * y1.shape[0])
	yticks_indice = np.arange(lowerBound_freq, upperBound_freq+1, interval, dtype=int)
	if upperBound_freq - yticks_indice[-1] > 100:
		yticks_indice = np.append( yticks_indice, [int(upperBound_freq)])
	print(yticks_indice-lowerBound_freq)
	print(yticks_indice)
	plt.yticks(yticks_indice-lowerBound_freq, yticks_indice)

	normalize = 0.7*np.max(np.abs(y))
	plt.imshow(np.abs(y1)/normalize, cmap='gray', origin='lower', aspect='auto')	
	
	plt.savefig('temp.jpg', bbox_inches='tight', dpi=100)
	fig.clf()
	del fig


if __name__ == '__main__':
	from scipy.io import wavfile

	fs, data = wavfile.read('Chord.wav')
	print('read data...')

	fs, lowerBound_freq, upperBound_freq, sgm = 44100, 0, 2000, 200
	[data, tau, t, f] = Gabor_preprocess(data, fs, lowerBound_freq, upperBound_freq, sgm)
	print('preprocessing..')

	print('doing gabor transform...')
	y, row, col = Gabor(data, tau, t, f, sgm)

	horizontal_scale_forPlot = 8
	Gabor_postprocess(y, horizontal_scale_forPlot, t, f, lowerBound_freq, upperBound_freq)
	# y1 = np.zeros((len(f),len(t)*horizontal_scale_forPlot), dtype=complex)

	# for n in range(0,len(t)):
	#     for k in range(n*horizontal_scale_forPlot, (n+1)*horizontal_scale_forPlot-1):
	#         y1[:,k] = y[:,n]

	# normalize = np.max(np.abs(y))
	# plt.imshow(np.abs(y1)/normalize, cmap='gray', origin='lower')
	# plt.xlabel('Time (sec)')
	# plt.ylabel('Frequency (Hz)')
	# plt.show()