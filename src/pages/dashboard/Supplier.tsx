
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import { hasRoleAccess } from "@/utils/navigation";

const Supplier = () => {
  // REFACTOR: Now using unified auth context instead of deleted useUserRole hook
  // Single source of truth: Supabase auth metadata only
  const { userRole } = useAuth();
  
  // Check if user has supplier access
  const hasAccess = hasRoleAccess(userRole, 'supplier');
  
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
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Supplier Dashboard</h1>
            <p className="text-gray-600">Manage your beauty supply business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Product Catalog</h3>
              <p className="text-gray-600">Manage your product listings</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Orders</h3>
              <p className="text-gray-600">Track customer orders</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">View sales performance</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Supplier;
