// src/app/students/exercises/[id]/PracticeClient.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface ExerciseContent {
  questions: Question[];
}

interface Props {
  exercise: {
    id: string;
    title: string;
    type: string;
    content: Record<string, unknown>;
    topicName: string;
    areaName: string;
  };
  userExerciseId: string;
  bestScore: number | null;
}

export default function PracticeClient({
  exercise,
  userExerciseId,
  bestScore,
}: Props) {
  const content = exercise.content as unknown as ExerciseContent;
  const questions = content.questions ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const current = questions[currentIndex];
  const isAnswered = selected !== null;
  // Custom exercise routes — bypass the generic quiz
const customRoutes: Record<string, string> = {
  'cmo6yrq130001u4v8wv7kr7yi': '/multilingual/ex-002',
  'cmnzw6xpd0007lb04g4t233ez': '/multilingual/ex-001',
};

if (customRoutes[exercise.id]) {
  window.location.href = customRoutes[exercise.id];
  return null;
}
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelected(optionIndex);
  };

  const handleNext = async () => {
    const newAnswers = [...answers, selected!];

    if (isLast) {
      const correct = newAnswers.filter(
        (ans, i) => ans === questions[i].correct
      ).length;
      const score = Math.round((correct / questions.length) * 100);
      setFinalScore(score);
      setFinished(true);
      setSaving(true);

      await fetch("/api/exercises/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userExerciseId,
          exerciseId: exercise.id,
          answers: newAnswers,
          score,
        }),
      });

      setSaving(false);
    } else {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setFinalScore(null);
  };

  if (questions.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <p className="text-gray-400">This exercise has no questions yet.</p>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-xs text-gray-400 mb-1">
            {exercise.areaName} · {exercise.topicName}
          </p>
          <h1 className="text-xl font-semibold text-gray-900 mb-6">
            {exercise.title}
          </h1>

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-indigo-200 mb-6">
            <span className="text-2xl font-semibold text-indigo-700">
              {finalScore}%
            </span>
          </div>

          <p className="text-gray-500 mb-2">
            {finalScore! >= 80
              ? "Excellent work!"
              : finalScore! >= 60
              ? "Good effort — keep practising."
              : "Keep going — you'll get there."}
          </p>

          {bestScore !== null && (
            <p className="text-xs text-gray-400 mb-8">
              Previous best: {bestScore}%
            </p>
          )}

          {saving && (
            <p className="text-xs text-gray-400 mb-4">Saving result...</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="text-sm font-medium text-indigo-600 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-lg px-5 py-2 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/students/exercises"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-5 py-2 no-underline transition-colors"
            >
              My exercises
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">
            {exercise.areaName} · {exercise.topicName}
          </span>
          <span className="text-xs text-gray-400">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div
            className="h-1 bg-indigo-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h1 className="text-base sm:text-lg font-medium text-gray-900 mb-6 leading-relaxed">
        {current.question}
      </h1>

      <div className="flex flex-col gap-3 mb-8">
        {current.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          const showResult = isAnswered;

          let className =
            "flex items-center gap-3 px-4 py-3 border rounded-xl text-sm cursor-pointer transition-colors ";

          if (!showResult) {
            className += isSelected
              ? "border-indigo-400 bg-indigo-50 text-indigo-900"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700";
          } else {
            if (isCorrect) {
              className += "border-green-400 bg-green-50 text-green-900";
            } else if (isSelected && !isCorrect) {
              className += "border-red-300 bg-red-50 text-red-900";
            } else {
              className += "border-gray-100 text-gray-400";
            }
          }

          return (
            <div key={i} className={className} onClick={() => handleSelect(i)}>
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  showResult && isCorrect
                    ? "border-green-500 bg-green-500"
                    : showResult && isSelected && !isCorrect
                    ? "border-red-400 bg-red-400"
                    : isSelected
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300"
                }`}
              >
                {(isSelected || (showResult && isCorrect)) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              {option}
            </div>
          );
        })}
      </div>

      {isAnswered && current.explanation && (
        <div
          className={`px-4 py-3 rounded-xl text-sm mb-6 ${
            selected === current.correct
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {current.explanation}
        </div>
      )}

      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-5 py-2 transition-colors"
          >
            {isLast ? "See results" : "Next →"}
          </button>
        </div>
      )}
    </main>
  );
}