
import { useState, useEffect } from "react";
import ArtistDashboardContent from './components/ArtistDashboardContent';
import ArtistErrorState from './components/ArtistErrorState';
import ArtistLoadingState from './components/ArtistLoadingState';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import BookingNotificationsSection from '../notifications/BookingNotificationsSection';
import ArtistPortfolioGallery from './portfolio/ArtistPortfolioGallery';
import ArtistServiceManager from './services/ArtistServiceManager';
import ArtistBookingCalendar from './calendar/ArtistBookingCalendar';
import ArtistBookingsPanel from '../artist/ArtistBookingsPanel';
import ArtistWelcomeBanner from './ArtistWelcomeBanner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArtistDashboard = () => {
  const { user, userProfile } = useAuth();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

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

  // Automatically hide welcome banner after 5 seconds
  useEffect(() => {
    if (showWelcomeBanner) {
      const timer = setTimeout(() => {
        setShowWelcomeBanner(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showWelcomeBanner]);

  if (isLoading) return <ArtistLoadingState />;
  if (error) return <ArtistErrorState error={error as Error} />;

  return (
    <div className="space-y-8">
      {showWelcomeBanner && (
        <ArtistWelcomeBanner firstName={userProfile?.full_name?.split(' ')[0] || "Artist"} />
      )}
      
      <Card className="shadow-sm border bg-white">
        <CardHeader className="pb-2">
          <CardTitle>Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BookingNotificationsSection />
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Bookings Panel */}
      <ArtistBookingsPanel />
      
      <ArtistPortfolioGallery />
      <ArtistServiceManager />
      <ArtistBookingCalendar />
      <ArtistDashboardContent />
    </div>
  );
};

export default ArtistDashboard;
