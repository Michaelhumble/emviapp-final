import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { tattooListings } from '@/data/industryListings';

const TattooPage = () => {
  return (
    <IndustryListingPage
      industryName="tattoo"
      displayName="Tattoo"
      listings={tattooListings}
      headerTitle="Tattoo Listings — Premium Spaces"
      headerSubtitle="Connect with renowned tattoo studios and showcase your artistry in the most respected shops in the industry."
      gradientColors="from-gray-100 via-stone-100 to-neutral-100"
      metaDescription="Find premium tattoo artist jobs and studio opportunities. Connect with top tattoo shops and artists through EmviApp."
    />
  );
};

export default TattooPage;