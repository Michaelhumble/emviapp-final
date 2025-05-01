
import React from 'react';

interface NailIconProps {
  active: boolean;
}

const NailSearchIcon: React.FC<NailIconProps> = ({ active }) => {
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
        cx="13" 
        cy="13" 
        r="8" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        fill={active ? "rgba(147, 51, 234, 0.08)" : "none"}
      />
      <path 
        d="M23 23L19 19" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NailSearchIcon;
