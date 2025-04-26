
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

// Enhanced homepage components
import LatestIndustryOpportunities from "@/components/home/LatestIndustryOpportunities";
import SalonJobListingsShowcase from "@/components/home/SalonJobListingsShowcase";
import FounderMessage from "@/components/home/FounderMessage";
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";
import SalonClientGrowthSystem from "@/components/home/SalonClientGrowthSystem";
import WhyTrustSection from "@/components/home/sections/WhyTrustSection";
import WhatYouCanDoSection from "@/components/home/sections/WhatYouCanDoSection";

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
      {/* Hero section as first */}
      <Hero />
      
      {/* Latest Industry Opportunities */}
      <LatestIndustryOpportunities />
      
      {/* Job Listings Showcase */}
      <SalonJobListingsShowcase />
      
      {/* Client Growth System section */}
      <SalonClientGrowthSystem />
      
      {/* Success stories */}
      <ClientSuccessStories />
      
      {/* Enhanced AI Features section */}
      <EnhancedAIFeatures />
      
      {/* What You Can Do section */}
      <WhatYouCanDoSection />
      
      {/* Trust section */}
      <WhyTrustSection />
      
      {/* Featured Salons - clean spacing */}
      <FeaturedSalons />
      
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
