import React, { useState } from 'react';

interface SupabaseOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized image component for Supabase Storage images
 * Automatically applies transformations for better performance
 */
export const SupabaseOptimizedImage: React.FC<SupabaseOptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  quality = 75,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate optimized Supabase storage URL with transformations
  const getOptimizedUrl = (targetWidth: number, targetQuality: number = quality): string => {
    if (!src.includes('supabase.co/storage')) {
      return src; // Not a Supabase storage URL, return as-is
    }

    try {
      // Extract the path after /storage/v1/object/public/
      const match = src.match(/\/storage\/v1\/object\/public\/(.+)/);
      if (!match) return src;

      const path = match[1];
      const baseUrl = src.split('/storage/v1/object/public/')[0];
      
      // Use Supabase image transformation API
      // Format: /storage/v1/render/image/public/{path}?width={w}&quality={q}&format=webp
      const optimizedUrl = `${baseUrl}/storage/v1/render/image/public/${path}?width=${targetWidth}&quality=${targetQuality}&format=webp`;
      
      return optimizedUrl;
    } catch (e) {
      console.error('Error optimizing Supabase image URL:', e);
      return src;
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (): string => {
    const widths = [400, 600, 800, 1200, 1600];
    return widths
      .map(w => `${getOptimizedUrl(w, w <= 600 ? 70 : quality)} ${w}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const optimizedSrc = getOptimizedUrl(width);
  const srcSet = generateSrcSet();

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        aspectRatio: height && width ? `${width}/${height}` : undefined,
      }}
    />
  );
};

export default SupabaseOptimizedImage;
