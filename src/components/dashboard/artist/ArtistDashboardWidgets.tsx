
import React from 'react';
import ArtistMotivationalQuote from './ArtistMotivationalQuote';
import ArtistPerformanceMetrics from './ArtistPerformanceMetrics';
import ArtistBoostTracker from './ArtistBoostTracker';
import ArtistMetricsSection from './ArtistMetricsSection';
import ArtistDailyMotivation from './ArtistDailyMotivation';
import { WeeklyDigestCard } from './WeeklyDigestCard';
import { useAuth } from "@/context/auth";

const ArtistDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  // Default to 0 if profile_views is undefined
  const profileViews = userProfile?.profile_views || 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <ArtistPerformanceMetrics profileViews={profileViews} />
      <WeeklyDigestCard />
      <ArtistBoostTracker profileViews={profileViews} />
      <ArtistDailyMotivation />
    </div>
  );
};

export default ArtistDashboardWidgets;
