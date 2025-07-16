import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ClientSuccessStories from "@/components/home/ClientSuccessStories";
import Testimonials from "@/components/home/Testimonials";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AITeam from "@/components/home/AITeam";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import MissingPieceSection from "@/components/home/missing-piece";
import { runListingsVerification } from "@/utils/runListingsVerification";

// Enhanced homepage components
import AIMatchmakerSection from "@/components/home/ai-matchmaker";
import FounderMessage from "@/components/home/FounderMessage";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";
import EmviQASection from "@/components/home/EmviQASection";

// Jobs-related components
import JobsCallToAction from "@/components/home/JobsCallToAction";
import JobsFooterCTA from "@/components/home/JobsFooterCTA";

// Premium Industry Showcase
import PremiumIndustryShowcase from "@/components/home/PremiumIndustryShowcase";
import { industryConfig } from "@/data/industryListings";

// Trust & Social Proof Components
import LiveStatsBar from "@/components/home/trust/LiveStatsBar";
import TrustBadges from "@/components/home/trust/TrustBadges";
import RealTimeActivity from "@/components/home/trust/RealTimeActivity";
import PartnerLogos from "@/components/home/trust/PartnerLogos";

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
      {/* 1. Hero section as first */}
      <Hero />
      
      {/* 1.1 Live Stats Bar - Trust & Social Proof */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="container mx-auto">
          <LiveStatsBar />
        </div>
      </section>
      
      {/* 1.2 Partner Logos Marquee */}
      <section className="py-8 bg-gradient-to-br from-purple-50/50 to-pink-50/30">
        <div className="container mx-auto px-4">
          <PartnerLogos />
        </div>
      </section>
      
      {/* 1.5. Jobs Call to Action - Above the fold */}
      <JobsCallToAction />
      
      {/* 1.6 Real-time Activity Feed */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RealTimeActivity />
        </div>
      </section>
      
      {/* 2. Premium Industry Showcases - Diamond listings first */}
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
      
      {/* 3. Why Artists & Salons Trust Us */}
      <WhyTrustSection />
      
      {/* 4. Meet Your AI Matchmaker - NEW PREMIUM SECTION */}
      <AIMatchmakerSection />
      
      {/* 5. What's Really Keeping Your Salon From Growing? */}
      <SalonClientGrowthSystem />
      
      {/* 6. No Matter Your Craft — We Know the Struggle */}
      <ClientSuccessStories />
      
      {/* 7. Let's Experience EmviApp Together - bilingual content */}
      <MissingPieceSection />
      
      {/* 8. Founder Message */}
      <FounderMessage />
      
      {/* 9. Final CTA */}
      <FinalFounderCTA />
      
      {/* 10. EmviApp Community Q&A - NEW SECTION */}
      <EmviQASection />
      
      {/* 10.5. Jobs Footer CTA - Final jobs promotion */}
      <JobsFooterCTA />
      
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
