
import React from 'react';
import { Loader2 } from 'lucide-react';

interface SimpleLoadingFallbackProps {
  message?: string;
  className?: string;
}

/**
 * A simple loading fallback component to use when data is being loaded
 */
const SimpleLoadingFallback: React.FC<SimpleLoadingFallbackProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default SimpleLoadingFallback;
