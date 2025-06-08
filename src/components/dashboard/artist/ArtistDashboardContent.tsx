
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from './context/ArtistDataContext';
import PremiumArtistDashboard from './PremiumArtistDashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1,
    } 
  }
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ArtistDashboardContent = () => {
  const { loading } = useArtistData();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query.get("premium_success") === "1") {
      toast.success("Welcome to EmviApp Premium! 🎉", {
        duration: 5000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, [query, location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your empire...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PremiumArtistDashboard />
    </motion.div>
  );
};

export default ArtistDashboardContent;
