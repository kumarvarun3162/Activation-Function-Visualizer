import numpy as np

def neuron_output(X):

    weights = np.random.randn(X.shape[1])
    bias = np.random.randn()

    z = np.dot(X, weights) + bias

    return z