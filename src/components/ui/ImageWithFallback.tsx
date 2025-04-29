
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackImage?: string;
  className?: string;
  businessName?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  showPremiumBadge?: boolean;
  priority?: boolean;
}

/**
 * Enhanced component that displays an image with fallback support and progressive loading
 * If the primary image is empty or fails to load, it will display a clean empty state
 */
const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackImage, 
  className = '',
  businessName,
  style,
  loading = 'lazy',
  objectFit = 'cover',
  showPremiumBadge = false,
  priority = false
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  
  // Reset loading state and set initial source when component mounts or source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    
    // If src is empty or invalid, show clean empty state
    if (!src || src === '') {
      setHasErrored(true);
      setIsLoading(false);
      return;
    }
    
    setImgSrc(src);
  }, [src]);
  
  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
    }
    setIsLoading(false);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  // If no image is available and no fallback, return empty div with proper dimensions
  if (hasErrored && !fallbackImage) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
      />
    );
  }
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100" />
      )}
      {!hasErrored && (
        <img 
          src={imgSrc}
          alt={alt || businessName || 'Image'}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          style={{ objectFit, ...style }}
          loading={priority ? 'eager' : loading}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
      {fallbackImage && hasErrored && (
        <img 
          src={fallbackImage}
          alt={alt || businessName || 'Image'}
          className={`${className} transition-opacity duration-300`}
          style={{ objectFit, ...style }}
          loading={priority ? 'eager' : loading}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
