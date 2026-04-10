# Activation Function Visualizer

An interactive tool to explore how neural network activation functions transform data. Configure a synthetic dataset, choose an activation function, and instantly see the output in both 2D and 3D.

Built with **FastAPI** (backend) + **React + Plotly** (frontend).

---

## What It Does

A single artificial neuron computes a weighted sum of input features plus a bias term — **z = W·X + b** — and then passes the result through an activation function **a(z)**. This tool lets you watch that transformation happen live on real data.

- Generate a synthetic classification dataset (control samples, features, clusters)
- Select any of 5 activation functions
- Visualize the raw activations as a 2D scatter plot (color-mapped) and a 3D surface
- See the function's curve in the sidebar, with smooth transitions as you switch

---

## Activation Functions

| Function | Formula | Key Property |
|----------|---------|--------------|
| **ReLU** | `max(0, x)` | Sparse; kills negative activations. Most common in deep nets. |
| **Sigmoid** | `1 / (1 + e⁻ˣ)` | Squashes output to (0, 1). Used for binary classification outputs. |
| **Tanh** | `(eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)` | Zero-centered, range (−1, 1). Stronger gradients than sigmoid. |
| **Linear** | `f(x) = x` | No non-linearity. Collapses deep networks to a single linear layer. |
| **Binary Step** | `x ≥ 0 → 1, else 0` | Hard threshold. Non-differentiable; used in perceptrons. |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend API | [FastAPI](https://fastapi.tiangolo.com/) |
| Dataset generation | [scikit-learn](https://scikit-learn.org/) `make_classification` |
| Numerical computation | [NumPy](https://numpy.org/) |
| Frontend framework | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| Plotting | [Plotly.js](https://plotly.com/javascript/) via `react-plotly.js` |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| HTTP client | [Axios](https://axios-http.com/) |

---

## Project Structure

```
Activation-Function-Visualizer/
├── backend/
│   ├── main.py                 # FastAPI app, /visualize endpoint
│   ├── activation_functions.py # ReLU, sigmoid, tanh, linear, binary
│   ├── activation_engine.py    # Dispatches to the right function
│   ├── dataset_generator.py    # Wraps sklearn make_classification
│   ├── neuron.py               # Computes z = W·X + b
│   └── visualization.py        # Formats JSON response for frontend
│
└── frontend/
    ├── vite.config.js
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── components/
    │       ├── ActivationCurve.jsx    # Curve preview (computed client-side)
    │       ├── ActivationSelector.jsx # Function picker
    │       ├── DatasetControls.jsx    # Dataset parameter form
    │       ├── ScatterPlot.jsx        # 2D Plotly scatter
    │       └── Surface3D.jsx          # 3D Plotly scatter
    └── services/
        └── api.js              # Axios client
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+

---

### 1 — Backend

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn scikit-learn numpy

# Start the server
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.  
Interactive docs at `http://127.0.0.1:8000/docs`.

---

### 2 — Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

> Make sure the backend is running before clicking **Generate Dataset**.




---

## API Reference

### `POST /visualize`

Generates a dataset, passes it through the neuron and activation function, and returns scatter data.

**Request body**

```json
{
  "n_samples":   300,
  "n_features":  2,
  "n_redundant": 0,
  "clusters":    1,
  "activation":  "relu"
}
```

**Response**

```json
{
  "x1":         [1.2, -0.4, ...],
  "x2":         [0.3,  1.1, ...],
  "class":      [0, 1, 0, ...],
  "activation": [0.9, 0.0, ...]
}
```

`activation` values are the post-activation outputs `a(z)` used to color the scatter plots.

---

## Dataset Parameters

| Parameter | Description | Range |
|-----------|-------------|-------|
| `n_samples` | Number of data points | 50 – 2000 |
| `n_features` | Total input features | 2 – 20 |
| `n_redundant` | Linearly redundant features | 0 – 10 |
| `clusters` | Clusters per class | 1 – 5 |

> The first two features (`x1`, `x2`) are always used for the scatter axes regardless of total feature count.

---

## License

MIT