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
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FounderMessage from "@/components/home/FounderMessage";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";
import BeautyExchangeSection from "@/components/home/BeautyExchangeSection";

// Listing section components
import BarberListingsSection from "@/components/home/BarberListingsSection";
import SkincareListingsSection from "@/components/home/SkincareListingsSection";
import MakeupListingsSection from "@/components/home/MakeupListingsSection";
import TattooListingsSection from "@/components/home/TattooListingsSection";
import NailListingsSection from "@/components/home/NailListingsSection";

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
      
      {/* 2. Emvi Beauty Connections™ - Contains all listing sections */}
      <BeautyExchangeSection />
      
      {/* 3. Why Artists & Salons Trust Us */}
      <WhyTrustSection />
      
      {/* 4. Let AI Do the Hard Work */}
      <EnhancedAIFeatures />
      
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
