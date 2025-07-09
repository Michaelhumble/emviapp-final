import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { browsLashesListings } from '@/data/industryListings';

const BrowsLashesPage = () => {
  return (
    <IndustryListingPage
      industryName="brows-lashes"
      displayName="Brows & Lashes"
      listings={browsLashesListings}
      headerTitle="Brows & Lashes Listings — Premium Spaces"
      headerSubtitle="Discover specialized opportunities in microblading, lash extensions, and premium brow artistry."
      gradientColors="from-violet-100 via-purple-100 to-indigo-100"
      metaDescription="Find premium brow and lash technician jobs. Connect with top brow bars and lash studios through EmviApp."
    />
  );
};

export default BrowsLashesPage;