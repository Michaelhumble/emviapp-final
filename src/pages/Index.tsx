
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
      
      switch(userRole) {
        case 'customer':
          navigate('/dashboard/customer');
          break;
        case 'artist':
        case 'nail technician/artist':
          navigate('/dashboard/artist');
          break;
        case 'salon':
          navigate('/dashboard/salon');
          break;
        case 'owner':
          navigate('/dashboard/owner');
          break;
        case 'vendor':
        case 'supplier':
        case 'beauty supplier':
          navigate('/dashboard/supplier');
          break;
        case 'freelancer':
          navigate('/dashboard/freelancer');
          break;
        case 'renter':
          navigate('/dashboard/freelancer');  // Redirect renters to freelancer dashboard
          break;
        case 'other':
          navigate('/dashboard/other');
          break;
        default:
          // If no valid role is found, stay on the landing page
          break;
      }
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
