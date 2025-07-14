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

// Mobile components (removed - using unified navigation)

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
              {user && <div data-post-composer><PostComposer /></div>}
              
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

        {/* Floating Post Button - Mobile/iPad Only */}
        {user && (
          <button
            onClick={() => {
              // Scroll to post composer or open it
              const postComposer = document.querySelector('[data-post-composer]');
              if (postComposer) {
                postComposer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Focus the textarea
                const textarea = postComposer.querySelector('textarea');
                if (textarea) {
                  setTimeout(() => textarea.focus(), 300);
                }
              }
            }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 lg:hidden xl:hidden"
            aria-label="Create post"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </Layout>
  );
};

export default BeautyCommunity;