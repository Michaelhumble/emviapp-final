import { SeedPortfolio } from './types';

export const PORTFOLIO_SEEDS: SeedPortfolio[] = [
  {
    id: 'seed-portfolio-001',
    is_seed: true,
    seed_type: 'portfolio',
    market: 'city',
    priority_weight: 0.4,
    images: ['/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png'],
    contact_mode: 'locked',
    artist_name: 'Linh Nguyen',
    bio: 'Nail artist chuyên gel-x và dip, phong cách tinh tế, bền đẹp.',
    title: 'Gel-X Minimal Luxury',
    badges: ['New this week']
  },
  {
    id: 'seed-portfolio-002',
    is_seed: true,
    seed_type: 'portfolio',
    market: 'metro',
    priority_weight: 0.4,
    images: ['/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png'],
    contact_mode: 'locked',
    artist_name: 'Tram Le',
    bio: 'Design hiện đại, màu sắc sang trọng, tối giản.',
    title: 'Chrome + French Blend',
    badges: ['Expiring soon']
  }
];
