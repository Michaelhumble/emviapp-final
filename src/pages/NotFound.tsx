
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found - EmviApp</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="font-playfair text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="font-playfair text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
