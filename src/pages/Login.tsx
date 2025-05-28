
import React from 'react';
import Layout from '@/components/layout/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <p className="text-center text-gray-600">Sign in to your account.</p>
      </div>
    </Layout>
  );
};

export default LoginPage;
