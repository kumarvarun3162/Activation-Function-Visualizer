import numpy as np

def neuron_output(X, seed: int = 42):
    # BUG FIX: without a seed, weights change on every call → the scatter
    # plot colors shift even if the dataset hasn't changed, making the UI
    # feel broken. Use seed=None to opt into random behaviour.
    rng = np.random.default_rng(seed)
    weights = rng.standard_normal(X.shape[1])
    bias = float(rng.standard_normal())
    z = np.dot(X, weights) + bias
    return z