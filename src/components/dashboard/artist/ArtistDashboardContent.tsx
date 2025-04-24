
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from './context/ArtistDataContext';
import ArtistHero from './sections/ArtistHero';
import ArtistMetrics from './sections/ArtistMetrics';
import ArtistActivityFeed from './sections/ArtistActivityFeed';
import ArtistAppointments from './sections/ArtistAppointments';
import ArtistBookingsLocal from './sections/ArtistBookingsLocal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import ArtistPortfolioManager from './portfolio/ArtistPortfolioManager';
import ProfileBoostBanner from "./ProfileBoostBanner";
import EarningsSnapshot from '../artist/EarningsSnapshot';
import { Link } from 'react-router-dom';
import ArtistPortfolioSection from './sections/ArtistPortfolioSection';

// Animation variants
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

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
};

// Helper: Parse query params from location
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PREMIUM_CHECKOUT_LINK = "https://buy.stripe.com/test_4gw8ycdIz2J4gUw9AA";

const MOCK_EXPIRY = "May 31, 2025"; // mock expiry date for visual banner

const ArtistDashboardContent = () => {
  // MOCK STATE
  const [hasBoost, setHasBoost] = useState(false);

  const { loading } = useArtistData();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query.get("premium_success") === "1") {
      toast.success("Welcome to EmviApp Premium!", {
        duration: 5000,
      });
      // Clean URL
      navigate(location.pathname, { replace: true });
    }
  }, [query, location, navigate]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <div className="space-y-6">
          <div className="h-48 bg-gray-100 animate-pulse rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  const handleUpgrade = () => {
    // Mock profile boost activation for demo (no payment). Real implementation would integrate payments.
    setHasBoost(true);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto py-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Boost Banner (Premium Monetization UI) */}
      <ProfileBoostBanner hasBoost={hasBoost} boostExpiry={MOCK_EXPIRY} onBoostClick={handleUpgrade} />

      {/* Header row: Upgrade button at right */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-8">
        <div />
        <button
          onClick={handleUpgrade}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold tracking-wide shadow transition
            border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300
            text-sm md:text-base"
          aria-label="Upgrade to Premium"
          style={{ letterSpacing: '0.02em' }}
        >
          Upgrade to Premium
        </button>
      </div>

      <motion.div variants={itemVariants}>
        <ArtistHero />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistMetrics />
      </motion.div>

      {/* Earnings Snapshot */}
      <motion.div variants={itemVariants}>
        <EarningsSnapshot />
      </motion.div>

      {/* Portfolio section - Updated with portfolio section component that has the view button */}
      <motion.div variants={itemVariants}>
        <ArtistPortfolioSection />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistBookingsLocal />
      </motion.div>
      
      <div className="h-2 md:h-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ArtistActivityFeed />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistAppointments />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistDashboardContent;
