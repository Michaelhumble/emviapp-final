
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Settings = () => {
  return (
    <Layout>
      <Helmet>
        <title>Settings - EmviApp</title>
        <meta name="description" content="Manage your account settings" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Settings</h1>
        <p className="text-center text-gray-600">Manage your account preferences</p>
      </div>
    </Layout>
  );
};

export default Settings;
