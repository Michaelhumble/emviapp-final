import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatPostTimestamp = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    }
    
    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
    
    // More than a week - show actual date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Unknown time';
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const optimizeImageUrl = (url: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}): string => {
  if (!url) return '';
  
  // For Supabase storage URLs, add transformation parameters
  if (url.includes('supabase')) {
    const params = new URLSearchParams();
    
    if (options?.width) params.append('width', options.width.toString());
    if (options?.height) params.append('height', options.height.toString());
    if (options?.quality) params.append('quality', options.quality.toString());
    if (options?.format) params.append('format', options.format);
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
  
  return url;
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 10MB' };
  }
  
  return { valid: true };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  
  // Find the last space before the limit to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};