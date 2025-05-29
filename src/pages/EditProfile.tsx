
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditProfile = () => {
  return (
    <Layout>
      <Helmet>
        <title>Edit Profile | EmviApp</title>
        <meta name="description" content="Edit your EmviApp profile" />
      </Helmet>
      
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Profile editing functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile;
