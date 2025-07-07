
import { Job } from '@/types/job';

export const bilingualJobs: Job[] = [
  {
    id: 'bilingual-1',
    title: 'Nail Technician - Thợ Làm Nail',
    category: 'Nail Technician',
    location: 'San Jose, CA',
    description: 'Looking for experienced nail technician. Weekly pay $800-1200. Cần thợ làm nail có kinh nghiệm. Lương tuần $800-1200.',
    compensation_type: 'Weekly',
    compensation_details: '$800-1200/week',
    requirements: 'Experience required, bilingual preferred',
    contact_info: {
      owner_name: 'Linda Nguyen',
      phone: '(408) 555-0123',
      email: 'linda@nailsalon.com'
    },
    created_at: '2024-01-15T10:00:00.000Z',
    status: 'active',
    pricing_tier: 'free',
    user_id: 'user-1',
    role: 'Nail Technician',
    posted_at: '2024-01-15T10:00:00.000Z'
  },
  {
    id: 'bilingual-2',
    title: 'Hair Stylist - Thợ Cắt Tóc',
    category: 'Hair Stylist',
    location: 'Westminster, CA',
    description: 'High-end salon seeking talented hair stylist. Commission + tips. Salon cao cấp tìm thợ cắt tóc tài năng. Hoa hồng + tip.',
    compensation_type: 'Commission',
    compensation_details: '60% commission + tips',
    requirements: 'Valid cosmetology license, 2+ years experience',
    contact_info: {
      owner_name: 'Mai Tran',
      phone: '(714) 555-0456',
      email: 'mai@beautysalon.com'
    },
    created_at: '2024-01-14T14:30:00.000Z',
    status: 'active',
    pricing_tier: 'premium',
    user_id: 'user-2',
    role: 'Hair Stylist',
    posted_at: '2024-01-14T14:30:00.000Z'
  },
  {
    id: 'bilingual-3',
    title: 'Esthetician - Chuyên Viên Thẩm Mỹ',
    category: 'Esthetician',
    location: 'Garden Grove, CA',
    description: 'Spa looking for licensed esthetician. Flexible schedule. Spa tìm chuyên viên thẩm mỹ có bằng. Lịch làm việc linh hoạt.',
    compensation_type: 'Hourly + Commission',
    compensation_details: '$18-25/hour + commission',
    requirements: 'Valid esthetician license, experience with facials',
    contact_info: {
      owner_name: 'Linh Pham',
      phone: '(714) 555-0789',
      email: 'linh@relaxspa.com'
    },
    created_at: '2024-01-13T09:15:00.000Z',
    status: 'active',
    pricing_tier: 'gold',
    user_id: 'user-3',
    role: 'Esthetician',
    posted_at: '2024-01-13T09:15:00.000Z'
  }
];
