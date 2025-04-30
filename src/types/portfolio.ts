
import { PortfolioImage } from './artist';

export {
  // Re-export PortfolioImage from artist for backward compatibility
  PortfolioImage 
};

// Add other portfolio-specific types below
export interface PortfolioCollection {
  id: string;
  name: string;
  description?: string;
  items: PortfolioImage[];
}
