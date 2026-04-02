//src/app/math/ld/ld-utils.ts

import { LDStep, WorkLine } from "./types";

function pushLine(
  arr: WorkLine[],
  text: string,
  tone: "normal" | "muted" | "emph" | "decimal" = "normal"
) {
  arr.push({ kind: "text", text, tone });
}


function pushRule(arr: WorkLine[]) {
  arr.push({ kind: "rule" });
}

/* --------------------------------------------------
   NORMALIZE DECIMALS (MAKE BOTH NUMBERS INTEGERS)
-------------------------------------------------- */
function normalizeDecimals(a: number, b: number): {
  dividend: number;
  divisor: number;
} {
  const aDecimals = (a.toString().split(".")[1]?.length ?? 0);
  const bDecimals = (b.toString().split(".")[1]?.length ?? 0);
  const factor = Math.pow(10, Math.max(aDecimals, bDecimals));

  return {
    dividend: Math.round(a * factor),
    divisor: Math.round(b * factor),
  };
}

/* --------------------------------------------------
   QUOTIENT RENDERING
   [[d]]  → integer digits
   {{d}}  → decimal digits (rendered green by UI)
-------------------------------------------------- */
type QTok = number | ".";
function quotientText(q: QTok[]) {
  let afterDot = false;

  return q
    .map((t) => {
      if (t === ".") {
        afterDot = true;
        return ".";
      }
      return afterDot ? `{{${t}}}` : `[[${t}]]`;
    })
    .join("");
}

const MAX_DECIMAL_PLACES = 6;

export function calculateLDSteps(dividend: number, divisor: number): LDStep[] {
  // Normalize decimals BEFORE doing anything else
  const normalized = normalizeDecimals(dividend, divisor);
  dividend = normalized.dividend;
  divisor = normalized.divisor;

  const steps: LDStep[] = [];
  const digits = dividend.toString().split("").map(Number);

  const leftWork: WorkLine[] = [];
  const rightWork: WorkLine[] = [];

  let remainder = 0;
let inDecimal = false;
const quotientDigits: QTok[] = [];


  /* --------------------------------------------------
     STEP 1 — SETUP
  -------------------------------------------------- */
  steps.push({
    step: 1,
    description: "Setting up the long division (Greek format)",
    explanation:
      "We place the dividend on the left of the vertical line and the divisor on the right.",
    dividend,
    divisor,
    digitIndex: -1,
    leftWork: [],
    rightWork: [],
  });

  /* --------------------------------------------------
     INTEGER PART
  -------------------------------------------------- */
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const current = remainder === 0 ? digit : remainder * 10 + digit;

    // Bring down digit
    pushLine(leftWork, `bring down/κατεβάζουμε ${digit}`, "emph");
(leftWork[leftWork.length - 1] as any).role = "bring-down";

    steps.push({
      step: steps.length + 1,
      description: "Bring down digit",
      explanation: `Bring down ${digit}`,
      dividend,
      divisor,
      digitIndex: i,
      leftWork: [...leftWork],
      rightWork: [...rightWork],
    });

    const qDigit = Math.floor(current / divisor);

    pushLine(
      leftWork,
      `${divisor} fits/χωράει into/στο ${current} ${qDigit} times/φορές`
    );

    steps.push({
      step: steps.length + 1,
      description: "Check how many times it fits",
      explanation: `${divisor} fits ${qDigit} times into ${current}`,
      dividend,
      divisor,
      digitIndex: i,
      leftWork: [...leftWork],
      rightWork: [...rightWork],
    });

    const multiplied = qDigit * divisor;
    const newRemainder = current - multiplied;

    quotientDigits.push(qDigit);

    const qText = `Quotient/Πηλίκον: ${quotientText(quotientDigits)}`;
    if (rightWork.length === 0) {
      pushLine(rightWork, qText, "emph");
    } else {
      rightWork[rightWork.length - 1] = {
        kind: "text",
        text: qText,
        tone: "emph",
      };
    }

    pushLine(leftWork, `${multiplied} (= ${divisor} × [[${qDigit}]])`, "muted");
    pushRule(leftWork);
    pushLine(leftWork, `${newRemainder} (remainder/υπόλοιπο)`);

    remainder = newRemainder;

    steps.push({
      step: steps.length + 1,
      description: "Subtract and find remainder",
      explanation: `${current} − ${multiplied} = ${newRemainder}`,
      dividend,
      divisor,
      digitIndex: i,
      leftWork: [...leftWork],
      rightWork: [...rightWork],
    });
  }

  /* --------------------------------------------------
   DECIMAL EXPANSION
-------------------------------------------------- */
if (remainder !== 0) {
  // explicit transition to decimal digits
  pushLine(leftWork, "The following are decimal digits\nΤα ακόλουθα είναι δεκαδικά ψηφία.", "decimal");

  inDecimal = true;

  steps.push({
    step: steps.length + 1,
    description: "Prepare for decimals",
    explanation: "A remainder exists, so we continue with decimal digits.",
    dividend,
    divisor,
    digitIndex: digits.length - 1,
    leftWork: [...leftWork],
    rightWork: [...rightWork],
  });


    quotientDigits.push(".");

    for (let d = 0; d < MAX_DECIMAL_PLACES && remainder !== 0; d++) {
      const current = remainder * 10;

      pushLine(leftWork, `bring down/κατεβάζουμε 0`, "decimal");
(leftWork[leftWork.length - 1] as any).role = "bring-down";


      steps.push({
        step: steps.length + 1,
        description: "Bring down 0",
        explanation: "We bring down 0 to continue with decimals.",
        dividend,
        divisor,
        digitIndex: digits.length + d,
        leftWork: [...leftWork],
        rightWork: [...rightWork],
      });

      const qDigit = Math.floor(current / divisor);
      const multiplied = qDigit * divisor;
      const newRemainder = current - multiplied;

      quotientDigits.push(qDigit);

      rightWork[rightWork.length - 1] = {
        kind: "text",
        text: `Quotient/Πηλίκον: ${quotientText(quotientDigits)}`,
        tone: "emph",
      };

      pushLine(leftWork, `${multiplied} (= ${divisor} × [[${qDigit}]])`, "decimal");
      pushRule(leftWork);
      pushLine(leftWork, `${newRemainder} (remainder/υπόλοιπο)`, "decimal");


      remainder = newRemainder;

      steps.push({
        step: steps.length + 1,
        description: "Decimal subtraction",
        explanation: `${current} − ${multiplied} = ${newRemainder}`,
        dividend,
        divisor,
        digitIndex: digits.length + d,
        leftWork: [...leftWork],
        rightWork: [...rightWork],
      });
    }
  }

  /* --------------------------------------------------
     FINAL STEP
  -------------------------------------------------- */
  steps.push({
    step: steps.length + 1,
    description: "Division complete",
    explanation: `Quotient: ${quotientDigits
      .map((t) => (t === "." ? "." : String(t)))
      .join("")}, remainder ${remainder}`,
    dividend,
    divisor,
    digitIndex: digits.length - 1,
    leftWork: [...leftWork],
    rightWork: [...rightWork],
    finished: true,
  });

  return steps;
}
