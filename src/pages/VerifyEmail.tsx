
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VerifyEmail = () => {
  return (
    <Layout>
      <Helmet>
        <title>Verify Email | EmviApp</title>
        <meta name="description" content="Verify your EmviApp email address" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email verification functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
