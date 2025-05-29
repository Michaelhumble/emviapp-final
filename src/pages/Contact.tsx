
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact | EmviApp</title>
        <meta name="description" content="Contact EmviApp" />
      </Helmet>
      
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contact page content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
