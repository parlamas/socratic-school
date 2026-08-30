// src/app/math/mc/components/Fraction.tsx

import React from 'react';

interface FractionProps {
  numerator: number | string;
  denominator: number | string;
  className?: string;
}

const Fraction: React.FC<FractionProps> = ({ numerator, denominator, className = '' }) => {
  return (
    <span className={`inline-flex flex-col items-center mx-0.5 align-middle fraction ${className}`}>
      <span className="fraction-numerator text-base leading-none">{numerator}</span>
      <span className="fraction-denominator text-base border-t border-gray-700 leading-none mt-0.5 pt-0.5">
        {denominator}
      </span>
    </span>
  );
};

export default Fraction;