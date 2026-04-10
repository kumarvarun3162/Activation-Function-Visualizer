const FUNCS = [
  { value: "relu",    label: "ReLU",    formula: "max(0, x)" },
  { value: "sigmoid", label: "Sigmoid", formula: "1 / (1 + e⁻ˣ)" },
  { value: "tanh",    label: "Tanh",    formula: "tanh(x)" },
  { value: "linear",  label: "Linear",  formula: "f(x) = x" },
  { value: "binary",  label: "Binary",  formula: "x ≥ 0 → 1" },
];

export default function ActivationSelector({ activation, setActivation }) {
  return (
    <div className="card p-4 fade-up d1">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span className="blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-red)" }} />
        <span className="section-label">Activation Function</span>
      </div>

      {/* On mobile: horizontal scrollable pills. On sm+: stacked rows */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
        {FUNCS.map(({ value, label, formula }) => {
          const active = activation === value;
          return (
            <button
              key={value}
              onClick={() => setActivation(value)}
              className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left w-full transition-all duration-200 card-hover"
              style={{
                background: active ? "rgba(232,49,42,0.08)" : "transparent",
                border: `1px solid ${active ? "var(--color-red-border)" : "var(--color-border)"}`,
                minWidth: "130px",
              }}
            >
              {/* Dot indicator */}
              <span
                className="flex-shrink-0 rounded-full transition-all duration-200"
                style={{
                  width: active ? "6px" : "4px",
                  height: active ? "6px" : "4px",
                  background: active ? "var(--color-red)" : "var(--color-text-faint)",
                  boxShadow: active ? "0 0 6px rgba(232,49,42,0.5)" : "none",
                }}
              />
              <span className="flex-1 min-w-0">
                <span
                  className="block text-sm font-medium"
                  style={{ color: active ? "var(--color-red-light)" : "var(--color-text)" }}
                >
                  {label}
                </span>
                <span
                  className="block text-xs mt-0.5 truncate"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-dim)", fontSize: "10px" }}
                >
                  {formula}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}