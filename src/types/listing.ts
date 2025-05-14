export type ListingType = 'salon' | 'job' | 'opportunity';

export type ListingFeature = 
  | 'has_housing'
  | 'wax_room'
  | 'dining_room'
  | 'laundry'
  | 'parking'
  | 'high_traffic';

export interface Listing {
  id: string | number;
  title: string;
  description?: string;
  location: string;
  price: number;
  photo?: string;
  image?: string;
  imageUrl?: string;
  features: ListingFeature[];
  tags: string[];
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}
