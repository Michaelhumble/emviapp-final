
import React from 'react';

interface NailIconProps {
  active: boolean;
}

const NailHomeIcon: React.FC<NailIconProps> = ({ active }) => {
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${active ? 'text-purple-600' : 'text-gray-500'}`}
    >
      <path 
        d="M23.1 26V11.76L14 4.41L4.9 11.76V26H10.15V17.5H17.85V26H23.1Z" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        fill={active ? "rgba(147, 51, 234, 0.08)" : "none"}
      />
    </svg>
  );
};

export default NailHomeIcon;
