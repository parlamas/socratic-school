//src/app/math/mc/data/questions.ts

import { Question } from '../types';

export const questions: Question[] = [
  // Basic Concepts (Questions 1-5)
  {
    id: 1,
    english: {
      question: "How many sides does an equation have?",
      options: ["One side", "Two sides", "Three sides", "It depends on the equation"],
      explanation: "An equation always has two sides: the left-hand side (LHS) and the right-hand side (RHS), separated by an equals sign (=)."
    },
    greek: {
      question: "Πόσα μέλη έχει μια εξίσωση;",
      options: ["Ενα μέλος", "Δύο μέλη", "Τρία μέλη", "Εξαρτάται από την εξίσωση"],
      explanation: "Μια εξίσωση έχει πάντα δύο μέλη: το αριστερό μέλος και το δεξί μέλος, που χωρίζονται από το σύμβολο της ισότητας (=)."
    },
    correctAnswer: 1,
    category: 'basic'
  },
  {
    id: 2,
    english: {
      question: "What separates the two sides of an equation?",
      options: ["A plus sign (+)", "A minus sign (-)", "An equals sign (=)", "A multiplication sign (×)"],
      explanation: "The equals sign (=) is the symbol that separates the left side from the right side of an equation."
    },
    greek: {
      question: "Τι χωρίζει τα δύο μέλη μίας εξίσωσης;",
      options: ["Το σύμβολο συν (+)", "Το σύμβολο πλην (-)", "Το σύμβολο ίσον (=)", "Το σύμβολο πολλαπλασιασμού (×)"],
      explanation: "Το σύμβολο ίσον (=) είναι το σύμβολο που χωρίζει το αριστερό μέλος από το δεξί μέλος μίας εξίσωσης."
    },
    correctAnswer: 2,
    category: 'basic'
  },
  {
    id: 3,
    english: {
      question: "What is the meaning of the equals sign (=) in mathematics?",
      options: [
        "The left side is greater than the right side",
        "The left side is less than the right side",
        "Both sides have the same value",
        "The sides are approximately equal"
      ],
      explanation: "The equals sign indicates that the expressions on both sides have exactly the same numerical value."
    },
    greek: {
      question: "Ποιά είναι η σημασία του συμβόλου ίσον (=) στα μαθηματικά;",
      options: [
        "Το αριστερό μέλος είναι μεγαλύτερο από το δεξί",
        "Το αριστερό μέλος είναι μικρότερο από το δεξί",
        "Και τα δύο μέλη έχουν την ίδια τιμή",
        "Τα μέλη είναι περίπου ίσα"
      ],
      explanation: "Το σύμβολο ίσον δείχνει ότι τα δύο μέλη έχουν ακριβώς την ίδια αριθμητική τιμή."
    },
    correctAnswer: 2,
    category: 'basic'
  },
  {
    id: 4,
    english: {
      question: "Which of the following is NOT an equation?",
      options: [
        "3x + 5 = 11",
        "2(x + 3) = 14",
        "x² + 2x - 8 > 0",
        "4y - 7 = 2y + 1"
      ],
      explanation: "x² + 2x - 8 > 0 is an inequality, not an equation. Equations always use an equals sign (=), while inequalities use symbols like >, <, ≥, or ≤."
    },
    greek: {
      question: "Ποιο από τα παρακάτω ΔΕΝ είναι εξίσωση;",
      options: [
        "3x + 5 = 11",
        "2(x + 3) = 14",
        "x² + 2x - 8 > 0",
        "4y - 7 = 2y + 1"
      ],
      explanation: "x² + 2x - 8 > 0 είναι ανίσωση, όχι εξίσωση. Οι εξισώσεις χρησιμοποιούν πάντα το σύμβολο ίσον (=), ενώ οι ανισώσεις χρησιμοποιούν σύμβολα όπως >, <, ≥, ή ≤."
    },
    correctAnswer: 2,
    category: 'basic'
  },
  {
    id: 5,
    english: {
      question: "What are the parts of an equation called that are separated by + or - signs?",
      options: ["Factors", "Terms", "Products", "Coefficients"],
      explanation: "The parts of an equation separated by + or - signs are called terms. For example, in 2x + 3y - 5, there are three terms: 2x, 3y, and -5."
    },
    greek: {
      question: "Πώς ονομάζονται τα μέρη μίας εξίσωσης που χωρίζονται με τα σύμβολα + ή -;",
      options: ["Παράγοντες", "Όροι", "Γινόμενα", "Συντελεστές"],
      explanation: "Τα μέρη μιας εξίσωσης που χωρίζονται με σύμβολα + ή - ονομάζονται όροι. Για παράδειγμα, στο 2x + 3y - 5, υπάρχουν τρεις όροι: 2x, 3y, και -5."
    },
    correctAnswer: 1,
    category: 'basic'
  },

  // Manipulation Rules (Questions 6-10)
  {
    id: 6,
    english: {
      question: "How many terms can an equation have?",
      options: ["Maximum 2 terms", "Maximum 4 terms", "Maximum 10 terms", "Any number of terms"],
      explanation: "An equation can have any number of terms. For example: 2x + 3y - 5z + 7 = 4x - 2y + 9 has multiple terms on both sides."
    },
    greek: {
      question: "Πόσους όρους μπορεί να έχει μια εξίσωση;",
      options: ["Το πολύ 2 όρους", "Το πολύ 4 όρους", "Το πολύ 10 όρους", "Οποιονδήποτε αριθμό όρων"],
      explanation: "Μια εξίσωση μπορεί να έχει οποιονδήποτε αριθμό όρων. Για παράδειγμα: 2x + 3y - 5z + 7 = 4x - 2y + 9 έχει πολλούς όρους και στις δύο πλευρές."
    },
    correctAnswer: 3,
    category: 'manipulation'
  },
  {
    id: 7,
    english: {
      question: "When moving a term from one side of an equation to the other, what happens to its sign?",
      options: ["It stays the same", "It changes to the opposite sign", "It becomes zero", "It becomes positive"],
      explanation: "When you move a term from one side of an equation to the other, you must change its sign. For example, in x + 3 = 7, moving +3 to the right side gives x = 7 - 3."
    },
    greek: {
      question: "Όταν μεταφέρουμε έναν όρο από το ένα μέλος της εξίσωσης στο άλλο, τι συμβαίνει με το πρόσημό του;",
      options: ["Παραμένει το ίδιο", "Αλλάζει στο αντίθετο πρόσημο", "Γίνεται μηδέν", "Γίνεται θετικό"],
      explanation: "Όταν μεταφέρουμε έναν όρο από το ένα μέλος της εξίσωσης στο άλλο, πρέπει να αλλάξουμε το πρόσημό του. Για παράδειγμα, στο x + 3 = 7, μεταφέροντας το +3 στη δεξιά πλευρά έχουμε x = 7 - 3."
    },
    correctAnswer: 1,
    category: 'manipulation'
  },
  {
    id: 8,
    english: {
      question: "What is the golden rule of equation manipulation?",
      options: [
        "Always add first, then subtract",
        "Whatever you do to one side, you must do to the other",
        "Never move terms with variables",
        "Always keep variables on the left side"
      ],
      explanation: "The fundamental principle of equations: whatever operation you perform on one side, you must perform the exact same operation on the other side to maintain equality."
    },
    greek: {
      question: "Ποιός είναι ο χρυσός κανόνας της επεξεργασίας εξισώσεων;",
      options: [
        "Πάντα πρώτα πρόσθεσε, μετά αφαίρεσε",
        "Ό,τι κάνεις στο ένα μέλος, πρέπει να κάνεις και στο άλλο",
        "Ποτέ μη μεταφέρεις όρους με μεταβλητές",
        "Πάντα να κρατάς τις μεταβλητές στην αριστερή πλευρά"
      ],
      explanation: "Η θεμελιώδης αρχή των εξισώσεων: όποια πράξη κάνεις στο ένα μέλος, πρέπει να κάνεις ακριβώς την ίδια πράξη και στο άλλο μέλος για να διατηρηθεί η ισότητα."
    },
    correctAnswer: 1,
    category: 'manipulation'
  },
  {
    id: 9,
    english: {
      question: "What happens to an equation when you add the same number to both sides?",
      options: [
        "The equation becomes unbalanced",
        "The solution changes",
        "The equality is preserved",
        "The equation becomes more complex"
      ],
      explanation: "Adding the same number to both sides of an equation preserves the equality. This is a fundamental property used in solving equations."
    },
    greek: {
      question: "Τι συμβαίνει σε μια εξίσωση όταν προσθέσουμε τον ίδιο αριθμό και στις δύο πλευρές;",
      options: [
        "Η εξίσωση χάνει την ισορροπία της",
        "Η λύση αλλάζει",
        "Η ισότητα διατηρείται",
        "Η εξίσωση γίνεται πιο περίπλοκη"
      ],
      explanation: "Προσθέτοντας τον ίδιο αριθμό και στις δύο πλευρές μιας εξίσωσης διατηρείται η ισότητα. Αυτή είναι μια θεμελιώδης ιδιότητα που χρησιμοποιείται στην επίλυση εξισώσεων."
    },
    correctAnswer: 2,
    category: 'manipulation'
  },
  {
    id: 10,
    english: {
      question: "What happens to an equation when you multiply both sides by the same non-zero number?",
      options: [
        "The equation becomes invalid",
        "The solution remains the same",
        "The solution changes",
        "Only the left side changes"
      ],
      explanation: "Multiplying both sides of an equation by the same non-zero number creates an equivalent equation with the same solution."
    },
    greek: {
      question: "Τι συμβαίνει σε μια εξίσωση όταν πολλαπλασιάσουμε και τις δύο πλευρές με τον ίδιο μη μηδενικό αριθμό;",
      options: [
        "Η εξίσωση γίνεται άκυρη",
        "Η λύση παραμένει η ίδια",
        "Η λύση αλλάζει",
        "Αλλάζει μόνο το αριστερό μέλος"
      ],
      explanation: "Πολλαπλασιάζοντας και τα δύο μέλη μίας εξίσωσης με τον ίδιο μη μηδενικό αριθμό δημιουργείται μια ισοδύναμη εξίσωση με την ίδια λύση."
    },
    correctAnswer: 1,
    category: 'manipulation'
  },

  // Solving Equations (Questions 11-15)
  {
    id: 11,
    english: {
      question: "In the equation 2x + 5 = 13, what is the first step to isolate x?",
      options: [
        "Divide both sides by 2",
        "Subtract 5 from both sides",
        "Add 5 to both sides",
        "Move 2x to the right side"
      ],
      explanation: "To isolate x, first subtract 5 from both sides: 2x + 5 - 5 = 13 - 5, which simplifies to 2x = 8."
    },
    greek: {
      question: "Στην εξίσωση 2x + 5 = 13, ποιο είναι το πρώτο βήμα για να απομονωθεί το x;",
      options: [
        "Διαιρούμε και τα δύο μέλη με 2",
        "Αφαιρούμε 5 και από τα δύο μέλη",
        "Προσθέτουμε 5 και στα δύο μέλη",
        "Μεταφέρουμε το 2x στο δεξί μέλος"
      ],
      explanation: "Για να απομονωθεί το x, πρώτα αφαιρούμε 5 και από τις δύο πλευρές: 2x + 5 - 5 = 13 - 5, που απλοποιείται σε 2x = 8."
    },
    correctAnswer: 1,
    category: 'solving'
  },
  {
    id: 12,
    english: {
      question: "What is the solution to the equation x - 7 = 15?",
      options: ["x = 8", "x = 22", "x = -8", "x = 105"],
      explanation: "Add 7 to both sides: x - 7 + 7 = 15 + 7, so x = 22."
    },
    greek: {
      question: "Ποιά είναι η λύση της εξίσωσης x - 7 = 15;",
      options: ["x = 8", "x = 22", "x = -8", "x = 105"],
      explanation: "Προσθέτουμε 7 και στα δύο μέλη: x - 7 + 7 = 15 + 7, άρα x = 22."
    },
    correctAnswer: 1,
    category: 'solving'
  },
  {
    id: 13,
    english: {
      question: "What is the solution to the equation 3x = 18?",
      options: ["x = 6", "x = 15", "x = 21", "x = 54"],
      explanation: "Divide both sides by 3: 3x/3 = 18/3, so x = 6."
    },
    greek: {
      question: "Ποιά είναι η λύση της εξίσωσης 3x = 18;",
      options: ["x = 6", "x = 15", "x = 21", "x = 54"],
      explanation: "Διαιρούμε και τα δύο μέλη με 3: 3x/3 = 18/3, άρα x = 6."
    },
    correctAnswer: 0,
    category: 'solving'
  },
  {
    id: 14,
    english: {
      question: "What is the solution to the equation x/4 = 7?",
      options: ["x = 11", "x = 3", "x = 28", "x = 1.75"],
      explanation: "Multiply both sides by 4: (x/4) × 4 = 7 × 4, so x = 28."
    },
    greek: {
      question: "Ποιά είναι η λύση της εξίσωσης x/4 = 7;",
      options: ["x = 11", "x = 3", "x = 28", "x = 1,75"],
      explanation: "Πολλαπλασιάζουμε και τα δύο μέλη με 4: (x/4) × 4 = 7 × 4, άρα x = 28."
    },
    correctAnswer: 2,
    category: 'solving'
  },
  {
    id: 15,
    english: {
      question: "What is the first step to solve 2(x + 3) = 14?",
      options: [
        "Divide both sides by 2",
        "Subtract 3 from both sides",
        "Expand the brackets: 2x + 6 = 14",
        "Move x to one side"
      ],
      explanation: "First, expand the brackets: 2(x + 3) = 14 becomes 2x + 6 = 14. Then solve normally."
    },
    greek: {
      question: "Ποιό είναι το πρώτο βήμα για να λύσουμε το 2(x + 3) = 14;",
      options: [
        "Διαιρούμε και τα δύο μέλη με 2",
        "Αφαιρούμε 3 και από τα δύο μέλη",
        "Αναπτύσσουμε την παρένθεση: 2x + 6 = 14",
        "Μεταφέρουμε το x στο ένα μέλος"
      ],
      explanation: "Πρώτα, αναπτύσσουμε την παρένθεση: 2(x + 3) = 14 γίνεται 2x + 6 = 14. Στη συνέχεια λύνουμε κανονικά."
    },
    correctAnswer: 2,
    category: 'solving'
  },

  // Advanced Concepts (Questions 16-20)
  {
    id: 16,
    english: {
      question: "What happens to an equation when you multiply both sides by zero?",
      options: [
        "It becomes 0 = 0, losing information",
        "It becomes twice as large",
        "It stays the same",
        "It becomes impossible to solve"
      ],
      explanation: "Multiplying both sides of an equation by zero results in 0 = 0, which is true but eliminates all the information in the original equation."
    },
    greek: {
      question: "Τί συμβαίνει σε μία εξίσωση όταν πολλαπλασιάσουμε και τα δύο μέλη με το μηδέν;",
      options: [
        "Γίνεται 0 = 0, χάνοντας όλες τις πληροφορίες",
        "Γίνεται διπλάσια",
        "Παραμένει η ίδια",
        "Γίνεται αδύνατο να λυθεί"
      ],
      explanation: "Πολλαπλασιάζοντας και τις δύο πλευρές μίας εξίσωσης με το μηδέν έχουμε 0 = 0, που είναι αληθές αλλά εξαλείφει όλες τις πληροφορίες της αρχικής εξίσωσης."
    },
    correctAnswer: 0,
    category: 'advanced'
  },
  {
    id: 17,
    english: {
      question: "When should you change the signs of terms when solving equations?",
      options: [
        "Always, in every step",
        "When moving terms across the equals sign",
        "Never change signs",
        "Only when multiplying by negative numbers"
      ],
      explanation: "You change the sign of a term when moving it from one side of the equation to the other. For example, if you move +3 to the other side, it becomes -3."
    },
    greek: {
      question: "Πότε πρέπει να αλλάζουμε τα πρόσημα των όρων όταν λύνουμε εξισώσεις;",
      options: [
        "Πάντα, σε κάθε βήμα",
        "Όταν μεταφέρουμε όρους από το ένα μέλος στο άλλο",
        "Ποτέ δεν αλλάζουμε πρόσημα",
        "Μόνο όταν πολλαπλασιάζουμε με αρνητικούς αριθμούς"
      ],
      explanation: "Αλλάζουμε το πρόσημο ενός όρου όταν τον μεταφέρουμε από το ένα μέλος της εξίσωσης στο άλλο. Για παράδειγμα, αν μεταφέρουμε το +3 στο άλλο μέλο;ς, γίνεται -3."
    },
    correctAnswer: 1,
    category: 'advanced'
  },
  {
    id: 18,
    english: {
      question: "What is an identity in algebra?",
      options: [
        "An equation that is true for all values of the variable",
        "An equation with no solution",
        "An equation with exactly one solution",
        "An equation with two solutions"
      ],
      explanation: "An identity is an equation that is true for all values of the variable, such as 2(x + 1) = 2x + 2."
    },
    greek: {
      question: "Τί είναι μια ταυτότητα στην άλγεβρα;",
      options: [
        "Μια εξίσωση που ισχύει για όλες τις τιμές της μεταβλητής",
        "Μια εξίσωση χωρίς λύση",
        "Μια εξίσωση με ακριβώς μία λύση",
        "Μια εξίσωση με δύο λύσεις"
      ],
      explanation: "Ταυτότητα είναι μια εξίσωση που ισχύει για όλες τις τιμές της μεταβλητής, όπως 2(x + 1) = 2x + 2."
    },
    correctAnswer: 0,
    category: 'advanced'
  },
  {
    id: 19,
    english: {
      question: "What is a conditional equation?",
      options: [
        "An equation that is true only for certain values of the variable",
        "An equation that is always false",
        "An equation with no equals sign",
        "An equation with conditions attached"
      ],
      explanation: "A conditional equation is true only for specific values of the variable. Most equations we solve are conditional equations."
    },
    greek: {
      question: "Τί είναι μια εξίσωση υπό συνθήκη;",
      options: [
        "Μια εξίσωση που ισχύει μόνο για ορισμένες τιμές της μεταβλητής",
        "Μια εξίσωση που είναι πάντα ψευδής",
        "Μια εξίσωση χωρίς σύμβολο ίσον",
        "Μια εξίσωση με συνημμένες συνθήκες"
      ],
      explanation: "Μια εξίσωση υπό συνθήκη ισχύει μόνο για συγκεκριμένες τιμές της μεταβλητής. Οι περισσότερες εξισώσεις που λύνουμε είναι εξισώσεις υπό συνθήκη."
    },
    correctAnswer: 0,
    category: 'advanced'
  },
  {
    id: 20,
    english: {
      question: "What is the difference between an expression and an equation?",
      options: [
        "An expression has an equals sign, an equation doesn't",
        "An equation has an equals sign, an expression doesn't",
        "They are the same thing",
        "An expression always has variables, an equation never does"
      ],
      explanation: "An equation contains an equals sign (=) showing that two expressions are equal. An expression is just a mathematical phrase without an equals sign."
    },
    greek: {
      question: "Ποιά είναι η διαφορά μεταξύ μίας παράστασης και μίας εξίσωσης;",
      options: [
        "Μια παράσταση έχει σύμβολο ίσον, μια εξίσωση δεν έχει",
        "Μια εξίσωση έχει σύμβολο ίσον, μια παράσταση δεν έχει",
        "Είναι το ίδιο πράγμα",
        "Μία παράσταση έχει πάντα μεταβλητές, μία εξίσωση ποτέ"
      ],
      explanation: "Μία εξίσωση περιέχει σύμβολο ίσον (=) που δείχνει ότι δύο παραστάσεις είναι ίσες. Μια παράσταση είναι απλά μια μαθηματική φράση χωρίς το σύμβολο ίσον (=)."
    },
    correctAnswer: 1,
    category: 'advanced'
  }
];

