
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";

const CustomerDashboardPage = () => {
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
  }, []);
  
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
