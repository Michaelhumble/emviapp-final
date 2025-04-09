
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { adaptUserProfile } from '@/utils/profileAdapter';
import { motion } from 'framer-motion';
import SalonDashboardBanner from './SalonDashboardBanner';
import SalonQuickStats from './SalonQuickStats';
import SalonFeatureCardsGrid from './components/SalonFeatureCardsGrid';
import SalonProfileSection from './SalonProfileSection';
import SalonReferralCard from './SalonReferralCard';
import SalonCreditBalance from './SalonCreditBalance';
import SalonJobManagement from './SalonJobManagement';

const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const [credits, setCredits] = useState(adaptedProfile?.credits || 0);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Update credit balance if profile changes
  useEffect(() => {
    if (adaptedProfile?.credits) {
      setCredits(adaptedProfile.credits);
    }
  }, [adaptedProfile]);
  
  const handleBuyCredits = () => {
    // Placeholder for credit purchase flow
    console.log("Opening credit purchase flow");
    // Direct to credits page
    window.location.href = "/credits/purchase";
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div variants={item}>
        <SalonDashboardBanner userName={adaptedProfile?.salon_name} />
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div variants={item}>
        <SalonQuickStats />
      </motion.div>
      
      {/* Credit Balance */}
      <motion.div variants={item}>
        <SalonCreditBalance 
          credits={credits} 
          handleBuyCredits={handleBuyCredits}
        />
      </motion.div>
      
      {/* Feature Cards */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <SalonFeatureCardsGrid />
      </motion.div>
      
      {/* Job Management */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Job Management</h2>
        <SalonJobManagement />
      </motion.div>
      
      {/* Referral Section */}
      <motion.div variants={item}>
        <SalonReferralCard />
      </motion.div>
      
      {/* Profile Section */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Salon Profile</h2>
        <SalonProfileSection />
      </motion.div>
    </motion.div>
  );
};

export default SalonDashboardContent;
