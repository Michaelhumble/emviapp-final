
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
 * If the primary image is empty or fails to load, it will display a high-quality category-based fallback
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
  
  // Default fallback images from our high-quality uploaded set
  const defaultFallbacks = [
    "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png", // Nail salon
    "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png", // Modern salon with sitting area
    "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png", // Nail salon with art gallery
    "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png", // Lash supplies
    "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png"  // Luxury spa
  ];
  
  // Get the best fallback (either provided or category-based)
  const getBestFallback = () => {
    // If a specific fallback was provided, use that
    if (fallbackImage && fallbackImage.includes('lovable-uploads')) {
      return fallbackImage;
    }
    
    // If a category was provided, use that for appropriate image selection
    if (category) {
      return getDefaultSalonImage(category as any, showPremiumBadge);
    }
    
    // Otherwise use business name and alt text to determine the best fallback
    const combinedText = `${businessName || ''} ${alt || ''}`.toLowerCase();
    
    // Determine the most appropriate category based on text
    const detectedCategory = determineSalonCategory(
      combinedText,
      businessName || alt || ''
    );
    
    // Get appropriate image based on detected category
    return getDefaultSalonImage(detectedCategory, showPremiumBadge);
  };
  
  // Reset loading state and set initial source when component mounts or source changes
  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    setRetryCount(0);
    
    // If src is empty, undefined or null, show fallback immediately
    if (!src || src === '') {
      setImgSrc(getBestFallback());
      setIsLoading(false);
      return;
    }
    
    // Check for invalid or potentially problematic image paths
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
    
    // Use the provided source if it's valid
    setImgSrc(src);
  }, [src, fallbackImage, businessName, alt, category]);
  
  const handleError = () => {
    console.log(`Image error loading: ${imgSrc}`);
    
    // Try to reload the image once
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      // Add cache busting parameter
      const cacheBuster = `?retry=${retryCount + 1}&t=${new Date().getTime()}`;
      setImgSrc(`${src}${cacheBuster}`);
      return;
    }
    
    // After retries, use fallback - NEVER show empty state
    setImgSrc(getBestFallback());
    setIsLoading(false);
    setHasErrored(true);
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
