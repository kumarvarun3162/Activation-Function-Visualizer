import { useState } from "react";

import DatasetControls    from "./components/DatasetControls";
import ActivationSelector from "./components/ActivationSelector";
import ActivationCurve    from "./components/ActivationCurve";
import ScatterPlot        from "./components/ScatterPlot";
import Surface3D          from "./components/Surface3D";
import { generateVisualization } from "./services/api";

// ── Tiny helpers ────────────────────────────────────────────────────────────
const fmt = (n, d = 3) => Number(n).toFixed(d);
const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

function StatCard({ label, value, delay = "" }) {
  return (
    <div className={`card px-4 py-3 fade-up ${delay}`}>
      <p className="section-label mb-1">{label}</p>
      <p
        className="text-lg font-semibold tabular-nums"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-red-light)" }}
      >
        {value}
      </p>
    </div>
  );
}

function PlotCard({ title, subtitle, children, delay = "" }) {
  return (
    <div className={`card fade-up ${delay}`}>
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{title}</p>
        {subtitle && <span className="section-label">{subtitle}</span>}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

// ── ChevronIcon ──────────────────────────────────────────────────────────────
function Chevron({ open }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [data,         setData]         = useState(null);
  const [activation,   setActivation]   = useState("relu");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [dataKey,      setDataKey]      = useState(0);
  const [ctrlsOpen,    setCtrlsOpen]    = useState(false); // mobile collapse

  const handleGenerate = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await generateVisualization({ ...params, activation });
      setData(res);
      setDataKey(k => k + 1);
      setCtrlsOpen(false); // collapse panel on mobile after generate
    } catch (e) {
      setError(e?.response?.data?.detail ?? "Cannot reach backend — is FastAPI running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  const stats = data
    ? [
        { label: "Samples",    value: data.x1.length.toLocaleString() },
        { label: "Act. Min",   value: fmt(Math.min(...data.activation)) },
        { label: "Act. Max",   value: fmt(Math.max(...data.activation)) },
        { label: "Act. Mean",  value: fmt(mean(data.activation)) },
      ]
    : [];

  // ── Sidebar content (shared between mobile & desktop) ────────────────────
  const Sidebar = () => (
    <div className="space-y-3">
      <DatasetControls  onGenerate={handleGenerate} loading={loading} />
      <ActivationSelector activation={activation} setActivation={setActivation} />
      <ActivationCurve   activation={activation} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 px-4 md:px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(8,14,24,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--color-red-dim)", border: "1px solid var(--color-red-border)" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="2.5" fill="var(--color-red)" />
              <circle cx="6.5" cy="6.5" r="5.5" stroke="var(--color-red)" strokeWidth="0.7" strokeOpacity="0.35" />
            </svg>
          </div>
          <div>
            <p className="section-label leading-none mb-0.5">Neural Network Toolkit</p>
            <h1
              className="text-sm font-semibold leading-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Activation Function{" "}
              <span style={{ color: "var(--color-red)" }}>Visualizer</span>
            </h1>
          </div>
        </div>

        {/* Right: active fn badge + mobile toggle */}
        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-block px-2.5 py-1 rounded-md text-xs"
            style={{
              background: "var(--color-red-dim)",
              border: "1px solid var(--color-red-border)",
              color: "var(--color-red-light)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            {activation.toUpperCase()}
          </span>

          {/* Mobile-only: toggle controls */}
          <button
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-dim)",
            }}
            onClick={() => setCtrlsOpen(o => !o)}
          >
            Controls
            <Chevron open={ctrlsOpen} />
          </button>
        </div>
      </header>

      {/* ── Mobile: collapsible controls panel ───────────────────────────── */}
      {ctrlsOpen && (
        <div
          className="lg:hidden px-4 py-4 fade-in space-y-3"
          style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)" }}
        >
          <Sidebar />
        </div>
      )}

      {/* ── Page body ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 md:p-5">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block flex-shrink-0 space-y-3" style={{ width: "272px" }}>
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-4">

          {/* Error banner */}
          {error && (
            <div
              className="rounded-xl px-4 py-3 flex items-start gap-3 fade-in"
              style={{
                background: "rgba(232,49,42,0.06)",
                border: "1px solid var(--color-red-border)",
              }}
            >
              <span style={{ color: "var(--color-red)", fontSize: "16px", lineHeight: 1.5 }}>⚠</span>
              <p style={{ color: "rgba(240,85,79,0.9)", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: 1.7 }}>
                {error}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!data && !loading && !error && (
            <div
              className="rounded-xl flex flex-col items-center justify-center text-center gap-3 fade-in py-16 px-6"
              style={{ border: "1px dashed var(--color-border)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="var(--color-text-faint)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="10" r="3" stroke="var(--color-text-faint)" strokeWidth="1.2"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                  No data yet
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-dim)" }}>
                  Configure the dataset and click{" "}
                  <span style={{ color: "var(--color-red)" }}>Generate Dataset</span>
                </p>
              </div>

              {/* Mobile shortcut */}
              <button
                className="lg:hidden mt-1 px-4 py-2 rounded-lg text-sm"
                style={{
                  background: "var(--color-red)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setCtrlsOpen(true)}
              >
                Open Controls
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div
              className="rounded-xl flex flex-col items-center justify-center gap-3 py-16"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <span
                className="spin inline-block rounded-full"
                style={{
                  width: "36px", height: "36px",
                  border: "2px solid var(--color-border)",
                  borderTopColor: "var(--color-red)",
                }}
              />
              <p style={{ color: "var(--color-text-dim)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.1em" }}>
                Computing activations…
              </p>
            </div>
          )}

          {/* Results */}
          {data && !loading && (
            <div className="space-y-4" key={dataKey}>

              {/* Stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <StatCard key={s.label} {...s} delay={`d${i + 1}`} />
                ))}
              </div>

              {/* Scatter */}
              <PlotCard
                title="2D Feature Scatter"
                subtitle={`color = a(z) · ${activation}`}
                delay="d2"
              >
                <ScatterPlot data={data} />
              </PlotCard>

              {/* 3D */}
              <PlotCard
                title="3D Activation Surface"
                subtitle="scatter3d"
                delay="d3"
              >
                <Surface3D data={data} />
              </PlotCard>
            </div>
          )}
        </main>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-2.5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span className="section-label">FastAPI + React + Plotly</span>
        <span className="section-label">
          {data ? `${data.x1.length.toLocaleString()} points` : "—"}
        </span>
      </footer>
    </div>
  );
}