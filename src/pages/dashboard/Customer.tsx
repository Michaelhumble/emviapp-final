
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CustomerDashboardPage = () => {
  const { userProfile, userRole } = useAuth();
  
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
    
    // Add validation to ensure user is on the correct dashboard
    if (userRole !== 'customer') {
      toast.info("You're currently viewing the Customer dashboard, but your role is set as " + userRole);
    }
    
    console.log("Customer Dashboard rendered with profile:", userProfile);
  }, [userProfile, userRole]);
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-pink-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RoleDashboardLayout>
          <CustomerDashboard />
        </RoleDashboardLayout>
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboardPage;
