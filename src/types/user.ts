
export interface UserPostingStats {
  hasPostedJobs?: boolean;
  totalPostCount?: number;
  isFirstTimeUser?: boolean;
  referralCredits?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  has_posted_job?: boolean;
  has_referral_credits?: boolean;
  [key: string]: any;
}
