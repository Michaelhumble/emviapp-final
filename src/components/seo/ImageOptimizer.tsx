import React, { useState, useEffect } from 'react';
import { generateImageAlt } from '@/utils/seoHelpers';
import { generateOptimizedImageUrl, generateSrcSet, createLazyObserver } from '@/utils/performanceOptimizer';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
  lazy?: boolean;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackImage?: string;
  showShimmer?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  title,
  className = '',
  lazy = true,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  onLoad,
  onError,
  fallbackImage,
  showShimmer = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Use performance-optimized srcSet generation
  const optimizedSrcSet = generateSrcSet(imgSrc);

  // Handle load event
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle error event
  const handleError = () => {
    setHasError(true);
    // Use provided fallback or a premium default
    const fallback = fallbackImage || getDefaultFallback();
    setImgSrc(fallback);
    onError?.();
  };

  // Get a premium fallback image
  const getDefaultFallback = () => {
    // Use a professional beauty industry image as fallback
    return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  // Performance-optimized lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const img = document.querySelector(`img[data-src="${src}"]`) as HTMLImageElement;
    if (!img) return;

    const observer = createLazyObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          target.src = target.dataset.src || '';
          target.classList.remove('lazy');
          observer.unobserve(target);
        }
      });
    });

    observer.observe(img);
    return () => observer.disconnect();
  }, [src, lazy, priority]);

  // Generate optimized image URL for better performance
  const optimizedSrc = generateOptimizedImageUrl({
    src: imgSrc,
    quality,
    format: 'webp',
    priority,
    width: 800 // Default width for optimization
  });

  const imageProps = {
    src: lazy && !priority ? undefined : optimizedSrc,
    'data-src': lazy && !priority ? src : undefined,
    alt: alt || generateImageAlt(title || 'Image'),
    title,
    className: `${className} ${!isLoaded && showShimmer ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${lazy && !priority ? 'lazy' : ''}`,
    sizes,
    srcSet: optimizedSrcSet,
    loading: lazy && !priority ? 'lazy' as const : 'eager' as const,
    decoding: 'async' as const,
    fetchPriority: priority ? 'high' as const : 'low' as const,
    onLoad: handleLoad,
    onError: handleError,
    style: {
      backgroundImage: !isLoaded && showShimmer ? 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)' : undefined,
      backgroundSize: !isLoaded && showShimmer ? '200% 100%' : undefined,
      animation: !isLoaded && showShimmer ? 'shimmer 1.5s infinite linear' : undefined,
    }
  };

  return <img {...imageProps} />;
};

export default OptimizedImage;