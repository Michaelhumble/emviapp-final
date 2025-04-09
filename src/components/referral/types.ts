
export interface ReferralData {
  referralCode: string | null;
  referralLink: string;
  referrals: Referral[];
  // Adding these properties to make it compatible with usage in pages/referrals/index.tsx
  id?: string;
  referredName?: string;
  referredEmail?: string;
  status?: string;
  milestoneReached?: boolean;
  createdAt?: string;
}

export interface Referral {
  id: string;
  referredId: string;
  referredName?: string;
  status: "pending" | "completed";
  createdAt: string;
  completedAt?: string;
  reward?: number;
}

export interface ReferralStats {
  completedReferrals: number;
  pendingReferrals: number;
  totalReferrals: number;
  credits: number;
  estimatedEarnings: number;
}

export interface ReferralProgress {
  level: number;
  currentMilestone: number;
  nextMilestone: number;
  nextMilestoneIn: number;
  percentage: number;
  rewards: ReferralReward[];
}

export interface ReferralReward {
  level: number;
  milestone: number;
  reward: string;
  achieved: boolean;
}
