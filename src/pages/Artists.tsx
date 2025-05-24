
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Artists = () => {
  return (
    <Layout>
      <Helmet>
        <title>Artists - EmviApp</title>
        <meta name="description" content="Connect with talented beauty artists and professionals" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Artists</h1>
        <p className="text-center text-gray-600">Connect with talented beauty artists and professionals</p>
      </div>
    </Layout>
  );
};

export default Artists;
