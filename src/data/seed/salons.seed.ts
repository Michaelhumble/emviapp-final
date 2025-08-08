import { SeedSalonForSale } from './types';

export const SALON_SEEDS: SeedSalonForSale[] = [
  {
    id: 'seed-salon-001',
    is_seed: true,
    seed_type: 'salonForSale',
    market: 'city',
    priority_weight: 0.4,
    images: ['/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png'],
    contact_mode: 'locked',
    title: 'Sang tiệm nail – Khu nhà giàu lịch sự',
    subtitle: 'Thu nhập $35k – $45k/tháng, đầy đủ supply',
    price_estimate: '$35k – $45k/tháng',
    chairs: 9,
    badges: ['Expiring soon']
  },
  {
    id: 'seed-salon-002',
    is_seed: true,
    seed_type: 'salonForSale',
    market: 'metro',
    priority_weight: 0.4,
    images: ['/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png'],
    contact_mode: 'locked',
    title: 'Tiệm lớn cần sang – 48 bàn 45 ghế',
    subtitle: 'Income $1.8M/năm, khu shopping sang trọng',
    price_estimate: 'Thương lượng',
    chairs: 48,
    badges: ['New this week']
  }
];
