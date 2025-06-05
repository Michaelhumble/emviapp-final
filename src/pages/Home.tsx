
import React from 'react';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to EmviApp
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with beauty professionals and discover amazing services
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
