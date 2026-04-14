// src/app/admin/exercises/ExerciseBuilderWrapper.tsx

"use client";

import { useState } from "react";
import ExerciseBuilder from "./ExerciseBuilder";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Props {
  initial?: { questions: Question[] };
}

export default function ExerciseBuilderWrapper({ initial }: Props) {
  const [json, setJson] = useState(
    JSON.stringify(
      initial ?? { questions: [{ question: "", options: ["", "", "", ""], correct: 0, explanation: "" }] },
      null,
      2
    )
  );

  return (
    <>
      <input type="hidden" name="content" value={json} />
      <ExerciseBuilder
        initial={initial?.questions}
        onChange={setJson}
      />
    </>
  );
}