
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { UserRole } from "@/context/auth/types";
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import NewArtistDashboard from "@/components/dashboard/artist/NewArtistDashboard";

const ArtistDashboardPage = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
    
    // Debug check to validate correct routing
    if (userRole) {
      console.log(`[Artist Dashboard] Current role: ${userRole}`);
    }
  }, [userRole]);

  // Define allowed roles for this dashboard - strictly enforce artist roles only
  const allowedRoles: UserRole[] = ['artist'];

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Artist">
          <div className="container px-4 mx-auto py-12">
            <NewArtistDashboard />
          </div>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboardPage;
