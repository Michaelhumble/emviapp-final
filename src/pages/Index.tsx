
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
import OpportunitiesSection from "@/components/home/opportunities/OpportunitiesSection";

// Import utilities for getting diverse listings
import { getFeaturedJobs, getSalonsForSale } from "@/utils/featuredContent";
import { Job } from "@/types/job";

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
  
  // Get diverse listings for the Beauty Exchange section
  const diverseListings: Job[] = [
    ...getFeaturedJobs(3),
    ...getSalonsForSale(3).map(salon => ({
      id: salon.id,
      title: salon.name,
      company: salon.name,
      location: salon.location,
      created_at: salon.created_at || new Date().toISOString(),
      description: salon.description,
      price: salon.price?.toString() || "",
      imageUrl: salon.imageUrl,
      type: "salon",
      for_sale: true
    }))
  ].slice(0, 3); // Limit to 3 listings
  
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
      
      {/* The Beauty Exchange - Original polished version with job cards */}
      <OpportunitiesSection diverseListings={diverseListings} />
      
      {/* Why Artists & Salons Trust Us */}
      <WhyTrustSection />
      
      {/* Let AI Do the Hard Work */}
      <EnhancedAIFeatures />
      
      {/* What You Can Do With EmviApp */}
      <WhatYouCanDoSection />
      
      {/* Let's Experience EmviApp Together */}
      <MissingPieceSection />
      
      {/* No Matter Your Craft — We Know the Struggle */}
      <ClientSuccessStories />
      
      {/* What's Really Keeping Your Salon From Growing? */}
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
