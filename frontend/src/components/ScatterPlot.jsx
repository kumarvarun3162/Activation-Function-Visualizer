import Plot from "react-plotly.js";

const AXIS = {
  color: "#263547",
  gridcolor: "#0f1c2d",
  zerolinecolor: "#162030",
  tickfont: { family: "JetBrains Mono", size: 10, color: "#4d6478" },
  linecolor: "#162030",
};

const CS = [
  [0,    "#0c1520"],
  [0.35, "#3d0c09"],
  [0.7,  "#a32218"],
  [1,    "#f0554f"],
];

export default function ScatterPlot({ data }) {
  if (!data) return null;
  return (
    <Plot
      data={[{
        x: data.x1, y: data.x2,
        mode: "markers", type: "scatter",
        marker: {
          color: data.activation, colorscale: CS,
          size: 5, opacity: 0.82,
          colorbar: {
            thickness: 8, outlinewidth: 0, len: 0.9,
            tickfont: { family: "JetBrains Mono", size: 9, color: "#4d6478" },
            title: { text: "a(z)", font: { size: 9, color: "#4d6478", family: "JetBrains Mono" } },
          },
        },
      }]}
      layout={{
        paper_bgcolor: "transparent", plot_bgcolor: "transparent",
        margin: { t: 8, b: 40, l: 40, r: 52 },
        xaxis: { ...AXIS, title: { text: "x₁", font: { size: 10, color: "#4d6478", family: "JetBrains Mono" } } },
        yaxis: { ...AXIS, title: { text: "x₂", font: { size: 10, color: "#4d6478", family: "JetBrains Mono" } } },
        font: { family: "JetBrains Mono" },
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%", height: "320px" }}
    />
  );
}