
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalonDetail = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <Helmet>
        <title>Salon Detail | EmviApp</title>
        <meta name="description" content="View salon details on EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Salon Detail - {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Salon detail functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SalonDetail;
