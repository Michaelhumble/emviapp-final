
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import ArtistDashboardContent from './components/ArtistDashboardContent';
import ArtistErrorState from './components/ArtistErrorState';
import ArtistLoadingState from './components/ArtistLoadingState';
import BookingNotificationsSection from '../notifications/BookingNotificationsSection';
import ArtistReferralCenter from './ArtistReferralCenter';
import ArtistPortfolioSection from './ArtistPortfolioSection';
import ArtistBookingsPanel from './ArtistBookingsPanel';
import ArtistDashboardHeader from './ArtistDashboardHeader';
import ArtistToolkitSection from './ArtistToolkitSection';
import ArtistServicesSection from './ArtistServicesSection';
import ArtistMetricsSection from './ArtistMetricsSection';
import ArtistBoostTracker from './ArtistBoostTracker';
import { useEffect } from 'react';

// Define proper types for ArtistDashboard components if they don't exist
interface ArtistBoostTrackerProps {
  profileViews: number;
}

interface ArtistToolkitSectionProps {
  onCopyReferralLink: () => void;
}

const ArtistDashboard = () => {
  const { user } = useAuth();
  
  // Log when this component renders for debugging
  useEffect(() => {
    console.log('[Artist Dashboard] Component rendering with user:', user?.id);
  }, [user]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['artist-dashboard', user?.id],
    queryFn: async () => {
      console.log('[Artist Dashboard] Fetching artist data for user:', user?.id);
      // This is a placeholder for actual API call
      // In a real app, you would fetch artist-specific data here
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error) {
        console.error('[Artist Dashboard] Error fetching artist data:', error);
        throw error;
      }
      
      console.log('[Artist Dashboard] Artist data fetched successfully');
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) return <ArtistLoadingState />;
  if (error) return <ArtistErrorState error={error as Error} />;

  // Prepare props for components that need specific data
  const boostTrackerProps: ArtistBoostTrackerProps = {
    profileViews: data?.profile_views || 0
  };
  
  const toolkitSectionProps: ArtistToolkitSectionProps = {
    onCopyReferralLink: () => {
      const referralCode = data?.referral_code || '';
      if (referralCode) {
        navigator.clipboard.writeText(`https://emviapp.com/join?ref=${referralCode}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Artist-specific notification section */}
      <BookingNotificationsSection />
      
      {/* Artist Dashboard Header */}
      <ArtistDashboardHeader artistName={data?.full_name} artistData={data} />
      
      {/* Artist Boost Tracker */}
      <ArtistBoostTracker {...boostTrackerProps} />
      
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
      <ArtistToolkitSection {...toolkitSectionProps} />
    </div>
  );
};

export default ArtistDashboard;
