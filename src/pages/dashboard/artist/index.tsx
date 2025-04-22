
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <ArtistDashboard />
      </motion.div>
    </div>
  );
};

export default ArtistDashboardPage;
