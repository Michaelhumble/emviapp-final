
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';
import HiringSalonsShowcase from '@/components/home/HiringSalonsShowcase';
import JobsHighlight from '@/components/home/JobsHighlight';
import SalonsForSale from '@/components/home/SalonsForSale';
import ImageDebug from '@/components/debug/ImageDebug';
import AIAgents from '@/components/home/AIAgents';
import EnhancedAIFeatures from '@/components/home/EnhancedAIFeatures';
import ArtistTestimonials from '@/components/home/ArtistTestimonials';
import BilingualWhySomeSalons from '@/components/home/BilingualWhySomeSalons';
import ArtistCallout from '@/components/home/ArtistCallout';

const HomePage = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <Layout>
      {/* Image Debug Panel - for troubleshooting images */}
      <div className="container mx-auto px-4 my-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold py-4">Image System Verification</h2>
        <p className="mb-4 text-gray-600">This panel displays all available nail salon images to verify they're loading correctly.</p>
        <ImageDebug />
      </div>
      
      <HiringSalonsShowcase />
      <AIAgents />
      <JobsHighlight />
      <EnhancedAIFeatures />
      <SalonsForSale />
      <BilingualWhySomeSalons />
      <ArtistTestimonials />
      <ArtistCallout />
    </Layout>
  );
};

export default HomePage;
