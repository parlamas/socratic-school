// src/app/math/mc/page.tsx

"use client";

import { useState } from "react";
import { quizSections } from './data';
import { SectionPagination } from './components/SectionPagination';
import QuizComponent from './QuizComponent';

export default function MathMCPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [language, setLanguage] = useState<'english' | 'greek' | 'bilingual'>('english');

  const totalSections = quizSections.length;

  const goToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <main className="bg-white min-h-screen py-4 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Compact header with title and language buttons on same line */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-900">
            {language === 'english' 
              ? 'Math Multiple Choice' 
              : language === 'greek'
                ? 'Μαθηματικά Πολλαπλής Επιλογής'
                : 'Math / Μαθηματικά'}
          </h1>
          
          {/* Compact language buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage('greek')}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                language === 'greek'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ελληνικά
            </button>
            
            <button
              onClick={() => setLanguage('english')}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                language === 'english'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
            
            <button
              onClick={() => setLanguage('bilingual')}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                language === 'bilingual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ελληνικά & English
            </button>
          </div>
        </div>
        
        {/* Compact section info - moved up */}
        <div className="flex items-center justify-between mb-2 text-sm">
          <h2 className="text-gray-700">
            {language === 'english' 
              ? quizSections[currentSection].title.english 
              : language === 'greek'
                ? quizSections[currentSection].title.greek
                : `${quizSections[currentSection].title.english} / ${quizSections[currentSection].title.greek}`}
          </h2>
          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
            {quizSections[currentSection].questions.length} {language === 'english' ? 'q' : language === 'greek' ? 'ερ' : 'q / ερ'}
          </span>
        </div>

        {/* Section Pagination at the top - more compact */}
        <div className="mb-3">
          <SectionPagination
            currentSection={currentSection}
            totalSections={totalSections}
            onPrevSection={prevSection}
            onNextSection={nextSection}
            onGoToSection={goToSection}
            language={language === 'bilingual' ? 'english' : language}
          />
        </div>

        {/* Quiz Component */}
        <QuizComponent 
          key={currentSection}
          questions={quizSections[currentSection].questions}
          language={language}
        />
        
        {/* Section Pagination at the bottom */}
        <SectionPagination
          currentSection={currentSection}
          totalSections={totalSections}
          onPrevSection={prevSection}
          onNextSection={nextSection}
          onGoToSection={goToSection}
          language={language === 'bilingual' ? 'english' : language}
        />

        {/* Compact footer */}
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Click section numbers • Switch language • Learn math bilingually</p>
        </div>
      </div>
    </main>
  );
}