
import React from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './ArtistDashboardContent';
import { ArtistDataProvider } from './context/ArtistDataContext';
import { ProfileCompletionGuard } from '@/components/profile/ProfileCompletionGuard';

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ProfileCompletionGuard>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ArtistDashboardContent />
        </motion.div>
      </ProfileCompletionGuard>
    </ArtistDataProvider>
  );
};

export default ArtistDashboard;
