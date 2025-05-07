
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  businessName?: string;
  category?: string;
  fallbackImage?: string;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className,
  businessName,
  category,
  fallbackImage,
  style
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    // Use fallbackImage if provided
    if (fallbackImage) {
      return (
        <img
          src={fallbackImage}
          alt={alt}
          className={className}
          style={style}
        />
      );
    }
    
    // Return a gradient placeholder with first letter of alt text or businessName
    const firstLetter = businessName ? 
      businessName.charAt(0).toUpperCase() : 
      alt.charAt(0).toUpperCase() || 'J';
      
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 ${className}`}
        style={style}
      >
        <span className="text-3xl font-semibold text-gray-500">{firstLetter}</span>
        {category && (
          <span className="text-xs absolute bottom-2 right-2 bg-black/30 text-white px-1 rounded">{category}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;

// Also export named for backwards compatibility
export { ImageWithFallback };
