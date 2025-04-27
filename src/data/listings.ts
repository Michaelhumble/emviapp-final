
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
    description: 'Well-established salon with 10 years of operation. 8 manicure stations, 6 pedicure chairs, and 2 treatment rooms.',
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
    description: 'Newly renovated space with included housing. 6 manicure stations and 4 pedicure chairs.',
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
    description: 'Premium mall location with steady client flow. 10 stations total and loyal customer base.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    type: 'salon',
    title: 'Established Day Spa in Downtown',
    location: 'Seattle, WA',
    price: 275000,
    features: ['wax_room', 'dining_room', 'laundry'],
    tags: ['day-spa', 'established', 'downtown'],
    description: 'Full-service day spa in prime downtown location. Includes massage rooms and facial treatment areas.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    type: 'salon',
    title: 'Boutique Hair Salon with Loyal Clientele',
    location: 'Portland, OR',
    price: 150000,
    features: ['parking'],
    tags: ['hair-salon', 'boutique', 'established-clientele'],
    description: '5-chair hair salon with steady business for over 8 years. Owner retiring.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    type: 'salon',
    title: 'Upscale Nail Salon in Shopping Center',
    location: 'Dallas, TX',
    price: 230000,
    features: ['high_traffic', 'parking'],
    tags: ['upscale', 'shopping-center', 'established'],
    description: 'High-end nail salon with 12 stations in popular shopping center. Excellent reviews and loyal customers.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    type: 'salon',
    title: 'Full-Service Beauty Salon with Apartment',
    location: 'Miami, FL',
    price: 295000,
    features: ['has_housing', 'parking', 'laundry'],
    tags: ['full-service', 'housing-included', 'profitable'],
    description: 'Profitable salon with 2-bedroom apartment above. Hair, nails, and skincare services.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    type: 'salon',
    title: 'Cozy Neighborhood Salon',
    location: 'Chicago, IL',
    price: 120000,
    features: ['parking'],
    tags: ['neighborhood', 'cozy', 'affordable'],
    description: 'Small but profitable neighborhood salon with loyal local clientele. 4 stations with room to expand.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    type: 'salon',
    title: 'High-End Spa with Premium Equipment',
    location: 'Scottsdale, AZ',
    price: 385000,
    features: ['wax_room', 'dining_room', 'high_traffic'],
    tags: ['luxury', 'high-end', 'premium-equipment'],
    description: 'Luxury spa with top-of-the-line equipment and exclusive clientele. Includes multiple treatment rooms.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    type: 'salon',
    title: 'Turnkey Nail Salon in Business District',
    location: 'Denver, CO',
    price: 175000,
    features: ['high_traffic'],
    tags: ['business-district', 'turnkey', 'profitable'],
    description: 'Ready-to-operate nail salon in busy business district. Consistent revenue and established systems.',
    image: '/placeholder.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getSalonListings = () => listings.filter(listing => listing.type === 'salon');
