
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import CustomerDashboardLayout from "@/components/dashboard/customer/CustomerDashboardLayout";
import CustomerWelcomeBanner from "@/components/dashboard/customer/CustomerWelcomeBanner";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";

const CustomerDashboardPage = () => {
  // Set page title
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
  }, []);
  
  // Define allowed roles for this dashboard - strictly enforce customer roles only
  const allowedRoles: UserRole[] = ['customer'];
  
  return (
    <Layout>
      <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Customer">
        <CustomerDashboardLayout>
          {/* Debug banner for role */}
          <div className="bg-purple-100 text-purple-800 text-sm py-1 px-3 rounded-md mb-4 flex items-center justify-center">
            <span className="font-mono">DEBUG: Logged in as: customer</span>
          </div>
          
          <CustomerWelcomeBanner />
          <CustomerDashboard />
        </CustomerDashboardLayout>
      </DashboardRouteProtection>
    </Layout>
  );
};

export default CustomerDashboardPage;
