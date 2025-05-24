
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const ResetPassword = () => {
  return (
    <Layout>
      <Helmet>
        <title>Reset Password - EmviApp</title>
        <meta name="description" content="Create a new password" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Reset Password</h1>
        <p className="text-center text-gray-600">Create a new password</p>
      </div>
    </Layout>
  );
};

export default ResetPassword;
