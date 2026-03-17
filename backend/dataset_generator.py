from sklearn.datasets import make_classification

def generate_dataset(params):

    X,y = make_classification(n_samples=params['n_samples'],
                              n_features=params['n_features'],
                              n_redundant=params['n_redundant'],
                              n_clusters_per_class=params['clusters'],
                              random_state=42
    )

    return X,y

