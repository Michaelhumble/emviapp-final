import React from 'react';

interface ChatIconProps {
  size?: number;
}

export const ChatIcon = ({ size = 24 }: ChatIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun rays */}
      <g className="animate-spin" style={{ transformOrigin: '12px 12px', animationDuration: '8s' }}>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="2"
            x2="12"
            y2="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 12 12)`}
          />
        ))}
      </g>
      
      {/* Sun center */}
      <circle
        cx="12"
        cy="12"
        r="6"
        fill="currentColor"
        className="animate-pulse"
      />
      
      {/* Smile */}
      <path
        d="M9 13c0 1.5 1.34 3 3 3s3-1.5 3-3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Eyes */}
      <circle cx="9" cy="10" r="1" fill="white" />
      <circle cx="15" cy="10" r="1" fill="white" />
    </svg>
  );
};