import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { nailListings, expiredNailListings } from '@/data/industryListings';

const NailsPage = () => {
  return (
    <IndustryListingPage
      industryName="nails"
      displayName="Nails"
      listings={nailListings}
      expiredListings={expiredNailListings}
      headerTitle="Nail Listings — Premium Spaces"
      headerSubtitle="Discover exclusive nail salon opportunities and connect with the finest establishments in the beauty industry."
      gradientColors="from-pink-100 via-purple-100 to-indigo-100"
      metaDescription="Find premium nail salon jobs and opportunities. Connect with top nail salons across the country through EmviApp's exclusive network."
    />
  );
};

export default NailsPage;