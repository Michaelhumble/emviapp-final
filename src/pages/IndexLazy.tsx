import { useEffect, lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import { runListingsVerification } from "@/utils/runListingsVerification";

// Import conversion optimization components
import StickySignUpButton from "@/components/ui/StickySignUpButton";
import MicroConversionTop from "@/components/home/MicroConversionTop";
import CTARepeater from "@/components/home/CTARepeater";
import CompactTestimonials from "@/components/home/CompactTestimonials";

// Import analytics
import "@/utils/analytics/scrollTracking";

// Lazy load non-critical components
const ClientSuccessStories = lazy(() => import("@/components/home/ClientSuccessStories"));
const AIMatchmakerSection = lazy(() => import("@/components/home/ai-matchmaker"));
const FounderMessage = lazy(() => import("@/components/home/FounderMessage"));
const FinalFounderCTA = lazy(() => import("@/components/home/FinalFounderCTA"));
const SalonClientGrowthSystem = lazy(() => import("@/components/home/SalonClientGrowthSystem"));
const WhyTrustSection = lazy(() => import("@/components/home/sections/WhyTrustSection"));
const EmviQASection = lazy(() => import("@/components/home/EmviQASection"));
const JobsCallToAction = lazy(() => import("@/components/home/JobsCallToAction"));
const JobsFooterCTA = lazy(() => import("@/components/home/JobsFooterCTA"));
const PremiumIndustryShowcase = lazy(() => import("@/components/home/PremiumIndustryShowcase"));
const MissingPieceSection = lazy(() => import("@/components/home/missing-piece"));

// Critical above-the-fold components (not lazy loaded)
import LiveStatsBar from "@/components/home/trust/LiveStatsBar";
import TrustBadges from "@/components/home/trust/TrustBadges";
import RealTimeActivity from "@/components/home/trust/RealTimeActivity";

// Data imports
import { industryConfig } from "@/data/industryListings";

import CredibilityRibbon from "@/components/home/CredibilityRibbon";
import { isFeatureEnabled } from "@/config/premiumFeatures";

// Loading component for Suspense
const SectionSkeleton = () => (
  <div className="py-12 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
);

const Index = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    hasSelectedRole, 
    isLoading,
    userId
  } = useRoleSelection();
  
  useEffect(() => {
    document.title = "EmviApp | The Beauty Industry Platform";
    console.log("Index page loaded");
    
    // Run verification to ensure all listings have proper routing
    runListingsVerification()
      .then(() => console.log("Listings verification completed"))
      .catch(err => console.error("Error in listings verification:", err));
  }, []);
  
  return (
    <Layout>
      {/* Micro-conversion banner at top */}
      <MicroConversionTop />
      
      {/* 1. Hero section - Critical, not lazy loaded */}
      <Hero />
      
      {/* Credibility ribbon under hero */}
      <div className="px-4">
        <CredibilityRibbon />
      </div>
      
      {/* 1.2 Social Media Proof - Critical for trust */}
      <section className="py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            Thousands of beauty professionals are growing with EmviApp every day. Read real stories on our social channels.
          </h3>
          <div className="flex justify-center items-center gap-8">
            <a href="#" className="text-red-600 hover:text-red-700 transition-colors" aria-label="YouTube">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-700 transition-colors" aria-label="TikTok">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors" aria-label="Instagram">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-800 transition-colors" aria-label="LinkedIn">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* 1.5. Jobs Call to Action - Above the fold */}
      <Suspense fallback={<SectionSkeleton />}>
        <JobsCallToAction />
      </Suspense>

      {/* Find artists near you (SEO links) */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <nav aria-label="Find artists near you">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <li><a href="https://www.emvi.app/artists/hair/los-angeles-ca">Hair Artists in Los Angeles, CA</a></li>
              <li><a href="https://www.emvi.app/artists/nails/houston-tx">Nail Artists in Houston, TX</a></li>
              <li><a href="https://www.emvi.app/artists/makeup/new-york-ny">Makeup Artists in New York, NY</a></li>
              <li><a href="https://www.emvi.app/artists/barber/dallas-tx">Barbers in Dallas, TX</a></li>
            </ul>
          </nav>
        </div>
      </section>
      
      {/* CTA Repeater after hero/jobs section */}
      <CTARepeater variant="primary" />
      
      {/* 1.6 Real-time Activity Feed */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RealTimeActivity />
        </div>
      </section>
      
      {/* 2. Premium Industry Showcases - Lazy loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        {Object.values(industryConfig).map((industry, index) => (
          <div key={industry.name}>
            <PremiumIndustryShowcase
              industryName={industry.name}
              displayName={industry.displayName}
              listings={industry.listings}
              routePath={industry.routePath}
              gradientColors={industry.gradientColors}
              icon={industry.icon}
            />
            
            {/* Trust Badges after every 2nd industry showcase */}
            {index === 1 && (
              <section className="py-12 bg-gradient-to-r from-purple-50/30 to-pink-50/20">
                <div className="container mx-auto px-4 text-center">
                  <TrustBadges />
                </div>
              </section>
            )}
          </div>
        ))}
      </Suspense>

      {isFeatureEnabled('SHOW_HOME_METRICS') && (
        <div className="py-12">
          <LiveStatsBar />
        </div>
      )}
      
      {isFeatureEnabled('SHOW_HOME_METRICS') && (
        <div className="py-12">
          <LiveStatsBar />
        </div>
      )}
      
      {/* Remaining sections - All lazy loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyTrustSection />
      </Suspense>
      
      {/* CTA Repeater after trust section */}
      <CTARepeater variant="secondary" />
      
      <Suspense fallback={<SectionSkeleton />}>
        <AIMatchmakerSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <SalonClientGrowthSystem />
      </Suspense>
      
      {/* Replace original testimonials with compact version */}
      <CompactTestimonials />
      
      <Suspense fallback={<SectionSkeleton />}>
        <MissingPieceSection />
      </Suspense>
      
      {/* CTA Repeater after missing piece section */}
      <CTARepeater variant="jobs" />
      
      <Suspense fallback={<SectionSkeleton />}>
        <FounderMessage />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FinalFounderCTA />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <EmviQASection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <JobsFooterCTA />
      </Suspense>
      
      {/* Final CTA before footer */}
      <CTARepeater variant="minimal" />
      
      {/* Sticky Sign Up Button */}
      <StickySignUpButton />
      
      {user && userId && (
        <RoleSelectionModal 
          open={isRoleModalOpen} 
          onOpenChange={setIsRoleModalOpen} 
          userId={userId} 
        />
      )}
    </Layout>
  );
};

export default Index;