
export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string; // Required for consistency
  title: string;
  description: string;
  price: number;
  price_type: string; // Added missing property
  duration: string; // Added missing property
  duration_minutes: number;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
  is_visible?: boolean;
  user_id?: string;
}
