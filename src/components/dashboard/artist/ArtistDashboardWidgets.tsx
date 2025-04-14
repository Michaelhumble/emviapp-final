
import React from 'react';
import { ArtistMotivationalQuote } from './ArtistMotivationalQuote';
import { ArtistPerformanceMetrics } from './ArtistPerformanceMetrics';
import { ArtistBoostTracker } from './ArtistBoostTracker';
import { ArtistMetricsSection } from './ArtistMetricsSection';
import { ArtistDailyMotivation } from './ArtistDailyMotivation';
import { WeeklyDigestCard } from './WeeklyDigestCard';

const ArtistDashboardWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <ArtistPerformanceMetrics />
      <WeeklyDigestCard />
      <ArtistBoostTracker />
      <ArtistDailyMotivation />
    </div>
  );
};

export default ArtistDashboardWidgets;
