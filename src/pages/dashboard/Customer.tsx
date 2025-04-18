
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { hasRoleAccess } from "@/utils/navigation";
import { UserRole } from "@/context/auth/types";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";

const CustomerDashboardPage = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
    
    // Check if still loading
    if (loading) return;
    
    // SECURITY CHECK: Ensure user is authorized to view this dashboard
    // Only customers can access the customer dashboard
    const allowedRoles: UserRole[] = ['customer'];
    
    if (userRole && !hasRoleAccess(userRole, allowedRoles)) {
      console.log(`[CustomerDashboard] User with role ${userRole} attempted to access customer dashboard`);
      toast.error(`You don't have access to the customer dashboard. Redirecting to your dashboard...`);
      
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
    if (userRole !== 'customer') {
      toast.info("You're currently viewing the Customer dashboard, but your role is set as " + userRole);
    }
    
    console.log("Customer Dashboard rendered with profile:", userProfile);
  }, [userProfile, userRole, loading, navigate]);
  
  return (
    <Layout>
      <ProfileCompletionGuard>
        <motion.div 
          className="min-h-screen bg-gradient-to-b from-white to-pink-50/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 mx-auto py-12">
            <RoleDashboardLayout>
              <CustomerDashboard />
            </RoleDashboardLayout>
          </div>
        </motion.div>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default CustomerDashboardPage;
