import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { massageListings } from '@/data/industryListings';

const MassagePage = () => {
  return (
    <IndustryListingPage
      industryName="massage"
      displayName="Massage"
      listings={massageListings}
      headerTitle="Massage Listings — Premium Spaces"
      headerSubtitle="Join elite wellness centers and luxury spas offering the most rewarding massage therapy positions."
      gradientColors="from-green-100 via-emerald-100 to-teal-100"
      metaDescription="Find premium massage therapy jobs and spa opportunities. Connect with top wellness centers and luxury spas through EmviApp."
    />
  );
};

export default MassagePage;