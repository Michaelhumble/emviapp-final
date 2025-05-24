
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Login = () => {
  return (
    <Layout>
      <Helmet>
        <title>Login - EmviApp</title>
        <meta name="description" content="Sign in to your EmviApp account" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Login</h1>
        <p className="text-center text-gray-600">Sign in to your account</p>
      </div>
    </Layout>
  );
};

export default Login;
