
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SignInForm from '@/components/auth/SignInForm';

const Login = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sign In | EmviApp</title>
        <meta name="description" content="Sign in to your EmviApp account" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignInForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
