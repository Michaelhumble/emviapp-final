
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPassword = () => {
  return (
    <Layout>
      <Helmet>
        <title>Forgot Password | EmviApp</title>
        <meta name="description" content="Reset your EmviApp password" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Password reset functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
