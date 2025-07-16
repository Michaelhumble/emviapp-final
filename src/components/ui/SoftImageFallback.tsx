import React from 'react';

interface SoftImageFallbackProps {
  className?: string;
  title?: string;
  category?: string;
}

const SoftImageFallback: React.FC<SoftImageFallbackProps> = ({ 
  className = "", 
  title = "Position", 
  category = "Beauty" 
}) => {
  return (
    <div className={`bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <div className="text-4xl mb-2 opacity-60">✨</div>
        <div className="text-xs font-medium text-gray-500 mb-1">{category} Opportunity</div>
        <div className="text-xs text-gray-400">Contact for photos</div>
      </div>
    </div>
  );
};

export default SoftImageFallback;