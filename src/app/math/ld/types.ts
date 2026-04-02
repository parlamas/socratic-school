// app/math/ld/types.ts

export type WorkLine =
  | {
      kind: "text";
      text: string;
      tone?: "normal" | "muted" | "emph" | "decimal";
      role?: "bring-down";
    }
  | { kind: "rule" };


export interface LDStep {
  step: number;
  description: string;
  explanation: string;

  dividend: number;
  divisor: number;

  // which dividend digit we just processed (0-based). -1 for setup.
  digitIndex: number;

  // accumulated handwritten history (paper-like)
  leftWork: WorkLine[];   // subtraction + remainders under dividend (left side)
  rightWork: WorkLine[];  // quotient line under divisor (right side)

  finished?: boolean;
}
