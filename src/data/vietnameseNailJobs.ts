
import { Job } from '@/types/job';

// Current active Vietnamese job listings 
export const vietnameseNailJobs: Job[] = [
  // Magic Nails - Premium showcase listing
  {
    id: 'vn-job-magic',
    title: 'Magic Nails – Great Falls, MT',
    company: 'Magic Nails',
    location: 'Great Falls, MT',
    description: 'Cần thợ nail có kinh nghiệm làm bột và tay chân nước. Tiệm khu Mỹ trắng, khách tip hậu, làm việc 5-6 ngày một tuần tùy ý. Bao lương $4,500-$6,000/tháng tùy theo khả năng.',
    salary_range: '$4,500-$6,000/tháng',
    contact_info: {
      phone: '(406) 761-8784'
    },
    specialties: ['Acrylic', 'Gel', 'Pedicure', 'Manicure'],
    created_at: new Date().toISOString(),
    isPinned: true
  },
  
  // Regular job listings
  {
    id: 'vn-job-1',
    title: 'Cần Thợ Nail Gấp',
    company: 'Luxury Nails & Spa',
    location: 'Houston, TX',
    description: 'Tiệm cần gấp thợ bột và chân tay nước. Income cao ($1,000-$1,400/tuần), tiệm đông khách quanh năm. Bao lương nếu làm lâu dài.',
    salary_range: '$1,000-$1,400/tuần',
    contact_info: {
      phone: '(713) 555-1234'
    },
    specialties: ['Acrylic', 'Pedicure', 'Manicure'],
    created_at: new Date().toISOString(),
    is_urgent: true
  },
  {
    id: 'vn-job-2',
    title: 'Thợ Bột & Tay Chân Nước',
    company: 'Rose Nails',
    location: 'Garden Grove, CA',
    description: 'Cần thợ bột và chân tay nước kinh nghiệm, full-time hoặc part-time. Income $1,200-$1,600/tuần tùy theo khả năng. Chỗ làm vui vẻ, không khí gia đình.',
    salary_range: '$1,200-$1,600/tuần',
    contact_info: {
      phone: '(714) 555-4567'
    },
    specialties: ['Acrylic', 'Pedicure'],
    created_at: new Date().toISOString()
  },
  {
    id: 'vn-job-3',
    title: 'Tuyển Thợ Nail Kinh Nghiệm',
    company: 'Elegant Nails',
    location: 'Dallas, TX',
    description: 'Cần thợ nail có kinh nghiệm làm đủ thứ, bao lương $4,800-$7,200/tháng tùy theo khả năng. Tiệm lớn, khu tốt, khách Mỹ trắng.',
    salary_range: '$4,800-$7,200/tháng',
    contact_info: {
      phone: '(214) 555-7890'
    },
    specialties: ['Full Service', 'All Services'],
    created_at: new Date().toISOString()
  },
  
  // Adding the 9 new job listings with images
  {
    id: 'vn-job-4',
    title: 'Tuyển Thợ Nail – Clawson, MI',
    company: 'Nail Salon Clawson',
    location: 'Clawson, MI',
    description: 'Tiệm nhỏ khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.',
    salary_range: '$1,200–$1,800/tuần',
    contact_info: {
      phone: '(248) 403-6472 | (248) 525-9911'
    },
    specialties: ['Bột', 'Dip', 'Gel-X'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/858af941-13ac-412a-9747-38bc7a6f0e19.png'
  },
  {
    id: 'vn-job-5',
    title: 'Thợ Nail Design – Milano Nail Spa, Humble, TX',
    company: 'Milano Nail Spa',
    location: '6947 FM 1960 Rd E, Humble, TX',
    description: 'Receptionist $150/ngày. 60 người đang làm chung.',
    salary_range: '>$2,000/tuần',
    contact_info: {
      phone: '(346) 398-6868 (gặp Nhi)'
    },
    specialties: ['Nail Design', 'Receptionist'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/bd877b0a-2f98-45fb-8e1a-37ad868ae786.png'
  },
  {
    id: 'vn-job-6',
    title: 'Tuyển Thợ Nail – South Lake Tahoe, CA',
    company: 'Tahoe Nail Spa',
    location: 'South Lake Tahoe, CA',
    description: 'Tiệm dễ thương, khách du lịch chịu chi.',
    salary_range: '$1,600–$2,500+/tuần',
    contact_info: {
      phone: '(916) 802-1922'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/abbd160d-295b-46cd-9777-d590aab8ddb0.png'
  },
  {
    id: 'vn-job-7',
    title: 'Cần Thợ Nail – Killeen, TX',
    company: 'Nail Salon',
    location: 'Killeen, TX',
    description: 'Tiệm lớn, giá cao, tip tốt.',
    salary_range: '$1,500+/tuần',
    contact_info: {
      phone: '(512) 540-6173 | (806) 777-0526'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/59818517-3985-420d-9aa9-3d1af667c11f.png'
  },
  {
    id: 'vn-job-8',
    title: 'Tìm Người Làm Nail – New Jersey',
    company: 'NJ Nail Studio',
    location: 'New Jersey',
    description: 'Khách ổn định, ưu tiên biết bột và design đơn giản.',
    salary_range: '$1,600/tuần + tip',
    contact_info: {
      phone: '(551) 333-5678'
    },
    specialties: ['Bột', 'Design'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/b939e509-7f6f-4322-a0f5-b269fa617531.png'
  },
  {
    id: 'vn-job-9',
    title: 'Cần Gấp Thợ Làm Chân Tay Nước – Houston, TX',
    company: 'Houston Nail Salon',
    location: 'Houston, TX',
    description: 'Ưu tiên tay nghề cứng, làm nhẹ nhàng.',
    salary_range: 'Part/Full-time – lương tốt',
    contact_info: {
      phone: '(832) 444-2299'
    },
    specialties: ['Chân Tay Nước'],
    created_at: new Date().toISOString(),
    is_urgent: true,
    image: '/lovable-uploads/858af941-13ac-412a-9747-38bc7a6f0e19.png'
  },
  {
    id: 'vn-job-10',
    title: 'Tuyển Thợ Nail – Seattle, WA',
    company: 'Seattle Luxury Nails',
    location: 'Seattle, WA',
    description: 'Tiệm sang, chủ dễ chịu, cần thợ có kinh nghiệm.',
    salary_range: '$1,800–$2,400/tuần',
    contact_info: {
      phone: '(206) 888-1234'
    },
    specialties: ['Nail Technician'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/bd877b0a-2f98-45fb-8e1a-37ad868ae786.png'
  },
  {
    id: 'vn-job-11',
    title: 'Tuyển Thợ Làm Dip Powder – Orlando, FL',
    company: 'Orlando Nail Studio',
    location: 'Orlando, FL',
    description: 'Khách trẻ, chủ yếu là Mỹ trắng.',
    salary_range: '$1,400–$1,900/tuần',
    contact_info: {
      phone: '(407) 777-9898'
    },
    specialties: ['Dip Powder'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/abbd160d-295b-46cd-9777-d590aab8ddb0.png'
  },
  {
    id: 'vn-job-12',
    title: 'Cần Thợ Full Set – Los Angeles, CA',
    company: 'LA Nail Spa',
    location: 'Los Angeles, CA',
    description: 'Làm việc trong môi trường chuyên nghiệp.',
    salary_range: '$1,800–$2,200/tuần',
    contact_info: {
      phone: '(323) 555-9012'
    },
    specialties: ['Full Set'],
    created_at: new Date().toISOString(),
    image: '/lovable-uploads/59818517-3985-420d-9aa9-3d1af667c11f.png'
  }
];

// Expired job listings
export const vietnameseExpiredJobs: Job[] = [
  {
    id: 'vn-expired-1',
    title: 'Cần Thợ Nail',
    company: 'Relaxation Nails',
    location: 'San Jose, CA',
    description: 'Hết hạn: Cần thợ làm bột và tay chân nước, lương từ $900-$1,200/tuần tùy năng lực.',
    salary_range: '$900-$1,200/tuần',
    contact_info: {
      phone: '(408) 555-9876'
    },
    status: 'expired',
    created_at: '2023-01-15T00:00:00.000Z'
  },
  {
    id: 'vn-expired-2',
    title: 'Thợ Nail Full Time',
    company: 'Classic Nails',
    location: 'Miami, FL',
    description: 'Hết hạn: Cần thợ nail full time, bao lương $4,200/tháng. Tiệm đông khách, tip cao.',
    salary_range: '$4,200/tháng',
    contact_info: {
      phone: '(305) 555-2468'
    },
    status: 'expired',
    created_at: '2023-02-10T00:00:00.000Z'
  }
];
