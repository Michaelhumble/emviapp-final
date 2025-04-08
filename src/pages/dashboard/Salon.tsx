
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useAuth } from "@/context/auth";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
import SalonPostedJobsSection from "@/components/dashboard/salon/SalonPostedJobsSection";
import SalonBoostStatus from "@/components/dashboard/salon/SalonBoostStatus";
import { toast } from "sonner";
import SalonCreditPromotion from "@/components/dashboard/salon/SalonCreditPromotion";
import TopLocalArtists from "@/components/dashboard/salon/TopLocalArtists";
import { UserRole } from "@/context/auth/types";
import { hasRoleAccess } from "@/utils/navigation";

const SalonDashboard = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
    
    // Check if still loading
    if (loading) return;
    
    // SECURITY CHECK: Ensure user is authorized to view this dashboard
    // Only salon and owner roles can access this dashboard
    const allowedRoles: UserRole[] = ['salon', 'owner'];
    
    if (userRole && !hasRoleAccess(userRole, allowedRoles)) {
      console.log(`[SalonDashboard] User with role ${userRole} attempted to access salon dashboard`);
      toast.error(`You don't have access to the salon dashboard. Redirecting to your dashboard...`);
      
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
    if (userRole !== 'salon' && userRole !== 'owner') {
      toast.info("You're currently viewing the Salon dashboard, but your role is set as " + userRole);
    }
    
    // Add console log to debug
    console.log("Salon Dashboard rendered with profile:", userProfile);
    console.log("Current user role:", userRole);
  }, [userProfile, userRole, loading, navigate]);
  
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
              {/* Salon Welcome Banner with Vietnamese text */}
              <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
              
              {/* Salon Boost Status */}
              <SalonBoostStatus />
              
              {/* Salon Quick Stats */}
              <SalonQuickStats />
              
              {/* Action Buttons with Vietnamese text */}
              <SalonDashboardActionButtons />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* NEW: Credit Promotion Card */}
                <div className="lg:col-span-1">
                  <SalonCreditPromotion />
                </div>
                
                {/* Referral Center with Vietnamese text */}
                <div id="referral-card" className="lg:col-span-1">
                  <SalonReferralCard />
                </div>
                
                {/* NEW: Top Local Artists widget */}
                <div className="lg:col-span-1">
                  <TopLocalArtists />
                </div>
              </div>
              
              {/* Credit Status Card */}
              <SalonCreditStatus />
              
              {/* Posted Jobs Section */}
              <SalonPostedJobsSection />
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
