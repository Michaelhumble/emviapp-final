// API Configuration for Sunshine Chat Integration
export const SUNSHINE_API_CONFIG = {
  // Unified Sunshine API endpoint for both website and external integrations
  BASE_URL: 'https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sunshine-api',
  
  // For ManyChat webhook configuration
  WEBHOOK_URL: 'https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/sunshine-api',
  
  // Platform identifiers
  PLATFORMS: {
    WEBSITE: 'website',
    MESSENGER: 'messenger'
  } as const,
  
  // Default request configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  },
  
  // API timeout in milliseconds
  TIMEOUT: 30000
};

// Helper function for external integrations
export const createSunshineRequest = (message: string, userId: string = 'anonymous', platform: 'website' | 'messenger' = 'website') => ({
  message,
  userId,
  platform
});

// Type definitions for API integration
export interface SunshineRequest {
  message: string;
  userId?: string;
  platform?: 'website' | 'messenger';
}

export interface SunshineResponse {
  reply: string;
  ctaButtons?: Array<{
    label: string;
    route: string;
    icon?: string;
    variant?: 'primary' | 'secondary';
  }>;
  platform: string;
  timestamp: string;
}