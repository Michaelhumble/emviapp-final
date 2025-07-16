import React, { useState, useEffect } from 'react';
import { generateImageAlt } from '@/utils/seoHelpers';

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
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc) return '';
    
    // If it's a Supabase storage URL, we can add resize parameters
    if (baseSrc.includes('supabase.co/storage')) {
      const sizes = [320, 640, 768, 1024, 1200];
      return sizes
        .map(size => `${baseSrc}?width=${size}&quality=${quality} ${size}w`)
        .join(', ');
    }
    
    return '';
  };

  // Handle load event
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle error event
  const handleError = () => {
    setHasError(true);
    // Fallback to a default image or placeholder
    setImgSrc('/placeholder.svg');
    onError?.();
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const img = document.querySelector(`img[data-src="${src}"]`) as HTMLImageElement;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            target.src = target.dataset.src || '';
            target.classList.remove('lazy');
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [src, lazy, priority]);

  const imageProps = {
    src: lazy && !priority ? undefined : imgSrc,
    'data-src': lazy && !priority ? src : undefined,
    alt: alt || generateImageAlt(title || 'Image'),
    title,
    className: `${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${lazy && !priority ? 'lazy' : ''}`,
    sizes,
    srcSet: generateSrcSet(src),
    loading: lazy && !priority ? 'lazy' as const : 'eager' as const,
    onLoad: handleLoad,
    onError: handleError,
    style: {
      backgroundImage: !isLoaded ? 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)' : undefined,
      backgroundSize: !isLoaded ? '200% 100%' : undefined,
      animation: !isLoaded ? 'shimmer 1.5s infinite linear' : undefined,
    }
  };

  return <img {...imageProps} />;
};

export default OptimizedImage;