
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  businessName?: string;
  priority?: boolean;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  businessName,
  priority = false,
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  // Get the most appropriate image source
  const imageSource = error ? '/images/fallback.png' : (src || '/images/fallback.png');

  return (
    <img
      src={imageSource}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      onError={(e) => {
        e.currentTarget.onerror = null;
        setError(true);
      }}
    />
  );
};

export default ImageWithFallback;
