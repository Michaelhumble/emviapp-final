
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import { hasRoleAccess } from "@/utils/navigation";

const Customer = () => {
  const { userRole } = useAuth();
  
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
      <div className="container mx-auto px-4 py-8">
        <DashboardGreeting />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Find Artists</h2>
            <p className="text-gray-600">Discover talented nail artists in your area.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
            <p className="text-gray-600">View and manage your upcoming appointments.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Favorites</h2>
            <p className="text-gray-600">Your saved artists and services.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
