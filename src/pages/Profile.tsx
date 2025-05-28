
import React from 'react';
import Layout from '@/components/layout/Layout';

const ProfilePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <p className="text-gray-600">Manage your profile information.</p>
      </div>
    </Layout>
  );
};

export default ProfilePage;
