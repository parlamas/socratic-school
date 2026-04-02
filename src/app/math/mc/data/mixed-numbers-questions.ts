import { Question } from '../types';

export const mixedNumbersQuestions: Question[] = [
  // Converting between mixed numbers and improper fractions (Questions 1-5)
  {
    id: 1,
    english: {
      question: "Convert 2 1/3 to an improper fraction.",
      options: ["7/3", "6/3", "5/3", "8/3"],
      explanation: "2 1/3 = (2 × 3 + 1)/3 = (6 + 1)/3 = 7/3"
    },
    greek: {
      question: "Μετατρέψτε το 2 1/3 σε καταχρηστικό κλάσμα.",
      options: ["7/3", "6/3", "5/3", "8/3"],
      explanation: "2 1/3 = (2 × 3 + 1)/3 = (6 + 1)/3 = 7/3"
    },
    correctAnswer: 0,
    category: 'conversion'
  },
  {
    id: 2,
    english: {
      question: "Convert 3 2/5 to an improper fraction.",
      options: ["15/5", "17/5", "13/5", "11/5"],
      explanation: "3 2/5 = (3 × 5 + 2)/5 = (15 + 2)/5 = 17/5"
    },
    greek: {
      question: "Μετατρέψτε το 3 2/5 σε καταχρηστικό κλάσμα.",
      options: ["15/5", "17/5", "13/5", "11/5"],
      explanation: "3 2/5 = (3 × 5 + 2)/5 = (15 + 2)/5 = 17/5"
    },
    correctAnswer: 1,
    category: 'conversion'
  },
  {
    id: 3,
    english: {
      question: "Convert 11/4 to a mixed number.",
      options: ["2 3/4", "3 2/4", "2 1/4", "3 3/4"],
      explanation: "11 ÷ 4 = 2 remainder 3, so 11/4 = 2 3/4"
    },
    greek: {
      question: "Μετατρέψτε το 11/4 σε μεικτό αριθμό.",
      options: ["2 3/4", "3 2/4", "2 1/4", "3 3/4"],
      explanation: "11 ÷ 4 = 2 υπόλοιπο 3, άρα 11/4 = 2 3/4"
    },
    correctAnswer: 0,
    category: 'conversion'
  },
  {
    id: 4,
    english: {
      question: "Convert 19/6 to a mixed number.",
      options: ["3 1/6", "3 2/6", "2 7/6", "4 1/6"],
      explanation: "19 ÷ 6 = 3 remainder 1, so 19/6 = 3 1/6"
    },
    greek: {
      question: "Μετατρέψτε το 19/6 σε μεικτό αριθμό.",
      options: ["3 1/6", "3 2/6", "2 7/6", "4 1/6"],
      explanation: "19 ÷ 6 = 3 υπόλοιπο 1, άρα 19/6 = 3 1/6"
    },
    correctAnswer: 0,
    category: 'conversion'
  },
  {
    id: 5,
    english: {
      question: "Which is the correct way to write 23/5 as a mixed number?",
      options: ["4 3/5", "5 3/5", "4 2/5", "3 8/5"],
      explanation: "23 ÷ 5 = 4 remainder 3, so 23/5 = 4 3/5"
    },
    greek: {
      question: "Ποιος είναι ο σωστός τρόπος να γράψουμε το 23/5 ως μεικτό αριθμό;",
      options: ["4 3/5", "5 3/5", "4 2/5", "3 8/5"],
      explanation: "23 ÷ 5 = 4 υπόλοιπο 3, άρα 23/5 = 4 3/5"
    },
    correctAnswer: 0,
    category: 'conversion'
  },

  // Addition of mixed numbers (Questions 6-9)
  {
    id: 6,
    english: {
      question: "What is 1 1/4 + 2 1/4?",
      options: ["3 1/2", "3 2/4", "3 1/4", "4 1/4"],
      explanation: "Add whole numbers: 1+2=3, add fractions: 1/4+1/4=2/4=1/2, so 3 1/2"
    },
    greek: {
      question: "Πόσο κάνει 1 1/4 + 2 1/4;",
      options: ["3 1/2", "3 2/4", "3 1/4", "4 1/4"],
      explanation: "Προσθέτουμε ακέραιους: 1+2=3, προσθέτουμε κλάσματα: 1/4+1/4=2/4=1/2, άρα 3 1/2"
    },
    correctAnswer: 0,
    category: 'addition'
  },
  {
    id: 7,
    english: {
      question: "What is 2 2/3 + 1 2/3?",
      options: ["3 4/3", "4 1/3", "3 2/3", "4 2/3"],
      explanation: "2 2/3 + 1 2/3 = (2+1) + (2/3+2/3) = 3 + 4/3 = 3 + 1 1/3 = 4 1/3"
    },
    greek: {
      question: "Πόσο κάνει 2 2/3 + 1 2/3;",
      options: ["3 4/3", "4 1/3", "3 2/3", "4 2/3"],
      explanation: "2 2/3 + 1 2/3 = (2+1) + (2/3+2/3) = 3 + 4/3 = 3 + 1 1/3 = 4 1/3"
    },
    correctAnswer: 1,
    category: 'addition'
  },
  {
    id: 8,
    english: {
      question: "What is 3 1/2 + 2 1/3?",
      options: ["5 2/5", "5 5/6", "6 1/6", "5 1/6"],
      explanation: "3 1/2 + 2 1/3 = 5 + (3/6 + 2/6) = 5 + 5/6 = 5 5/6"
    },
    greek: {
      question: "Πόσο κάνει 3 1/2 + 2 1/3;",
      options: ["5 2/5", "5 5/6", "6 1/6", "5 1/6"],
      explanation: "3 1/2 + 2 1/3 = 5 + (3/6 + 2/6) = 5 + 5/6 = 5 5/6"
    },
    correctAnswer: 1,
    category: 'addition'
  },
  {
    id: 9,
    english: {
      question: "What is 4 3/4 + 1 1/2?",
      options: ["5 4/6", "6 1/4", "5 5/4", "6 1/2"],
      explanation: "4 3/4 + 1 1/2 = 5 + (3/4 + 2/4) = 5 + 5/4 = 5 + 1 1/4 = 6 1/4"
    },
    greek: {
      question: "Πόσο κάνει 4 3/4 + 1 1/2;",
      options: ["5 4/6", "6 1/4", "5 5/4", "6 1/2"],
      explanation: "4 3/4 + 1 1/2 = 5 + (3/4 + 2/4) = 5 + 5/4 = 5 + 1 1/4 = 6 1/4"
    },
    correctAnswer: 1,
    category: 'addition'
  },

  // Subtraction of mixed numbers (Questions 10-12)
  {
    id: 10,
    english: {
      question: "What is 3 3/4 - 1 1/4?",
      options: ["2 2/4", "2 1/2", "2 2/4", "Both A and B"],
      explanation: "3 3/4 - 1 1/4 = (3-1) + (3/4-1/4) = 2 + 2/4 = 2 1/2"
    },
    greek: {
      question: "Πόσο κάνει 3 3/4 - 1 1/4;",
      options: ["2 2/4", "2 1/2", "2 2/4", "Και Α και Β"],
      explanation: "3 3/4 - 1 1/4 = (3-1) + (3/4-1/4) = 2 + 2/4 = 2 1/2"
    },
    correctAnswer: 3,
    category: 'subtraction'
  },
  {
    id: 11,
    english: {
      question: "What is 4 1/3 - 2 2/3?",
      options: ["2 2/3", "1 2/3", "2 1/3", "1 1/3"],
      explanation: "Borrow 1 from 4: 4 1/3 = 3 4/3, then 3 4/3 - 2 2/3 = 1 2/3"
    },
    greek: {
      question: "Πόσο κάνει 4 1/3 - 2 2/3;",
      options: ["2 2/3", "1 2/3", "2 1/3", "1 1/3"],
      explanation: "Δανειζόμαστε 1 από το 4: 4 1/3 = 3 4/3, μετά 3 4/3 - 2 2/3 = 1 2/3"
    },
    correctAnswer: 1,
    category: 'subtraction'
  },
  {
    id: 12,
    english: {
      question: "What is 5 1/4 - 2 3/4?",
      options: ["3 2/4", "2 1/2", "2 2/4", "3 1/2"],
      explanation: "Borrow: 5 1/4 = 4 5/4, then 4 5/4 - 2 3/4 = 2 2/4 = 2 1/2"
    },
    greek: {
      question: "Πόσο κάνει 5 1/4 - 2 3/4;",
      options: ["3 2/4", "2 1/2", "2 2/4", "3 1/2"],
      explanation: "Δανειζόμαστε: 5 1/4 = 4 5/4, μετά 4 5/4 - 2 3/4 = 2 2/4 = 2 1/2"
    },
    correctAnswer: 1,
    category: 'subtraction'
  },

  // Multiplication of mixed numbers (Questions 13-15)
  {
    id: 13,
    english: {
      question: "What is 1 1/2 × 2?",
      options: ["2 1/2", "3", "2 2/2", "3 1/2"],
      explanation: "1 1/2 = 3/2, 3/2 × 2 = 6/2 = 3"
    },
    greek: {
      question: "Πόσο κάνει 1 1/2 × 2;",
      options: ["2 1/2", "3", "2 2/2", "3 1/2"],
      explanation: "1 1/2 = 3/2, 3/2 × 2 = 6/2 = 3"
    },
    correctAnswer: 1,
    category: 'multiplication'
  },
  {
    id: 14,
    english: {
      question: "What is 2 1/3 × 1 1/2?",
      options: ["3 1/2", "3 1/3", "2 1/2", "4"],
      explanation: "2 1/3 = 7/3, 1 1/2 = 3/2, 7/3 × 3/2 = 21/6 = 7/2 = 3 1/2"
    },
    greek: {
      question: "Πόσο κάνει 2 1/3 × 1 1/2;",
      options: ["3 1/2", "3 1/3", "2 1/2", "4"],
      explanation: "2 1/3 = 7/3, 1 1/2 = 3/2, 7/3 × 3/2 = 21/6 = 7/2 = 3 1/2"
    },
    correctAnswer: 0,
    category: 'multiplication'
  },
  {
    id: 15,
    english: {
      question: "What is 3 1/4 × 2?",
      options: ["6 1/4", "6 1/2", "5 1/2", "7"],
      explanation: "3 1/4 = 13/4, 13/4 × 2 = 26/4 = 13/2 = 6 1/2"
    },
    greek: {
      question: "Πόσο κάνει 3 1/4 × 2;",
      options: ["6 1/4", "6 1/2", "5 1/2", "7"],
      explanation: "3 1/4 = 13/4, 13/4 × 2 = 26/4 = 13/2 = 6 1/2"
    },
    correctAnswer: 1,
    category: 'multiplication'
  },

  // Division of mixed numbers (Questions 16-18)
  {
    id: 16,
    english: {
      question: "What is 2 1/2 ÷ 1/2?",
      options: ["5", "4", "3", "6"],
      explanation: "2 1/2 = 5/2, 5/2 ÷ 1/2 = 5/2 × 2/1 = 10/2 = 5"
    },
    greek: {
      question: "Πόσο κάνει 2 1/2 ÷ 1/2;",
      options: ["5", "4", "3", "6"],
      explanation: "2 1/2 = 5/2, 5/2 ÷ 1/2 = 5/2 × 2/1 = 10/2 = 5"
    },
    correctAnswer: 0,
    category: 'division'
  },
  {
    id: 17,
    english: {
      question: "What is 3 1/3 ÷ 2/3?",
      options: ["5", "4", "6", "7"],
      explanation: "3 1/3 = 10/3, 10/3 ÷ 2/3 = 10/3 × 3/2 = 30/6 = 5"
    },
    greek: {
      question: "Πόσο κάνει 3 1/3 ÷ 2/3;",
      options: ["5", "4", "6", "7"],
      explanation: "3 1/3 = 10/3, 10/3 ÷ 2/3 = 10/3 × 3/2 = 30/6 = 5"
    },
    correctAnswer: 0,
    category: 'division'
  },
  {
    id: 18,
    english: {
      question: "What is 4 1/2 ÷ 1 1/2?",
      options: ["3", "4", "2", "5"],
      explanation: "4 1/2 = 9/2, 1 1/2 = 3/2, 9/2 ÷ 3/2 = 9/2 × 2/3 = 18/6 = 3"
    },
    greek: {
      question: "Πόσο κάνει 4 1/2 ÷ 1 1/2;",
      options: ["3", "4", "2", "5"],
      explanation: "4 1/2 = 9/2, 1 1/2 = 3/2, 9/2 ÷ 3/2 = 9/2 × 2/3 = 18/6 = 3"
    },
    correctAnswer: 0,
    category: 'division'
  },

  // Word problems with mixed numbers (Questions 19-20)
  {
    id: 19,
    english: {
      question: "A recipe calls for 2 1/2 cups of flour. If you want to make 3 batches, how many cups do you need?",
      options: ["6 1/2", "7 1/2", "8", "7"],
      explanation: "2 1/2 × 3 = 5/2 × 3 = 15/2 = 7 1/2 cups"
    },
    greek: {
      question: "Μια συνταγή απαιτεί 2 1/2 φλιτζάνια αλεύρι. Αν θέλεις να κάνεις 3 παρτίδες, πόσα φλιτζάνια χρειάζεσαι;",
      options: ["6 1/2", "7 1/2", "8", "7"],
      explanation: "2 1/2 × 3 = 5/2 × 3 = 15/2 = 7 1/2 φλιτζάνια"
    },
    correctAnswer: 1,
    category: 'word-problems'
  },
  {
    id: 20,
    english: {
      question: "John has 5 1/4 meters of rope. He cuts it into pieces that are 3/4 meter each. How many pieces can he cut?",
      options: ["6", "7", "8", "5"],
      explanation: "5 1/4 = 21/4, 21/4 ÷ 3/4 = 21/4 × 4/3 = 84/12 = 7 pieces"
    },
    greek: {
      question: "Ο Γιάννης έχει 5 1/4 μέτρα σχοινί. Το κόβει σε κομμάτια των 3/4 μέτρου το καθένα. Πόσα κομμάτια μπορεί να κόψει;",
      options: ["6", "7", "8", "5"],
      explanation: "5 1/4 = 21/4, 21/4 ÷ 3/4 = 21/4 × 4/3 = 84/12 = 7 κομμάτια"
    },
    correctAnswer: 1,
    category: 'word-problems'
  }
];