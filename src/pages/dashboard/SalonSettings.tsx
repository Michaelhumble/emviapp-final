
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonSettingsPanel from "@/components/dashboard/salon/settings/SalonSettingsPanel";
import { SalonProvider } from "@/context/salon/SalonContext";

const SalonSettings = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Settings | EmviApp";
  }, []);
  
  return (
    <SalonProvider>
      <Layout>
        <motion.div 
          className="min-h-screen bg-gradient-to-b from-white to-blue-50/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 mx-auto py-12">
            <RoleDashboardLayout>
              <SalonSettingsPanel />
            </RoleDashboardLayout>
          </div>
        </motion.div>
      </Layout>
    </SalonProvider>
  );
};

export default SalonSettings;
