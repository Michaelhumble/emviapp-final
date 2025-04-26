import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ClientSuccessStories from "@/components/home/ClientSuccessStories";
import FeaturedSalons from "@/components/home/FeaturedSalons";
import Testimonials from "@/components/home/Testimonials";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AITeam from "@/components/home/AITeam";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import CallToAction from "@/components/home/CallToAction";

// Enhanced homepage components
import DynamicListingGrid from "@/components/home/DynamicListingGrid";
import SalonJobListingsShowcase from "@/components/home/SalonJobListingsShowcase";
import FounderMessage from "@/components/home/FounderMessage";
import MissingPieceSection from "@/components/home/missing-piece";
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonGrowthSection from "@/components/home/SalonGrowthSection";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";

// New homepage sections
import LatestIndustryOpportunities from "@/components/home/LatestIndustryOpportunities";

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
  }, []);
  
  return (
    <Layout>
      {/* Keep Hero section as first */}
      <Hero />
      
      {/* Replace with Latest Industry Opportunities section */}
      <LatestIndustryOpportunities />
      
      {/* Use our SalonJobListingsShowcase component */}
      <SalonJobListingsShowcase />
      
      {/* Move Client Growth System section here */}
      <SalonClientGrowthSystem />
      
      {/* Replace ArtistTestimonials with ClientSuccessStories */}
      <ClientSuccessStories />
      
      {/* Combine AI Features and What You Can Do sections */}
      <EnhancedAIFeatures />
      <WhatYouCanDoSection />
      
      {/* Add Trust Section */}
      <WhyTrustSection />
      
      {/* Keep only core sections */}
      <FeaturedSalons />
      <TrustFirstPanel />
      
      {/* Move From The Founder to the very bottom */}
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
