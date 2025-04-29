import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { getRandomNailSalonImage } from '@/utils/nailSalonImages';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackImage?: string;
  className?: string;
  businessName?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  showPremiumBadge?: boolean;
  priority?: boolean;
  category?: string; // Optional category hint for fallback selection
}

/**
 * Enhanced component that displays an image with fallback support and progressive loading
 * If the primary image is empty or fails to load, it will display a clean fallback
 */
export const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackImage, 
  className = '',
  businessName,
  style,
  loading = 'lazy',
  objectFit = 'cover',
  showPremiumBadge = false,
  priority = false,
  category
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Default fallback images - ensure we ALWAYS have an image
  const defaultFallbacks = [
    "/lovable-uploads/0bc39cbb-bdd3-4843-ace0-3cf730af576f.png",
    "/lovable-uploads/179dbed5-2209-4b12-8e72-ef20d1818d46.png",
    "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png",
    "/lovable-uploads/15bcad43-8797-40ed-ae8f-96eedb447b8f.png",
    "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png"
  ];
  
  // Get a random fallback image from our high-quality stock photos
  const getRandomFallback = () => {
    const randomIndex = Math.floor(Math.random() * defaultFallbacks.length);
    return defaultFallbacks[randomIndex];
  };
  
  // Get the best fallback (either provided or random)
  const getBestFallback = () => {
    // If a specific fallback was provided, use that
    if (fallbackImage && fallbackImage.includes('lovable-uploads')) {
      return fallbackImage;
    }
    
    // If a category was provided, use that for appropriate image selection
    if (category) {
      return getDefaultSalonImage(category as any);
    }
    
    // Otherwise use business name and alt text to determine the best fallback
    const combinedText = `${businessName || ''} ${alt || ''}`.toLowerCase();
    
    // Determine the most appropriate category based on text
    const detectedCategory = determineSalonCategory(
      combinedText,
      businessName || alt || ''
    );
    
    // Get appropriate image based on detected category
    return getDefaultSalonImage(detectedCategory);
  };
  
  // Reset loading state and set initial source when component mounts or source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    setRetryCount(0);
    
    // If src is empty or invalid, show fallback immediately
    if (!src || src === '') {
      setImgSrc(getBestFallback());
      setIsLoading(false);
      return;
    }
    
    // Check for invalid or potentially problematic image paths (common 404 causes)
    const probablyInvalid = 
      src === 'null' || 
      src === 'undefined' ||
      src.includes('null') || 
      src.includes('undefined') ||
      src.startsWith('/lovable-uploads/undefined');
    
    if (probablyInvalid) {
      console.log(`Image src appears invalid: ${src}, using fallback`);
      setImgSrc(getBestFallback());
      setIsLoading(false);
      return;
    }
    
    // Use the provided source
    setImgSrc(src);
  }, [src, fallbackImage, businessName, alt]);
  
  const handleError = () => {
    console.log(`Image error loading: ${imgSrc}`);
    
    // Try to reload the image once
    if (retryCount < maxRetries) {
      console.log(`Retrying image load (${retryCount + 1}/${maxRetries})`);
      setRetryCount(retryCount + 1);
      // Add cache busting parameter
      const cacheBuster = `?retry=${retryCount + 1}&t=${new Date().getTime()}`;
      setImgSrc(`${src}${cacheBuster}`);
      return;
    }
    
    // After retries, use fallback - NEVER show empty state
    setImgSrc(getBestFallback());
    setIsLoading(false);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img 
        src={imgSrc}
        alt={alt || businessName || 'Image'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        style={{ objectFit, ...style }}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
      />
      
      {showPremiumBadge && !isLoading && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-300 px-2 py-1 rounded text-xs font-medium text-amber-900 shadow-sm">
          Premium
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
