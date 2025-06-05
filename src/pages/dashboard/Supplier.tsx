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
import SupplierDashboardHome from "@/components/dashboard/supplier/SupplierDashboardHome";

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
            <SupplierDashboardHome />
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SupplierDashboard;
