
export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

export interface PortfolioFormData {
  title: string;
  description: string;
  image: File | null;
}
