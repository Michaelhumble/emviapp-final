import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { createLazyObserver, generateOptimizedImageUrl, generateSrcSet } from '@/utils/performanceOptimizer';

interface AdvancedLazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  lazy?: boolean;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  showShimmer?: boolean;
  aspectRatio?: 'square' | 'video' | 'photo' | 'auto';
  lowQualitySrc?: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: () => void;
}

const AdvancedLazyImage: React.FC<AdvancedLazyImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className = '',
  lazy = true,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  showShimmer = true,
  aspectRatio = 'auto',
  lowQualitySrc,
  onLoadStart,
  onLoadComplete,
  onError,
  loading: loadingProp,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [loadStartTime, setLoadStartTime] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);

  // Enhanced intersection observer with performance tracking
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = createLazyObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔍 Image entered viewport: ${alt || src.split('/').pop()}`);
          }
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView, alt, src]);

  // Progressive image loading with performance monitoring
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    setLoadStartTime(performance.now());
    onLoadStart?.();
    
    img.onload = () => {
      const loadTime = performance.now() - loadStartTime;
      
      setImageSrc(src);
      setIsLoaded(true);
      setHasError(false);
      onLoadComplete?.();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📸 Image loaded: ${alt || 'Unknown'} in ${loadTime}ms`);
        
        if (loadTime > 2000) {
          console.warn(`⚠️ Slow image load detected: ${src} (${loadTime}ms)`);
        }
      }
    };
    
    img.onerror = () => {
      setHasError(true);
      if (imageSrc !== fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
      onError?.();
      
      console.warn(`❌ Image failed to load: ${src}`);
    };

    // Load optimized image
    img.src = generateOptimizedImageUrl({
      src,
      quality,
      format: 'webp',
      priority
    });

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src, fallbackSrc, imageSrc, quality, priority, onLoadStart, onLoadComplete, onError, alt, loadStartTime]);

  // Generate optimized srcSet
  const optimizedSrcSet = generateSrcSet(src);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    photo: 'aspect-[4/3]',
    auto: ''
  };

  const renderShimmer = useCallback(() => (
    <div className={cn(
      "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
      "animate-pulse bg-[length:200%_100%]"
    )}>
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  ), []);

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Loading shimmer */}
      {!isLoaded && showShimmer && renderShimmer()}
      
      {/* Progressive image with optimized formats */}
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source
            srcSet={generateSrcSet(src, [320, 640, 768, 1024, 1280, 1600]).replace(/webp/g, 'avif')}
            type="image/avif"
            sizes={sizes}
          />
          
          {/* WebP format */}
          <source
            srcSet={optimizedSrcSet}
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback JPEG */}
          <img
            src={imageSrc}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-70",
              !isLoaded && lowQualitySrc && "filter blur-sm scale-105"
            )}
            sizes={sizes}
            loading={loadingProp || (lazy && !priority ? 'lazy' : 'eager')}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            width={aspectRatio === 'square' ? 400 : 600}
            height={aspectRatio === 'square' ? 400 : aspectRatio === 'video' ? 337 : 400}
            style={{
              aspectRatio: aspectRatio === 'auto' ? 'inherit' : undefined,
              objectFit: 'cover'
            }}
            {...props}
          />
        </picture>
      )}
      
      {/* Error state */}
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded opacity-75">
          ✓
        </div>
      )}
    </div>
  );
};

export default AdvancedLazyImage;