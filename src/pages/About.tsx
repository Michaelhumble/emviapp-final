
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About - EmviApp</title>
        <meta name="description" content="Learn more about EmviApp and our mission" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">About EmviApp</h1>
        <p className="text-center text-gray-600">Learn more about our mission and vision</p>
      </div>
    </Layout>
  );
};

export default About;
