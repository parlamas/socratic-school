// src/app/admin/exercises/ExerciseBuilder.tsx

"use client";

import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Props {
  initial?: Question[];
  onChange: (json: string) => void;
}

const emptyQuestion = (): Question => ({
  question: "",
  options: ["", "", "", ""],
  correct: 0,
  explanation: "",
});

export default function ExerciseBuilder({ initial, onChange }: Props) {
  const [questions, setQuestions] = useState<Question[]>(
    initial && initial.length > 0 ? initial : [emptyQuestion()]
  );

  const notify = (qs: Question[]) => {
    onChange(JSON.stringify({ questions: qs }, null, 2));
  };

  const updateQuestion = (qi: number, field: keyof Question, value: unknown) => {
    const updated = questions.map((q, i) =>
      i === qi ? { ...q, [field]: value } : q
    );
    setQuestions(updated);
    notify(updated);
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    const updated = questions.map((q, i) => {
      if (i !== qi) return q;
      const options = q.options.map((o, j) => (j === oi ? value : o));
      return { ...q, options };
    });
    setQuestions(updated);
    notify(updated);
  };

  const addQuestion = () => {
    const updated = [...questions, emptyQuestion()];
    setQuestions(updated);
    notify(updated);
  };

  const removeQuestion = (qi: number) => {
    const updated = questions.filter((_, i) => i !== qi);
    setQuestions(updated);
    notify(updated);
  };

  const moveUp = (qi: number) => {
    if (qi === 0) return;
    const updated = [...questions];
    [updated[qi - 1], updated[qi]] = [updated[qi], updated[qi - 1]];
    setQuestions(updated);
    notify(updated);
  };

  const moveDown = (qi: number) => {
    if (qi === questions.length - 1) return;
    const updated = [...questions];
    [updated[qi], updated[qi + 1]] = [updated[qi + 1], updated[qi]];
    setQuestions(updated);
    notify(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, qi) => (
        <div
          key={qi}
          className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-gray-400">
              Question {qi + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveUp(qi)}
                disabled={qi === 0}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-2 py-1 border border-gray-200 rounded-lg"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveDown(qi)}
                disabled={qi === questions.length - 1}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-2 py-1 border border-gray-200 rounded-lg"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeQuestion(qi)}
                disabled={questions.length === 1}
                className="text-xs text-red-400 hover:text-red-600 disabled:opacity-30 px-2 py-1 border border-red-200 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => updateQuestion(qi, "question", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 w-full"
          />

          <div className="flex flex-col gap-2">
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={q.correct === oi}
                  onChange={() => updateQuestion(qi, "correct", oi)}
                  className="shrink-0"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                  className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none ${
                    q.correct === oi
                      ? "border-green-300 focus:border-green-400"
                      : "border-gray-200 focus:border-indigo-400"
                  }`}
                />
                {q.correct === oi && (
                  <span className="text-xs text-green-600 shrink-0">✓ correct</span>
                )}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Explanation (shown after answering)"
            value={q.explanation}
            onChange={(e) => updateQuestion(qi, "explanation", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 w-full"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 rounded-lg px-4 py-2 transition-colors"
      >
        + Add question
      </button>
    </div>
  );
}