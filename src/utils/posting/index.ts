
export * from './types';
export * from './jobPricing';
export * from './salonPricing';
export * from './boothPricing';

// Export convenience function to generate promotional text
export const generatePromotionalText2 = (postType: string, userStats: any, options: any): string => {
  if (options.isFirstPost) {
    return "🎉 Welcome! Your first post gets special placement to help you get noticed.";
  }
  
  if (postType === 'job') {
    return "💡 Tip: Premium job listings receive 3x more qualified applications.";
  }
  
  if (postType === 'salon') {
    return "💅 Salon listings with photos receive 70% more inquiries. Add yours for best results!";
  }
  
  if (postType === 'booth') {
    return "💸 Booth rental postings typically see ROI within 5 days of publishing.";
  }
  
  return "📈 Boost your post's visibility with premium placement options!";
};
