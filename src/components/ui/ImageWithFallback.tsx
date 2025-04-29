
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackImage: string;
  className?: string;
  businessName?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}

/**
 * Enhanced component that displays an image with fallback support and progressive loading
 * If the primary image fails to load, it will switch to the fallback image
 */
const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackImage, 
  className = '',
  businessName,
  style,
  loading = 'lazy'
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src || '');
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Reset loading state when image source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    setImgSrc(src || '');
  }, [src]);
  
  const handleError = () => {
    if (!hasErrored) {
      setImgSrc(fallbackImage);
      setHasErrored(true);
    }
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      )}
      <img 
        src={imgSrc} 
        alt={alt || businessName || 'Salon image'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        style={style}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default ImageWithFallback;
