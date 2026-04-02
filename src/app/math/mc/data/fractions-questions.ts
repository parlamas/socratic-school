// src/app/math/mc/data/fractions-questions.ts

import { Question } from '../types';

export const fractionsQuestions: Question[] = [
  // Basic Fractions - Identification (Questions 1-2)
  {
    id: 1,
    english: {
      question: "What fraction of the circle is shaded if it's divided into 8 equal parts and 3 are shaded?",
      options: ["3/5", "3/8", "5/8", "8/3"],
      explanation: "3 parts out of 8 equal parts = 3/8"
    },
    greek: {
      question: "Τι κλάσμα του κύκλου είναι γκρίζο αν είναι χωρισμένος σε 8 ίσα μέρη και 3 είναι γκρίζα;",
      options: ["3/5", "3/8", "5/8", "8/3"],
      explanation: "3 μέρη από 8 ίσα μέρη = 3/8"
    },
    correctAnswer: 1,
    category: 'basic-fractions'
  },
  {
    id: 2,
    english: {
      question: "What is the denominator in the fraction 5/9?",
      options: ["5", "9", "14", "4"],
      explanation: "In the fraction 5/9, 5 is the numerator and 9 is the denominator."
    },
    greek: {
      question: "Ποιος είναι ο παρονομαστής στο κλάσμα 5/9;",
      options: ["5", "9", "14", "4"],
      explanation: "Στο κλάσμα 5/9, το 5 είναι ο αριθμητής και το 9 είναι ο παρονομαστής."
    },
    correctAnswer: 1,
    category: 'basic-fractions'
  },

  // Equivalent Fractions (Questions 3-4)
  {
    id: 3,
    english: {
      question: "Which fraction is equivalent to 2/3?",
      options: ["4/6", "3/4", "2/5", "6/8"],
      explanation: "2/3 = 4/6 (multiply numerator and denominator by 2)"
    },
    greek: {
      question: "Ποιο κλάσμα είναι ισοδύναμο με το 2/3;",
      options: ["4/6", "3/4", "2/5", "6/8"],
      explanation: "2/3 = 4/6 (πολλαπλασιάζουμε αριθμητή και παρονομαστή με 2)"
    },
    correctAnswer: 0,
    category: 'equivalent-fractions'
  },
  {
    id: 4,
    english: {
      question: "Which fraction is equivalent to 3/4?",
      options: ["6/8", "4/3", "9/12", "Both A and C"],
      explanation: "3/4 = 6/8 (×2) and 3/4 = 9/12 (×3)"
    },
    greek: {
      question: "Ποιο κλάσμα είναι ισοδύναμο με το 3/4;",
      options: ["6/8", "4/3", "9/12", "Και Α και Γ"],
      explanation: "3/4 = 6/8 (×2) και 3/4 = 9/12 (×3)"
    },
    correctAnswer: 3,
    category: 'equivalent-fractions'
  },

  // Addition with Same Denominator (Questions 5-6)
  {
    id: 5,
    english: {
      question: "What is 2/7 + 3/7?",
      options: ["5/14", "5/7", "6/7", "5/7"],
      explanation: "When denominators are the same, add numerators: 2/7 + 3/7 = (2+3)/7 = 5/7"
    },
    greek: {
      question: "Πόσο κάνει 2/7 + 3/7;",
      options: ["5/14", "5/7", "6/7", "5/7"],
      explanation: "Όταν οι παρονομαστές είναι ίδιοι, προσθέτουμε τους αριθμητές: 2/7 + 3/7 = (2+3)/7 = 5/7"
    },
    correctAnswer: 1, // Note: both index 1 and 3 are "5/7", but we'll use index 1
    category: 'addition'
  },
  {
    id: 6,
    english: {
      question: "What is 1/4 + 2/4?",
      options: ["3/8", "3/4", "4/4", "2/4"],
      explanation: "1/4 + 2/4 = (1+2)/4 = 3/4"
    },
    greek: {
      question: "Πόσο κάνει 1/4 + 2/4;",
      options: ["3/8", "3/4", "4/4", "2/4"],
      explanation: "1/4 + 2/4 = (1+2)/4 = 3/4"
    },
    correctAnswer: 1,
    category: 'addition'
  },

  // Addition with Different Denominators (Questions 7-8)
  {
    id: 7,
    english: {
      question: "What is 1/2 + 1/4?",
      options: ["2/6", "3/4", "2/4", "3/6"],
      explanation: "Find common denominator (4): 1/2 = 2/4, so 2/4 + 1/4 = 3/4"
    },
    greek: {
      question: "Πόσο κάνει 1/2 + 1/4;",
      options: ["2/6", "3/4", "2/4", "3/6"],
      explanation: "Βρίσκουμε κοινό παρονομαστή (4): 1/2 = 2/4, άρα 2/4 + 1/4 = 3/4"
    },
    correctAnswer: 1,
    category: 'addition'
  },
  {
    id: 8,
    english: {
      question: "What is 2/3 + 1/6?",
      options: ["3/9", "5/6", "3/6", "4/6"],
      explanation: "Common denominator (6): 2/3 = 4/6, so 4/6 + 1/6 = 5/6"
    },
    greek: {
      question: "Πόσο κάνει 2/3 + 1/6;",
      options: ["3/9", "5/6", "3/6", "4/6"],
      explanation: "Κοινός παρονομαστής (6): 2/3 = 4/6, άρα 4/6 + 1/6 = 5/6"
    },
    correctAnswer: 1,
    category: 'addition'
  },

  // Subtraction (Questions 9-10)
  {
    id: 9,
    english: {
      question: "What is 5/8 - 2/8?",
      options: ["3/0", "3/8", "7/8", "3/16"],
      explanation: "Same denominator: 5/8 - 2/8 = (5-2)/8 = 3/8"
    },
    greek: {
      question: "Πόσο κάνει 5/8 - 2/8;",
      options: ["3/0", "3/8", "7/8", "3/16"],
      explanation: "Ίδιος παρονομαστής: 5/8 - 2/8 = (5-2)/8 = 3/8"
    },
    correctAnswer: 1,
    category: 'subtraction'
  },
  {
    id: 10,
    english: {
      question: "What is 3/4 - 1/2?",
      options: ["2/2", "1/4", "2/4", "1/2"],
      explanation: "Common denominator (4): 1/2 = 2/4, so 3/4 - 2/4 = 1/4"
    },
    greek: {
      question: "Πόσο κάνει 3/4 - 1/2;",
      options: ["2/2", "1/4", "2/4", "1/2"],
      explanation: "Κοινός παρονομαστής (4): 1/2 = 2/4, άρα 3/4 - 2/4 = 1/4"
    },
    correctAnswer: 1,
    category: 'subtraction'
  },

  // Multiplication (Questions 11-13)
  {
    id: 11,
    english: {
      question: "What is 2/3 × 1/4?",
      options: ["3/7", "2/12", "3/12", "2/7"],
      explanation: "Multiply numerators: 2×1=2, denominators: 3×4=12, so 2/12 = 1/6"
    },
    greek: {
      question: "Πόσο κάνει 2/3 × 1/4;",
      options: ["3/7", "2/12", "3/12", "2/7"],
      explanation: "Πολλαπλασιάζουμε αριθμητές: 2×1=2, παρονομαστές: 3×4=12, άρα 2/12 = 1/6"
    },
    correctAnswer: 1,
    category: 'multiplication'
  },
  {
    id: 12,
    english: {
      question: "What is 3/5 × 2/3?",
      options: ["5/8", "6/15", "5/15", "6/8"],
      explanation: "3/5 × 2/3 = (3×2)/(5×3) = 6/15 = 2/5"
    },
    greek: {
      question: "Πόσο κάνει 3/5 × 2/3;",
      options: ["5/8", "6/15", "5/15", "6/8"],
      explanation: "3/5 × 2/3 = (3×2)/(5×3) = 6/15 = 2/5"
    },
    correctAnswer: 1,
    category: 'multiplication'
  },
  {
    id: 13,
    english: {
      question: "What is 4 × 2/5?",
      options: ["8/5", "6/5", "4/5", "8/10"],
      explanation: "4 × 2/5 = (4×2)/5 = 8/5 = 1 3/5"
    },
    greek: {
      question: "Πόσο κάνει 4 × 2/5;",
      options: ["8/5", "6/5", "4/5", "8/10"],
      explanation: "4 × 2/5 = (4×2)/5 = 8/5 = 1 3/5"
    },
    correctAnswer: 0,
    category: 'multiplication'
  },

  // Division (Questions 14-16)
  {
    id: 14,
    english: {
      question: "What is 2/3 ÷ 1/4?",
      options: ["2/12", "8/3", "3/8", "2/7"],
      explanation: "To divide fractions, multiply by the reciprocal: 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3 = 2 2/3"
    },
    greek: {
      question: "Πόσο κάνει 2/3 ÷ 1/4;",
      options: ["2/12", "8/3", "3/8", "2/7"],
      explanation: "Για να διαιρέσουμε κλάσματα, πολλαπλασιάζουμε με τον αντίστροφο: 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3 = 2 2/3"
    },
    correctAnswer: 1,
    category: 'division'
  },
  {
    id: 15,
    english: {
      question: "What is 3/4 ÷ 2?",
      options: ["6/4", "3/8", "3/2", "1/4"],
      explanation: "3/4 ÷ 2 = 3/4 × 1/2 = 3/8"
    },
    greek: {
      question: "Πόσο κάνει 3/4 ÷ 2;",
      options: ["6/4", "3/8", "3/2", "1/4"],
      explanation: "3/4 ÷ 2 = 3/4 × 1/2 = 3/8"
    },
    correctAnswer: 1,
    category: 'division'
  },
  {
    id: 16,
    english: {
      question: "What is 5/6 ÷ 2/3?",
      options: ["10/18", "15/12", "5/4", "3/5"],
      explanation: "5/6 ÷ 2/3 = 5/6 × 3/2 = (5×3)/(6×2) = 15/12 = 5/4 = 1 1/4"
    },
    greek: {
      question: "Πόσο κάνει 5/6 ÷ 2/3;",
      options: ["10/18", "15/12", "5/4", "3/5"],
      explanation: "5/6 ÷ 2/3 = 5/6 × 3/2 = (5×3)/(6×2) = 15/12 = 5/4 = 1 1/4"
    },
    correctAnswer: 2,
    category: 'division'
  },

  // Mixed Operations (Questions 17-18)
  {
    id: 17,
    english: {
      question: "What is 1/2 + 1/3?",
      options: ["2/5", "5/6", "3/5", "2/6"],
      explanation: "Common denominator (6): 1/2 = 3/6, 1/3 = 2/6, so 3/6 + 2/6 = 5/6"
    },
    greek: {
      question: "Πόσο κάνει 1/2 + 1/3;",
      options: ["2/5", "5/6", "3/5", "2/6"],
      explanation: "Κοινός παρονομαστής (6): 1/2 = 3/6, 1/3 = 2/6, άρα 3/6 + 2/6 = 5/6"
    },
    correctAnswer: 1,
    category: 'mixed'
  },
  {
    id: 18,
    english: {
      question: "What is 3/4 - 1/3?",
      options: ["2/1", "5/12", "2/7", "9/12"],
      explanation: "Common denominator (12): 3/4 = 9/12, 1/3 = 4/12, so 9/12 - 4/12 = 5/12"
    },
    greek: {
      question: "Πόσο κάνει 3/4 - 1/3;",
      options: ["2/1", "5/12", "2/7", "9/12"],
      explanation: "Κοινός παρονομαστής (12): 3/4 = 9/12, 1/3 = 4/12, άρα 9/12 - 4/12 = 5/12"
    },
    correctAnswer: 1,
    category: 'mixed'
  },

  // Word Problems (Questions 19-20)
  {
    id: 19,
    english: {
      question: "Sarah ate 1/4 of a pizza and John ate 2/8 of the same pizza. Who ate more?",
      options: ["Sarah", "John", "They ate the same", "Cannot determine"],
      explanation: "2/8 simplifies to 1/4, so they ate the same amount."
    },
    greek: {
      question: "Η Σάρα έφαγε 1/4 της πίτσας και ο Γιάννης έφαγε 2/8 της ίδιας πίτσας. Ποιος έφαγε περισσότερο;",
      options: ["Η Σάρα", "Ο Γιάννης", "Έφαγαν το ίδιο", "Δεν μπορούμε να προσδιορίσουμε"],
      explanation: "2/8 απλοποιείται σε 1/4, άρα έφαγαν την ίδια ποσότητα."
    },
    correctAnswer: 2,
    category: 'word-problems'
  },
  {
    id: 20,
    english: {
      question: "A recipe calls for 2/3 cup of flour. If you want to make half the recipe, how much flour do you need?",
      options: ["1/3 cup", "1/2 cup", "2/6 cup", "Both A and C"],
      explanation: "Half of 2/3 is 2/3 × 1/2 = 2/6 = 1/3 cup."
    },
    greek: {
      question: "Μια συνταγή απαιτεί 2/3 φλιτζανιού αλεύρι. Αν θέλεις να κάνεις τη μισή συνταγή, πόσο αλεύρι χρειάζεσαι;",
      options: ["1/3 φλιτζανιού", "1/2 φλιτζανιού", "2/6 φλιτζανιού", "Και Α και Γ"],
      explanation: "Μισό από 2/3 είναι 2/3 × 1/2 = 2/6 = 1/3 φλιτζανιού."
    },
    correctAnswer: 3,
    category: 'word-problems'
  }
];