
export interface PortfolioImage {
  id: string;
  url: string;
  name?: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  description?: string;
  price: number;
  price_type?: string;
  duration?: string;
  duration_minutes: number;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}
