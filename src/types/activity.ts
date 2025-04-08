
export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: 'credit_earned' | 'profile_boosted' | 'referral_completed' | 'portfolio_upload' | string;
  description: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ActivityFeedProps {
  userId?: string;
  limit?: number;
}
