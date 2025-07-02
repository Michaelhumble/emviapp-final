
import React from 'react';
import Layout from '@/components/layout/Layout';
import CommunityStories from '@/components/community/CommunityStories';

const Community = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Stories</h1>
            <p className="text-gray-600">
              Share your beauty journey and connect with our community
            </p>
          </div>
          
          <CommunityStories />
        </div>
      </div>
    </Layout>
  );
};

export default Community;
