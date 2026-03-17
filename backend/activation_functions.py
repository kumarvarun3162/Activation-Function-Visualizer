import numpy as np

def sigmoid(x):
    return (1/(1+np.exp(-x)))

def tanh(x):
    return ((np.exp(x) - np.exp(-x))/(np.exp(x)+np.exp(-x)))

def softmax(x):
    exp_x = np.exp(x)
    return (exp_x/np.sum(exp_x))

def relu(x):
    return np.maximum(0,x)

def binary(x):
    return np.where(x >= 0, 1,0)

def linear(x):
    return x


