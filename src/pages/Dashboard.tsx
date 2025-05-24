
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>Dashboard - EmviApp</title>
        <meta name="description" content="Your EmviApp dashboard" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Dashboard</h1>
        <p className="text-center text-gray-600">Welcome to your dashboard</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
