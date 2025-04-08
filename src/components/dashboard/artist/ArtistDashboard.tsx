
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
import { UserProfile, UserRole } from '@/context/auth/types';
import { Json } from '@/integrations/supabase/types';
import ArtistWelcomeBanner from './ArtistWelcomeBanner';

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

  // Transform the raw data into a UserProfile object with all required properties
  const userProfileData: UserProfile = {
    id: data?.id || '',
    email: data?.email || '',
    full_name: data?.full_name || '',
    avatar_url: data?.avatar_url || '',
    location: data?.location || '',
    bio: data?.bio || '',
    phone: data?.phone || '',
    instagram: data?.instagram || '',
    website: data?.website || '',
    specialty: data?.specialty || '',
    role: (data?.role as UserRole) || null,
    created_at: data?.created_at || '',
    updated_at: data?.updated_at || '',
    preferred_language: data?.preferred_language || '',
    referral_count: data?.credits || 0,
    salon_name: data?.salon_name || '', // Default empty string if not present
    company_name: data?.company_name || '', // Default empty string if not present
    custom_role: data?.custom_role || '',
    contact_link: data?.contact_link || '',
    skills: data?.skills || [], // Default empty array if not present
    skill_level: data?.skill_level || '', // Default empty string if not present
    profile_views: data?.profile_views || 0, // Default to 0 if not present
    preferences: Array.isArray(data?.preferences) ? data.preferences : [],
    affiliate_code: data?.referral_code || '',
    referral_code: data?.referral_code || '',
    credits: data?.credits || 0,
    boosted_until: data?.boosted_until || null,
    portfolio_urls: Array.isArray(data?.portfolio_urls) ? data.portfolio_urls : [],
    accepts_bookings: data?.accepts_bookings || false,
    booking_url: data?.booking_url || '',
  };

  // Prepare props for components that need specific data
  const boostTrackerProps: ArtistBoostTrackerProps = {
    profileViews: userProfileData.profile_views
  };
  
  const toolkitSectionProps: ArtistToolkitSectionProps = {
    onCopyReferralLink: () => {
      const referralCode = userProfileData.referral_code || '';
      if (referralCode) {
        navigator.clipboard.writeText(`https://emviapp.com/join?ref=${referralCode}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Artist-specific welcome banner */}
      <ArtistWelcomeBanner firstName={userProfileData.full_name?.split(' ')[0] || 'Artist'} />
      
      {/* Artist-specific notification section */}
      <BookingNotificationsSection />
      
      {/* Artist Dashboard Header */}
      <ArtistDashboardHeader profile={userProfileData} />
      
      {/* Artist Boost Tracker */}
      <ArtistBoostTracker {...boostTrackerProps} />
      
      {/* Primary content section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArtistDashboardContent artistData={userProfileData} />
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
