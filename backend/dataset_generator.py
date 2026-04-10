from sklearn.datasets import make_classification

def generate_dataset(params):
    n_features = params['n_features']
    n_redundant = params['n_redundant']

    # BUG FIX: sklearn requires n_informative >= 1 and
    # n_informative + n_redundant <= n_features.
    # Without explicit n_informative, it defaults to 2 and crashes
    # when n_features < 2 + n_redundant.
    n_informative = max(1, n_features - n_redundant)

    X, y = make_classification(
        n_samples=params['n_samples'],
        n_features=n_features,
        n_informative=n_informative,
        n_redundant=n_redundant,
        n_clusters_per_class=params['clusters'],
        random_state=42
    )

    return X, y