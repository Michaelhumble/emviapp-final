
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Salons = () => {
  return (
    <Layout>
      <Helmet>
        <title>Salons | EmviApp</title>
        <meta name="description" content="Browse salons on EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Salons</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Salon listings coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Salons;
