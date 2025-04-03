
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ArtistTestimonials from "@/components/home/ArtistTestimonials";
import FeaturedSalons from "@/components/home/FeaturedSalons";
import JobsHighlight from "@/components/home/JobsHighlight";
import ArtistCallout from "@/components/home/ArtistCallout";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import CustomerDashboard from "@/components/customer/CustomerDashboard";
import { useAuth } from "@/context/AuthContext";
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
        case 'owner':
          navigate('/dashboard/owner');
          break;
        case 'supplier':
        case 'beauty supplier':
          navigate('/dashboard/supplier');
          break;
        case 'freelancer':
          navigate('/dashboard/freelancer');
          break;
        case 'other':
          navigate('/dashboard/customer'); // Fallback to customer dashboard for "other" role
          break;
        default:
          // If no valid role is found, stay on the landing page
          break;
      }
    }
  }, [user, userRole, hasSelectedRole, loading, isLoading, navigate]);
  
  const renderRoleBasedDashboard = () => {
    if (loading || isLoading) {
      return (
        <div className="py-12 space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      );
    }
    
    // Only show customer dashboard on index page if user is actually a customer
    if (user && userRole === 'customer') {
      return <CustomerDashboard />;
    }
    
    return null;
  };
  
  return (
    <Layout>
      <Hero />
      <ArtistTestimonials />
      <AITeam />
      {renderRoleBasedDashboard()}
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
