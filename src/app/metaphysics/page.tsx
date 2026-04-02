//src/app/metaphysics/page.tsx

"use client";

import { useState } from "react";
import { languages } from './data';
import { SectionPagination } from './components/SectionPagination';
import { LanguageBlock } from './components/LanguageBlock';

export default function SymposiumPage() {
  const [swelledIndices, setSwelledIndices] = useState<number[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleLanguages, setVisibleLanguages] = useState<number[]>(
    languages.map((_, index) => index) // Initially show all languages
  );

  const totalSections = languages[0].sections.length;

  const handleSwell = (index: number) => {
    if (!swelledIndices.includes(index)) {
      setSwelledIndices([...swelledIndices, index]);
    }
  };

  const handleRetreat = (index: number) => {
    setSwelledIndices(swelledIndices.filter(i => i !== index));
  };

  const isSwelled = (index: number) => swelledIndices.includes(index);

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

  const showLanguage = (langIndex: number) => {
    setVisibleLanguages([langIndex]); // Show only the selected language
  };

  const showAllLanguages = () => {
    setVisibleLanguages(languages.map((_, index) => index)); // Show all languages
  };

  return (
    <main className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2l font-semibold text-gray-900 mb-4 text-center">
          Η Μεταφυσική - Metaphysics
        </h1>
        
        {/* Section Pagination at the top */}
        <SectionPagination
          currentSection={currentSection}
          totalSections={totalSections}
          onPrevSection={prevSection}
          onNextSection={nextSection}
          onGoToSection={goToSection}
        />

        {/* Flags - clickable */}
        <div className="flex justify-center items-center gap-4 -mt-8 mb-8 mx-auto">
          {languages.map((lang, idx) => (
            <button 
              key={idx}
              onClick={() => showLanguage(idx)} 
              className={`cursor-pointer hover:opacity-80 transition-opacity ${idx === 5 ? 'relative left-[-14px]' : ''}`}
            >
              <img 
                src={getFlagImage(idx)} 
                alt={lang.name} 
                width={idx === 5 ? 75 : idx === 0 ? 45 : 46} 
                height={idx === 5 ? 75 : idx === 0 ? 45 : 46} 
                className="rounded-sm" 
              />
            </button>
          ))}
          <button 
            onClick={showAllLanguages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium transition-all"
          >
            ALL
          </button>
        </div>
        
        <p className="text-center mb-4">Click on <b>Swell</b> or click a flag to see only that language</p>

        <div className="space-y-6">
          {languages.map((language, langIndex) => {
            // Only render if this language is in the visibleLanguages array
            if (!visibleLanguages.includes(langIndex)) return null;
            
            return (
              <div key={langIndex}>
                <LanguageBlock
                  language={language}
                  langIndex={langIndex}
                  currentSection={currentSection}
                  isSwelled={isSwelled(langIndex)}
                  onSwell={handleSwell}
                  onRetreat={handleRetreat}
                  isSingleView={visibleLanguages.length === 1}
                />
                
                {/* Add section pagination between languages, but only if showing multiple languages */}
                {visibleLanguages.length > 1 && 
                 langIndex < languages.length - 1 && 
                 visibleLanguages.includes(langIndex + 1) && (
                  <SectionPagination
                    key={`pagination-${langIndex}`}
                    currentSection={currentSection}
                    totalSections={totalSections}
                    onPrevSection={prevSection}
                    onNextSection={nextSection}
                    onGoToSection={goToSection}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Add pagination below the last language */}
        {visibleLanguages.length > 0 && (
          <SectionPagination
            currentSection={currentSection}
            totalSections={totalSections}
            onPrevSection={prevSection}
            onNextSection={nextSection}
            onGoToSection={goToSection}
          />
        )}

        <div className="mt-8 text-center text-[10pt] text-gray-500">
          <p>Click section numbers to navigate. All languages show the same section simultaneously.</p>
          <p className="mt-1">Use "Swell" to highlight a translation (black background, gold text, 1.35rem font), "Retreat" to return to normal.</p>
          <p className="mt-1">Click on a flag to see only that language. Click "ALL" to see all languages again.</p>
        </div>
      </div>
    </main>
  );
}

// Helper function to get flag images
function getFlagImage(index: number): string {
  const flags = [
    "/column.webp",
    "/hlt.png",
    "/dk.svg",
    "/ukk.png",
    "/sp.png",
    "/pppp.png"
  ];
  return flags[index] || flags[0];
}
