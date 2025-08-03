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

// Extract URLs from text and convert to link objects - ONLY HARDCODED LINKS ALLOWED
export const extractLinks = (text: string): Array<{ url: string; label: string; description?: string }> => {
  const allowedLinks = [
    {
      url: 'https://preview--emviapp-final.lovable.app/post-job',
      label: '📝 Post Job',
      description: 'Create a job listing'
    },
    {
      url: 'https://preview--emviapp-final.lovable.app/sell-salon',
      label: '🏪 Sell Salon',
      description: 'List your salon for sale'
    },
    {
      url: 'https://preview--emviapp-final.lovable.app/auth/signup?redirect=%2F',
      label: '🌟 Join Our Beauty Community',
      description: 'Create your account and get started'
    },
    {
      url: 'https://preview--emviapp-final.lovable.app/blog',
      label: '📖 Read Blog',
      description: 'Latest news and tips from EmviApp'
    }
  ];

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  // Only return links that match our allowed hardcoded links
  return urls
    .map(url => allowedLinks.find(link => url.includes(link.url.split('?')[0])))
    .filter(Boolean) as Array<{ url: string; label: string; description?: string }>;
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

// Generate contextual introduction for links - ONLY HARDCODED LINKS
export const getLinkIntroText = (links: Array<{ url: string; label: string }>, language: 'en' | 'vi'): string => {
  if (links.length === 0) return '';
  
  if (language === 'vi') {
    if (links.some(l => l.url.includes('post-job'))) {
      return 'Anh/chị có thể đăng tin tuyển dụng tại đây:';
    } else if (links.some(l => l.url.includes('sell-salon'))) {
      return 'Anh/chị có thể đăng bán salon tại đây:';
    } else if (links.some(l => l.url.includes('auth/signup'))) {
      return 'Tham gia cộng đồng EmviApp:';
    } else if (links.some(l => l.url.includes('blog'))) {
      return 'Đọc những bài viết mới nhất:';
    } else {
      return 'Đây là những đường link hữu ích:';
    }
  } else {
    if (links.some(l => l.url.includes('post-job'))) {
      return 'You can post a job here:';
    } else if (links.some(l => l.url.includes('sell-salon'))) {
      return 'You can list your salon here:';
    } else if (links.some(l => l.url.includes('auth/signup'))) {
      return 'Join the EmviApp community:';
    } else if (links.some(l => l.url.includes('blog'))) {
      return 'Read the latest articles:';
    } else {
      return 'Here are some helpful links:';
    }
  }
};