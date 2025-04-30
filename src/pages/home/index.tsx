
import React from 'react';
import Layout from '@/components/layout/Layout';
import SalonsForSale from '@/components/home/SalonsForSale';
import FeaturedSalons from '@/components/home/FeaturedSalons';
import HiringSalonsShowcase from '@/components/home/HiringSalonsShowcase';
import JobsHighlight from '@/components/home/JobsHighlight';
import NailImageStatus from '@/components/debug/NailImageStatus';
import BarberImageStatus from '@/components/debug/BarberImageStatus';
import FallbackBoundary from '@/components/error-handling/FallbackBoundary';

const Home = () => {
  return (
    <Layout>
      <FallbackBoundary errorMessage="Debug components failed to load">
        <div className="container mx-auto p-4 mb-8 space-y-4">
          <NailImageStatus />
          <BarberImageStatus />
        </div>
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Salons for sale section failed to load">
        <SalonsForSale />
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Featured salons section failed to load">
        <FeaturedSalons />
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Hiring salons section failed to load">
        <HiringSalonsShowcase />
      </FallbackBoundary>
      
      <FallbackBoundary errorMessage="Jobs section failed to load">
        <JobsHighlight />
      </FallbackBoundary>
    </Layout>
  );
};

export default Home;
