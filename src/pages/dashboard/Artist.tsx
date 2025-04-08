
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const ArtistDashboardPage = () => {
  const { userProfile, userRole } = useAuth();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
    
    // Add validation to ensure user is on the correct dashboard
    if (userRole !== 'artist' && userRole !== 'nail technician/artist' && userRole !== 'renter') {
      toast.info("You're currently viewing the Artist dashboard, but your role is set as " + userRole);
    }
    
    console.log("Artist Dashboard rendered with profile:", userProfile);
  }, [userProfile, userRole]);

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
