
import React from 'react';
import Layout from '@/components/layout/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
