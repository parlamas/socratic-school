//src/app/symposium/components/SectionPagination.tsx

"use client";

import { SectionPaginationProps } from '../types';

export const SectionPagination = ({
  currentSection,
  totalSections,
  onPrevSection,
  onNextSection,
  onGoToSection
}: SectionPaginationProps) => {
  // Calculate the range of page numbers to display (show 10 numbers)
  const getPageNumbers = () => {
    const maxVisible = 6;
    
    if (totalSections <= maxVisible) {
      // If total sections are 10 or less, show all
      return Array.from({ length: totalSections }, (_, i) => i);
    }
    
    // Calculate start and end indices
    let start = Math.max(0, currentSection - Math.floor(maxVisible / 2));
    let end = Math.min(totalSections, start + maxVisible);
    
    // Adjust if we're near the end
    if (end === totalSections) {
      start = Math.max(0, totalSections - maxVisible);
    }
    
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();
  const showLeftEllipsis = pageNumbers[0] > 0;
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalSections - 1;

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 mb-2">
       <button
  onClick={onPrevSection}
  disabled={currentSection === 0}
  className={`px-2 py-0.5 rounded-md text-xs ${
    currentSection === 0
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }`}
>
  ← Previous
</button>
        
        <div className="flex gap-1 mx-2 items-center">
          {/* First page button with ellipsis if needed */}
          {showLeftEllipsis && (
            <>
              <button
                onClick={() => onGoToSection(0)}
                className="w-8 h-8 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                1
              </button>
              <span className="text-gray-500 px-1">...</span>
            </>
          )}
          
          {/* Visible page numbers */}
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onGoToSection(pageNum)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                currentSection === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
          
          {/* Last page button with ellipsis if needed */}
          {showRightEllipsis && (
            <>
              <span className="text-gray-500 px-1">...</span>
              <button
                onClick={() => onGoToSection(totalSections - 1)}
                className="w-8 h-8 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                {totalSections}
              </button>
            </>
          )}
        </div>

        <button
  onClick={onNextSection}
  disabled={currentSection === totalSections - 1}
  className={`px-2 py-0.5 rounded-md text-xs ${
    currentSection === totalSections - 1
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }`}
>
  Next →
</button>
      </div>
      <div className="text-sm text-gray-500">
        Section {currentSection + 1} of {totalSections}
      </div>
    </div>
  );
};