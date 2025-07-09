import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { skincareListings } from '@/data/industryListings';

const SkincarePage = () => {
  return (
    <IndustryListingPage
      industryName="skincare"
      displayName="Skincare"
      listings={skincareListings}
      headerTitle="Skincare Listings — Premium Spaces"
      headerSubtitle="Explore advanced esthetician opportunities at premier medical spas and luxury skincare clinics."
      gradientColors="from-blue-100 via-cyan-100 to-sky-100"
      metaDescription="Find premium esthetician jobs and medical spa opportunities. Connect with top skincare clinics and medical spas through EmviApp."
    />
  );
};

export default SkincarePage;