
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackImage: string;
  className?: string;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackImage, 
  className = '' 
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
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
