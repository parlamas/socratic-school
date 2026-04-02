//src/app/math/mc/QuizComponent.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Question } from './types';
import { languageContent } from './language';
import './styles.css';
import { renderMathText } from './utils/fractionUtils';

interface QuizComponentProps {
  questions: Question[];
  language: 'english' | 'greek' | 'bilingual';
}

interface ShuffledQuestion extends Question {
  originalCorrectIndex: number; // Store original for reference
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, language }) => {
  // Shuffle options for each question
  const shuffleOptions = (questions: Question[]): ShuffledQuestion[] => {
    return questions.map(q => {
      // Create array of indices [0, 1, 2, 3]
      const indices = [0, 1, 2, 3];
      
      // Fisher-Yates shuffle algorithm
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Create new options arrays in shuffled order
      const shuffledEnglishOptions = indices.map(i => q.english.options[i]);
      const shuffledGreekOptions = indices.map(i => q.greek.options[i]);
      
      // Find where the correct answer moved to
      const newCorrectIndex = indices.findIndex(i => i === q.correctAnswer);
      
      return {
        ...q,
        english: {
          ...q.english,
          options: shuffledEnglishOptions
        },
        greek: {
          ...q.greek,
          options: shuffledGreekOptions
        },
        correctAnswer: newCorrectIndex,
        originalCorrectIndex: q.correctAnswer
      };
    });
  };

  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  
  // Initialize shuffled questions on component mount
  useEffect(() => {
    setShuffledQuestions(shuffleOptions(questions));
  }, [questions]);

  // Use shuffledQuestions if available, otherwise use original questions
  const activeQuestions = shuffledQuestions.length > 0 ? shuffledQuestions : questions;

  const quizId = `quiz-${questions[0]?.id || 'default'}`;
  
  const loadSavedState = () => {
    if (typeof window === 'undefined') {
      return {
        answers: new Array(activeQuestions.length).fill(null),
        explanationsShown: new Array(activeQuestions.length).fill(false)
      };
    }
    
    const saved = localStorage.getItem(quizId);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved quiz state', e);
      }
    }
    return {
      answers: new Array(activeQuestions.length).fill(null),
      explanationsShown: new Array(activeQuestions.length).fill(false)
    };
  };

  const savedState = loadSavedState();
  const hasSavedProgress = savedState.answers.some((a: number | null) => a !== null);
  
  const [showResumeDialog, setShowResumeDialog] = useState(hasSavedProgress);
  const [answers, setAnswers] = useState<(number | null)[]>(
    hasSavedProgress ? savedState.answers : new Array(activeQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [explanationsShown, setExplanationsShown] = useState<boolean[]>(
    hasSavedProgress ? savedState.explanationsShown : new Array(activeQuestions.length).fill(false)
  );
  
  const lang = languageContent[language === 'bilingual' ? 'english' : language];

  useEffect(() => {
    if (typeof window !== 'undefined' && !showResumeDialog) {
      localStorage.setItem(quizId, JSON.stringify({
        answers,
        explanationsShown
      }));
    }
  }, [answers, explanationsShown, quizId, showResumeDialog]);

  const handleResume = () => {
    setShowResumeDialog(false);
  };

  const handleRestart = () => {
    // Reshuffle questions on restart
    setShuffledQuestions(shuffleOptions(questions));
    setAnswers(new Array(activeQuestions.length).fill(null));
    setShowResults(false);
    setExplanationsShown(new Array(activeQuestions.length).fill(false));
    setShowResumeDialog(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(quizId);
    }
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (answers[questionIndex] !== null) return;

    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
    
    const newExplanationsShown = [...explanationsShown];
    newExplanationsShown[questionIndex] = true;
    setExplanationsShown(newExplanationsShown);
  };

  const handleSubmit = () => {
    const score = answers.reduce<number>((acc, answer, index) => {
      return acc + (answer === activeQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    setShowResults(true);
  };

  const getCategoryName = (category: string) => {
    return lang.categories[category as keyof typeof lang.categories] || category;
  };

  // Helper function to check if text contains only numbers and math symbols
  const isNumericOnly = (text: string): boolean => {
    // Remove fractions (like 1/2, 3/4) and check if what remains is just numbers and basic math symbols
    const withoutFractions = text.replace(/\d+\/\d+/g, '');
    return /^[\d\s\+\-\*\/\=\.\,\[\]\(\)]*$/.test(withoutFractions);
  };

  const renderBilingualText = (englishText: string, greekText: string) => {
    const renderedEnglish = renderMathText(englishText);
    const renderedGreek = renderMathText(greekText);
    
    if (language === 'english') return renderedEnglish;
    if (language === 'greek') return renderedGreek;
    
    // For bilingual mode, check if the text is just numbers/math
    if (isNumericOnly(englishText) && isNumericOnly(greekText)) {
      // If it's just numbers/math, show only one version
      return renderedEnglish;
    }
    
    // For text content, show both with a bullet separator
    return (
      <div className="bilingual-text">
        <span className="english-text">{renderedEnglish}</span>
        <span className="separator mx-2 text-gray-400">•</span>
        <span className="greek-text text-gray-600">{renderedGreek}</span>
      </div>
    );
  };

  // Show resume dialog if there's saved progress
  if (showResumeDialog) {
    const answeredCount = answers.filter((a: number | null) => a !== null).length;
    const totalCount = activeQuestions.length;
    const percentComplete = Math.round((answeredCount / totalCount) * 100);
    
    return (
      <div className="quiz-container">
        <div className="resume-dialog bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">
            {language === 'english' ? 'Resume Quiz?' : 'Συνέχεια Κουίζ;'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'english' 
              ? `You have completed ${answeredCount} out of ${totalCount} questions (${percentComplete}%).` 
              : `Έχετε ολοκληρώσει ${answeredCount} από ${totalCount} ερωτήσεις (${percentComplete}%).`}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleResume}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {language === 'english' ? 'Continue' : 'Συνέχεια'}
            </button>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              {language === 'english' ? 'Start Over' : 'Από την Αρχή'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = answers.reduce<number>((acc, answer, index) => {
      return acc + (answer === activeQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (score / activeQuestions.length) * 100;

    return (
      <div className="quiz-container">
        <h2 className="text-2xl font-bold mb-4">{lang.results.title}</h2>
        
        <div className="results-card bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{activeQuestions.length}</div>
            <div className="text-2xl text-gray-700">{percentage.toFixed(1)}%</div>
          </div>
          
          <div className="space-y-4">
            {activeQuestions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              
              return (
                <div key={question.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{lang.results.question} {question.id}</span>
                    <span className={`px-2 py-1 rounded text-sm ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="mb-2 math-expression">
                    {renderBilingualText(question.english.question, question.greek.question)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">{lang.results.yourAnswer}:</span> 
                    <span className="math-expression ml-1">
                      {answers[index] !== null 
                        ? renderBilingualText(
                            question.english.options[answers[index]!],
                            question.greek.options[answers[index]!]
                          )
                        : lang.results.notAnswered}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{lang.results.correctAnswer}:</span> 
                    <span className="math-expression ml-1">
                      {renderBilingualText(
                        question.english.options[question.correctAnswer],
                        question.greek.options[question.correctAnswer]
                      )}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">📚 {language === 'english' ? 'Explanation' : language === 'greek' ? 'Εξήγηση' : 'Explanation / Εξήγηση'}:</span> 
                      <span className="math-expression ml-1">
                        {renderBilingualText(question.english.explanation, question.greek.explanation)}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          
          <button onClick={handleRestart} className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {lang.restart}
          </button>
        </div>
      </div>
    );
  }

  const currentScore = answers.reduce<number>((acc, answer, index) => {
    return acc + (answer !== null && answer === activeQuestions[index].correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="quiz-container">
      <div className="quiz-header flex justify-between items-center mb-6">
        <div className="progress text-gray-600">
          {activeQuestions.length} {language === 'english' ? 'questions' : language === 'greek' ? 'ερωτήσεις' : 'questions / ερωτήσεις'}
        </div>
        <div className="score font-semibold">
          {language === 'english' ? 'Score' : language === 'greek' ? 'Σκορ' : 'Score / Σκορ'}: {currentScore} / {activeQuestions.length}
        </div>
      </div>

      {activeQuestions.map((question, questionIndex) => {
        const selectedAnswer = answers[questionIndex];
        const isAnswered = selectedAnswer !== null;
        const showThisExplanation = explanationsShown[questionIndex];

        return (
          <div key={question.id} className="question-card bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="question-number bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {language === 'english' ? 'Question' : language === 'greek' ? 'Ερώτηση' : 'Question / Ερώτηση'} #{question.id}
              </div>
              <div className="category-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {getCategoryName(question.category)}
              </div>
            </div>

            <h2 className="question-text text-lg font-medium mb-4 math-expression">
              {renderBilingualText(question.english.question, question.greek.question)}
            </h2>
            
            <div className="options space-y-3">
              {question.english.options.map((engOption, optionIndex) => {
                const greekOption = question.greek.options[optionIndex];
                const renderedEngOption = renderMathText(engOption);
                const renderedGreekOption = renderMathText(greekOption);
                
                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedAnswer === optionIndex 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    } ${
                      showThisExplanation && optionIndex === question.correctAnswer 
                        ? 'border-green-500 bg-green-50' 
                        : ''
                    } ${
                      showThisExplanation && selectedAnswer === optionIndex && selectedAnswer !== question.correctAnswer 
                        ? 'border-red-500 bg-red-50' 
                        : ''
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="option-letter font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                    <span className="math-expression">
                      {language === 'bilingual' ? (
                        // Check if option is numeric-only
                        isNumericOnly(engOption) && isNumericOnly(greekOption) ? (
                          renderedEngOption
                        ) : (
                          <span>
                            <span className="english-text">{renderedEngOption}</span>
                            <span className="separator mx-2 text-gray-400">•</span>
                            <span className="greek-text text-gray-600">{renderedGreekOption}</span>
                          </span>
                        )
                      ) : language === 'english' ? renderedEngOption : renderedGreekOption}
                    </span>
                  </button>
                );
              })}
            </div>

            {showThisExplanation && isAnswered && (
              <div className="explanation-box mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">
                    📚 {language === 'english' ? 'Explanation' : language === 'greek' ? 'Εξήγηση' : 'Explanation / Εξήγηση'}:
                  </span> 
                  <span className="math-expression ml-1">
                    {renderBilingualText(question.english.explanation, question.greek.explanation)}
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      })}

      <button 
        onClick={handleSubmit} 
        disabled={answers.some(a => a === null)}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
          answers.some(a => a === null)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {language === 'english' ? 'Submit Quiz' : language === 'greek' ? 'Υποβολή' : 'Submit / Υποβολή'}
      </button>
    </div>
  );
};

export default QuizComponent;