/**
 * 🔒 FULL CTA & LINK SMART-ROUTING AUDIT REPORT
 * EmviApp - Comprehensive Analysis & Optimization
 */

export interface CTAAuditItem {
  id: string;
  component: string;
  location: string;
  ctaText: string;
  currentRoute: string;
  targetRoute: string;
  status: 'working' | 'broken' | 'suboptimal' | 'needs-auth-gate';
  priority: 'critical' | 'high' | 'medium' | 'low';
  userType: 'guest' | 'authenticated' | 'both';
  conversionImpact: 'high' | 'medium' | 'low';
  fixRequired: boolean;
  recommendation: string;
}

export const ctaAuditReport: CTAAuditItem[] = [
  // ========== PRIMARY CONVERSION CTAs ==========
  {
    id: 'hero-post-job',
    component: 'Jobs Page Hero',
    location: 'Main hero section',
    ctaText: 'Post a Job',
    currentRoute: '/post-job',
    targetRoute: '/post-job',
    status: 'working',
    priority: 'critical',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Add auth gate and dual CTA structure'
  },
  {
    id: 'hero-browse-jobs',
    component: 'Jobs Page Hero',
    location: 'Main hero section',
    ctaText: 'Browse Jobs',
    currentRoute: '#jobs-section',
    targetRoute: '/jobs',
    status: 'suboptimal',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: true,
    recommendation: 'Should scroll to jobs grid, not anchor link'
  },

  // ========== VIETNAMESE JOB CARDS ==========
  {
    id: 'vietnamese-job-details',
    component: 'VietnameseJobCard',
    location: 'Job listings grid',
    ctaText: 'Xem Chi Tiết',
    currentRoute: '/job/{id}',
    targetRoute: '/job/{id}',
    status: 'working',
    priority: 'critical',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Perfect - navigates to job detail page with auth gate'
  },
  {
    id: 'fomo-nail-jobs-details',
    component: 'FOMONailJobsSection',
    location: 'Premium job listings',
    ctaText: 'Xem Chi Tiết',
    currentRoute: 'Modal popup',
    targetRoute: 'Modal popup',
    status: 'working',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'medium',
    fixRequired: false,
    recommendation: 'Modal works for demo data, but ensure contact info gated'
  },

  // ========== CHAT SYSTEM CTAs ==========
  {
    id: 'chat-post-job',
    component: 'ProfessionalChatSystem',
    location: 'Chat responses',
    ctaText: '📝 Post a Job',
    currentRoute: '/post-job',
    targetRoute: '/post-job',
    status: 'working',
    priority: 'critical',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },
  {
    id: 'chat-browse-jobs',
    component: 'ProfessionalChatSystem',
    location: 'Chat responses',
    ctaText: '🔍 Browse Jobs',
    currentRoute: '/jobs',
    targetRoute: '/jobs',
    status: 'working',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },
  {
    id: 'chat-signup',
    component: 'ProfessionalChatSystem',
    location: 'Chat responses',
    ctaText: '✨ Sign Up Now',
    currentRoute: '/auth/signup',
    targetRoute: '/auth/signup',
    status: 'working',
    priority: 'critical',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },

  // ========== COMMUNITY CTAs ==========
  {
    id: 'community-post-job',
    component: 'CommunityActionCTAs',
    location: 'Community page',
    ctaText: 'Post a Job',
    currentRoute: '/post-job',
    targetRoute: '/post-job',
    status: 'working',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },
  {
    id: 'community-sell-salon',
    component: 'CommunityActionCTAs',
    location: 'Community page',
    ctaText: 'Sell Your Salon',
    currentRoute: '/sell-salon',
    targetRoute: '/sell-salon',
    status: 'working',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },

  // ========== AUTH FLOW CTAs ==========
  {
    id: 'signin-signup-link',
    component: 'SignInForm',
    location: 'Sign in page',
    ctaText: 'Sign up',
    currentRoute: '/auth/signup',
    targetRoute: '/auth/signup',
    status: 'working',
    priority: 'high',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },
  {
    id: 'signup-signin-link',
    component: 'EnhancedSignUpForm',
    location: 'Sign up page',
    ctaText: 'Sign In',
    currentRoute: '/auth/signin',
    targetRoute: '/auth/signin',
    status: 'working',
    priority: 'high',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Working correctly'
  },

  // ========== EXTERNAL LINKS (NEED FIXING) ==========
  {
    id: 'emotional-trust-signup',
    component: 'EmotionalTrust',
    location: 'Various pages',
    ctaText: 'Get Started — Free Forever',
    currentRoute: 'http://emviapp-final.lovable.app/auth/signup?redirect=%2F',
    targetRoute: '/auth/signup',
    status: 'broken',
    priority: 'critical',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: true,
    recommendation: 'CRITICAL: Change to internal route /auth/signup'
  },
  {
    id: 'artists-hero-signup',
    component: 'ArtistHeroSection',
    location: 'Artists page',
    ctaText: 'Get Started',
    currentRoute: 'http://emviapp-final.lovable.app/auth/signup?redirect=%2F',
    targetRoute: '/auth/signup',
    status: 'broken',
    priority: 'critical',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: true,
    recommendation: 'CRITICAL: Change to internal route /auth/signup'
  },
  {
    id: 'cta-section-signup',
    component: 'CtaSection',
    location: 'Various pages',
    ctaText: 'Get Started Today',
    currentRoute: 'http://emviapp-final.lovable.app/auth/signup?redirect=%2F',
    targetRoute: '/auth/signup',
    status: 'broken',
    priority: 'critical',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: true,
    recommendation: 'CRITICAL: Change to internal route /auth/signup'
  },

  // ========== PREMIUM CONTACT GATES ==========
  {
    id: 'premium-contact-signup',
    component: 'PremiumContactGate',
    location: 'Job detail pages',
    ctaText: 'Sign Up & View Contact Info',
    currentRoute: '/auth/signup',
    targetRoute: '/auth/signup',
    status: 'working',
    priority: 'critical',
    userType: 'guest',
    conversionImpact: 'high',
    fixRequired: false,
    recommendation: 'Perfect conversion gate - keep as is'
  },

  // ========== MISSING DUAL CTAs ==========
  {
    id: 'missing-dual-cta-hero',
    component: 'Jobs Page Hero',
    location: 'Main hero section',
    ctaText: 'Need dual CTA structure',
    currentRoute: 'N/A',
    targetRoute: 'N/A',
    status: 'suboptimal',
    priority: 'high',
    userType: 'both',
    conversionImpact: 'high',
    fixRequired: true,
    recommendation: 'Add secondary "Already have account? Sign In" option'
  },
  {
    id: 'missing-browse-first-option',
    component: 'Multiple pages',
    location: 'Hero sections',
    ctaText: 'Need browse-first option',
    currentRoute: 'N/A',
    targetRoute: 'N/A',
    status: 'suboptimal',
    priority: 'medium',
    userType: 'guest',
    conversionImpact: 'medium',
    fixRequired: true,
    recommendation: 'Add "Explore First" or "Browse Without Signup" options'
  }
];

// ========== OPTIMIZATION RECOMMENDATIONS ==========
export const optimizationPlan = {
  immediate: [
    'Fix all external links pointing to lovable.app domains',
    'Implement dual CTA structure on hero sections',
    'Add auth gates with smart redirects',
    'Ensure all "Xem Chi Tiết" buttons work consistently'
  ],
  shortTerm: [
    'Add FOMO elements to CTAs ("Limited time", "Join 12,000+ others")',
    'Implement smart routing based on user authentication status',
    'Add secondary CTAs for non-committed users',
    'Optimize mobile CTA positioning and sizing'
  ],
  longTerm: [
    'A/B test CTA copy and positioning',
    'Implement personalized CTAs based on user behavior',
    'Add conversion tracking for all CTAs',
    'Create industry-specific landing pages with targeted CTAs'
  ]
};

export const conversionMetrics = {
  criticalCTAs: ctaAuditReport.filter(item => 
    item.priority === 'critical' && item.conversionImpact === 'high'
  ).length,
  brokenLinks: ctaAuditReport.filter(item => item.status === 'broken').length,
  needsOptimization: ctaAuditReport.filter(item => item.fixRequired).length,
  totalAudited: ctaAuditReport.length
};