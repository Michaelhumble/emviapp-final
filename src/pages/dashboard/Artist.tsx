
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import { UserRole } from "@/context/auth/types";
import { useEffect } from "react";
import { ArtistDataProvider } from "@/components/dashboard/artist/context/ArtistDataContext";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { normalizeUserRole } from "@/utils/navigation";

const ArtistDashboardPage = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
    
    // ADDED: Debug check to validate correct routing
    if (userRole) {
      const normalizedRole = normalizeUserRole(userRole);
      console.log(`[Artist Dashboard] Current normalized role: ${normalizedRole}`);
      
      // If not artist role, log warning (DashboardRouteProtection will handle redirect)
      if (normalizedRole !== 'artist') {
        console.warn(`[Artist Dashboard] Non-artist role (${normalizedRole}) accessed artist dashboard`);
      }
    }
  }, [userRole, navigate]);

  // Define allowed roles for this dashboard - strictly enforce artist roles only
  const allowedRoles: UserRole[] = ['artist', 'nail technician/artist'];

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Artist">
          <ArtistDataProvider>
            <div className="container px-4 mx-auto py-12">
              <RoleDashboardLayout>
                <ArtistDashboard />
              </RoleDashboardLayout>
            </div>
          </ArtistDataProvider>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboardPage;
