
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
      {/* Community Header - Sticky at top */}
      <CommunityHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Mobile/iPad optimized layout */}
          <div className="space-y-4">
            {/* Post Composer - Always first, fully accessible */}
            <div data-post-composer>
              <CommunityStories />
            </div>
            
            {/* Trending Topics - Static card below composer */}
            <div className="lg:hidden">
              <TrendingTopics />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
