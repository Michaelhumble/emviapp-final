
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { ArtistDataProvider } from '@/components/dashboard/artist/context/ArtistDataContext';
import ArtistDashboardContent from '@/components/dashboard/artist/ArtistDashboardContent';
import { ProfileCompletionProvider } from '@/context/profile/ProfileCompletionProvider';
import ProfileCompletionGuard from '@/components/profile/ProfileCompletionGuard';

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  
  return (
    <Layout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
        <meta name="description" content="Manage your artist profile, bookings, and portfolio" />
      </Helmet>
      
      <ProfileCompletionProvider>
        <ProfileCompletionGuard>
          <ArtistDataProvider>
            <div className="container mx-auto px-4 py-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ArtistDashboardContent />
              </motion.div>
            </div>
          </ArtistDataProvider>
        </ProfileCompletionGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
