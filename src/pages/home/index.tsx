
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/hero/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import HiringSalonsShowcase from '@/components/home/HiringSalonsShowcase';
import TopBeautyJobs from '@/components/home/TopBeautyJobs';
import SalonsForSale from '@/components/home/SalonsForSale';
import DownloadAppBanner from '@/components/home/DownloadAppBanner';
import BottomCTA from '@/components/home/BottomCTA';
import JobsHighlight from '@/components/home/JobsHighlight';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ImageDebug from '@/components/debug/ImageDebug';
import { useAuth } from '@/context/auth';

const HomePage = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <Layout>
      <Hero />
      <FeaturedSection />
      
      {/* Temporary debug component - remove after troubleshooting */}
      <div className="container mx-auto px-4 my-8">
        <ImageDebug />
      </div>
      
      <HiringSalonsShowcase />
      <TopBeautyJobs />
      <SalonsForSale />
      <JobsHighlight />
      <TestimonialsSection />
      <DownloadAppBanner />
      <BottomCTA />
    </Layout>
  );
};

export default HomePage;
