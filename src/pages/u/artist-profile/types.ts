
export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name?: string; // Made optional since Supabase uses 'title'
  title: string;
  description: string;
  price: number;
  price_type: string;
  duration: string;
  duration_minutes: number;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
  is_visible?: boolean;
  user_id?: string;
}
