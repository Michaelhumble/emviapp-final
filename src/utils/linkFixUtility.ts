/**
 * Utility to systematically fix all external lovable.app links to internal routes
 * This ensures all CTAs point to the correct internal routes for proper conversion
 */

export const linkMappings: Record<string, string> = {
  // Auth routes
  'http://emviapp-final.lovable.app/auth/signup?redirect=%2F': '/auth/signup',
  'http://emviapp-final.lovable.app/auth/signup?redirect=%2Fjobs': '/auth/signup?redirect=%2Fjobs',
  'http://emviapp-final.lovable.app/auth/signup': '/auth/signup',
  'http://emviapp-final.lovable.app/auth/signin': '/auth/signin',
  
  // Job routes
  'http://emviapp-final.lovable.app/jobs': '/jobs',
  'http://emviapp-final.lovable.app/post-job': '/post-job',
  
  // Salon routes
  'http://emviapp-final.lovable.app/salons': '/salons',
  'http://emviapp-final.lovable.app/sell-salon': '/sell-salon',
  
  // Dashboard routes
  'http://emviapp-final.lovable.app/dashboard': '/dashboard',
  
  // Other routes
  'http://emviapp-final.lovable.app/about': '/about',
  'http://emviapp-final.lovable.app/contact': '/contact',
  'http://emviapp-final.lovable.app/community': '/community'
};

/**
 * Convert external lovable.app URL to internal route
 */
export const convertToInternalRoute = (externalUrl: string): string => {
  // Check exact matches first
  if (linkMappings[externalUrl]) {
    return linkMappings[externalUrl];
  }
  
  // Extract path from URL if it's a lovable.app domain
  if (externalUrl.includes('lovable.app')) {
    try {
      const url = new URL(externalUrl);
      return url.pathname + url.search;
    } catch (e) {
      console.warn('Could not parse URL:', externalUrl);
      return '/';
    }
  }
  
  // Return as-is if not a lovable.app URL
  return externalUrl;
};

/**
 * List of components that need link fixes
 */
export const componentsWithBrokenLinks = [
  'src/components/analysis/EmotionalTrust.tsx',
  'src/components/artists/ArtistHeroSection.tsx',
  'src/components/artists/CtaSection.tsx',
  'src/components/artists/FinalCTASection.tsx',
  'src/components/artists/HeroSection.tsx',
  'src/components/customer/CustomerDashboard.tsx',
  'src/components/home/AIPowerhouse.tsx',
  'src/components/home/ArtistCallout.tsx',
  'src/components/home/BeautyExchangeSection.tsx',
  'src/components/home/BilingualExperienceSection.tsx',
  'src/components/home/CTARepeater.tsx',
  'src/components/home/CallToAction.tsx',
  'src/components/home/EmviQASection.tsx',
  'src/components/home/FounderMessage.tsx',
  'src/components/home/FreelancersHighlight.tsx',
  'src/components/home/ListingDetailModal.tsx',
  'src/components/home/PremiumIndustryShowcase.tsx',
  'src/components/home/SalonClientGrowthSystem.tsx',
  'src/components/home/missing-piece/MissingPieceSection.tsx',
  'src/components/home/trust/LiveStatsBar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/salon-owners/HeroSection.tsx',
  'src/components/salons/SalonPromotion.tsx',
  'src/components/ui/StickySignUpButton.tsx',
  'src/pages/Customers.tsx',
  'src/pages/Suppliers.tsx',
  'src/pages/blog/TheBeautyRevolution.tsx'
];

/**
 * Priority levels for link fixes
 */
export const linkFixPriority = {
  critical: [
    'src/components/analysis/EmotionalTrust.tsx',
    'src/components/home/CallToAction.tsx',
    'src/components/ui/StickySignUpButton.tsx'
  ],
  high: [
    'src/components/artists/ArtistHeroSection.tsx',
    'src/components/artists/CtaSection.tsx',
    'src/components/home/AIPowerhouse.tsx'
  ],
  medium: [
    'src/components/home/BeautyExchangeSection.tsx',
    'src/components/customer/CustomerDashboard.tsx'
  ]
};
