
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
          <CustomerWelcomeBanner />
          <CustomerDashboard />
        </CustomerDashboardLayout>
      </DashboardRouteProtection>
    </Layout>
  );
};

export default CustomerDashboardPage;
