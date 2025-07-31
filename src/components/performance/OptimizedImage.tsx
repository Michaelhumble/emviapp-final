import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAxMEwzMCAyNUgxMEwyMCAxMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+",
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setCurrentSrc(src);
    onLoad?.();
  }, [src, onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Create intersection observer for lazy loading
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (!node || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentSrc === placeholder) {
            const img = new Image();
            img.onload = handleLoad;
            img.onerror = handleError;
            img.src = src;
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [src, currentSrc, placeholder, priority, handleLoad, handleError]);

  // For priority images, load immediately
  React.useEffect(() => {
    if (priority && currentSrc === placeholder) {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = handleError;
      img.src = src;
    }
  }, [priority, src, currentSrc, placeholder, handleLoad, handleError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isLoading && currentSrc === placeholder ? "opacity-60" : "opacity-100",
          hasError ? "opacity-50" : "",
          className
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      
      {isLoading && currentSrc === placeholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};