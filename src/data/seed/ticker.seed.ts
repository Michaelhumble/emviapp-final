import { SeedTicker } from './types';

export const TICKER_SEEDS: SeedTicker[] = [
  {
    id: 'seed-ticker-001',
    is_seed: true,
    seed_type: 'ticker',
    market: 'state',
    priority_weight: 0.4,
    images: [],
    contact_mode: 'locked',
    text: 'Milano Nail Spa vừa tuyển được 2 thợ bột – chúc mừng!'
  },
  {
    id: 'seed-ticker-002',
    is_seed: true,
    seed_type: 'ticker',
    market: 'city',
    priority_weight: 0.4,
    images: [],
    contact_mode: 'locked',
    text: 'Linh Nguyen nhận booking full cuối tuần này.'
  }
];
