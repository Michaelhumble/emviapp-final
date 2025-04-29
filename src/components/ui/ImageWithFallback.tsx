
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { isPremiumImage } from '@/utils/salonImageFallbacks';

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackImage: string;
  className?: string;
  businessName?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  showPremiumBadge?: boolean;
  priority?: boolean;
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
  loading = 'lazy',
  objectFit = 'cover',
  showPremiumBadge = true,
  priority = false
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  
  // Reset loading state and set initial source when component mounts or source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    
    // If src starts with http and isn't from our domain, it could be an external URL that breaks
    // For these cases, we can preemptively check and use fallback
    if (!src || (src.startsWith('http') && !src.includes('lovable-uploads'))) {
      // Check if the URL includes common pattern for broken images
      if (!src || src.includes('imgur.com') || src.includes('i.imgur.com')) {
        setImgSrc(fallbackImage);
        setHasErrored(true);
        setIsLoading(false);
        return;
      }
    }
    
    // Prioritize new uploaded images
    if (src && src.includes('lovable-uploads')) {
      // Check if this is a premium image
      setIsPremium(isPremiumImage(src) || src.includes('9ebb0db4') || src.includes('b1bada0a'));
    }
    
    setImgSrc(src || '');
  }, [src, fallbackImage]);
  
  const handleError = () => {
    if (!hasErrored) {
      console.log('Image failed to load, using fallback:', fallbackImage);
      setImgSrc(fallbackImage);
      setHasErrored(true);
      
      // Check if the fallback is a premium image
      setIsPremium(isPremiumImage(fallbackImage));
    }
    setIsLoading(false);
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
        src={imgSrc || fallbackImage} 
        alt={alt || businessName || 'Salon image'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'} ${isPremium ? 'shadow-sm' : ''}`}
        style={{ objectFit, ...style }}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
      />
      
      {isPremium && !isLoading && showPremiumBadge && (
        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/60 to-transparent p-1 px-2 text-xs text-white font-medium">
          Premium
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
