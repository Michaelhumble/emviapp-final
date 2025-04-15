
import { Helmet } from 'react-helmet-async';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';
import { useAuth } from '@/context/auth';

const ArtistDashboardPage = () => {
  const { userProfile, loading } = useAuth();
  
  return (
    <RoleDashboardLayout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <div className="container py-6">
        <h1 className="text-3xl font-serif font-medium mb-6">Artist Dashboard</h1>
        <ArtistDashboard />
      </div>
    </RoleDashboardLayout>
  );
};

export default ArtistDashboardPage;
