
import React from 'react';

interface EmviLogoProps {
  className?: string;
}

const EmviLogo: React.FC<EmviLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4E00] to-[#FF9E00] flex items-center justify-center mr-2">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M5 12L10 17L19 8" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-bold text-2xl tracking-tight">
        <span style={{
          backgroundImage: "linear-gradient(to right, #FF4E00, #FFCC00)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent"
        }}>Emvi</span>
        <span className="text-black">.App</span>
      </div>
    </div>
  );
};

export default EmviLogo;
