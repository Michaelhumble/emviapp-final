
import React from 'react';
import Layout from '@/components/layout/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-gray-600">Manage your account and services.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
