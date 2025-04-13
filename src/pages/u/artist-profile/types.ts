
export interface PortfolioImage {
  id: string;
  url: string;
  name: string; // Changed from optional to required
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  description: string; // Changed from optional to required
  price: number;
  price_type: string; // Changed from optional to required
  duration?: string;
  duration_minutes: number;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}
