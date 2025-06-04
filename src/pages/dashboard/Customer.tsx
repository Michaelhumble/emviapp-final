
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import CustomerDashboard from "@/components/dashboard/customer/CustomerDashboard";
import { hasRoleAccess } from "@/utils/navigation";

const Customer = () => {
  const { userRole } = useAuth();
  
  try {
    // Check if user has customer access
    const hasAccess = hasRoleAccess(userRole, 'customer');
    
    if (!hasAccess) {
      return (
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
          <CustomerDashboard />
        </div>
      </Layout>
    );
  } catch (error) {
    console.error("Error in Customer dashboard:", error);
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p>Please try refreshing the page.</p>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Customer;
