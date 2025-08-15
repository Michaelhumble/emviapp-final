import React, { useState } from 'react';

interface StableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // e.g., "16/9", "1/1", "4/3"
  fallbackSrc?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

/**
 * Stable image component that prevents layout shifts
 * Provides consistent dimensions and smooth loading
 */
const StableImage: React.FC<StableImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  aspectRatio = '16/9',
  fallbackSrc = '/placeholder.svg',
  priority = false,
  loading = 'lazy'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Calculate aspect ratio for container
  const containerStyle: React.CSSProperties = {
    aspectRatio: aspectRatio,
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : undefined,
  };

  return (
    <div 
      className={`relative overflow-hidden bg-muted ${className}`}
      style={containerStyle}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/70 to-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : loading}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default StableImage;