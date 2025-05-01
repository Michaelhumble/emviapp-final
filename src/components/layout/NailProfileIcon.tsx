
import React from 'react';

interface NailIconProps {
  active: boolean;
}

const NailProfileIcon: React.FC<NailIconProps> = ({ active }) => {
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${active ? 'text-purple-600' : 'text-gray-500'}`}
    >
      <circle 
        cx="14" 
        cy="10" 
        r="5" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        fill={active ? "rgba(147, 51, 234, 0.08)" : "none"}
      />
      <path 
        d="M5.28467 22C6.16007 18.1411 9.74283 15.3333 14 15.3333C18.2572 15.3333 21.8399 18.1411 22.7153 22" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NailProfileIcon;
