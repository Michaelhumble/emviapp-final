
/**
 * @file dashboardCore.ts
 * 🚨 CRITICAL: DO NOT REMOVE OR MODIFY WITHOUT APPROVAL
 * This file defines core components of the Artist Dashboard that must be preserved.
 */

export const CORE_FEATURES = {
  PORTFOLIO: 'portfolio',
  EARNINGS: 'earnings',
  CLIENT_ACTIVITY: 'client_activity',
  BOOKINGS: 'bookings',
  PROFILE_COMPLETION: 'profile_completion'
} as const;

// Define explicit type for component arrays
type CoreComponentList = readonly string[];

export const CORE_COMPONENTS: {
  [K in keyof typeof CORE_FEATURES]: CoreComponentList;
} = {
  [CORE_FEATURES.PORTFOLIO]: [
    'PortfolioShowcase',
    'PortfolioManager',
    'ArtistPortfolioSection'
  ],
  [CORE_FEATURES.EARNINGS]: [
    'EarningsSnapshot',
    'EarningsSummaryCard',
    'EarningsSection'
  ],
  [CORE_FEATURES.CLIENT_ACTIVITY]: [
    'ArtistActivityFeed',
    'MessagesPreview',
    'RecentActivity'
  ],
  [CORE_FEATURES.BOOKINGS]: [
    'ArtistBookingsOverview',
    'ArtistCalendarPreview',
    'BookingsTab'
  ],
  [CORE_FEATURES.PROFILE_COMPLETION]: [
    'ProfileCompletionGuard',
    'ProfileCompletionWarning'
  ]
};

export const CORE_FEATURE_DESCRIPTIONS = {
  [CORE_FEATURES.PORTFOLIO]: 'Portfolio management is essential for artist credibility',
  [CORE_FEATURES.EARNINGS]: 'Earnings tracking is crucial for business operations',
  [CORE_FEATURES.CLIENT_ACTIVITY]: 'Client communication is vital for relationship management',
  [CORE_FEATURES.BOOKINGS]: 'Booking management is core to business operations',
  [CORE_FEATURES.PROFILE_COMPLETION]: 'Profile completion guides improve artist success rates'
} as const;
