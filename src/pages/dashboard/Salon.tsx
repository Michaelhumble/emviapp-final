
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonOwnerDashboardWidgets from "@/components/dashboard/salon/SalonOwnerDashboardWidgets";
import { useAuth } from "@/context/auth";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";

const SalonDashboard = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
  }, []);
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <div className="space-y-8">
              {/* Salon Welcome Banner */}
              <SalonDashboardBanner userName={userProfile?.full_name} />
              
              {/* Salon Quick Stats */}
              <SalonQuickStats />
              
              {/* Salon Owner Dashboard Widgets */}
              <SalonOwnerDashboardWidgets />
              
              {/* Referral Center adapted for salons */}
              <SalonReferralCard />
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
