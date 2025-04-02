
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  specialty?: string;
  location?: string;
  bio?: string;
  instagram?: string;
  website?: string;
  credits?: number;
  badges?: Array<{name: string, description: string, icon: string}>;
  preferred_language?: string;
  referral_code?: string;
  referred_by?: string;
  referral_reward_claimed?: boolean;
  status?: string;
}
