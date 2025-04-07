
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
import { useAuth } from "@/context/auth";
import SalonPostedJobsSection from "@/components/dashboard/salon/SalonPostedJobsSection";
import VisibilityNotification from "@/components/dashboard/salon/VisibilityNotification";

const OwnerDashboard = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
    console.log("Owner Dashboard rendered with profile:", userProfile);
  }, [userProfile]);
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RoleDashboardLayout>
            {/* Using explicit salon components instead of generic DashboardContent */}
            <div className="space-y-8">
              {/* Salon Welcome Banner with Vietnamese text */}
              <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
              
              {/* Salon Quick Stats */}
              <SalonQuickStats />
              
              {/* Action Buttons with Vietnamese text */}
              <SalonDashboardActionButtons />

              {/* Posted Jobs Section */}
              <SalonPostedJobsSection />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Credit Status Card */}
                <SalonCreditStatus />
                
                {/* Referral Center with Vietnamese text */}
                <SalonReferralCard />
              </div>
            </div>
          </RoleDashboardLayout>
        </motion.div>
      </div>
      
      {/* Visibility upgrade notification */}
      {showNotification && (
        <VisibilityNotification 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </Layout>
  );
};

export default OwnerDashboard;
