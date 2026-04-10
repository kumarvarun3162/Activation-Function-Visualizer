import Plot from "react-plotly.js";
import { useMemo, useState, useEffect } from "react";

const FNS = {
  relu:    x => Math.max(0, x),
  sigmoid: x => 1 / (1 + Math.exp(-x)),
  tanh:    Math.tanh,
  linear:  x => x,
  binary:  x => x >= 0 ? 1 : 0,
};

const AXIS_STYLE = {
  color: "#263547",
  gridcolor: "#0f1c2d",
  zerolinecolor: "#162030",
  tickfont: { family: "JetBrains Mono", size: 9, color: "#4d6478" },
  showgrid: true,
};

export default function ActivationCurve({ activation }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(0);
    const t = setTimeout(() => setOpacity(1), 130);
    return () => clearTimeout(t);
  }, [activation]);

  const { xs, ys } = useMemo(() => {
    const fn = FNS[activation] ?? FNS.relu;
    const xs = Array.from({ length: 300 }, (_, i) => -6 + i * (12 / 299));
    return { xs, ys: xs.map(fn) };
  }, [activation]);

  return (
    <div
      className="card p-4 fade-up d2"
      style={{ transition: "opacity 0.13s ease", opacity }}
    >
      <div className="flex items-center justify-between mb-1 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span className="section-label">Curve Preview</span>
        <span
          style={{
            fontFamily: "var(--font-mono)", fontSize: "10px",
            color: "var(--color-red)", letterSpacing: "0.1em",
          }}
        >
          {activation.toUpperCase()}
        </span>
      </div>

      <Plot
        data={[{
          x: xs, y: ys,
          type: "scatter", mode: "lines",
          line: {
            color: "#e8312a", width: 2,
            shape: activation === "binary" ? "hv" : "spline",
          },
        }]}
        layout={{
          paper_bgcolor: "transparent",
          plot_bgcolor:  "transparent",
          margin: { t: 8, b: 28, l: 32, r: 8 },
          xaxis: { ...AXIS_STYLE, title: { text: "z", font: { size: 9, color: "#4d6478" } }, zeroline: true, zerolinewidth: 1 },
          yaxis: { ...AXIS_STYLE, zeroline: true, zerolinewidth: 1 },
          font: { family: "JetBrains Mono" },
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: "100%", height: "160px" }}
      />
    </div>
  );
}