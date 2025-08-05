import React, { useState, useRef, useEffect } from 'react';
import { generateOptimizedImageUrl, generateSrcSet, createLazyObserver } from '@/utils/performanceOptimizer';

interface LazyImageWithSkeletonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackImage?: string;
  skeletonClassName?: string;
}

const LazyImageWithSkeleton: React.FC<LazyImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  fallbackImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  skeletonClassName = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URLs
  const optimizedSrc = generateOptimizedImageUrl({
    src: currentSrc,
    width,
    height,
    quality,
    format: 'webp',
    priority
  });

  const srcSet = generateSrcSet(currentSrc);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    if (imgRef.current && !observerRef.current) {
      observerRef.current = createLazyObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      });

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackImage);
    } else {
      onError?.();
    }
  };

  // Skeleton component
  const Skeleton = () => (
    <div 
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${skeletonClassName} ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '200px',
        backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear'
      }}
      aria-label={`Loading ${alt}`}
    />
  );

  // Don't render image until it's in view (unless priority)
  if (!isInView) {
    return (
      <div ref={imgRef} className={className}>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && <Skeleton />}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default LazyImageWithSkeleton;