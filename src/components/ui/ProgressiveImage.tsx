import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  fallbackSrc?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  lowQualitySrc,
  fallbackSrc = '/placeholder.svg',
  sizes,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      onError?.();
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, onLoad, onError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse",
          "bg-[length:200%_100%] animate-shimmer"
        )} />
      )}
      
      {/* Progressive image */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-70",
          !isLoaded && lowQualitySrc && "filter blur-sm scale-105"
        )}
        sizes={sizes}
        loading={loading}
        decoding="async"
        style={{
          // Prevent layout shift
          aspectRatio: 'inherit',
          objectFit: 'cover'
        }}
      />
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;