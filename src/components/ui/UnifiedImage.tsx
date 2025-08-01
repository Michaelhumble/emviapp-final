import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface UnifiedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  lazy?: boolean;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  showShimmer?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
  lowQualitySrc?: string;
}

const UnifiedImage: React.FC<UnifiedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className = '',
  lazy = true,
  quality = 85,
  sizes,
  priority = false,
  showShimmer = true,
  aspectRatio = 'auto',
  lowQualitySrc,
  loading: loadingProp,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Load high quality image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setHasError(false);
    };
    
    img.onerror = () => {
      setHasError(true);
      if (imageSrc !== fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src, fallbackSrc, imageSrc]);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: ''
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], className)}>
      {/* Loading skeleton */}
      {!isLoaded && showShimmer && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse",
          "bg-[length:200%_100%]"
        )} />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={isInView ? imageSrc : fallbackSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-70",
          !isLoaded && lowQualitySrc && "filter blur-sm scale-105"
        )}
        sizes={sizes}
        loading={loadingProp || (lazy && !priority ? 'lazy' : 'eager')}
        decoding="async"
        style={{
          aspectRatio: aspectRatio === 'auto' ? 'inherit' : undefined,
          objectFit: 'cover'
        }}
        {...props}
      />
      
      {/* Error state */}
      {hasError && imageSrc === fallbackSrc && (
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

export default UnifiedImage;