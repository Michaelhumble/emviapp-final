
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Jobs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Jobs | EmviApp</title>
        <meta name="description" content="Browse beauty jobs on EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Job listings coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Jobs;
