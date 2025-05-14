
import React from 'react';

interface EmviLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const EmviLogo: React.FC<EmviLogoProps> = ({ 
  className = "", 
  size = "medium", 
  showText = true 
}) => {
  // Determine logo size based on prop
  let sizeClasses = "w-10 h-10";
  if (size === "small") {
    sizeClasses = "w-8 h-8";
  } else if (size === "large") {
    sizeClasses = "w-16 h-16";
  }

  // Text size based on logo size
  let textClasses = "text-2xl";
  if (size === "small") {
    textClasses = "text-xl";
  } else if (size === "large") {
    textClasses = "text-3xl";
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses} relative`}>
        <img 
          src="/lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png" 
          alt="EmviApp Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {showText && (
        <div className={`font-bold ${textClasses} tracking-tight ml-2`}>
          <span className="text-[#FF7743]">Emvi</span>
          <span className="text-[#3D3D3D]">.App</span>
        </div>
      )}
    </div>
  );
};

export default EmviLogo;
