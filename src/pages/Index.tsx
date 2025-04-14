
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ArtistTestimonials from "@/components/home/ArtistTestimonials";
import FeaturedSalons from "@/components/home/FeaturedSalons";
import JobsHighlight from "@/components/home/JobsHighlight";
import ArtistCallout from "@/components/home/ArtistCallout";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AITeam from "@/components/home/AITeam";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import FreelancersHighlight from "@/components/home/FreelancersHighlight";

// Enhanced homepage components
import DynamicListingGrid from "@/components/home/DynamicListingGrid";
import EmotionalClosingSection from "@/components/home/EmotionalClosingSection";
import FounderMessage from "@/components/home/FounderMessage";
import MissingPieceSection from "@/components/home/missing-piece";
import EnhancedAIFeatures from "@/components/home/EnhancedAIFeatures";
import FinalFounderCTA from "@/components/home/FinalFounderCTA";

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
      <Hero />
      <FounderMessage />
      <ArtistTestimonials />
      <MissingPieceSection />
      <DynamicListingGrid />
      <EnhancedAIFeatures />
      <FreelancersHighlight />
      <TrustFirstPanel />
      <FeaturedSalons />
      <JobsHighlight />
      <ArtistCallout />
      <Testimonials />
      <EmotionalClosingSection />
      <FinalFounderCTA />
      <CallToAction />
      
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
