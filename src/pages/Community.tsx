
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CommunityStories from '@/components/community/CommunityStories';
import CommunityHeader from '@/components/community/CommunityHeader';
import TrendingTopics from '@/components/community/TrendingTopics';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <Layout>
      {/* Community Header - Sticky at top, never hides */}
      <CommunityHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Post Composer - Always visible directly under search */}
          <div data-post-composer className="mb-6">
            <CommunityStories />
          </div>
          
          {/* Trending Topics - Regular card, no sticky/floating behavior on mobile/iPad */}
          <div className="mb-6 lg:hidden">
            <TrendingTopics />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
