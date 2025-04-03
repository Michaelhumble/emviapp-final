
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
import AIPowerhouse from "@/components/home/AIPowerhouse";
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
  
  // If user has a role, redirect them to their dashboard
  useEffect(() => {
    if (user && userRole && hasSelectedRole && !loading && !isLoading) {
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
        case 'renter':
          // For renter role, navigate to artist dashboard for now
          // We can create a specific renter dashboard later
          navigate('/dashboard/artist');
          break;
        case 'supplier':
          navigate('/dashboard/supplier');
          break;
        default:
          // If we have an invalid role or it's not yet set, stay on this page
          break;
      }
    }
  }, [user, userRole, hasSelectedRole, loading, isLoading, navigate]);
  
  // Function to render appropriate dashboard based on user role
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
    
    if (user && user.email) {
      // If user has a role, show the customer dashboard as fallback until redirect happens
      return <CustomerDashboard />;
    }
    
    return null;
  };
  
  return (
    <Layout>
      <Hero />
      {renderRoleBasedDashboard()}
      <AIPowerhouse />
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
