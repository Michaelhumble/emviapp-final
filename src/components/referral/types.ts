
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
}

export interface Referral {
  id: string;
  referredId: string;
  referredName: string;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface ReferralTransactionHistory {
  id: string;
  amount: number;
  type: 'earned' | 'used';
  description: string;
  date: string;
}
