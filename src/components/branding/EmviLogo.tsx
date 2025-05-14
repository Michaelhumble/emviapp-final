
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
  let imageWidth = 120;
  if (size === "small") {
    imageWidth = 80;
  } else if (size === "large") {
    imageWidth = 160;
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/logo/emvi-logo.png" 
        alt="EmviApp logo" 
        width={imageWidth} 
        height="auto" 
      />
    </div>
  );
};

export default EmviLogo;
