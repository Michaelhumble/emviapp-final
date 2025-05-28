
import React from 'react';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to EmviApp</h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Find nail technicians, sell your salon, or discover job opportunities
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Find Technicians</h3>
            <p className="text-gray-600">Connect with skilled nail artists in your area</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Sell Your Salon</h3>
            <p className="text-gray-600">List your salon business for sale</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
            <p className="text-gray-600">Browse nail salon job postings</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
