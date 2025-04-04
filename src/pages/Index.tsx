
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
import { useEffect } from "react";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import AIAgents from "@/components/home/AIAgents";
import AITeam from "@/components/home/AITeam";
import PricingSection from "@/components/home/PricingSection";
import FreelancersHighlight from "@/components/home/FreelancersHighlight";
import { Skeleton } from "@/components/ui/skeleton";
import { navigateToRoleDashboard } from "@/utils/navigation";

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
    if (user && userRole && hasSelectedRole && !loading && !isLoading) {
      console.log("Redirecting based on user role:", userRole);
      
      const welcomeSeen = localStorage.getItem(`emvi_welcome_seen_${user.id}`);
      
      if (!welcomeSeen) {
        navigate('/welcome');
        return;
      }
      
      // Enhanced role-based dashboard routing
      navigateToRoleDashboard(userRole, navigate);
    }
  }, [user, userRole, hasSelectedRole, loading, isLoading, navigate]);
  
  return (
    <Layout>
      <Hero />
      <ArtistTestimonials />
      <AITeam />
      <AIAgents />
      <FreelancersHighlight />
      <PricingSection />
      <AIPowerhouse />
      <FeaturedSalons />
      <JobsHighlight />
      <ArtistCallout />
      <Testimonials />
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
