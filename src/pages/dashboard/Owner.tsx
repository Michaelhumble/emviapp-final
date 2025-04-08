
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
import SalonBoostStatus from "@/components/dashboard/salon/SalonBoostStatus";
import SalonAnalyticsCards from "@/components/dashboard/salon/SalonAnalyticsCards";
import SalonNotificationCenter from "@/components/dashboard/salon/SalonNotificationCenter";
import SalonSuggestionBox from "@/components/dashboard/salon/SalonSuggestionBox";
import VisibilityNotification from "@/components/dashboard/salon/VisibilityNotification";
import SalonListingsManagement from "@/components/dashboard/salon/SalonListingsManagement";
import SalonCreditPromotion from "@/components/dashboard/salon/SalonCreditPromotion";
import TopLocalArtists from "@/components/dashboard/salon/TopLocalArtists";
import NextStepsSmart from "@/components/dashboard/salon/NextStepsSmart";
import confetti from "canvas-confetti";

const OwnerDashboard = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { userProfile } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
    console.log("Owner Dashboard rendered with profile:", userProfile);
    
    // Check if we should show confetti (e.g., first login, recent referred user, etc.)
    const shouldShowConfetti = localStorage.getItem('salon_success');
    
    if (shouldShowConfetti) {
      // Remove the flag so it only shows once
      localStorage.removeItem('salon_success');
      
      setTimeout(() => {
        setShowConfetti(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }
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
              
              {/* NEW: Salon Boost Status */}
              <SalonBoostStatus />

              {/* NEW: Next Steps Smart Panel */}
              <NextStepsSmart />
              
              {/* Salon Quick Stats */}
              <SalonQuickStats />
              
              {/* NEW: Analytics Cards */}
              <SalonAnalyticsCards />
              
              {/* NEW: Salon Listings Management */}
              <SalonListingsManagement />
              
              {/* Action Buttons with Vietnamese text */}
              <SalonDashboardActionButtons />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* NEW: Credit Promotion Card */}
                <div className="lg:col-span-1">
                  <SalonCreditPromotion />
                </div>
                
                {/* NEW: Top Local Artists widget */}
                <div className="lg:col-span-1">
                  <TopLocalArtists />
                </div>
                
                {/* Posted Jobs Section - Now in a column span */}
                <div className="lg:col-span-1">
                  <SalonReferralCard />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Credit Status Card */}
                <div className="lg:col-span-1">
                  <SalonCreditStatus />
                </div>
                
                {/* NEW: Notification Center and Suggestion Box */}
                <div className="lg:col-span-1 space-y-6">
                  <SalonNotificationCenter />
                </div>
                
                {/* Jobs Section */}
                <div className="lg:col-span-1">
                  <SalonPostedJobsSection />
                </div>
              </div>
              
              {/* Suggestion Box */}
              <SalonSuggestionBox />
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
