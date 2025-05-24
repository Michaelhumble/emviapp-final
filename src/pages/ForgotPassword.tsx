
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const ForgotPassword = () => {
  return (
    <Layout>
      <Helmet>
        <title>Forgot Password - EmviApp</title>
        <meta name="description" content="Reset your password" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Forgot Password</h1>
        <p className="text-center text-gray-600">Reset your password</p>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
