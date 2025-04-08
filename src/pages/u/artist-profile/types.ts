
export interface Service {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  description: string | null;
  is_visible: boolean;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}
