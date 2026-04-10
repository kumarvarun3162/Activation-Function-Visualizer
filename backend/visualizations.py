def scatter_data(X, y, activated):
    return {
        "x1": X[:, 0].tolist(),
        "x2": X[:, 1].tolist(),
        "class": y.tolist(),
        "activation": activated.tolist(),
    }