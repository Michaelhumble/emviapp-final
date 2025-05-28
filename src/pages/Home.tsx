
import React from 'react';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to EmviApp</h1>
        <p className="text-lg text-center text-gray-600">
          Your premier destination for nail salon services and opportunities.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
