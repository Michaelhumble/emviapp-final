
export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}
