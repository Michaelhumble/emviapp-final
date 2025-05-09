
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
  
  // Enhanced validation for image URL with robust checks
  const isValidImageUrl = (url: string) => {
    // Check if URL is undefined, null, or empty string
    if (!url) return false;
    
    // Check if URL has valid format (http, https, data:, or relative path)
    const hasValidPrefix = 
      url.startsWith('http') || 
      url.startsWith('/') || 
      url.startsWith('data:');
      
    // Check for common invalid URL segments
    const hasInvalidSegments = 
      url.includes('undefined') || 
      url.includes('null');
    
    return hasValidPrefix && !hasInvalidSegments;
  };

  // Function to get a reliable fallback Supabase image
  const getSupabaseImage = () => {
    // Define a set of known valid Supabase image filenames
    const validImages = [
      'generated(01).png', 'generated(04).png', 'generated(08).png', 'generated(12).png',
      'generated(15).png', 'generated(21).png', 'generated(27).png', 'generated(33).png',
      '_A long, luxurious nail salon-10.png', '_A long, luxurious nail salon-11.png',
      '_A long, luxurious nail salon-12.png', '_A long, luxurious nail salon-13.png',
      '_A long, luxurious nail salon-14.png', '_A long, luxurious nail salon-15.png',
      '_A long, luxurious nail salon-16.png', '_A long, luxurious nail salon-17.png'
    ];
    
    // Choose a deterministic image based on the alt text to ensure consistency
    const hash = alt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % validImages.length;
    
    return `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/${validImages[index]}`;
  };

  // If source is invalid or error occurred during loading
  if (!isValidImageUrl(src) || error) {
    // Use provided fallback image if available
    if (fallbackImage && isValidImageUrl(fallbackImage)) {
      return (
        <img
          src={fallbackImage}
          alt={alt}
          className={className}
          style={style}
          loading={priority ? "eager" : "lazy"}
          onError={() => setError(true)} // In case fallback also fails
        />
      );
    }
    
    // For Vietnamese listings or nail-related content, use Supabase fallback
    if (alt.includes('Vietnamese') || 
        alt.toLowerCase().includes('nail') || 
        alt.toLowerCase().includes('tiệm') ||
        (businessName && businessName.toLowerCase().includes('nail'))) {
      const supabaseUrl = getSupabaseImage();
      return (
        <img
          src={supabaseUrl}
          alt={alt}
          className={className}
          style={style}
          loading={priority ? "eager" : "lazy"}
          onError={() => {
            // If even this fallback fails, use gradient placeholder silently
            setError(true);
          }}
        />
      );
    }
    
    // Return a gradient placeholder with first letter
    const firstLetter = businessName ? 
      businessName.charAt(0).toUpperCase() : 
      (alt && alt.length > 0 ? alt.charAt(0).toUpperCase() : 'E');
      
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

  // If source is valid and no error, render the image
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

export default ImageWithFallback;

// Also export named for backwards compatibility
export { ImageWithFallback };
