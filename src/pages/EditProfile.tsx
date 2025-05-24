
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const EditProfile = () => {
  return (
    <Layout>
      <Helmet>
        <title>Edit Profile - EmviApp</title>
        <meta name="description" content="Edit your profile information" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Edit Profile</h1>
        <p className="text-center text-gray-600">Update your profile information</p>
      </div>
    </Layout>
  );
};

export default EditProfile;
