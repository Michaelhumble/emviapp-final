
import React from 'react';

interface EmviLogoProps {
  className?: string;
}

const EmviLogo: React.FC<EmviLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <defs>
          <linearGradient id="emviGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#FF4500" />
          </linearGradient>
        </defs>
        <path
          d="M6 4L16 28L26 4"
          stroke="url(#emviGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-bold text-2xl bg-gradient-to-r from-[#FF0000] to-[#FF4500] bg-clip-text text-transparent">
        EmviApp
      </span>
    </div>
  );
};

export default EmviLogo;
