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

// Premium Industry Showcase
import PremiumIndustryShowcase from "@/components/home/PremiumIndustryShowcase";
import { industryConfig } from "@/data/industryListings";

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
      
      {/* 2. Premium Industry Showcases - Diamond listings first */}
      {Object.values(industryConfig).map((industry) => (
        <PremiumIndustryShowcase
          key={industry.name}
          industryName={industry.name}
          displayName={industry.displayName}
          listings={industry.listings}
          routePath={industry.routePath}
          gradientColors={industry.gradientColors}
          icon={industry.icon}
        />
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
