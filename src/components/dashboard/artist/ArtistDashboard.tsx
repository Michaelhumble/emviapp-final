
import ArtistDashboardContent from './components/ArtistDashboardContent';
import ArtistErrorState from './components/ArtistErrorState';
import ArtistLoadingState from './components/ArtistLoadingState';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import BookingNotificationsSection from '../notifications/BookingNotificationsSection';
import ArtistReferralCenter from './ArtistReferralCenter';
import ArtistPortfolioSection from './ArtistPortfolioSection';
import ArtistBookingsPanel from './ArtistBookingsPanel';
import ArtistDashboardHeader from './ArtistDashboardHeader';
import ArtistToolkitSection from './ArtistToolkitSection';
import ArtistServicesSection from './ArtistServicesSection';
import ArtistMetricsSection from './ArtistMetricsSection';
import ArtistBoostTracker from './ArtistBoostTracker';

const ArtistDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['artist-dashboard', user?.id],
    queryFn: async () => {
      // This is a placeholder for actual API call
      // In a real app, you would fetch artist-specific data here
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) return <ArtistLoadingState />;
  if (error) return <ArtistErrorState error={error as Error} />;

  return (
    <div className="space-y-8">
      {/* Artist-specific notification section */}
      <BookingNotificationsSection />
      
      {/* Artist Dashboard Header */}
      <ArtistDashboardHeader artistData={data} />
      
      {/* Artist Boost Tracker */}
      <ArtistBoostTracker />
      
      {/* Primary content section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArtistDashboardContent artistData={data} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ArtistMetricsSection />
          <ArtistReferralCenter />
        </div>
      </div>
      
      {/* Artist Portfolio Section */}
      <ArtistPortfolioSection />
      
      {/* Artist Bookings Panel */}
      <ArtistBookingsPanel />
      
      {/* Artist Services Section */}
      <ArtistServicesSection />
      
      {/* Artist Toolkit */}
      <ArtistToolkitSection />
    </div>
  );
};

export default ArtistDashboard;
