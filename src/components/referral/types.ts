
export interface ReferralStats {
  completedReferrals: number;
  pendingReferrals: number;
  totalReferrals: number;
  credits: number;
  estimatedEarnings: number;
}

export interface ReferralProgress {
  percentage: number;
  nextMilestone: number;
  nextMilestoneIn: number;
  level: number;
}

export interface Referral {
  id: string;
  referredId: string;
  referredName: string;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
  reward?: number; // Added this property to match the usage in referrals/index.tsx
}

export interface ReferralData {
  referralCode: string | null;
  referralLink: string;
  referrals: Referral[];
}
