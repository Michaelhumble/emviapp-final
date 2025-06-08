
import React from 'react';
import { motion } from 'framer-motion';
import ArtistReferrals from "../ArtistReferrals";
import ReferralWidget from "../ReferralWidget";
import ArtistViralSuccessCard from "../ArtistViralSuccessCard";

const ReferralsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Viral Success Card */}
      <ArtistViralSuccessCard />
      
      {/* Enhanced Referral Widget */}
      <ReferralWidget />
      
      {/* Main Referrals Component */}
      <ArtistReferrals />
    </motion.div>
  );
};

export default ReferralsTab;
