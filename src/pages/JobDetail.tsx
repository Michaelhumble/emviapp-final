
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

export const JobDetail = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Job Details</h1>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-600 mb-4">Job ID: {id}</p>
            <p className="text-gray-500">Job details coming soon...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
