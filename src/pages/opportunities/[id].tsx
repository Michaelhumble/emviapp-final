
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const OpportunityDetailsPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Opportunity Details</h1>
        <p className="text-gray-600">Viewing opportunity with ID: {id}</p>
      </div>
    </Layout>
  );
};

export default OpportunityDetailsPage;
