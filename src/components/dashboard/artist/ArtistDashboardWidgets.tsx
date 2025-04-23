
import React from 'react';
import WelcomeGreeting from './components/WelcomeGreeting';
import ProfileHighlights from './ProfileHighlights';
import ArtistMetrics from '@/components/dashboard/artist/sections/ArtistMetrics';
import ArtistTestimonials from './sections/ArtistTestimonials';
import ArtistCalendarPreview from './sections/ArtistCalendarPreview';
import ArtistMessagesPreview from './sections/ArtistMessagesPreview';
import { useAuth } from '@/context/auth';

const ArtistDashboardWidgets: React.FC = () => {
  const { userProfile } = useAuth();
  
  // Extract first name for personalized greeting
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Artist';
  
  // Mock stats for ProfileHighlights
  const artistStats = {
    rating: 4.9,
    clients: 32,
    responseTime: '< 2hrs',
    completionRate: 98,
    repeatClients: 76,
    experience: '3 years'
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeGreeting firstName={firstName} />
      
      {/* Performance Highlights */}
      <ProfileHighlights stats={artistStats} />
      
      {/* Performance Metrics */}
      <ArtistMetrics />
      
      {/* Two Column Layout for Client Activity and Upcoming Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArtistTestimonials />
        <ArtistMessagesPreview />
      </div>
      
      {/* Calendar Preview */}
      <ArtistCalendarPreview />
    </div>
  );
};

export default ArtistDashboardWidgets;
