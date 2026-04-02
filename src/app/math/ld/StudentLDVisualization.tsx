// src/app/math/ld/StudentLDVisualization.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { LDStep, WorkLine } from "./types";

interface Props {
  step: LDStep | null;
  showHand: boolean;
  speed: number;
}

function render(lines: WorkLine[], side: "left" | "right") {
  return lines.map((l, i) =>
    l.kind === "rule" ? (
      <div key={i} className="left-rule" />
    ) : (
      <div
  key={i}
  className={`${side}-line ${
  l.tone === "decimal" ? "decimal-step" : l.tone ?? ""
} ${side === "left" && l.text.startsWith("bring down/κατεβάζουμε") ? "bring-down" : ""}`}

>
        {l.text.split(/(\[\[\d+\]\]|\{\{\d+\}\})/).map((chunk, j) => {
          const m = chunk.match(/^\[\[(\d+)\]\]$/);
if (m) {
  return (
    <span key={j} className="ld-number quotient-digit">
      {m[1]}
    </span>
  );
}

const md = chunk.match(/^\{\{(\d+)\}\}$/);
if (md) {
  return (
    <span key={j} className="ld-number quotient-digit decimal-digit">
      {md[1]}
    </span>
  );
}


          return chunk.split(/(\d+)/).map((part, k) =>
            /^\d+$/.test(part) ? (
              <span
                key={`${j}-${k}`}
                className={`ld-number ${
                  side === "right" && l.text.includes("Quotient")
                    ? "quotient-digit"
                    : ""
                }`}
              >
                {part}
              </span>
            ) : (
              <span
  key={`${j}-${k}`}
  className={part.includes("Quotient") ? "quotient-label" : undefined}
>
  {part}
</span>

            )
          );
        })}
      </div>
    )
  );
}

export default function StudentLDVisualization({ step, showHand, speed }: Props) {
  const [isWriting, setIsWriting] = useState(false);

  // ✅ LAST NON-EMPTY SNAPSHOT
  const [leftWork, setLeftWork] = useState<WorkLine[]>([]);
  const [rightWork, setRightWork] = useState<WorkLine[]>([]);
  const [setup, setSetup] = useState<{ dividend: number; divisor: number } | null>(
    null
  );

  // 🔑 Core logic: replace only if non-empty
  useEffect(() => {
    if (!step) return;

    setSetup({ dividend: step.dividend, divisor: step.divisor });

    if (step.leftWork.length > 0) {
      setLeftWork(step.leftWork);
    }

    if (step.rightWork.length > 0) {
      setRightWork(step.rightWork);
    }
  }, [step]);

  // Hand animation only
  useEffect(() => {
    if (!step || !showHand) return;
    setIsWriting(true);
    const t = window.setTimeout(() => setIsWriting(false), speed * 0.7);
    return () => window.clearTimeout(t);
  }, [step, showHand, speed]);

  const handPos = useMemo(() => {
    if (!step) return { left: "65%", top: "12%" };
    if (step.step === 1) return { left: "65%", top: "12%" };
    if (step.step % 2 === 0) return { left: "72%", top: "32%" };
    return { left: "28%", top: "58%" };
  }, [step]);

  if (!setup) return null;

  return (
    <div style={{ marginBottom: 24 }}>


<div
  className="student-notebook"
  style={{
    minHeight: "35cm",
    width: "100%",
    paddingBottom: 40,
  }}
>


      <div className="notebook-paper greek-ld">
        {showHand && (
          <div
            className="writing-hand"
            style={{
              left: handPos.left,
              top: handPos.top,
              opacity: isWriting ? 1 : 0.45,
            }}
          >
            ✍️
            {isWriting && <span className="ink-dot" />}
          </div>
        )}

        <div className="vline" />
        <div className="dividend">{setup.dividend}</div>
        <div className="divisor">{setup.divisor}</div>
        <div className="divisor-underline" />

        <div className="left-work">{render(leftWork, "left")}</div>
        <div className="right-work">{render(rightWork, "right")}</div>
      </div>

    </div>   
  </div>     
);
}
