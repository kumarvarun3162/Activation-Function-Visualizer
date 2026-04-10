import Plot from "react-plotly.js";

const CS = [
  [0,    "#0c1520"],
  [0.35, "#3d0c09"],
  [0.7,  "#a32218"],
  [1,    "#f0554f"],
];

const SCENE_AX = {
  color: "#263547",
  gridcolor: "#0f1c2d",
  showbackground: false,
  tickfont: { family: "JetBrains Mono", size: 9, color: "#4d6478" },
  titlefont: { family: "JetBrains Mono", size: 10, color: "#4d6478" },
};

export default function Surface3D({ data }) {
  if (!data) return null;
  return (
    <Plot
      data={[{
        x: data.x1, y: data.x2, z: data.activation,
        mode: "markers", type: "scatter3d",
        marker: {
          size: 2.5, color: data.activation,
          colorscale: CS, opacity: 0.88,
          colorbar: {
            thickness: 8, outlinewidth: 0,
            tickfont: { family: "JetBrains Mono", size: 9, color: "#4d6478" },
          },
        },
      }]}
      layout={{
        paper_bgcolor: "transparent",
        margin: { t: 0, b: 0, l: 0, r: 0 },
        scene: {
          bgcolor: "transparent",
          xaxis: { ...SCENE_AX, title: "x₁" },
          yaxis: { ...SCENE_AX, title: "x₂" },
          zaxis: { ...SCENE_AX, title: "a(z)" },
          camera: { eye: { x: 1.35, y: 1.35, z: 0.85 } },
        },
        font: { family: "JetBrains Mono" },
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%", height: "360px" }}
    />
  );
}