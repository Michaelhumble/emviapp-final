
export interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  completedReferrals: number;
  targetMilestone: number;
}

export interface ReferralProgress {
  percentage: number;
  nextMilestoneIn: number;
  currentTier: number;
  nextTier: number;
}

export interface CreditMilestone {
  id: string;
  credits: number;
  name: string;
  description: string;
  unlockedAt: string | null;
}

export interface ReferralData {
  id: string;
  referredEmail: string;
  referredName: string;
  status: 'pending' | 'processing' | 'completed' | 'suspicious' | 'joined' | 'subscribed';
  milestoneReached: boolean;
  milestoneType?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface TranslationString {
  key: string;
  english: string;
  vietnamese: string;
}
