
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { getRandomNailSalonImage } from '@/utils/nailSalonImages';

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
export const ImageWithFallback = ({ 
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Default fallback for nail salon/beauty industry images
  const defaultFallback = getRandomNailSalonImage(); // Use a random nail image for variety
  
  // Reset loading state and set initial source when component mounts or source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    setRetryCount(0);
    
    // If src is empty or invalid, show fallback immediately
    if (!src || src === '') {
      if (fallbackImage) {
        setImgSrc(fallbackImage);
      } else {
        setImgSrc(defaultFallback);
      }
      setIsLoading(false);
      return;
    }
    
    // Use the provided source
    setImgSrc(src);
  }, [src, fallbackImage]);
  
  const handleError = () => {
    console.log(`Image error loading: ${imgSrc}`);
    
    // Try to reload the image once
    if (retryCount < maxRetries) {
      console.log(`Retrying image load (${retryCount + 1}/${maxRetries}): ${imgSrc}`);
      setRetryCount(retryCount + 1);
      // Add cache busting parameter
      const cacheBuster = `?retry=${retryCount + 1}&t=${new Date().getTime()}`;
      setImgSrc(`${src}${cacheBuster}`);
      return;
    }
    
    // After retries, use fallback
    if (fallbackImage && !hasErrored) {
      console.log(`Using fallback image: ${fallbackImage}`);
      setImgSrc(fallbackImage);
      setIsLoading(false);
    } else if (defaultFallback && !hasErrored) {
      console.log(`Using default fallback image: ${defaultFallback}`);
      setImgSrc(defaultFallback);
      setIsLoading(false);
    } else {
      setHasErrored(true);
      setIsLoading(false);
    }
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  // If no image is available after all attempts, return empty div with proper dimensions
  if (hasErrored && !fallbackImage && !defaultFallback) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
        aria-label={`Image placeholder for ${alt || businessName || 'content'}`}
      />
    );
  }
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img 
        src={imgSrc}
        alt={alt || businessName || 'Image'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        style={{ objectFit, ...style }}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
      />
      
      {showPremiumBadge && !isLoading && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-300 px-2 py-1 rounded text-xs font-medium text-amber-900 shadow-sm">
          Premium
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
