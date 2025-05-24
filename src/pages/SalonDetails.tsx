
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const SalonDetails = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <Helmet>
        <title>Salon Details - EmviApp</title>
        <meta name="description" content="View salon details" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Salon Details</h1>
        <p className="text-center text-gray-600">Salon ID: {id}</p>
      </div>
    </Layout>
  );
};

export default SalonDetails;
