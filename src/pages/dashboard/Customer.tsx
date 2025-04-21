
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { hasRoleAccess } from "@/utils/navigation";
import { UserRole } from "@/context/auth/types";
import Layout from "@/components/layout/Layout";
import { useReferralNotifications } from "@/hooks/useReferralNotifications";

const CustomerDashboardPage = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  // Set up referral notifications listener
  useReferralNotifications();
  
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
    if (loading) return;

    const allowedRoles: UserRole[] = ['customer'];
    if (userRole && !hasRoleAccess(userRole, allowedRoles)) {
      toast.error(`You don't have access to the customer dashboard. Redirecting...`);
      navigate("/dashboard");
      return;
    }
    if (!userRole && !loading) {
      toast.error("Please complete your profile to access your dashboard");
      navigate("/profile/edit");
      return;
    }
    if (userRole !== 'customer') {
      toast.info("You're currently viewing the Customer dashboard, but your role is set as " + userRole);
    }
  }, [userProfile, userRole, loading, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-white to-pink-50/40 px-1 sm:px-0 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CustomerDashboard />
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboardPage;
