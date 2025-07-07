
import { Job } from '@/types/job';

export const mockPremiumBooths: Job[] = [
  {
    id: 'booth-1',
    title: 'Premium Nail Station Available',
    category: 'Booth Rental',
    location: 'San Jose, CA',
    description: 'Beautiful nail station in busy salon. All utilities included. Parking available.',
    price: '$200/week',
    image: '/lovable-uploads/salon-interior-1.jpg',
    contact_info: {
      owner_name: 'Anna Nguyen',
      phone: '(408) 555-0101',
      email: 'anna@premiumsalon.com'
    },
    created_at: '2024-01-10T08:00:00.000Z',
    status: 'active',
    pricing_tier: 'premium',
    user_id: 'user-booth-1',
    role: 'Booth Rental',
    posted_at: '2024-01-10T08:00:00.000Z',
    type: 'salon',
    salon_features: ['Parking', 'WiFi', 'Break Room'],
    requirements: 'Valid license required'
  },
  {
    id: 'booth-2',
    title: 'Hair Station - High Traffic Location',
    category: 'Booth Rental',
    location: 'Westminster, CA',
    description: 'Hair station in established salon with loyal clientele. Perfect for experienced stylists.',
    price: '$250/week',
    image: '/lovable-uploads/salon-interior-2.jpg',
    contact_info: {
      owner_name: 'David Kim',
      phone: '(714) 555-0202',
      email: 'david@trendysalon.com'
    },
    created_at: '2024-01-09T12:30:00.000Z',
    status: 'active',
    pricing_tier: 'diamond',
    user_id: 'user-booth-2',
    role: 'Booth Rental',
    posted_at: '2024-01-09T12:30:00.000Z',
    type: 'salon',
    salon_features: ['High Traffic', 'Established Clientele', 'Modern Equipment'],
    requirements: 'Cosmetology license, 3+ years experience'
  }
];
