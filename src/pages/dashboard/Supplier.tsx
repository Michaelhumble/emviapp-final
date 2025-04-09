
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  BarChart, 
  Package, 
  Globe, 
  TrendingUp, 
  Award, 
  Store,
  Users
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import InviteBanner from "@/components/dashboard/InviteBanner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
  const { userProfile } = useAuth();
  const { userRole } = useUserRole(userProfile?.id);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Supplier Dashboard | EmviApp";
  }, []);
  
  const handleCardClick = (action: string) => {
    switch (action) {
      case "post-product":
        navigate("/product-promotions");
        break;
      case "manage-profile":
        navigate("/profile/supplier/setup");
        break;
      case "analytics":
        toast.info("Analytics feature coming soon!");
        break;
      case "discover-salons":
        navigate("/salons");
        break;
      default:
        toast.info("Feature coming soon!");
    }
  };
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <div className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Profile Views</div>
                  <div className="text-2xl font-bold">312</div>
                  <div className="text-xs text-green-500">↑ 22% this month</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Active Products</div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-green-500">2 featured</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Salon Connections</div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-green-500">↑ 3 new this week</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Product Inquiries</div>
                  <div className="text-2xl font-bold">16</div>
                  <div className="text-xs text-amber-500">5 need response</div>
                </div>
              </div>
              
              {/* Invite Banner */}
              <InviteBanner className="mb-6" />
              
              {/* Action Cards */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Supplier Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DashboardCard 
                    title="List New Products" 
                    description="Showcase your inventory" 
                    icon={Package} 
                    onClick={() => handleCardClick("post-product")}
                    variant="primary"
                  />
                  <DashboardCard 
                    title="Manage Store Profile" 
                    description="Update your details" 
                    icon={Store}
                    onClick={() => handleCardClick("manage-profile")} 
                  />
                  <DashboardCard 
                    title="Sales Analytics" 
                    description="Track your performance" 
                    icon={BarChart}
                    onClick={() => handleCardClick("analytics")} 
                  />
                  <DashboardCard 
                    title="Discover Salons" 
                    description="Connect with potential clients" 
                    icon={Globe}
                    onClick={() => handleCardClick("discover-salons")} 
                  />
                  <DashboardCard 
                    title="Grow Your Network" 
                    description="Invite industry partners" 
                    icon={Users}
                    onClick={() => handleCardClick("invite")} 
                    variant="secondary"
                  />
                  <DashboardCard 
                    title="Premium Features" 
                    description="Boost your visibility" 
                    icon={Award}
                    onClick={() => handleCardClick("premium")} 
                    variant="outline"
                  />
                </div>
              </div>
              
              {/* Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
                    Performance Overview
                  </h2>
                  {/* Placeholder for performance stats */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Store Traffic</span>
                        <span className="text-sm font-medium">312 visits</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Engagement Rate</span>
                        <span className="text-sm font-medium">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                        <span className="text-sm font-medium">8.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '8.2%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2 text-emerald-500" />
                    Top Products
                  </h2>
                  {/* Placeholder for top products */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <Package className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Premium Gel Polish Set</p>
                        <p className="text-xs text-gray-500">142 views · 18 inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <Package className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Professional Nail Drill</p>
                        <p className="text-xs text-gray-500">96 views · 12 inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <Package className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Acrylic Powder Collection</p>
                        <p className="text-xs text-gray-500">78 views · 9 inquiries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SupplierDashboard;
