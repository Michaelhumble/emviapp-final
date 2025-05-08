
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  businessName?: string;
  category?: string;
  fallbackImage?: string;
  style?: React.CSSProperties;
  showPremiumBadge?: boolean;
  priority?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className,
  businessName,
  category,
  fallbackImage,
  style,
  showPremiumBadge,
  priority
}) => {
  const [error, setError] = useState(false);
  
  // Additional safety check for valid image URL
  const isValidImageUrl = src && (
    src.startsWith('http') || 
    src.startsWith('/') || 
    src.startsWith('data:')
  );

  if (!isValidImageUrl || error) {
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
        {showPremiumBadge && (
          <span className="text-xs absolute top-2 left-2 bg-amber-500 text-white px-1.5 py-0.5 rounded-full">Premium</span>
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
      // The priority attribute isn't valid for regular HTML img elements
      // We're keeping it in the props for compatibility but not using it directly
    />
  );
};

export default ImageWithFallback;

// Also export named for backwards compatibility
export { ImageWithFallback };
