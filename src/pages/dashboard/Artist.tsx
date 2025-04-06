
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";

const ArtistDashboardPage = () => {
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ArtistDashboard />
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboardPage;
