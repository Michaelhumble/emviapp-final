
import React, { ReactNode, ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ErrorBoundary from './ErrorBoundary';

interface FallbackBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (err: Error, errorInfo: ErrorInfo) => void;
  errorMessage?: string;
}

/**
 * A simplified boundary that simply wraps a component in an ErrorBoundary
 * with a clean minimal fallback UI. Useful for dashboard widgets.
 */
const FallbackBoundary = ({ children, fallback, onError, errorMessage }: FallbackBoundaryProps) => {
  const defaultFallback = (
    <Card className="w-full border-gray-200 bg-white/50">
      <CardContent className="p-4 flex items-center justify-center min-h-[120px]">
        <div className="text-center flex flex-col items-center">
          <AlertCircle className="h-5 w-5 text-amber-500 mb-2" />
          <p className="text-sm text-gray-500">{errorMessage || "Unable to load this content"}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ErrorBoundary 
      fallback={fallback || defaultFallback}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};

export default FallbackBoundary;
