
import { useState } from 'react';
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
 * Component that displays an image with fallback support
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
  
  const handleError = () => {
    if (!hasErrored) {
      setImgSrc(fallbackImage);
      setHasErrored(true);
    }
  };
  
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      style={style}
      loading={loading}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
