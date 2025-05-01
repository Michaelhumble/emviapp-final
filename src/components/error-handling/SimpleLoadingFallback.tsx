
import React from 'react';

interface SimpleLoadingFallbackProps {
  message?: string;
}

const SimpleLoadingFallback: React.FC<SimpleLoadingFallbackProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-300 border-l-transparent animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default SimpleLoadingFallback;
