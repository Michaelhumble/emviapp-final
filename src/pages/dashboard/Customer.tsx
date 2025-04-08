
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";

const CustomerDashboardPage = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
    
    // ADDED: Debug check to validate correct routing
    if (userRole) {
      console.log(`[Customer Dashboard] Current role: ${userRole}`);
      
      // If not customer role, log warning
      if (userRole !== 'customer') {
        console.warn(`[Customer Dashboard] Non-customer role (${userRole}) attempted to access customer dashboard`);
      }
    }
    
    console.log("Customer Dashboard rendered with profile:", userProfile);
  }, [userProfile, userRole, loading, navigate]);
  
  // Define allowed roles for this dashboard - strictly enforce customer roles only
  const allowedRoles: UserRole[] = ['customer'];
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-pink-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Customer">
          <div className="container px-4 mx-auto py-12">
            <RoleDashboardLayout>
              <CustomerDashboard />
            </RoleDashboardLayout>
          </div>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboardPage;
