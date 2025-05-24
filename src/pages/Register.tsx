
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Register = () => {
  return (
    <Layout>
      <Helmet>
        <title>Register - EmviApp</title>
        <meta name="description" content="Create your EmviApp account" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Register</h1>
        <p className="text-center text-gray-600">Create your account to get started</p>
      </div>
    </Layout>
  );
};

export default Register;
