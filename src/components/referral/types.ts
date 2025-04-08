
export interface ReferralStats {
  total: number;
  verified: number;
  pending: number;
  completed?: number;
  targetMilestone: number;
  data?: any[];
  // Add the properties that are being used in the components
  completedReferrals: number;
  totalReferrals: number;
  pendingReferrals: number;
}

export interface ReferralProgress {
  percentage: number;
  nextMilestoneIn: number;
  // Add the properties that are being used
  currentTier?: number;
  nextTier?: number;
}

export interface ReferralData {
  id: string;
  referredEmail: string;
  referredName: string;
  status: string;
  milestoneReached: boolean;
  milestoneType?: string;
  createdAt: string;
  verifiedAt?: string;
}
