import React, { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  fallbackSrc
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Default fallback images for different content types
  const getDefaultFallback = () => {
    if (fallbackSrc) return fallbackSrc;
    
    // Choose fallback based on alt text content
    if (alt.toLowerCase().includes('nail') || alt.toLowerCase().includes('manicure')) {
      return 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    if (alt.toLowerCase().includes('makeup') || alt.toLowerCase().includes('beauty')) {
      return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    if (alt.toLowerCase().includes('salon') || alt.toLowerCase().includes('business')) {
      return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    
    // Default professional beauty image
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getDefaultFallback());
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={800}
        height={450}
        style={{
          minHeight: isLoading ? '200px' : undefined,
          aspectRatio: '16/9'
        }}
      />
    </div>
  );
};

export default BlogImage;