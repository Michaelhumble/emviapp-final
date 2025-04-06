
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";

const ArtistDashboardPage = () => {
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RoleDashboardLayout>
          <ArtistDashboard />
        </RoleDashboardLayout>
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboardPage;
