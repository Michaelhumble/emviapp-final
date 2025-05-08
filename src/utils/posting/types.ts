
// Adding the missing UserPostingStats interface
export interface UserPostingStats {
  total_posts: number;
  active_posts: number;
  expired_posts: number;
  free_posts_remaining: number;
  premium_posts_count: number;
}

// Add isRenewal property to PricingOptions interface
export interface PricingOptions {
  tier: string;
  isNationwide?: boolean;
  isFastSalePackage?: boolean;
  bundleWithJobPosting?: boolean;
  isRenewal?: boolean; // Added the missing property
}
