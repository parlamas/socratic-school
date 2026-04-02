// src/app/math/mc/types.ts

export interface Question {
  id: number;
  english: {
    question: string;
    options: string[];
    explanation: string;
  };
  greek: {
    question: string;
    options: string[];
    explanation: string;
  };
  correctAnswer: number;
  category: string; // Changed from union type to string to accommodate more categories
}

export interface SectionPaginationProps {
  currentSection: number;
  totalSections: number;
  onPrevSection: () => void;
  onNextSection: () => void;
  onGoToSection: (section: number) => void;
  language?: 'english' | 'greek';
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  showResults: boolean;
  score: number;
  language: 'english' | 'greek';
}

export interface LanguageContent {
  title: string;
  progress: string;
  score: string;
  of: string;
  previous: string;
  next: string;
  finish: string;
  restart: string;
  results: {
    title: string;
    yourScore: string;
    outOf: string;
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    notAnswered: string;
    summary: string;
  };
  categories: {
    [key: string]: string; // Allow any category string
  };
}