import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';

// Core components
import CommunityHeader from '@/components/community/CommunityHeader';
import PostComposer from '@/components/community/PostComposer';
import CommunityFeed from '@/components/community/CommunityFeed';
import DailyMotivation from '@/components/community/DailyMotivation';
import CommunityLeaderboard from '@/components/community/CommunityLeaderboard';
import EventsSection from '@/components/community/EventsSection';
import DiscoverySidebar from '@/components/community/DiscoverySidebar';

// Mobile components
import MobileBottomNav from '@/components/community/MobileBottomNav';

const BeautyCommunity = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Daily Motivation Banner */}
        <DailyMotivation />
        
        {/* Community Header with Search and Filters */}
        <CommunityHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Post Composer */}
              {user && <PostComposer />}
              
              {/* Community Feed */}
              <CommunityFeed 
                filter={activeFilter}
                searchQuery={searchQuery}
              />
            </div>

            {/* Right Sidebar - Desktop Only */}
            <div className="hidden lg:block w-80 space-y-6">
              <DiscoverySidebar />
              <CommunityLeaderboard />
              <EventsSection />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </Layout>
  );
};

export default BeautyCommunity;