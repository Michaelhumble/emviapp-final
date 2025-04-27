
import { Listing } from '@/types/listing';

export const listings: Listing[] = [
  {
    id: '1',
    type: 'salon',
    title: 'Luxury Nail Salon in Prime Location',
    location: 'Beverly Hills, CA',
    price: 250000,
    features: ['wax_room', 'parking', 'high_traffic'],
    tags: ['established', 'luxury', 'turnkey'],
    description: 'Well-established salon with 10 years of operation',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'salon',
    title: 'Modern Nail Spa with Housing',
    location: 'San Jose, CA',
    price: 180000,
    features: ['has_housing', 'laundry', 'parking'],
    tags: ['housing-included', 'modern'],
    description: 'Newly renovated space with included housing',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    type: 'salon',
    title: 'High-Traffic Mall Location',
    location: 'Houston, TX',
    price: 320000,
    features: ['high_traffic', 'wax_room'],
    tags: ['mall-location', 'high-revenue'],
    description: 'Premium mall location with steady client flow',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getSalonListings = () => listings.filter(listing => listing.type === 'salon');
