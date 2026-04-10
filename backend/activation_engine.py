from activation_functions import sigmoid, relu, tanh, linear, binary

activation_map = {
    "sigmoid": sigmoid,
    "relu": relu,
    "tanh": tanh,
    "linear": linear,
    "binary": binary,
}

def apply_activation(z, name):
    # BUG FIX: raise a clear error instead of a cryptic KeyError
    if name not in activation_map:
        raise ValueError(f"Unknown activation '{name}'. Choose from: {list(activation_map.keys())}")

    func = activation_map[name]
    activated = func(z)
    return activated