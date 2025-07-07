
import { Job } from '@/types/job';

export const mockPremiumJobs: Job[] = [
  {
    id: 'premium-1',
    title: 'Senior Nail Technician - Premium Salon',
    category: 'Nail Technician',
    location: 'Beverly Hills, CA',
    description: 'Exclusive high-end salon seeking experienced nail technician. Serve celebrity clientele.',
    compensation_type: 'Commission',
    compensation_details: '70% commission + tips',
    requirements: 'Advanced nail art skills, 5+ years experience',
    contact_info: {
      owner_name: 'Sophie Chen',
      phone: '(310) 555-0301',
      email: 'sophie@luxurynails.com'
    },
    created_at: '2024-01-12T15:45:00.000Z',
    status: 'active',
    pricing_tier: 'diamond',
    user_id: 'user-premium-1',
    role: 'Senior Nail Technician',
    posted_at: '2024-01-12T15:45:00.000Z',
    is_featured: true,
    weekly_pay: true
  },
  {
    id: 'premium-2',
    title: 'Master Hair Colorist',
    category: 'Hair Stylist',
    location: 'Newport Beach, CA',
    description: 'Upscale salon looking for master colorist. High-end clientele, premium products.',
    compensation_type: 'Commission + Salary',
    compensation_details: '$3000 base + 50% commission',
    requirements: 'Color specialist certification, portfolio required',
    contact_info: {
      owner_name: 'Rachel Martinez',
      phone: '(949) 555-0402',
      email: 'rachel@elitehair.com'
    },
    created_at: '2024-01-11T11:20:00.000Z',
    status: 'active',
    pricing_tier: 'premium',
    user_id: 'user-premium-2',
    role: 'Master Hair Colorist',
    posted_at: '2024-01-11T11:20:00.000Z',
    specialties: ['Color Correction', 'Balayage', 'Fashion Colors']
  },
  {
    id: 'premium-3',
    title: 'Lead Esthetician - Medical Spa',
    category: 'Esthetician',
    location: 'Irvine, CA',
    description: 'Medical spa seeking lead esthetician for advanced treatments. Growth opportunity.',
    compensation_type: 'Salary + Bonus',
    compensation_details: '$55,000 - $70,000 + performance bonus',
    requirements: 'Medical aesthetics training, leadership experience',
    contact_info: {
      owner_name: 'Dr. Jennifer Lee',
      phone: '(949) 555-0503',
      email: 'jennifer@medspa.com'
    },
    created_at: '2024-01-08T16:10:00.000Z',
    status: 'active',
    pricing_tier: 'gold',
    user_id: 'user-premium-3',
    role: 'Lead Esthetician',
    posted_at: '2024-01-08T16:10:00.000Z',
    specialties: ['Chemical Peels', 'Microneedling', 'Laser Treatments']
  }
];
