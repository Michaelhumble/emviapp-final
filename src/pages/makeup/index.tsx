import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { makeupListings } from '@/data/industryListings';

const MakeupPage = () => {
  return (
    <IndustryListingPage
      industryName="makeup"
      displayName="Makeup"
      listings={makeupListings}
      headerTitle="Makeup Listings — Premium Spaces"
      headerSubtitle="Access exclusive makeup artist opportunities in fashion, entertainment, and luxury beauty studios."
      gradientColors="from-rose-100 via-pink-100 to-fuchsia-100"
      metaDescription="Find premium makeup artist jobs and beauty studio opportunities. Connect with top makeup positions in fashion and entertainment through EmviApp."
    />
  );
};

export default MakeupPage;