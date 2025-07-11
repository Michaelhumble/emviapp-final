export interface IndustryListing {
  id: string;
  title: string;
  location: string;
  salary: string;
  tier: 'diamond' | 'premium' | 'featured' | 'free';
  summary: string;
  imageUrl?: string;
  phone?: string;
  rating?: number;
  isFeatured?: boolean;
  fullDescription?: string;
  isPositionFilled?: boolean;
  fomoText?: string;
  isHouseAd?: boolean;
  urgencyBadge?: string;
  applicationDeadline?: string;
  contact?: {
    name: string;
    phone: string;
    email: string;
  };
  vietnamese_title?: string;
  vietnamese_description?: string;
  // Add edit functionality fields
  isOwner?: boolean;
  originalJobData?: any;
}

export interface IndustryConfig {
  name: string;
  displayName: string;
  listings: IndustryListing[];
  routePath: string;
  gradientColors: string;
  icon: string;
}