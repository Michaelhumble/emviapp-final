
import React from 'react';

interface EmviLogoProps {
  className?: string;
}

const EmviLogo: React.FC<EmviLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="font-bold text-2xl tracking-tight">
        <span className="text-black">Em</span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #FF0000, #FF4500)",
            WebkitBackgroundClip: "text",
          }}
        >
          V
        </span>
        <span className="text-black">iApp</span>
      </div>
    </div>
  );
};

export default EmviLogo;
