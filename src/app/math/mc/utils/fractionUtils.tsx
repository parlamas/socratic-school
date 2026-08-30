// src/app/math/mc/utils/fractionUtils.ts

import React from 'react';
import Fraction from '../components/Fraction';

// Unicode fraction mappings for common fractions
const unicodeFractions: Record<string, string> = {
  '1/2': '½',
  '1/3': '⅓',
  '2/3': '⅔',
  '1/4': '¼',
  '3/4': '¾',
  '1/5': '⅕',
  '2/5': '⅖',
  '3/5': '⅗',
  '4/5': '⅘',
  '1/6': '⅙',
  '5/6': '⅚',
  '1/8': '⅛',
  '3/8': '⅜',
  '5/8': '⅝',
  '7/8': '⅞',
};

// Matches numeric fractions like "2/3" as well as simple algebraic ones like "x/4"
const fractionRegex = /([a-zA-Z]?\d*[a-zA-Z]?)\/(\d+)/g;

export const renderWithFractions = (text: string): React.ReactNode[] => {
  if (!text) return [text];
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  fractionRegex.lastIndex = 0;
  
  while ((match = fractionRegex.exec(text)) !== null) {
    const [fullMatch, numerator, denominator] = match;
    const index = match.index;
    const fractionKey = `${numerator}/${denominator}`;
    
    // Add text before the fraction
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }
    
        // Check if it's a common fraction that has a Unicode character
    if (unicodeFractions[fractionKey]) {
      parts.push(
        <span key={index} className="unicode-fraction">
          {unicodeFractions[fractionKey]}
        </span>
      );
    } else {
      // Use custom Fraction component; numeric numerators render as numbers,
      // algebraic ones (e.g. "x") render as-is
      const isNumeric = /^\d+$/.test(numerator);
      parts.push(
        <Fraction 
          key={index} 
          numerator={isNumeric ? parseInt(numerator) : numerator} 
          denominator={parseInt(denominator)} 
        />
      );
    }
    
    lastIndex = index + fullMatch.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts;
};

// Helper function to convert mixed numbers like "1 1/2" to proper notation
export const renderMixedNumber = (text: string): React.ReactNode[] => {
  // Handle patterns like "1 1/2" (whole number space fraction)
  const mixedNumberRegex = /(\d+)\s+(\d+)\/(\d+)/g;
  
  if (!text) return [text];
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  mixedNumberRegex.lastIndex = 0;
  
  while ((match = mixedNumberRegex.exec(text)) !== null) {
    const [fullMatch, whole, numerator, denominator] = match;
    const index = match.index;
    const fractionKey = `${numerator}/${denominator}`;
    
    if (index > lastIndex) {
      // Process any regular fractions in the text before this match
      const textBefore = text.substring(lastIndex, index);
      parts.push(...renderWithFractions(textBefore));
    }
    
    parts.push(
      <span key={`mixed-${index}`} className="mixed-number">
        <span className="whole-number">{whole}</span>
        {unicodeFractions[fractionKey] ? (
          <span className="unicode-fraction ml-0.5">{unicodeFractions[fractionKey]}</span>
        ) : (
          <Fraction 
            numerator={parseInt(numerator)} 
            denominator={parseInt(denominator)} 
          />
        )}
      </span>
    );
    
    lastIndex = index + fullMatch.length;
  }
  
  // Process any remaining text (which may contain regular fractions)
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    parts.push(...renderWithFractions(remainingText));
  }
  
  return parts;
};

// Unified renderer that handles both mixed numbers and fractions
export const renderMathText = (text: string): React.ReactNode[] => {
  return renderMixedNumber(text);
};