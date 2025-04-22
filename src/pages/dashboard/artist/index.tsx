
import { Helmet } from 'react-helmet-async';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';
import ArtistDashboardHeader from '@/components/dashboard/artist/ArtistDashboardHeader';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  
  return (
    <RoleDashboardLayout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ArtistDashboardHeader profile={userProfile} />
          <div className="mt-6">
            <ArtistDashboard />
          </div>
        </motion.div>
      </div>
    </RoleDashboardLayout>
  );
};

export default ArtistDashboardPage;
