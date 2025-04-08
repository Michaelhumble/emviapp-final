
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Loader2 } from 'lucide-react';
import ArtistWelcomeHeader from './new-dashboard/ArtistWelcomeHeader';
import ArtistPortfolioSection from './new-dashboard/ArtistPortfolioSection';
import ArtistServicesSection from './new-dashboard/ArtistServicesSection';
import ArtistReferralSection from './new-dashboard/ArtistReferralSection';
import ArtistAppointmentsSection from './new-dashboard/ArtistAppointmentsSection';
import ArtistDashboardStats from './new-dashboard/ArtistDashboardStats';
import { motion } from 'framer-motion';
import { adaptUserProfile } from '@/utils/profileAdapter';
import { UserProfile } from '@/types/profile';

/**
 * Complete Artist Dashboard reimplementation
 * Designed specifically for artists with unique UI/UX
 */
const ArtistDashboard = () => {
  const { user } = useAuth();
  
  // Fetch artist profile data
  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ['artist-profile', user?.id],
    queryFn: async () => {
      console.log('[ArtistDashboard] Fetching profile data for user:', user?.id);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error) {
        console.error('[ArtistDashboard] Error fetching profile:', error);
        throw error;
      }
      
      console.log('[ArtistDashboard] Profile data fetched successfully');
      // Adapt the data to ensure type compatibility
      return adaptUserProfile(data as any);
    },
    enabled: !!user?.id
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading your artist dashboard...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <motion.div 
        className="p-6 bg-red-50 border border-red-200 rounded-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load dashboard</h3>
        <p className="text-red-600 mb-4">
          We encountered an error while loading your profile data. Please try refreshing the page.
        </p>
        <pre className="text-xs text-left bg-white p-4 rounded border border-red-200 overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </motion.div>
    );
  }

  const firstName = profileData?.full_name?.split(' ')[0] || 'Artist';
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <ArtistWelcomeHeader name={firstName} />
      
      {/* Stats Overview */}
      <ArtistDashboardStats profileData={profileData} />
      
      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Section */}
          <ArtistPortfolioSection profileData={profileData} />
          
          {/* Appointments Section */}
          <ArtistAppointmentsSection profileData={profileData} />
          
          {/* Services Section */}
          <ArtistServicesSection profileData={profileData} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Referral Stats */}
          <ArtistReferralSection profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
