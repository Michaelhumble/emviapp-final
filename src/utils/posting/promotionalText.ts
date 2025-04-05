
import { PostType, PricingOptions } from "./types";

interface UserStats {
  totalJobPosts: number;
  totalSalonPosts: number;
  totalBoothPosts: number;
  totalSupplyPosts: number;
  referralCount: number;
}

export const generatePromotionalText = (
  postType: PostType, 
  userStats: UserStats, 
  options: PricingOptions
): string => {
  if (options.isFirstPost) {
    switch (postType) {
      case "job":
        return "Welcome to EmviApp! Your first job post is only $5. Refer a friend and get $5 off your next post!";
      case "salon":
        return "Your first salon listing is free! Premium visibility upgrades will get you in front of more buyers.";
      case "booth":
        return "First time posting a booth? Get noticed with nationwide visibility for just $5 more!";
      case "supply":
        return "Your first supply listing is free! Boost your visibility with nationwide targeting for better results.";
    }
  }

  if (userStats.referralCount > 0) {
    return "Thanks for referring others to EmviApp! You're helping build the beauty community.";
  }

  if (options.isNationwide) {
    return "Great choice going nationwide! Your post will reach the entire beauty community across the US.";
  }

  // Generic promotional messages by post type
  switch (postType) {
    case "job":
      return "Did you know? Posts with complete details get 3x more responses. Need help writing your description?";
    case "salon":
      return "Salon listings with 5+ photos typically sell 40% faster. Don't forget to add your best shots!";
    case "booth":
      return "Pro tip: Booth rentals paired with a job post get 2.5x more inquiries from quality artists.";
    case "supply":
      return "Supply listings with detailed specifications receive 85% more buyer inquiries.";
  }

  return "Thanks for using EmviApp, the beauty industry's fastest-growing platform!";
};

export { type PricingOptions };
