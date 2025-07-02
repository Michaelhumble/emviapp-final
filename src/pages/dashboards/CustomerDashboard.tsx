
import React from 'react';
import Layout from '@/components/layout/Layout';

const CustomerDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
        <p className="text-gray-600">Track your appointments and favorites.</p>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
