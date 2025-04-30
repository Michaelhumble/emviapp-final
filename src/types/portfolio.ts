
import { PortfolioImage } from './artist';

// Re-export PortfolioImage from artist for backward compatibility
export type { PortfolioImage };

// Add other portfolio-specific types below
export interface PortfolioCollection {
  id: string;
  name: string;
  description?: string;
  items: PortfolioImage[];
}

// Add required types for components that need them
export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
  order: number;
}

export interface PortfolioFormData {
  title: string;
  description: string;
  image: File | null;
}
