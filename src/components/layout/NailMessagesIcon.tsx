
import React from 'react';

interface NailIconProps {
  active: boolean;
}

const NailMessagesIcon: React.FC<NailIconProps> = ({ active }) => {
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
        d="M23 14.5C23 18.9183 18.9706 22.5 14 22.5C12.3501 22.5 10.8033 22.0887 9.48193 21.3719C9.0628 21.1496 8.64366 21.3898 7.46693 22C6.83308 22.3333 5.81938 22.7 5 22C5.43157 21.2964 6.14533 19.9147 5.99139 19.1375C5.36426 17.7356 5 16.1598 5 14.5C5 10.0817 9.02944 6.5 14 6.5C18.9706 6.5 23 10.0817 23 14.5Z" 
        stroke="currentColor" 
        strokeWidth={active ? "2.2" : "1.8"} 
        fill={active ? "rgba(147, 51, 234, 0.08)" : "none"}
      />
    </svg>
  );
};

export default NailMessagesIcon;
