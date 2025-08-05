import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'avatar' | 'image' | 'job' | 'hero' | 'blog';
  lines?: number;
  className?: string;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'card', 
  lines = 3, 
  className = '',
  count = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200';
  
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className={`w-full h-[60vh] ${baseClasses} rounded-lg ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-12 bg-white/20 rounded-lg w-96 mx-auto"></div>
                <div className="h-6 bg-white/20 rounded-lg w-64 mx-auto"></div>
                <div className="h-10 bg-white/20 rounded-lg w-32 mx-auto"></div>
              </div>
            </div>
          </div>
        );
        
      case 'job':
        return (
          <div className={`p-6 border rounded-lg space-y-4 ${className}`}>
            <div className="flex items-center space-x-3">
              <div className={`h-12 w-12 rounded-full ${baseClasses}`}></div>
              <div className="space-y-2 flex-1">
                <div className={`h-4 ${baseClasses} rounded w-3/4`}></div>
                <div className={`h-3 ${baseClasses} rounded w-1/2`}></div>
              </div>
            </div>
            <div className={`h-4 ${baseClasses} rounded w-full`}></div>
            <div className={`h-4 ${baseClasses} rounded w-5/6`}></div>
            <div className="flex justify-between items-center pt-2">
              <div className={`h-6 ${baseClasses} rounded w-20`}></div>
              <div className={`h-8 ${baseClasses} rounded w-24`}></div>
            </div>
          </div>
        );
        
      case 'blog':
        return (
          <div className={`space-y-4 ${className}`}>
            <div className={`h-48 ${baseClasses} rounded-lg w-full`}></div>
            <div className="space-y-2">
              <div className={`h-6 ${baseClasses} rounded w-3/4`}></div>
              <div className={`h-4 ${baseClasses} rounded w-full`}></div>
              <div className={`h-4 ${baseClasses} rounded w-5/6`}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-8 w-8 rounded-full ${baseClasses}`}></div>
              <div className={`h-4 ${baseClasses} rounded w-24`}></div>
            </div>
          </div>
        );
        
      case 'avatar':
        return <div className={`h-10 w-10 rounded-full ${baseClasses} ${className}`}></div>;
        
      case 'image':
        return <div className={`h-32 w-full ${baseClasses} rounded-lg ${className}`}></div>;
        
      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <div 
                key={i} 
                className={`h-4 ${baseClasses} rounded`}
                style={{ width: i === lines - 1 ? '75%' : '100%' }}
              ></div>
            ))}
          </div>
        );
        
      case 'card':
      default:
        return (
          <div className={`p-6 border rounded-lg space-y-4 ${className}`}>
            <div className={`h-6 ${baseClasses} rounded w-3/4`}></div>
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-4 ${baseClasses} rounded`}
                  style={{ width: i === lines - 1 ? '60%' : '100%' }}
                ></div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;