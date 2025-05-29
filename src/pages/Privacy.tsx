
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | EmviApp</title>
        <meta name="description" content="EmviApp Privacy Policy" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Privacy Policy content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;
