
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
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

const Index = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    hasSelectedRole, 
    isLoading,
    userId
  } = useRoleSelection();
  
  // If user has a role, redirect them to their dashboard
  useEffect(() => {
    if (user && userRole && hasSelectedRole && !isLoading) {
      switch(userRole) {
        case 'customer':
          navigate('/dashboard/customer');
          break;
        case 'artist':
          navigate('/dashboard/artist');
          break;
        case 'owner':
          navigate('/dashboard/owner');
          break;
        case 'supplier':
          navigate('/dashboard/supplier');
          break;
        default:
          // If we have an invalid role or it's not yet set, stay on this page
          break;
      }
    }
  }, [user, userRole, hasSelectedRole, isLoading, navigate]);
  
  return (
    <Layout>
      <Hero />
      {user && user.email ? <CustomerDashboard /> : null}
      <FeaturedSalons />
      <JobsHighlight />
      <ArtistCallout />
      <Testimonials />
      <CallToAction />
      
      {/* Only show the role selection modal if the user is logged in and has no role yet */}
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
