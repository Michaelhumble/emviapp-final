
import React from 'react';
import Layout from '@/components/layout/Layout';

export const ExpiredPostJob = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Expired Job Posts</h1>
          <p className="text-gray-600 mb-8">
            View and manage your expired job postings here.
          </p>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-500">No expired job posts found.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
