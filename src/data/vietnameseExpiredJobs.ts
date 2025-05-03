
import { Job } from '@/types/job';
import { v4 as uuidv4 } from 'uuid';

// This file contains expired Vietnamese job listings that should be shown at the bottom of the jobs page
// These listings are set with created_at dates that make them appear as expired (more than 30 days old)

export const vietnameseExpiredJobs: Job[] = [
  {
    id: uuidv4(),
    title: 'Cần thợ nails gấp (Jonesborough, TN)',
    location: 'Jonesborough, TN',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
    vietnamese_description: 'Tiệm vùng Johnson City TN cần thợ nails gấp.\nTiệm đông khách quanh năm tip cao income từ $1200-$1500/ tuần tuỳ theo tay nghề.\nBao lương từ $1000-$1200/ tuần.\nLiên hệ 423-707-8895',
    specialties: ['CTN', 'SNS', 'thợ bột'],
    image: '/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png',
    compensation_details: '$1000-$1500/tuần',
    contact_info: {
      phone: '423-707-8895'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Tiệm vị trí đẹp (Myrtle Beach, SC)',
    location: 'Myrtle Beach, SC',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    vietnamese_description: 'Tiệm đẹp, vị trí đẹp, khách sang. Cần thợ nail có kinh nghiệm. Income lúc cao điểm $1800-$2500/tuần. Bao lương $1000-$1400/tuần. Có chỗ ở thoải mái. Liên lạc: 843-251-6336',
    specialties: ['thợ bột', 'thợ design', 'SNS'],
    image: '/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png',
    compensation_details: '$1800-$2500/tuần (mùa cao điểm)',
    contact_info: {
      phone: '843-251-6336'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Sang tiệm đang hoạt động tốt (Newport, TN)',
    location: 'Newport, TN',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    vietnamese_description: 'Cần sang tiệm nail gấp.\nTiệm vùng Newport, TN đang hoạt động tốt.\nCó 4 bàn, 4 ghế, đồ đạc đầy đủ.\nRent rẻ chỉ có $1100/tháng.\nGiá sang: $15,000 (có thể thương lượng).\nLiên hệ: 865-719-4372',
    specialties: ['sang nhượng', 'tiệm nail'],
    image: '/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png',
    price: '$15,000',
    contact_info: {
      phone: '865-719-4372'
    },
    status: 'expired',
    for_sale: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail Full Time (Vancouver, WA)',
    location: 'Vancouver, WA',
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
    vietnamese_description: 'Cần thợ làm Full time ở Vancouver WA.\nKhách Mỹ trắng, tip cao, tiệm đẹp.\nBao lương $5000-$6500/tháng.\nTiệm còn cần thợ tay chân nước biết wax. Thu nhập từ $4000-$5000/tháng.\nLiên hệ: 360-798-9311',
    specialties: ['thợ bột', 'thợ tay chân nước', 'wax'],
    image: '/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png',
    compensation_details: '$5000-$6500/tháng',
    contact_info: {
      phone: '360-798-9311'
    },
    status: 'expired',
    weekly_pay: true
  }
];
