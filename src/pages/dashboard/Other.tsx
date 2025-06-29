
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import DashboardContent from "@/components/dashboard/DashboardContent";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";

const OtherDashboard = () => {
  useEffect(() => {
    document.title = "Welcome to EmviApp";
  }, []);
  
  return (
    <Layout>
      <ProfileCompletionProvider>
        <ProfileCompletionGuard>
          <div className="container px-4 mx-auto py-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RoleDashboardLayout>
                <DashboardContent />
              </RoleDashboardLayout>
            </motion.div>
          </div>
        </ProfileCompletionGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default OtherDashboard;
