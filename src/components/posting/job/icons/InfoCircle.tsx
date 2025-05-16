
import React from 'react';

interface InfoCircleProps {
  className?: string;
}

export const InfoCircle: React.FC<InfoCircleProps> = ({ className }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path 
        d="M8 5.5H8.00909" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path 
        d="M7.25 8H8V11H8.75" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
