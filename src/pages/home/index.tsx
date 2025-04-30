
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import BeautyExchangeSection from '@/components/home/BeautyExchangeSection';
import BilingualExperienceSection from '@/components/home/BilingualExperienceSection';
import AIPowerhouse from '@/components/home/AIPowerhouse';
import FeaturedSalons from '@/components/home/FeaturedSalons';
import CallToAction from '@/components/home/CallToAction';
import MissingPieceSection from '@/components/home/missing-piece';

const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>EmviApp | Beauty Industry Marketplace</title>
        <meta
          name="description"
          content="EmviApp connects beauty professionals, salon owners, and clients. Find jobs, talent, salons for sale, and more."
        />
      </Helmet>

      <Hero />
      <Features />
      <BeautyExchangeSection />
      <MissingPieceSection />
      <FeaturedSalons />
      
      {/* Add the Bilingual Experience Section before AIPowerhouse */}
      <BilingualExperienceSection />
      
      <AIPowerhouse />
      <CallToAction />
    </Layout>
  );
};

export default IndexPage;
