import { LinkButton } from '@/components/chat/LinkButton';
import { ReactNode } from 'react';

export interface ProcessedMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  links?: Array<{
    url: string;
    label: string;
    description?: string;
  }>;
  quickActions?: Array<{
    id: string;
    label: string;
    action: () => void;
  }>;
  routeConfirmation?: {
    destination: string;
    title: string;
    requiresAuth?: boolean;
  };
  authFlow?: boolean;
}

// Extract URLs from text and convert to link objects
export const extractLinks = (text: string): Array<{ url: string; label: string; description?: string }> => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  return urls.map(url => {
    // Generate friendly labels based on URL patterns
    let label = 'View Link';
    let description = '';
    
    if (url.includes('emvi.app/jobs')) {
      label = '🔍 Browse Jobs';
      description = 'Find nail jobs and beauty opportunities';
    } else if (url.includes('emvi.app/artists')) {
      label = '💅 Find Artists'; 
      description = 'Discover talented nail artists';
    } else if (url.includes('emvi.app/post-job')) {
      label = '📝 Post Job';
      description = 'Create a job listing';
    } else if (url.includes('emvi.app/sell-salon')) {
      label = '🏪 List Salon';
      description = 'Sell or list your salon';
    } else if (url.includes('emvi.app')) {
      label = '🌟 Visit EmviApp';
      description = 'Go to EmviApp platform';
    } else {
      // Extract domain name for generic links
      try {
        const domain = new URL(url).hostname.replace('www.', '');
        label = `Visit ${domain}`;
      } catch (e) {
        label = 'Open Link';
      }
    }
    
    return { url, label, description };
  });
};

// Remove URLs from text and return clean text
export const removeUrlsFromText = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '').replace(/\s+/g, ' ').trim();
};

// Process a message to extract links and clean text
export const processMessage = (message: any): ProcessedMessage => {
  const links = extractLinks(message.text);
  const cleanText = removeUrlsFromText(message.text);
  
  return {
    ...message,
    text: cleanText,
    links: links.length > 0 ? links : undefined
  };
};

// Generate contextual introduction for links
export const getLinkIntroText = (links: Array<{ url: string; label: string }>, language: 'en' | 'vi'): string => {
  if (links.length === 0) return '';
  
  if (language === 'vi') {
    if (links.some(l => l.url.includes('jobs'))) {
      return 'Em đã tìm được những việc làm này cho anh/chị:';
    } else if (links.some(l => l.url.includes('artists'))) {
      return 'Đây là những nghệ sĩ nail mà em gợi ý:';
    } else {
      return 'Đây là những đường link hữu ích:';
    }
  } else {
    if (links.some(l => l.url.includes('jobs'))) {
      return 'Here are some great job opportunities I found:';
    } else if (links.some(l => l.url.includes('artists'))) {
      return 'Here are some talented artists I recommend:';
    } else {
      return 'Here are some helpful links:';
    }
  }
};