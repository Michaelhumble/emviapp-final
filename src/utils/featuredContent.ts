
import { Job } from '@/types/job';

// Magic Nails - Always featured at top
const magicNailsListing: Job = {
  id: 'magic-nails-featured',
  title: 'Magic Nails - Premium Nail Salon',
  category: 'Nail Salon',
  company: 'Magic Nails',
  location: '123 Main St, San Jose, CA',
  created_at: '2024-01-01T00:00:00.000Z',
  description: 'Premier nail salon offering luxury manicure and pedicure services. Walk-ins welcome!',
  price: '$25-85',
  image: '/lovable-uploads/magic-nails-storefront.jpg',
  salon_features: ['Luxury Spa Chairs', 'Premium Products', 'Expert Technicians'],
  contact_info: {
    owner_name: 'Maria Santos',
    phone: '(408) 555-NAIL',
    email: 'info@magicnails.com'
  },
  type: 'salon',
  status: 'active',
  pricing_tier: 'diamond',
  user_id: 'magic-nails-owner',
  role: 'Nail Salon',
  posted_at: '2024-01-01T00:00:00.000Z'
};

// Sample featured job listings
const featuredJobListings: Job[] = [
  {
    id: 'featured-job-1',
    title: 'Nail Technician Wanted - Immediate Start',
    category: 'Nail Technician',
    company: 'Bliss Nails & Spa',
    location: 'Milpitas, CA',
    created_at: '2024-01-05T10:00:00.000Z',
    price: '$800-1200/week',
    description: 'Busy nail salon looking for experienced technician. Weekly pay, flexible schedule.',
    image: '/lovable-uploads/nail-salon-hiring.jpg',
    status: 'active',
    pricing_tier: 'premium',
    user_id: 'bliss-nails-owner',
    role: 'Nail Technician',
    posted_at: '2024-01-05T10:00:00.000Z',
    compensation_type: 'Weekly',
    compensation_details: '$800-1200/week',
    requirements: 'Valid nail tech license, 2+ years experience',
    contact_info: {
      owner_name: 'Lisa Chen',
      phone: '(408) 555-0123',
      email: 'lisa@blissnails.com'
    }
  },
  {
    id: 'featured-job-2',
    title: 'Hair Stylist - High End Salon',
    category: 'Hair Stylist',
    company: 'Glamour Studio',
    location: 'Cupertino, CA',
    created_at: '2024-01-04T14:30:00.000Z',
    price: '60% Commission',
    description: 'Upscale salon seeking talented stylist. Great location, established clientele.',
    image: '/lovable-uploads/hair-salon-luxury.jpg',
    status: 'active',
    pricing_tier: 'gold',
    user_id: 'glamour-studio-owner',
    role: 'Hair Stylist',
    posted_at: '2024-01-04T14:30:00.000Z',
    compensation_type: 'Commission',
    compensation_details: '60% commission + tips',
    requirements: 'Cosmetology license, advanced cutting techniques',
    contact_info: {
      owner_name: 'Sarah Johnson',
      phone: '(408) 555-0456',
      email: 'sarah@glamourstudio.com'
    }
  }
];

export const getFeaturedContent = (): Job[] => {
  return [magicNailsListing, ...featuredJobListings];
};

export const getMagicNailsListing = (): Job => {
  return magicNailsListing;
};
