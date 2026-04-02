//src/app/math/mc/data/index.ts

import { questions as equationsQuestions } from './questions';
import { signMultiplicationQuestions } from './sign-multiplication-questions';
import { fractionsQuestions } from './fractions-questions';
import { mixedNumbersQuestions } from './mixed-numbers-questions';
import { parenthesesExpressionsQuestions } from './parentheses-expressions-questions';

export const quizSections = [
  {
    id: 1,
    title: {
      english: 'Fundamentals of Equations',
      greek: 'Βασικές Αρχές Εξισώσεων'
    },
    questions: equationsQuestions
  },
  {
    id: 2,
    title: {
      english: 'Positive & Negative Numbers',
      greek: 'Θετικοί & Αρνητικοί Αριθμοί'
    },
    questions: signMultiplicationQuestions
  },
  {
    id: 3,
    title: {
      english: 'Fractions',
      greek: 'Κλάσματα'
    },
    questions: fractionsQuestions
  },
  {
    id: 4,
    title: {
      english: 'Mixed Numbers',
      greek: 'Μεικτοί Αριθμοί'
    },
    questions: mixedNumbersQuestions
  },
  {
    id: 5,
    title: {
      english: 'Parentheses & Expressions',
      greek: 'Παρενθέσεις & Παραστάσεις'
    },
    questions: parenthesesExpressionsQuestions
  }
];

export const questions = equationsQuestions;