
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Join EmviApp | Sign Up</title>
        <meta name="description" content="Join EmviApp - Connect with beauty professionals and customers" />
      </Helmet>
      <Layout>
        <SignUpForm />
      </Layout>
    </>
  );
};

export default SignUp;
