
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { hasRoleAccess } from "@/utils/navigation";
import { UserRole } from "@/context/auth/types";

const CustomerDashboardPage = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
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
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-pink-50/40 px-1 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CustomerDashboard />
    </motion.div>
  );
};

export default CustomerDashboardPage;
