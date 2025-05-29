
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About | EmviApp</title>
        <meta name="description" content="Learn about EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>About EmviApp</CardTitle>
          </CardHeader>
          <CardContent>
            <p>About page content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
