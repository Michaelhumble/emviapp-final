
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { hasRoleAccess } from "@/utils/navigation";

const ArtistDashboardPage = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
    
    // Check if still loading
    if (loading) return;
    
    // SECURITY CHECK: Ensure user is authorized to view this dashboard
    // Artist, nail technician/artist, and renters can access the artist dashboard
    const allowedRoles = ['artist', 'nail technician/artist', 'renter'];
    
    if (userRole && !hasRoleAccess(userRole, allowedRoles)) {
      console.log(`[ArtistDashboard] User with role ${userRole} attempted to access artist dashboard`);
      toast.error(`You don't have access to the artist dashboard. Redirecting to your dashboard...`);
      
      // Redirect to dashboard router, which will send to correct dashboard
      navigate("/dashboard");
      return;
    }
    
    // If no role, redirect to profile
    if (!userRole && !loading) {
      toast.error("Please complete your profile to access your dashboard");
      navigate("/profile/edit");
      return;
    }
    
    // Add validation to ensure user is on the correct dashboard
    if (userRole !== 'artist' && userRole !== 'nail technician/artist' && userRole !== 'renter') {
      toast.info("You're currently viewing the Artist dashboard, but your role is set as " + userRole);
    }
    
    console.log("Artist Dashboard rendered with profile:", userProfile);
  }, [userProfile, userRole, loading, navigate]);

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <ArtistDashboard />
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboardPage;
