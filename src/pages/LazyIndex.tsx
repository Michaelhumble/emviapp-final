import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import { useAuth } from "@/context/auth";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";

// Critical above-the-fold components (loaded immediately)
import JobsCallToAction from "@/components/home/JobsCallToAction";

// Lazy load everything below the fold
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
      
      {/* LAZY: Everything below the fold */}
      <Suspense fallback={<LoadingSpinner />}>
        <LiveStatsBar />
      </Suspense>

      {/* Social Media Proof - Simple, no lazy loading needed */}
      <section className="py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            Thousands of beauty professionals are growing with EmviApp every day.
          </h3>
        </div>
      </section>
      
      <Suspense fallback={<LoadingSpinner />}>
        <RealTimeActivity />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedIndustryListings />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TrustBadges />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <WhyTrustSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <AIMatchmakerSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <SalonClientGrowthSystem />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ClientSuccessStories />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <MissingPieceSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FounderMessage />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FinalFounderCTA />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <EmviQASection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <JobsFooterCTA />
      </Suspense>

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