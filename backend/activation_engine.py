from activation_functions import *

activation_map = {
    "sigmoid": sigmoid,
    "relu": relu,
    "tanh": tanh,
    "linear": linear,
    "binary": binary
}

def apply_activation(z, name):

    func = activation_map[name]

    activated = func(z)

    return activated