
export interface Salon {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  features?: string[];
  square_feet?: number;
  monthly_rent?: number;
  monthly_revenue?: string;
  yearly_revenue?: string;
  image?: string;
  featured?: boolean;
  contact_info?: {
    phone?: string;
    email?: string;
    owner_name?: string;
  };
}
