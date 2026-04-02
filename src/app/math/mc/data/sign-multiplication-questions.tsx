// src/app/math/mc/data/sign-multiplication-questions.ts

import { Question } from '../types';

export const signMultiplicationQuestions: Question[] = [
  // Basic positive × positive (Questions 1-3)
  {
    id: 1,
    english: {
      question: "What is 3 × 4?",
      options: ["7", "12", "-12", "1"],
      explanation: "3 × 4 = 12. Positive × Positive = Positive."
    },
    greek: {
      question: "Πόσο κάνει 3 × 4;",
      options: ["7", "12", "-12", "1"],
      explanation: "3 × 4 = 12. Θετικό × Θετικό = Θετικό."
    },
    correctAnswer: 1,
    category: 'positive-positive'
  },
  {
    id: 2,
    english: {
      question: "What is 5 × 6?",
      options: ["30", "11", "-30", "1"],
      explanation: "5 × 6 = 30. Positive × Positive = Positive."
    },
    greek: {
      question: "Πόσο κάνει 5 × 6;",
      options: ["30", "11", "-30", "1"],
      explanation: "5 × 6 = 30. Θετικό × Θετικό = Θετικό."
    },
    correctAnswer: 0,
    category: 'positive-positive'
  },
  {
    id: 3,
    english: {
      question: "What is 8 × 7?",
      options: ["-56", "15", "56", "1"],
      explanation: "8 × 7 = 56. Positive × Positive = Positive."
    },
    greek: {
      question: "Πόσο κάνει 8 × 7;",
      options: ["-56", "15", "56", "1"],
      explanation: "8 × 7 = 56. Θετικό × Θετικό = Θετικό."
    },
    correctAnswer: 2,
    category: 'positive-positive'
  },

  // Positive × Negative (Questions 4-7)
  {
    id: 4,
    english: {
      question: "What is 4 × (-3)?",
      options: ["12", "-12", "7", "1"],
      explanation: "4 × (-3) = -12. Positive × Negative = Negative."
    },
    greek: {
      question: "Πόσο κάνει 4 × (-3);",
      options: ["12", "-12", "7", "1"],
      explanation: "4 × (-3) = -12. Θετικό × Αρνητικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'positive-negative'
  },
  {
    id: 5,
    english: {
      question: "What is 6 × (-5)?",
      options: ["-30", "30", "11", "-11"],
      explanation: "6 × (-5) = -30. Positive × Negative = Negative."
    },
    greek: {
      question: "Πόσο κάνει 6 × (-5);",
      options: ["-30", "30", "11", "-11"],
      explanation: "6 × (-5) = -30. Θετικό × Αρνητικό = Αρνητικό."
    },
    correctAnswer: 0,
    category: 'positive-negative'
  },
  {
    id: 6,
    english: {
      question: "What is 3 × (-8)?",
      options: ["24", "-24", "11", "-11"],
      explanation: "3 × (-8) = -24. Positive × Negative = Negative."
    },
    greek: {
      question: "Πόσο κάνει 3 × (-8);",
      options: ["24", "-24", "11", "-11"],
      explanation: "3 × (-8) = -24. Θετικό × Αρνητικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'positive-negative'
  },
  {
    id: 7,
    english: {
      question: "What is 9 × (-2)?",
      options: ["18", "-18", "7", "-7"],
      explanation: "9 × (-2) = -18. Positive × Negative = Negative."
    },
    greek: {
      question: "Πόσο κάνει 9 × (-2);",
      options: ["18", "-18", "7", "-7"],
      explanation: "9 × (-2) = -18. Θετικό × Αρνητικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'positive-negative'
  },

  // Negative × Positive (Questions 8-10)
  {
    id: 8,
    english: {
      question: "What is (-4) × 5?",
      options: ["20", "-20", "9", "-9"],
      explanation: "(-4) × 5 = -20. Negative × Positive = Negative."
    },
    greek: {
      question: "Πόσο κάνει (-4) × 5;",
      options: ["20", "-20", "9", "-9"],
      explanation: "(-4) × 5 = -20. Αρνητικό × Θετικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'negative-positive'
  },
  {
    id: 9,
    english: {
      question: "What is (-7) × 3?",
      options: ["21", "-21", "10", "-10"],
      explanation: "(-7) × 3 = -21. Negative × Positive = Negative."
    },
    greek: {
      question: "Πόσο κάνει (-7) × 3;",
      options: ["21", "-21", "10", "-10"],
      explanation: "(-7) × 3 = -21. Αρνητικό × Θετικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'negative-positive'
  },
  {
    id: 10,
    english: {
      question: "What is (-6) × 4?",
      options: ["-24", "24", "10", "-10"],
      explanation: "(-6) × 4 = -24. Negative × Positive = Negative."
    },
    greek: {
      question: "Πόσο κάνει (-6) × 4;",
      options: ["-24", "24", "10", "-10"],
      explanation: "(-6) × 4 = -24. Αρνητικό × Θετικό = Αρνητικό."
    },
    correctAnswer: 0,
    category: 'negative-positive'
  },

  // Negative × Negative (Questions 11-13)
  {
    id: 11,
    english: {
      question: "What is (-3) × (-4)?",
      options: ["12", "-12", "7", "-7"],
      explanation: "(-3) × (-4) = 12. Negative × Negative = Positive."
    },
    greek: {
      question: "Πόσο κάνει (-3) × (-4);",
      options: ["12", "-12", "7", "-7"],
      explanation: "(-3) × (-4) = 12. Αρνητικό × Αρνητικό = Θετικό."
    },
    correctAnswer: 0,
    category: 'negative-negative'
  },
  {
    id: 12,
    english: {
      question: "What is (-5) × (-6)?",
      options: ["-30", "30", "11", "-11"],
      explanation: "(-5) × (-6) = 30. Negative × Negative = Positive."
    },
    greek: {
      question: "Πόσο κάνει (-5) × (-6);",
      options: ["-30", "30", "11", "-11"],
      explanation: "(-5) × (-6) = 30. Αρνητικό × Αρνητικό = Θετικό."
    },
    correctAnswer: 1,
    category: 'negative-negative'
  },
  {
    id: 13,
    english: {
      question: "What is (-8) × (-2)?",
      options: ["-16", "16", "10", "-10"],
      explanation: "(-8) × (-2) = 16. Negative × Negative = Positive."
    },
    greek: {
      question: "Πόσο κάνει (-8) × (-2);",
      options: ["-16", "16", "10", "-10"],
      explanation: "(-8) × (-2) = 16. Αρνητικό × Αρνητικό = Θετικό."
    },
    correctAnswer: 1,
    category: 'negative-negative'
  },

  // Mixed review (Questions 14-15)
  {
    id: 14,
    english: {
      question: "What is (-2) × 7?",
      options: ["14", "-14", "5", "-5"],
      explanation: "(-2) × 7 = -14. Negative × Positive = Negative."
    },
    greek: {
      question: "Πόσο κάνει (-2) × 7;",
      options: ["14", "-14", "5", "-5"],
      explanation: "(-2) × 7 = -14. Αρνητικό × Θετικό = Αρνητικό."
    },
    correctAnswer: 1,
    category: 'review'
  },
  {
    id: 15,
    english: {
      question: "What is (-9) × (-3)?",
      options: ["-27", "27", "12", "-12"],
      explanation: "(-9) × (-3) = 27. Negative × Negative = Positive."
    },
    greek: {
      question: "Πόσο κάνει (-9) × (-3);",
      options: ["-27", "27", "12", "-12"],
      explanation: "(-9) × (-3) = 27. Αρνητικό × Αρνητικό = Θετικό."
    },
    correctAnswer: 1,
    category: 'review'
  }
];