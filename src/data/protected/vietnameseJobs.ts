
import { Job } from '@/types/job';

export const goldJobs: Job[] = [
  {
    id: 'vj-gold-1',
    title: 'Cần Thợ Nails Gấp - Bao Lương $1,200/tuần',
    description: 'Tiệm ở khu Mỹ trắng sang, cần thợ nail kinh nghiệm làm bột và chân tay nước. Bao lương $1,000-$1,200/tuần dựa vào kinh nghiệm.',
    vietnamese_description: 'Tiệm ở khu Mỹ trắng sang, cần thợ nail kinh nghiệm làm bột và chân tay nước. Bao lương $1,000-$1,200/tuần dựa vào kinh nghiệm.',
    location: 'Garden Grove, CA',
    created_at: '2023-04-15T00:00:00Z',
    image: '/lovable-uploads/nail-salon-1.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    specialties: ['Bột', 'Chân tay nước'],
    compensation_details: '$1,000-$1,200/tuần bao lương',
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    employment_type: 'full-time',
    contact_info: {
      phone: '(714) 555-1234'
    }
  },
  {
    id: 'vj-gold-2',
    title: 'Thợ Nail Lương Cao $9,000/tháng - Có Chỗ Ở',
    description: 'Cần thợ nail làm đủ thứ, full-time. Income $7,000-$9,000/tháng. Có chỗ ở, tiệm rất đông khách.',
    vietnamese_description: 'Cần thợ nail làm đủ thứ, full-time. Income $7,000-$9,000/tháng. Có chỗ ở, tiệm rất đông khách.',
    location: 'Huntington Beach, CA',
    created_at: '2023-04-10T00:00:00Z',
    image: '/lovable-uploads/nail-salon-2.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    specialties: ['Bột', 'Chân tay nước', 'Waxing'],
    has_housing: true,
    compensation_details: '$7,000-$9,000/tháng',
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    employment_type: 'full-time',
    contact_info: {
      phone: '(657) 555-5678'
    }
  },
  {
    id: 'vj-gold-3',
    title: 'Thợ Nails làm tại Beverly Hills - $2,000/tuần',
    description: 'Cần thợ làm ở tiệm Mỹ sang, khách hàng tip hậu. Cần biết làm bột và gel. Lương $1,800-$2,000/tuần.',
    vietnamese_description: 'Cần thợ làm ở tiệm Mỹ sang, khách hàng tip hậu. Cần biết làm bột và gel. Lương $1,800-$2,000/tuần.',
    location: 'Beverly Hills, CA',
    created_at: '2023-04-05T00:00:00Z',
    image: '/lovable-uploads/nail-salon-3.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    specialties: ['Bột', 'Gel', 'Designs'],
    compensation_details: '$1,800-$2,000/tuần',
    tip_range: '$500-$800/tuần',
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    employment_type: 'full-time',
    contact_info: {
      phone: '(310) 555-9012'
    }
  },
  {
    id: 'vj-gold-4',
    title: 'Cần Thợ Nails & Chân Tay Nước ở San Jose',
    description: 'Tiệm rộng, khu sang, cần nhiều thợ biết làm đủ thứ hoặc chuyên môn. Chia 6/4, làm việc vui vẻ.',
    vietnamese_description: 'Tiệm rộng, khu sang, cần nhiều thợ biết làm đủ thứ hoặc chuyên môn. Chia 6/4, làm việc vui vẻ.',
    location: 'San Jose, CA',
    created_at: '2023-03-28T00:00:00Z',
    image: '/lovable-uploads/nail-salon-4.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    specialties: ['Bột', 'Chân tay nước', 'Waxing', 'Massage'],
    compensation_details: 'Chia 6/4',
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    employment_type: 'full-time',
    contact_info: {
      phone: '(408) 555-3456'
    }
  },
  {
    id: 'vj-gold-5',
    title: 'Cần Gấp Thợ Nails - Bao Lương $7,000/tháng',
    description: 'Tiệm ở trung tâm thành phố, đông khách, cần thợ nail kinh nghiệm. Bao lương $6,000-$7,000/tháng tùy khả năng.',
    vietnamese_description: 'Tiệm ở trung tâm thành phố, đông khách, cần thợ nail kinh nghiệm. Bao lương $6,000-$7,000/tháng tùy khả năng.',
    location: 'Westminster, CA',
    created_at: '2023-03-20T00:00:00Z',
    image: '/lovable-uploads/nail-salon-5.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    specialties: ['Bột', 'Gel', 'Chân tay nước'],
    compensation_details: '$6,000-$7,000/tháng bao lương',
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    employment_type: 'full-time',
    contact_info: {
      phone: '(714) 555-7890'
    }
  },
  {
    id: 'vj-gold-6',
    title: 'Sang Tiệm Nails Vị Trí Đẹp - Giá Rẻ $50,000',
    description: 'Cần sang tiệm nails vị trí đẹp, đông khách, 6 bàn, 6 ghế, tiệm rộng 1,200sqft. Giá $50,000 (có thể thương lượng).',
    vietnamese_description: 'Cần sang tiệm nails vị trí đẹp, đông khách, 6 bàn, 6 ghế, tiệm rộng 1,200sqft. Giá $50,000 (có thể thương lượng).',
    location: 'Fountain Valley, CA',
    created_at: '2023-03-15T00:00:00Z',
    image: '/lovable-uploads/nail-salon-6.jpg',
    status: 'active',
    is_vietnamese_listing: true,
    for_sale: true,
    sale_price: '$50,000',
    asking_price: '$50,000',
    chair_count: 6,
    station_count: 6,
    square_feet: 1200,
    pricingTier: 'gold', // Changed from 'featured' to 'gold'
    is_featured: true, // Added this field instead
    type: 'salon',
    contact_info: {
      phone: '(714) 555-2345'
    }
  }
];
