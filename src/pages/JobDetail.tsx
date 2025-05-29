
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JobDetail = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <Helmet>
        <title>Job Detail | EmviApp</title>
        <meta name="description" content="View job details on EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Detail - {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Job detail functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default JobDetail;
