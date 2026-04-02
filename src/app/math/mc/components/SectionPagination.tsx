// src/app/math/mc/components/SectionPagination.tsx

"use client";

import { SectionPaginationProps } from '../types'; // This will work since types.ts exists

export const SectionPagination = ({
  currentSection,
  totalSections,
  onPrevSection,
  onNextSection,
  onGoToSection,
  language = 'english'
}: SectionPaginationProps) => (
  <div className="my-8 flex flex-col items-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      <button
        onClick={onPrevSection}
        disabled={currentSection === 0}
        className={`px-3 py-1 rounded-md text-sm ${
          currentSection === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ← {language === 'english' ? 'Previous' : 'Προηγούμενο'}
      </button>
      
      <div className="flex gap-1 mx-2">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onGoToSection(idx)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              currentSection === idx
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <button
        onClick={onNextSection}
        disabled={currentSection === totalSections - 1}
        className={`px-3 py-1 rounded-md text-sm ${
          currentSection === totalSections - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {language === 'english' ? 'Next' : 'Επόμενο'} →
      </button>
    </div>
    <div className="text-sm text-gray-500">
      {language === 'english' ? 'Section' : 'Ενότητα'} {currentSection + 1} {language === 'english' ? 'of' : 'από'} {totalSections}
    </div>
  </div>
);