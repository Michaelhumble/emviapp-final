
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>EmviApp - Beauty Industry Jobs & Salon Marketplace</title>
        <meta name="description" content="Find beauty industry jobs, connect with artists, and discover salons on EmviApp" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
            Welcome to EmviApp
          </h1>
          <p className="font-inter text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            The premier platform for beauty industry professionals. Find jobs, discover talent, and grow your business.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
