
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SignUpForm from '@/components/auth/SignUpForm';

const Register = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sign Up | EmviApp</title>
        <meta name="description" content="Create your EmviApp account" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignUpForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
