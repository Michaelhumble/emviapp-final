
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import DashboardContent from "@/components/dashboard/DashboardContent";

const ArtistDashboard = () => {
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardContent />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ArtistDashboard;
