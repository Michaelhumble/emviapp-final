import { lazy, Suspense, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";

// Modern redesigned components (critical above-the-fold)
import ModernHero from "@/components/home/modern/ModernHero";
import WhyBeautyProsLoveUs from "@/components/home/modern/WhyBeautyProsLoveUs";
import ModernServiceFeatures from "@/components/home/modern/ModernServiceFeatures";
import BlogInsightsSection from "@/components/home/modern/BlogInsightsSection";

// Lazy load remaining sections below the fold
const ClientSuccessStories = lazy(() => import("@/components/home/ClientSuccessStories"));
const OptimizedIndustryListings = lazy(() => import("@/components/home/OptimizedIndustryListings"));
const AIMatchmakerSection = lazy(() => import("@/components/home/ai-matchmaker"));
const WhyTrustSection = lazy(() => import("@/components/home/sections/WhyTrustSection"));
const SalonClientGrowthSystem = lazy(() => import("@/components/home/SalonClientGrowthSystem"));
const FounderMessage = lazy(() => import("@/components/home/FounderMessage"));
const FinalFounderCTA = lazy(() => import("@/components/home/FinalFounderCTA"));
const EmviQASection = lazy(() => import("@/components/home/EmviQASection"));
const JobsFooterCTA = lazy(() => import("@/components/home/JobsFooterCTA"));
const MissingPieceSection = lazy(() => import("@/components/home/missing-piece"));

// Trust components
const LiveStatsBar = lazy(() => import("@/components/home/trust/LiveStatsBar"));
const TrustBadges = lazy(() => import("@/components/home/trust/TrustBadges"));
const RealTimeActivity = lazy(() => import("@/components/home/trust/RealTimeActivity"));

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
  const [isVietnamese, setIsVietnamese] = useState(false);
  
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    userId
  } = useRoleSelection();

  const toggleLanguage = () => {
    setIsVietnamese(!isVietnamese);
  };
  
  return (
    <Layout>
      {/* Modern hero section with blog-inspired design */}
      <ModernHero isVietnamese={isVietnamese} toggleLanguage={toggleLanguage} />
      
      {/* Why Beauty Pros Love EmviApp - Key stats section */}
      <WhyBeautyProsLoveUs isVietnamese={isVietnamese} />
      
      {/* Modern service features with real images */}
      <ModernServiceFeatures isVietnamese={isVietnamese} />
      
      {/* LAZY: Everything below the fold */}
      <FallbackBoundary errorMessage="Unable to load stats. Please refresh the page.">
        <Suspense fallback={<LoadingSpinner />}>
          <LiveStatsBar />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load activity feed.">
        <Suspense fallback={<LoadingSpinner />}>
          <RealTimeActivity />
        </Suspense>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Unable to load job listings.">
        <Suspense fallback={<LoadingSpinner />}>
          <OptimizedIndustryListings />
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
      
      {/* Blog insights section with latest articles */}
      <BlogInsightsSection isVietnamese={isVietnamese} />
      
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