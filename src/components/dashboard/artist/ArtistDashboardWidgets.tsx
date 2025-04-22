
import React from 'react';
import ArtistMetrics from '@/components/dashboard/artist/sections/ArtistMetrics';
import ArtistPortfolioPreview from '@/components/dashboard/artist/sections/ArtistPortfolioPreview';

const ArtistDashboardWidgets: React.FC = () => {
  return (
    <div className="space-y-6">
      <ArtistMetrics />
      <ArtistPortfolioPreview />
    </div>
  );
};

export default ArtistDashboardWidgets;
