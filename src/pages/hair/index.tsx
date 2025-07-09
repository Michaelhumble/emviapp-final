import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { hairListings } from '@/data/industryListings';

const HairPage = () => {
  return (
    <IndustryListingPage
      industryName="hair"
      displayName="Hair"
      listings={hairListings}
      headerTitle="Hair Listings — Premium Spaces"
      headerSubtitle="Explore elite hair salon opportunities and join the most prestigious styling teams in the industry."
      gradientColors="from-amber-100 via-orange-100 to-red-100"
      metaDescription="Find premium hair stylist jobs and salon opportunities. Connect with top hair salons and styling positions through EmviApp."
    />
  );
};

export default HairPage;