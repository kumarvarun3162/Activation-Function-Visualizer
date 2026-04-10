import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def tanh(x):
    # BUG FIX: use np.tanh instead of manual formula to avoid
    # overflow/underflow on large x values
    return np.tanh(x)

def softmax(x):
    exp_x = np.exp(x - np.max(x))   # stability fix: subtract max
    return exp_x / np.sum(exp_x)

def relu(x):
    return np.maximum(0, x)

def binary(x):
    return np.where(x >= 0, 1, 0)

def linear(x):
    return x