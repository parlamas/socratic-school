//src/app/math/ld/page.tsx

"use client";

import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import { calculateLDSteps } from "./ld-utils";
import StudentLDVisualization from "./StudentLDVisualization";

export default function Page() {
  // keep inputs as strings so empty stays empty (no forced 0)
  const [dividendInput, setDividendInput] = useState("");
const [divisorInput, setDivisorInput] = useState("");
  const dividend = Number(dividendInput);
  const divisor = Number(divisorInput);

  const isValid =
    Number.isFinite(dividend) &&
    Number.isFinite(divisor) &&
    dividendInput.trim() !== "" &&
    divisorInput.trim() !== "" &&
    divisor !== 0;

  const steps = useMemo(() => {
    if (!isValid) return [];
    return calculateLDSteps(dividend, divisor);
  }, [isValid, dividend, divisor]);

  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);


  //autoplay
  useEffect(() => {
  if (!running) return;
  if (steps.length === 0) return;

  if (index >= steps.length - 1) {
  setIndex(steps.length - 1); // clamp to final step
  setRunning(false);          // stop autoplay
  return;
}


  const speedMs = 900;

  const t = window.setTimeout(() => {
    setIndex((i) => (i < steps.length - 1 ? i + 1 : i));
  }, speedMs);

  return () => window.clearTimeout(t);
}, [running, steps.length, index]);


  return (
  <div style={{ padding: 32, position: "relative" }}>

      {/* two simple inputs, no arrows (text + numeric keyboard) */}
      <div style={{ marginBottom: 24, display: "flex", gap: 24 }}>
        {/* Mobile burger menu */}

        <label>
  Dividend/Διαιρετέος&nbsp;
  <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    value={dividendInput}
    onChange={(e) => setDividendInput(e.target.value)}
    style={{
      width: "6ch",
      border: "1px solid #888",
      padding: "4px",
    }}
  />
</label>

<label>
  Divisor/Διαιρέτης&nbsp;
  <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    value={divisorInput}
    onChange={(e) => setDivisorInput(e.target.value)}
    style={{
      width: "6ch",
      border: "1px solid #888",
      padding: "4px",
    }}
  />
</label>

      </div>

      {!isValid ? (
  <div style={{ opacity: 0.7 }}>
    Enter a dividend/διαιρετέο and a non-zero divisor/διαιρέτη.
  </div>
) : (
  <>
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
  <button
    onClick={() => {
      setIndex(0);
      setRunning(true);
    }}
    disabled={running}
    style={{
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid #888",
      background: running ? "#eee" : "#fafafa",
      cursor: running ? "default" : "pointer",
      fontSize: 15,
      transition: "background 0.2s, box-shadow 0.2s",
      boxShadow: running
        ? "none"
        : "0 1px 3px rgba(0,0,0,0.15)",
    }}
  >
    {running ? "Running…" : "▶ Start"}
  </button>

  <button
    onClick={() => {
  setRunning(false);
  setIndex(0);
  setResetKey(k => k + 1);
}}

    style={{
      padding: "8px 18px",
      borderRadius: 20,
      border: "1px solid #888",
      background: "#fafafa",
      cursor: "pointer",
      fontSize: 15,
      transition: "background 0.2s, box-shadow 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }}
  >
    ↺ Reset
  </button>
</div>

<StudentLDVisualization
  key={resetKey}
  step={steps[Math.min(index, steps.length - 1)]}
  showHand={running}
  speed={900}
/>

  </>
)}

    </div>
  );
}
