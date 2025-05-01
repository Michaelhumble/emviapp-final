
import React from 'react';

interface NailIconProps {
  active: boolean;
}

const NailBookingsIcon: React.FC<NailIconProps> = ({ active }) => {
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
        d="M14 23C19.5228 23 24 18.5228 24 13C24 7.47715 19.5228 3 14 3C8.47715 3 4 7.47715 4 13C4 18.5228 8.47715 23 14 23Z" 
        stroke="currentColor" 
        strokeWidth={active ? "2.1" : "1.8"} 
        fill={active ? "rgba(147, 51, 234, 0.08)" : "none"}
      />
      <path 
        d="M14.0029 8V13H19.0029" 
        stroke="currentColor" 
        strokeWidth={active ? "2.1" : "1.8"} 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NailBookingsIcon;
