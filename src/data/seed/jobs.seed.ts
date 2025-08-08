import { SeedJob } from './types';

// Seeded Hot Jobs (VN copy, believable, locked contact)
export const JOB_SEEDS: SeedJob[] = [
  {
    id: 'seed-job-001',
    is_seed: true,
    seed_type: 'job',
    market: 'city',
    priority_weight: 0.4,
    visibility_rules: ['guest', 'signed_in'],
    images: ['/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png'],
    contact_mode: 'locked',
    title: 'Tuyển thợ bột – Thu nhập ổn định',
    subtitle: 'Tiệm khách Mỹ, tip cao, môi trường chuyên nghiệp',
    city: 'Milpitas, CA',
    weekly_pay: '$1,200 – $1,800/tuần',
    perks: ['Weekly pay', 'Tip cao', 'Giờ linh hoạt'],
    badges: ['New this week']
  },
  {
    id: 'seed-job-002',
    is_seed: true,
    seed_type: 'job',
    market: 'metro',
    priority_weight: 0.4,
    visibility_rules: ['guest', 'signed_in'],
    images: ['/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png'],
    contact_mode: 'locked',
    title: 'Cần thợ everything – Giá nail cao',
    subtitle: 'Khu du lịch, khách chịu chi, tip hậu',
    city: 'South Lake Tahoe, CA',
    weekly_pay: '$1,600 – $2,500+/tuần',
    perks: ['Giá cao', 'Tip tốt', 'Team trẻ'],
    badges: ['Expiring soon']
  },
  {
    id: 'seed-job-003',
    is_seed: true,
    seed_type: 'job',
    market: 'state',
    priority_weight: 0.4,
    visibility_rules: ['guest', 'signed_in'],
    images: ['/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png'],
    contact_mode: 'locked',
    title: 'Receptionist – Tiệm lớn Milano',
    subtitle: 'Không cần kinh nghiệm, sẽ training',
    city: 'Humble, TX',
    weekly_pay: '$150/ngày',
    perks: ['Môi trường lớn', 'Đội ngũ 60 người'],
    badges: ['New this week']
  }
];
