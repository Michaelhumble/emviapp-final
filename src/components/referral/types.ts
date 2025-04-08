
export interface ReferralStats {
  total: number;
  verified: number;
  pending: number;
  completed?: number;
  targetMilestone: number;
  data?: any[];
}

export interface ReferralProgress {
  percentage: number;
  nextMilestoneIn: number;
}
