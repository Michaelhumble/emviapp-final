// Advanced image optimization utilities for EmviApp
export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  progressive?: boolean;
}

export const DEFAULT_IMAGE_CONFIG: ImageOptimizationConfig = {
  quality: 85,
  format: 'webp',
  progressive: true
};

// Generate optimized image URL with multiple format support
export const generateOptimizedImageUrl = (
  src: string, 
  config: Partial<ImageOptimizationConfig> = {}
): string => {
  const finalConfig = { ...DEFAULT_IMAGE_CONFIG, ...config };
  
  // For Unsplash images
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (finalConfig.width) url.searchParams.set('w', finalConfig.width.toString());
    if (finalConfig.height) url.searchParams.set('h', finalConfig.height.toString());
    url.searchParams.set('q', finalConfig.quality.toString());
    url.searchParams.set('fm', finalConfig.format);
    url.searchParams.set('auto', 'format,compress');
    return url.toString();
  }
  
  // For Supabase storage
  if (src.includes('supabase.co/storage')) {
    const url = new URL(src);
    if (finalConfig.width) url.searchParams.set('width', finalConfig.width.toString());
    if (finalConfig.height) url.searchParams.set('height', finalConfig.height.toString());
    url.searchParams.set('quality', finalConfig.quality.toString());
    url.searchParams.set('format', finalConfig.format);
    return url.toString();
  }
  
  return src;
};

// Generate responsive srcset
export const generateResponsiveSrcSet = (
  src: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1600],
  format: 'webp' | 'avif' | 'jpeg' = 'webp'
): string => {
  return sizes
    .map(size => {
      const optimizedUrl = generateOptimizedImageUrl(src, {
        width: size,
        format,
        quality: size <= 640 ? 80 : 85 // Lower quality for smaller images
      });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

// Generate multiple format sources for picture element
export const generatePictureSources = (src: string, sizes?: string) => {
  const commonSizes = [320, 640, 768, 1024, 1280, 1600];
  
  return {
    avif: {
      srcSet: generateResponsiveSrcSet(src, commonSizes, 'avif'),
      type: 'image/avif',
      sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    },
    webp: {
      srcSet: generateResponsiveSrcSet(src, commonSizes, 'webp'),
      type: 'image/webp',
      sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    },
    jpeg: {
      srcSet: generateResponsiveSrcSet(src, commonSizes, 'jpeg'),
      type: 'image/jpeg',
      sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    }
  };
};

// Preload critical images
export const preloadCriticalImages = (images: string[]) => {
  images.forEach((src, index) => {
    if (index < 3) { // Only preload first 3 images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = generateOptimizedImageUrl(src, { width: 800, format: 'webp' });
      document.head.appendChild(link);
    }
  });
};

// Lazy loading intersection observer
export const createImageLazyObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Image compression utilities
export const compressImageBlob = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/webp', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Performance monitoring for images
export const trackImagePerformance = (src: string, loadTime: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📸 Image Performance: ${src.split('/').pop()} loaded in ${loadTime}ms`);
    
    // Track slow loading images
    if (loadTime > 2000) {
      console.warn(`⚠️ Slow image detected: ${src} (${loadTime}ms)`);
    }
  }
};

// Generate placeholder blur data URL
export const generatePlaceholderDataURL = (
  width: number = 400,
  height: number = 225,
  color: string = '#f3f4f6'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" filter="url(#blur)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};