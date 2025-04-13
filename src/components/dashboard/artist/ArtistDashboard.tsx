
import ArtistDashboardContent from './components/ArtistDashboardContent';
import ArtistErrorState from './components/ArtistErrorState';
import ArtistLoadingState from './components/ArtistLoadingState';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import BookingNotificationsSection from '../notifications/BookingNotificationsSection';
import ArtistPortfolioGallery from './portfolio/ArtistPortfolioGallery';
import ArtistServiceManager from './services/ArtistServiceManager';

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
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <BookingNotificationsSection />
      <ArtistPortfolioGallery />
      <ArtistServiceManager />
      <ArtistDashboardContent />
    </div>
  );
};

export default ArtistDashboard;
