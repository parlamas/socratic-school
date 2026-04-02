//src/app/republic/components/LanguageBlock.tsx

"use client";

import { LanguageBlockProps } from '../types';

export const LanguageBlock = ({
  language,
  langIndex,
  currentSection,
  isSwelled,
  onSwell,
  onRetreat,
  isSingleView
}: LanguageBlockProps) => (
  <div
    className={`border rounded-lg p-6 transition-all duration-500 ease-in-out ${
      isSwelled ? 'border-gray-700' : 'border-gray-200'
    }`}
    style={{
      transform: isSwelled ? 'scale(1.05)' : 'scale(1)',
      backgroundColor: isSwelled ? '#000000' : '#ffffff',
      color: isSwelled ? '#FFD700' : 'inherit',
      boxShadow: isSwelled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
      zIndex: isSwelled ? 10 : 1,
      position: 'relative'
    }}
  >
    <div className="flex items-start gap-4">
      {/* Section number on the left */}
      <div 
        className="flex-shrink-0 font-mono text-4xl font-light leading-none mt-1"
        style={{ 
          color: isSwelled ? '#FFD700' : '#9ca3af',
          opacity: isSwelled ? 1 : 0.5
        }}
      >
        {currentSection + 1}.
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h2 
            className="text-lg font-medium"
            style={{ color: isSwelled ? '#FFD700' : '#1f2937' }}
          >
            {language.name}
            {isSingleView && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2">Selected</span>
            )}
          </h2>
          
          <button
            onClick={() => onSwell(langIndex)}
            disabled={isSwelled}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              isSwelled 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Swell
          </button>
        </div>
        
        {/* Using dangerouslySetInnerHTML to render <br /> tags */}
        <div 
          className="leading-relaxed transition-all duration-500"
          style={{
            fontSize: isSwelled ? '1.35rem' : '1rem',
            lineHeight: isSwelled ? '1.75' : '1.6',
            color: isSwelled ? '#FFD700' : '#374151'
          }}
          dangerouslySetInnerHTML={{ __html: language.sections[currentSection] }}
        />

        {isSwelled && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs bg-gray-800 text-[#FFD700] px-2 py-1 rounded-full inline-flex items-center border border-gray-700">
              <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mr-1.5 animate-pulse"></span>
              Swelled
            </span>
            
            <button
              onClick={() => onRetreat(langIndex)}
              className="px-3 py-1 text-xs rounded-full transition-all bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
            >
              Retreat
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);