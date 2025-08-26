import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import { useAuth } from "@/context/auth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";

// Critical above-the-fold components (loaded immediately)
import JobsCallToAction from "@/components/home/JobsCallToAction";

// Lazy load everything below the fold
const ClientSuccessStories = lazy(() => import("@/components/home/ClientSuccessStories"));
const NailListingsSection = lazy(() => import("@/components/home/NailListingsSection"));
const HairListingsSection = lazy(() => import("@/components/home/HairListingsSection"));
const BarberPremiumListingsSection = lazy(() => import("@/components/home/BarberPremiumListingsSection"));
const TattooListingsSection = lazy(() => import("@/components/home/TattooListingsSection"));
const MakeupListingsSection = lazy(() => import("@/components/home/MakeupListingsSection"));
const SkincareListingsSection = lazy(() => import("@/components/home/SkincareListingsSection"));
const EyebrowLashListingsSection = lazy(() => import("@/components/home/EyebrowLashListingsSection"));
const MassageListingsSection = lazy(() => import("@/components/home/MassageListingsSection"));
const AIMatchmakerSection = lazy(() => import("@/components/home/ai-matchmaker"));
const WhyTrustSection = lazy(() => import("@/components/home/sections/WhyTrustSection"));
const SalonClientGrowthSystem = lazy(() => import("@/components/home/SalonClientGrowthSystem"));
const FounderMessage = lazy(() => import("@/components/home/FounderMessage"));
const FinalFounderCTA = lazy(() => import("@/components/home/FinalFounderCTA"));
const EmviQASection = lazy(() => import("@/components/home/EmviQASection"));
const JobsFooterCTA = lazy(() => import("@/components/home/JobsFooterCTA"));
const MissingPieceSection = lazy(() => import("@/components/home/missing-piece"));
const ArtistsForHireSection = lazy(() => import("@/components/home/ArtistsForHire"));

// Trust components
const LiveStatsBar = lazy(() => import("@/components/home/trust/LiveStatsBar"));
const TrustBadges = lazy(() => import("@/components/home/trust/TrustBadges"));
const RealTimeActivity = lazy(() => import("@/components/home/trust/RealTimeActivity"));
const TrustBadgeRow = lazy(() => import("@/components/home/TrustBadgeRow"));
const PressTrustBar = lazy(() => import("@/components/home/PressTrustBar"));
const HomepageFAQ = lazy(() => import("@/components/home/HomepageFAQ"));

import CredibilityRibbon from "@/components/home/CredibilityRibbon";
import { isFeatureEnabled } from "@/config/premiumFeatures";

const LoadingSpinner = () => (
  <div className="py-8 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const LazyIndex = () => {
  const { user, loading } = useAuth();
  
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    userId
  } = useRoleSelection();
  
  return (
    <Layout>
      {/* CRITICAL: Above-the-fold content loads immediately */}
      <Hero />
      
      {/* Critical CTA */}
      <JobsCallToAction />
      
      {/* Trust badges below hero */}
      <Suspense fallback={null}>
        <TrustBadgeRow />
      </Suspense>
      
      {/* Press trust bar */}
      <Suspense fallback={null}>
        <PressTrustBar />
      </Suspense>
      
      <div className="px-4">
        <CredibilityRibbon />
      </div>
      
      {/* LAZY: Everything below the fold */}
      {isFeatureEnabled('SHOW_HOME_METRICS') && (
        <FallbackBoundary errorMessage="Unable to load stats. Please refresh the page.">
          <Suspense fallback={<LoadingSpinner />}>
            <LiveStatsBar />
          </Suspense>
        </FallbackBoundary>
      )}

      {/* Social Media Proof - Simple, no lazy loading needed */}
      <section className="py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            Thousands of beauty professionals are growing with EmviApp every day.
          </h3>
        </div>
      </section>
      
      <FallbackBoundary errorMessage="Unable to load activity feed.">
        <Suspense fallback={<LoadingSpinner />}>
          <RealTimeActivity />
        </Suspense>
      </FallbackBoundary>
      
      
      <FallbackBoundary errorMessage="Unable to load nail listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <NailListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load hair listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <HairListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      
      <FallbackBoundary errorMessage="Unable to load barber listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <BarberPremiumListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load tattoo listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <TattooListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load makeup listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <MakeupListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load skincare listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <SkincareListingsSection />
        </Suspense>
      </FallbackBoundary>

      <FallbackBoundary errorMessage="Unable to load artists for hire.">
        <Suspense fallback={<LoadingSpinner />}>
          <ArtistsForHireSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load eyebrow lash listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <EyebrowLashListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load massage listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <MassageListingsSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load trust badges.">
        <Suspense fallback={<LoadingSpinner />}>
          <TrustBadges />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load trust section.">
        <Suspense fallback={<LoadingSpinner />}>
          <WhyTrustSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load AI matchmaker.">
        <Suspense fallback={<LoadingSpinner />}>
          <AIMatchmakerSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load growth system.">
        <Suspense fallback={<LoadingSpinner />}>
          <SalonClientGrowthSystem />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load success stories.">
        <Suspense fallback={<LoadingSpinner />}>
          <ClientSuccessStories />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load section.">
        <Suspense fallback={<LoadingSpinner />}>
          <MissingPieceSection />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load founder message.">
        <Suspense fallback={<LoadingSpinner />}>
          <FounderMessage />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load call-to-action.">
        <Suspense fallback={<LoadingSpinner />}>
          <FinalFounderCTA />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load Q&A section.">
        <Suspense fallback={<LoadingSpinner />}>
          <EmviQASection />
        </Suspense>
      </FallbackBoundary>
      
      {/* Homepage FAQ with structured data */}
      <FallbackBoundary errorMessage="Unable to load FAQ section.">
        <Suspense fallback={<LoadingSpinner />}>
          <HomepageFAQ />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load footer CTA.">
        <Suspense fallback={<LoadingSpinner />}>
          <JobsFooterCTA />
        </Suspense>
      </FallbackBoundary>

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

export default LazyIndex;