import React from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { barberListings } from '@/data/industryListings';

const BarberPage = () => {
  return (
    <IndustryListingPage
      industryName="barber"
      displayName="Barber"
      listings={barberListings}
      headerTitle="Barber Listings — Premium Spaces"
      headerSubtitle="Discover exceptional barbershop opportunities and master the art of traditional and modern grooming."
      gradientColors="from-slate-100 via-gray-100 to-zinc-100"
      metaDescription="Find premium barber jobs and barbershop opportunities. Connect with top barbershops and grooming positions through EmviApp."
    />
  );
};

export default BarberPage;