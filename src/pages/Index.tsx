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
import LatestIndustryOpportunities from "@/components/home/LatestIndustryOpportunities";
import SalonJobListingsShowcase from "@/components/home/SalonJobListingsShowcase";
import FounderMessage from "@/components/home/FounderMessage";
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";
import BeautyExchangeSection from "@/components/home/BeautyExchangeSection";
import BilingualExperienceSection from "@/components/home/BilingualExperienceSection";

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
      {/* Hero section as first */}
      <Hero />
      
      {/* ✨ NEW SECTION: The Beauty Exchange */}
      <BeautyExchangeSection />
      
      {/* Replace "The Platform You've Been Waiting For" with Bilingual Experience Section */}
      <BilingualExperienceSection />
      
      {/* 1️⃣ Latest Industry Opportunities (Beauty Exchange) */}
      <LatestIndustryOpportunities />
      
      {/* 2️⃣ Nail & Beauty Salons Hiring Now */}
      <SalonJobListingsShowcase />
      
      {/* 3️⃣ Why Artists & Salons Trust Us */}
      <WhyTrustSection />
      
      {/* Let AI Do the Hard Work (moved here) */}
      <EnhancedAIFeatures />
      
      {/* 4️⃣ What You Can Do With EmviApp */}
      <WhatYouCanDoSection />
      
      {/* 6️⃣ Let's Experience EmviApp Together */}
      <MissingPieceSection />
      
      {/* 7️⃣ No Matter Your Craft — We Know the Struggle */}
      <ClientSuccessStories />
      
      {/* 8️⃣ What's Really Keeping Your Salon From Growing? */}
      <SalonClientGrowthSystem />
      
      {/* Trust First Panel */}
      <TrustFirstPanel />
      
      {/* Founder sections at bottom */}
      <FounderMessage />
      <FinalFounderCTA />
      
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
