
import React from 'react';
import Layout from '@/components/layout/Layout';
import SalonsForSale from '@/components/home/SalonsForSale';
import FeaturedSalons from '@/components/home/FeaturedSalons';
import HiringSalonsShowcase from '@/components/home/HiringSalonsShowcase';
import JobsHighlight from '@/components/home/JobsHighlight';
import NailImageStatus from '@/components/debug/NailImageStatus';
import BarberImageStatus from '@/components/debug/BarberImageStatus';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 mb-8 space-y-4">
        <NailImageStatus />
        <BarberImageStatus />
      </div>
      <SalonsForSale />
      <FeaturedSalons />
      <HiringSalonsShowcase />
      <JobsHighlight />
    </Layout>
  );
};

export default Home;
