//src/app/math/mc/data/parentheses-expressions-questions.ts

import { Question } from '../types';

export const parenthesesExpressionsQuestions: Question[] = [
  // Basic parentheses with fractions (Questions 1-5)
  {
    id: 1,
    english: {
      question: "Simplify: (1/2 + 1/4) × 2",
      options: ["1 1/2", "1", "3/4", "1 1/4"],
      explanation: "First solve inside parentheses: 1/2 + 1/4 = 2/4 + 1/4 = 3/4, then 3/4 × 2 = 6/4 = 1 1/2"
    },
    greek: {
      question: "Απλοποιήστε: (1/2 + 1/4) × 2",
      options: ["1 1/2", "1", "3/4", "1 1/4"],
      explanation: "Πρώτα λύνουμε μέσα στην παρένθεση: 1/2 + 1/4 = 2/4 + 1/4 = 3/4, μετά 3/4 × 2 = 6/4 = 1 1/2"
    },
    correctAnswer: 0,
    category: 'basic-parentheses'
  },
  {
    id: 2,
    english: {
      question: "Simplify: 3/4 × (2/3 + 1/6)",
      options: ["5/8", "3/4", "5/6", "2/3"],
      explanation: "Inside: 2/3 + 1/6 = 4/6 + 1/6 = 5/6, then 3/4 × 5/6 = 15/24 = 5/8"
    },
    greek: {
      question: "Απλοποιήστε: 3/4 × (2/3 + 1/6)",
      options: ["5/8", "3/4", "5/6", "2/3"],
      explanation: "Μέσα: 2/3 + 1/6 = 4/6 + 1/6 = 5/6, μετά 3/4 × 5/6 = 15/24 = 5/8"
    },
    correctAnswer: 0,
    category: 'basic-parentheses'
  },
  {
    id: 3,
    english: {
      question: "Simplify: (3/5 - 1/3) × 15",
      options: ["4", "6", "5", "3"],
      explanation: "Inside: 3/5 - 1/3 = 9/15 - 5/15 = 4/15, then 4/15 × 15 = 60/15 = 4"
    },
    greek: {
      question: "Απλοποιήστε: (3/5 - 1/3) × 15",
      options: ["4", "6", "5", "3"],
      explanation: "Μέσα: 3/5 - 1/3 = 9/15 - 5/15 = 4/15, μετά 4/15 × 15 = 60/15 = 4"
    },
    correctAnswer: 0,
    category: 'basic-parentheses'
  },
  {
    id: 4,
    english: {
      question: "Simplify: (2/3 + 1/2) ÷ 1/6",
      options: ["7", "5", "6", "8"],
      explanation: "Inside: 2/3 + 1/2 = 4/6 + 3/6 = 7/6, then 7/6 ÷ 1/6 = 7/6 × 6/1 = 42/6 = 7"
    },
    greek: {
      question: "Απλοποιήστε: (2/3 + 1/2) ÷ 1/6",
      options: ["7", "5", "6", "8"],
      explanation: "Μέσα: 2/3 + 1/2 = 4/6 + 3/6 = 7/6, μετά 7/6 ÷ 1/6 = 7/6 × 6/1 = 42/6 = 7"
    },
    correctAnswer: 0,
    category: 'basic-parentheses'
  },
  {
    id: 5,
    english: {
      question: "Simplify: 4 × (1/2 - 1/4)",
      options: ["1", "2", "1/2", "3/4"],
      explanation: "Inside: 1/2 - 1/4 = 2/4 - 1/4 = 1/4, then 4 × 1/4 = 1"
    },
    greek: {
      question: "Απλοποιήστε: 4 × (1/2 - 1/4)",
      options: ["1", "2", "1/2", "3/4"],
      explanation: "Μέσα: 1/2 - 1/4 = 2/4 - 1/4 = 1/4, μετά 4 × 1/4 = 1"
    },
    correctAnswer: 0,
    category: 'basic-parentheses'
  },

  // Nested parentheses (Questions 6-9)
  {
    id: 6,
    english: {
      question: "Simplify: (2 + 1/3) × (3 - 1/2)",
      options: ["6 1/3", "5 5/6", "7 1/6", "6 5/6"],
      explanation: "First: 2 + 1/3 = 7/3, second: 3 - 1/2 = 5/2, then 7/3 × 5/2 = 35/6 = 5 5/6"
    },
    greek: {
      question: "Απλοποιήστε: (2 + 1/3) × (3 - 1/2)",
      options: ["6 1/3", "5 5/6", "7 1/6", "6 5/6"],
      explanation: "Πρώτο: 2 + 1/3 = 7/3, δεύτερο: 3 - 1/2 = 5/2, μετά 7/3 × 5/2 = 35/6 = 5 5/6"
    },
    correctAnswer: 1,
    category: 'nested-parentheses'
  },
  {
    id: 7,
    english: {
      question: "Simplify: (3/4 + 1/2) ÷ (2 - 1/3)",
      options: ["15/20", "3/4", "15/28", "5/8"],
      explanation: "First: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, second: 2 - 1/3 = 6/3 - 1/3 = 5/3, then 5/4 ÷ 5/3 = 5/4 × 3/5 = 15/20 = 3/4"
    },
    greek: {
      question: "Απλοποιήστε: (3/4 + 1/2) ÷ (2 - 1/3)",
      options: ["15/20", "3/4", "15/28", "5/8"],
      explanation: "Πρώτο: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, δεύτερο: 2 - 1/3 = 6/3 - 1/3 = 5/3, μετά 5/4 ÷ 5/3 = 5/4 × 3/5 = 15/20 = 3/4"
    },
    correctAnswer: 1,
    category: 'nested-parentheses'
  },
  {
    id: 8,
    english: {
      question: "Simplify: 2/3 × (3/4 + 1/2) - 1/4",
      options: ["1/2", "1/3", "1/4", "2/3"],
      explanation: "Inside: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, then 2/3 × 5/4 = 10/12 = 5/6, then 5/6 - 1/4 = 10/12 - 3/12 = 7/12"
    },
    greek: {
      question: "Απλοποιήστε: 2/3 × (3/4 + 1/2) - 1/4",
      options: ["1/2", "1/3", "1/4", "2/3"],
      explanation: "Μέσα: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, μετά 2/3 × 5/4 = 10/12 = 5/6, μετά 5/6 - 1/4 = 10/12 - 3/12 = 7/12"
    },
    correctAnswer: 3,
    category: 'nested-parentheses'
  },
  {
    id: 9,
    english: {
      question: "Simplify: (1/2 + 1/3) × (1/4 + 1/2)",
      options: ["5/12", "5/8", "3/8", "7/12"],
      explanation: "First: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, second: 1/4 + 1/2 = 1/4 + 2/4 = 3/4, then 5/6 × 3/4 = 15/24 = 5/8"
    },
    greek: {
      question: "Απλοποιήστε: (1/2 + 1/3) × (1/4 + 1/2)",
      options: ["5/12", "5/8", "3/8", "7/12"],
      explanation: "Πρώτο: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, δεύτερο: 1/4 + 1/2 = 1/4 + 2/4 = 3/4, μετά 5/6 × 3/4 = 15/24 = 5/8"
    },
    correctAnswer: 1,
    category: 'nested-parentheses'
  },

  // Expressions with multiple operations (Questions 10-13)
  {
    id: 10,
    english: {
      question: "Simplify: (2/3)² + 1/3",
      options: ["7/9", "5/9", "8/9", "1"],
      explanation: "(2/3)² = 4/9, then 4/9 + 1/3 = 4/9 + 3/9 = 7/9"
    },
    greek: {
      question: "Απλοποιήστε: (2/3)² + 1/3",
      options: ["7/9", "5/9", "8/9", "1"],
      explanation: "(2/3)² = 4/9, μετά 4/9 + 1/3 = 4/9 + 3/9 = 7/9"
    },
    correctAnswer: 0,
    category: 'multiple-operations'
  },
  {
    id: 11,
    english: {
      question: "Simplify: 3/4 × (2/3 + 1/2) - 1/8",
      options: ["1/2", "3/8", "5/8", "7/8"],
      explanation: "Inside: 2/3 + 1/2 = 4/6 + 3/6 = 7/6, 3/4 × 7/6 = 21/24 = 7/8, then 7/8 - 1/8 = 6/8 = 3/4"
    },
    greek: {
      question: "Απλοποιήστε: 3/4 × (2/3 + 1/2) - 1/8",
      options: ["1/2", "3/8", "5/8", "7/8"],
      explanation: "Μέσα: 2/3 + 1/2 = 4/6 + 3/6 = 7/6, 3/4 × 7/6 = 21/24 = 7/8, μετά 7/8 - 1/8 = 6/8 = 3/4"
    },
    correctAnswer: 2,
    category: 'multiple-operations'
  },
  {
    id: 12,
    english: {
      question: "Simplify: (1 - 1/3) × (2 + 1/4) ÷ 1/2",
      options: ["4 1/6", "3 1/2", "4 2/3", "5"],
      explanation: "First: 1 - 1/3 = 2/3, second: 2 + 1/4 = 9/4, then 2/3 × 9/4 = 18/12 = 3/2, then 3/2 ÷ 1/2 = 3/2 × 2/1 = 3"
    },
    greek: {
      question: "Απλοποιήστε: (1 - 1/3) × (2 + 1/4) ÷ 1/2",
      options: ["4 1/6", "3 1/2", "4 2/3", "5"],
      explanation: "Πρώτο: 1 - 1/3 = 2/3, δεύτερο: 2 + 1/4 = 9/4, μετά 2/3 × 9/4 = 18/12 = 3/2, μετά 3/2 ÷ 1/2 = 3/2 × 2/1 = 3"
    },
    correctAnswer: 1,
    category: 'multiple-operations'
  },
  {
    id: 13,
    english: {
      question: "Simplify: 2 × (3/4 + 1/2) - (1/3 + 1/6)",
      options: ["1 1/2", "2", "2 1/2", "1"],
      explanation: "First: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, 2 × 5/4 = 10/4 = 5/2, second: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2, then 5/2 - 1/2 = 4/2 = 2"
    },
    greek: {
      question: "Απλοποιήστε: 2 × (3/4 + 1/2) - (1/3 + 1/6)",
      options: ["1 1/2", "2", "2 1/2", "1"],
      explanation: "Πρώτο: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, 2 × 5/4 = 10/4 = 5/2, δεύτερο: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2, μετά 5/2 - 1/2 = 4/2 = 2"
    },
    correctAnswer: 1,
    category: 'multiple-operations'
  },

  // Complex fractions (Questions 14-16)
  {
    id: 14,
    english: {
      question: "Simplify: (1/2 + 1/3) / (1/4 + 1/6)",
      options: ["2", "1 1/2", "1", "2 1/2"],
      explanation: "Numerator: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, Denominator: 1/4 + 1/6 = 3/12 + 2/12 = 5/12, then (5/6) / (5/12) = 5/6 × 12/5 = 60/30 = 2"
    },
    greek: {
      question: "Απλοποιήστε: (1/2 + 1/3) / (1/4 + 1/6)",
      options: ["2", "1 1/2", "1", "2 1/2"],
      explanation: "Αριθμητής: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, Παρονομαστής: 1/4 + 1/6 = 3/12 + 2/12 = 5/12, μετά (5/6) / (5/12) = 5/6 × 12/5 = 60/30 = 2"
    },
    correctAnswer: 0,
    category: 'complex-fractions'
  },
  {
    id: 15,
    english: {
      question: "Simplify: (2/3) / (1/2 + 1/4)",
      options: ["8/9", "4/5", "5/6", "7/8"],
      explanation: "Denominator: 1/2 + 1/4 = 2/4 + 1/4 = 3/4, then 2/3 ÷ 3/4 = 2/3 × 4/3 = 8/9"
    },
    greek: {
      question: "Απλοποιήστε: (2/3) / (1/2 + 1/4)",
      options: ["8/9", "4/5", "5/6", "7/8"],
      explanation: "Παρονομαστής: 1/2 + 1/4 = 2/4 + 1/4 = 3/4, μετά 2/3 ÷ 3/4 = 2/3 × 4/3 = 8/9"
    },
    correctAnswer: 0,
    category: 'complex-fractions'
  },
  {
    id: 16,
    english: {
      question: "Simplify: (3/4 + 1/2) / (2 - 1/3)",
      options: ["3/4", "5/8", "2/3", "7/10"],
      explanation: "Numerator: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, Denominator: 2 - 1/3 = 6/3 - 1/3 = 5/3, then (5/4) / (5/3) = 5/4 × 3/5 = 15/20 = 3/4"
    },
    greek: {
      question: "Απλοποιήστε: (3/4 + 1/2) / (2 - 1/3)",
      options: ["3/4", "5/8", "2/3", "7/10"],
      explanation: "Αριθμητής: 3/4 + 1/2 = 3/4 + 2/4 = 5/4, Παρονομαστής: 2 - 1/3 = 6/3 - 1/3 = 5/3, μετά (5/4) / (5/3) = 5/4 × 3/5 = 15/20 = 3/4"
    },
    correctAnswer: 0,
    category: 'complex-fractions'
  },

  // Word problems with parentheses (Questions 17-20)
  {
    id: 17,
    english: {
      question: "Sarah has 2 1/2 meters of ribbon. She cuts off 3/4 meter, then cuts the remaining into pieces of 1/4 meter each. How many pieces does she get?",
      options: ["7", "8", "6", "9"],
      explanation: "After cutting: 2 1/2 - 3/4 = 5/2 - 3/4 = 10/4 - 3/4 = 7/4 meters left, then 7/4 ÷ 1/4 = 7/4 × 4/1 = 7 pieces"
    },
    greek: {
      question: "Η Σάρα έχει 2 1/2 μέτρα κορδέλα. Κόβει 3/4 μέτρο, μετά κόβει την υπόλοιπη σε κομμάτια του 1/4 μέτρου το καθένα. Πόσα κομμάτια παίρνει;",
      options: ["7", "8", "6", "9"],
      explanation: "Μετά το κόψιμο: 2 1/2 - 3/4 = 5/2 - 3/4 = 10/4 - 3/4 = 7/4 μέτρα έμειναν, μετά 7/4 ÷ 1/4 = 7/4 × 4/1 = 7 κομμάτια"
    },
    correctAnswer: 0,
    category: 'word-problems'
  },
  {
    id: 18,
    english: {
      question: "A recipe calls for 2/3 cup of sugar. If you want to make 1 1/2 times the recipe, then use 1/4 cup less, how much sugar do you need?",
      options: ["3/4 cup", "2/3 cup", "5/6 cup", "1 cup"],
      explanation: "1 1/2 times: 3/2 × 2/3 = 6/6 = 1 cup, then minus 1/4: 1 - 1/4 = 3/4 cup"
    },
    greek: {
      question: "Μια συνταγή απαιτεί 2/3 φλιτζανιού ζάχαρη. Αν θέλεις να κάνεις 1 1/2 φορές τη συνταγή, μετά χρησιμοποιήσεις 1/4 φλιτζάνι λιγότερο, πόση ζάχαρη χρειάζεσαι;",
      options: ["3/4 φλιτζανιού", "2/3 φλιτζανιού", "5/6 φλιτζανιού", "1 φλιτζάνι"],
      explanation: "1 1/2 φορές: 3/2 × 2/3 = 6/6 = 1 φλιτζάνι, μετά μείον 1/4: 1 - 1/4 = 3/4 φλιτζανιού"
    },
    correctAnswer: 0,
    category: 'word-problems'
  },
  {
    id: 19,
    english: {
      question: "John ran 3/4 km, then ran 1/2 km more. The next day he ran twice the total of the first day. How far did he run on the second day?",
      options: ["2 1/2 km", "2 km", "1 3/4 km", "3 km"],
      explanation: "First day total: 3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4 km, second day: 2 × 5/4 = 10/4 = 2 1/2 km"
    },
    greek: {
      question: "Ο Γιάννης έτρεξε 3/4 χλμ, μετά έτρεξε άλλο 1/2 χλμ. Την επόμενη μέρα έτρεξε δύο φορές το σύνολο της πρώτης μέρας. Πόσο έτρεξε τη δεύτερη μέρα;",
      options: ["2 1/2 χλμ", "2 χλμ", "1 3/4 χλμ", "3 χλμ"],
      explanation: "Σύνολο πρώτης μέρας: 3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4 χλμ, δεύτερη μέρα: 2 × 5/4 = 10/4 = 2 1/2 χλμ"
    },
    correctAnswer: 0,
    category: 'word-problems'
  },
  {
    id: 20,
    english: {
      question: "A cake requires 2 1/4 cups of flour. If you have 3 1/2 cups, and you want to make 1 1/2 cakes, how much flour will you have left?",
      options: ["1/4 cup", "1/2 cup", "3/4 cup", "1 cup"],
      explanation: "Flour needed: 1 1/2 × 2 1/4 = 3/2 × 9/4 = 27/8 = 3 3/8 cups, flour left: 3 1/2 - 3 3/8 = 28/8 - 27/8 = 1/8 cup"
    },
    greek: {
      question: "Ένα κέικ απαιτεί 2 1/4 φλιτζάνια αλεύρι. Αν έχεις 3 1/2 φλιτζάνια, και θέλεις να κάνεις 1 1/2 κέικ, πόσο αλεύρι θα σου μείνει;",
      options: ["1/4 φλιτζανιού", "1/2 φλιτζανιού", "3/4 φλιτζανιού", "1 φλιτζάνι"],
      explanation: "Αλεύρι που χρειάζεται: 1 1/2 × 2 1/4 = 3/2 × 9/4 = 27/8 = 3 3/8 φλιτζάνια, αλεύρι που μένει: 3 1/2 - 3 3/8 = 28/8 - 27/8 = 1/8 φλιτζανιού"
    },
    correctAnswer: 0,
    category: 'word-problems'
  }
];