
export type PlanTier = 'free' | 'basic' | 'professional' | 'premium';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  tier: PlanTier;
  features: string[];
  recommended?: boolean;
}

export interface SubscriptionState {
  currentPlan: SubscriptionPlan | null;
  isLoading: boolean;
  isSubscribing: boolean;
  error: string | null;
  hasActiveSubscription: boolean;
}

export interface SubscriptionContextType extends SubscriptionState {
  upgradeSubscription: (plan: SubscriptionPlan) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  refreshSubscriptionStatus: () => Promise<void>;
}
