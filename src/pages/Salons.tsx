
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Salons = () => {
  return (
    <Layout>
      <Helmet>
        <title>Salons - EmviApp</title>
        <meta name="description" content="Discover beauty salons and wellness centers" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Salons</h1>
        <p className="text-center text-gray-600">Discover the best beauty salons and wellness centers</p>
      </div>
    </Layout>
  );
};

export default Salons;
