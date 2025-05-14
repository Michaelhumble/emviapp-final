
export type ListingType = 'salon' | 'job' | 'opportunity';

export type ListingFeature = 
  | 'has_housing'
  | 'wax_room'
  | 'dining_room'
  | 'laundry'
  | 'parking'
  | 'high_traffic';

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  location: string;
  price: number;
  features: ListingFeature[];
  tags: string[];
  image?: string;
  description?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}
