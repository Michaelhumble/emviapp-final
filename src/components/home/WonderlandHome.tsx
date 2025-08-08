import React from 'react';
import { WONDERLAND_ENABLED } from '@/config/wonderland.config';
import ActivityTicker from '@/components/wonderland/ActivityTicker';
import HotJobsLane from '@/components/wonderland/HotJobsLane';
import TopSalonsHiringLane from '@/components/wonderland/TopSalonsHiringLane';
import ArtistSpotlightsLane from '@/components/wonderland/ArtistSpotlightsLane';
import BeforeAfterGalleryLane from '@/components/wonderland/BeforeAfterGalleryLane';

const WonderlandHome: React.FC = () => {
  if (!WONDERLAND_ENABLED) return null;

    return (
      <div id="wonderland-start">
        <ActivityTicker />
        <HotJobsLane />
        <TopSalonsHiringLane />
        <ArtistSpotlightsLane />
        <BeforeAfterGalleryLane />
      </div>
    )
};

export default WonderlandHome;
