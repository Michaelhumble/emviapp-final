
import React from 'react';
import { Loader2 } from 'lucide-react';

interface SimpleLoadingFallbackProps {
  message?: string;
}

const SimpleLoadingFallback: React.FC<SimpleLoadingFallbackProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default SimpleLoadingFallback;
