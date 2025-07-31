import React, { Suspense } from 'react';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

interface LazyPageWrapperProps {
  children: React.ReactNode;
  loadingMessage?: string;
  fallback?: React.ComponentType<{ error: Error }>;
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-lg font-semibold text-red-900 mb-2">Page Load Error</h2>
      <p className="text-red-700 mb-4">Unable to load this page. Please try refreshing.</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export const LazyPageWrapper: React.FC<LazyPageWrapperProps> = ({ 
  children, 
  loadingMessage = "Loading page...",
  fallback: ErrorFallback = DefaultErrorFallback 
}) => {
  return (
    <Suspense fallback={<SimpleLoadingFallback message={loadingMessage} />}>
      {children}
    </Suspense>
  );
};