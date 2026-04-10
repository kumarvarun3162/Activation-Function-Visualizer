import { useState } from "react";

const FIELDS = [
  { key: "n_samples",  label: "Samples",        min: 50,  max: 2000, init: 300 },
  { key: "n_features", label: "Features",        min: 2,   max: 20,   init: 2   },
  { key: "n_redundant",label: "Redundant",       min: 0,   max: 10,   init: 0   },
  { key: "clusters",   label: "Clusters / Class",min: 1,   max: 5,    init: 1   },
];

export default function DatasetControls({ onGenerate, loading }) {
  const [vals, setVals] = useState(() =>
    Object.fromEntries(FIELDS.map(f => [f.key, f.init]))
  );

  const set = (key, val) => setVals(v => ({ ...v, [key]: val }));

  return (
    <div className="card p-4 space-y-4 fade-up">

      {/* Header */}
      <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span className="blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-red)" }} />
        <span className="section-label">Dataset</span>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
        {FIELDS.map(({ key, label, min, max }, i) => (
          <div key={key} className={`fade-up d${i + 1}`}>
            <div className="flex justify-between mb-1.5">
              <label className="section-label">{label}</label>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-red)" }}>
                {vals[key]}
              </span>
            </div>
            <input
              type="number"
              className="field-input"
              value={vals[key]}
              min={min}
              max={max}
              onChange={e => set(key, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => onGenerate(vals)}
        disabled={loading}
        className="fade-up d5 w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-red)",
          color: "#fff",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "var(--color-red-light)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--color-red)"; }}
      >
        {loading
          ? <span className="flex items-center justify-center gap-2">
              <span className="spin inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white" />
              Computing…
            </span>
          : "Generate Dataset"}
      </button>
    </div>
  );
}