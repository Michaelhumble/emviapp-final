
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import ArtistDashboardLayout from '@/components/dashboard/artist/ArtistDashboardLayout';
import ArtistDashboardContent from '@/components/dashboard/artist/ArtistDashboardContent';

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  
  return (
    <ArtistDashboardLayout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto"
      >
        <ArtistDashboardContent profile={userProfile} />
      </motion.div>
    </ArtistDashboardLayout>
  );
};

export default ArtistDashboardPage;
