import React, { useState, useRef, useEffect } from 'react';
import { generateOptimizedImageUrl, generateSrcSet, createLazyObserver } from '@/utils/performanceOptimizer';

interface OptimizedBlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedBlogImage: React.FC<OptimizedBlogImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = '16/9',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URLs with WebP/AVIF support
  const webpSrc = generateOptimizedImageUrl({ src, format: 'webp', quality: 85 });
  const avifSrc = generateOptimizedImageUrl({ src, format: 'avif', quality: 80 });
  const jpegSrc = generateOptimizedImageUrl({ src, format: 'jpeg', quality: 85 });
  
  // Generate responsive srcSet
  const webpSrcSet = generateSrcSet(src, [320, 640, 768, 1024, 1280]).replace(/\.(jpg|jpeg|png)/g, '.webp');
  const jpegSrcSet = generateSrcSet(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && imgRef.current) {
      observerRef.current = createLazyObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      });
      
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(jpegSrc); // Fallback to JPEG
      onError?.();
    }
  };

  // Generate blur data URL for placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad)" />
    </svg>
  `)}`;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton/Blur Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 animate-pulse" 
               style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
        </div>
      )}

      {/* Optimized Image with WebP/AVIF Support */}
      {isInView && (
        <picture>
          {/* AVIF for modern browsers */}
          <source 
            type="image/avif"
            srcSet={avifSrc}
            sizes={sizes}
          />
          
          {/* WebP for broader support */}
          <source 
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />
          
          {/* JPEG fallback */}
          <img
            src={currentSrc || jpegSrc}
            srcSet={jpegSrcSet}
            sizes={sizes}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: isLoaded ? 'none' : 'blur(5px)',
              transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
              transition: 'all 0.5s ease-out'
            }}
          />
        </picture>
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

export default OptimizedBlogImage;