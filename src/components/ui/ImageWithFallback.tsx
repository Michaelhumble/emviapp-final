
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

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackImage, 
  className = '',
  businessName,
  style,
  loading
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc(fallbackImage);
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
