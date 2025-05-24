
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Messages = () => {
  return (
    <Layout>
      <Helmet>
        <title>Messages - EmviApp</title>
        <meta name="description" content="View your messages" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-4xl font-bold text-center mb-8">Messages</h1>
        <p className="text-center text-gray-600">Your messages and conversations</p>
      </div>
    </Layout>
  );
};

export default Messages;
