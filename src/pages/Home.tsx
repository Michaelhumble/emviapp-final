
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>EmviApp - Beauty Professional Network</title>
        <meta 
          name="description" 
          content="Connect with beauty professionals, find jobs, and grow your career in the beauty industry."
        />
      </Helmet>
      
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Home;
