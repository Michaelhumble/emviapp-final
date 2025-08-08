export type SeedType = 'job' | 'salonForSale' | 'portfolio' | 'moment' | 'ticker';

export interface SeedBase {
  id: string;
  is_seed: true;
  seed_type: SeedType;
  market: 'city' | 'metro' | 'state';
  priority_weight: number; // 0..1 (seed defaults 0.4; real > 0.6)
  visibility_rules?: Array<'guest' | 'signed_in' | 'completed_profile' | 'referral'>;
  replace_by_real_after?: string; // ISO date
  images: string[];
  contact_mode: 'locked' | 'dm_locked' | 'blurred';
  title?: string;
  subtitle?: string;
  badges?: string[];
}

export interface SeedJob extends SeedBase {
  seed_type: 'job';
  city: string;
  weekly_pay?: string;
  perks?: string[];
}

export interface SeedSalonForSale extends SeedBase {
  seed_type: 'salonForSale';
  price_estimate?: string;
  chairs?: number;
}

export interface SeedPortfolio extends SeedBase {
  seed_type: 'portfolio';
  artist_name: string;
  bio?: string;
}

export interface SeedMoment extends SeedBase { seed_type: 'moment'; }

export interface SeedTicker extends SeedBase { seed_type: 'ticker'; text: string; }
