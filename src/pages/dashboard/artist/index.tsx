
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import ServiceList from '@/components/dashboard/artist/services/ServiceList';
import ArtistPortfolioGallery from '@/components/artist/portfolio/ArtistPortfolioGallery';
import ArtistServicesManager from '@/components/artist/services/ArtistServicesManager';
import ArtistBookingCalendar from '@/components/dashboard/artist/calendar/ArtistBookingCalendar';
import ArtistAnalytics from '@/components/dashboard/artist/ArtistAnalytics';
import ArtistReferrals from '@/components/dashboard/artist/components/ArtistReferrals';
import { useAuth } from '@/context/auth';

const ArtistDashboard = () => {
  const { userProfile, loading } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <RoleDashboardLayout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ArtistPortfolioGallery />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistServicesManager />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistBookingCalendar />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistAnalytics />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistReferrals />
        </motion.div>
      </motion.div>
    </RoleDashboardLayout>
  );
};

export default ArtistDashboard;
