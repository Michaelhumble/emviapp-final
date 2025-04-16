import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className, 
  fallbackClassName = "flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-50",
  businessName,
  fallbackImage = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800",
  ...props
}) => {
  const [error, setError] = useState(false);

  // Main fallback image - a professional salon interior 
  const mainFallback = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800";
  
  // Alternative fallbacks for variety
  const fallbackOptions = [
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800", // Salon interior
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800", // Salon chair
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800",   // Makeup products
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800", // Nail salon
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800"  // Beauty salon
  ];

  // Pick a fallback based on the business name or a random one
  const getFallbackImage = () => {
    if (!fallbackImage || fallbackImage === defaultImage) {
      if (businessName) {
        // Use the business name to deterministically pick a fallback
        const index = businessName.charCodeAt(0) % fallbackOptions.length;
        return fallbackOptions[index];
      } else {
        // Random fallback
        return fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
      }
    }
    return fallbackImage;
  };

  const defaultImage = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800";

  // Try to load the provided image first, if that fails use the fallback
  const handleError = () => {
    if (src !== defaultImage) {
      setError(true);
    }
  };

  // If image failed to load, show the fallback
  if (error) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img 
          src={getFallbackImage()}
          alt={alt || businessName || "Beauty business"}
          className={`w-full h-full object-cover ${className}`}
          onError={() => setError(true)}
          {...props}
        />
        {businessName && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white text-xl font-medium">{businessName.charAt(0)}</span>
          </div>
        )}
      </div>
    );
  }

  // Otherwise show the original image
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
