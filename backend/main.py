from fastapi import FastAPI
from dataset_generator import generate_dataset
from neuron import neuron_output
from activation_engine import apply_activation
from visualizations import scatter_data
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/visualize")

def visualize(params: dict):

    X, y = generate_dataset(params)

    z = neuron_output(X)

    activated = apply_activation(z, params["activation"])

    graph_data = scatter_data(X, y, activated)

    return graph_data