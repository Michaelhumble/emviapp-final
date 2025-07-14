import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';
import { Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Core components
import CommunityHeader from '@/components/community/CommunityHeader';
import PostComposer from '@/components/community/PostComposer';
import CommunityFeed from '@/components/community/CommunityFeed';
import DailyMotivation from '@/components/community/DailyMotivation';
import CommunityLeaderboard from '@/components/community/CommunityLeaderboard';
import EventsSection from '@/components/community/EventsSection';
import DiscoverySidebar from '@/components/community/DiscoverySidebar';
import TrendingTopics from '@/components/community/TrendingTopics';
import SuggestedForYou from '@/components/community/SuggestedForYou';

const BeautyCommunity = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showFABBounce, setShowFABBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show FAB bounce animation after user scrolls down
      if (currentScrollY > 200 && !showFABBounce) {
        setShowFABBounce(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFABBounce]);

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

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
          {/* Trending Topics - Mobile/iPad Horizontal Scroll */}
          <div className="lg:hidden mb-6">
            <TrendingTopics />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Post Composer - Desktop Only */}
              <div className="hidden lg:block">
                {user && <div data-post-composer><PostComposer /></div>}
              </div>
              
              {/* Community Feed with iPad responsive grid */}
              <div className="md:grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6">
                {/* iPad landscape: 2 columns */}
                <div className="hidden md:block lg:hidden">
                  <CommunityFeed 
                    filter={activeFilter}
                    searchQuery={searchQuery}
                    className="space-y-4"
                  />
                </div>
                
                {/* Mobile and Desktop: single column */}
                <div className="block md:hidden lg:block">
                  <CommunityFeed 
                    filter={activeFilter}
                    searchQuery={searchQuery}
                    showSuggestedAfterFirst={true}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Desktop Only */}
            <div className="hidden lg:block w-80 space-y-6">
              <TrendingTopics />
              <DiscoverySidebar />
              <CommunityLeaderboard />
              <EventsSection />
            </div>
          </div>
        </div>

        {/* Enhanced Floating Action Button - Mobile/iPad Only */}
        {user && (
          <button
            onClick={openPostModal}
            className={`fixed z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 lg:hidden xl:hidden ${
              showFABBounce ? 'animate-bounce' : ''
            } ${
              // Responsive sizing and positioning
              'bottom-6 right-6 w-16 h-16 md:bottom-8 md:right-8 md:w-20 md:h-20'
            }`}
            style={{
              animationDuration: showFABBounce ? '2s' : undefined,
              animationIterationCount: showFABBounce ? '3' : undefined,
              animationFillMode: 'forwards'
            }}
            onAnimationEnd={() => setShowFABBounce(false)}
            aria-label="Create new post"
          >
            <Plus className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        )}

        {/* Post Composer Modal - Mobile/iPad */}
        <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
          <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 lg:hidden rounded-none">
            <div className="flex flex-col h-full">
              <DialogHeader className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold">Create Post</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closePostModal}
                    className="rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </DialogHeader>
              <div className="flex-1 overflow-auto p-4">
                <PostComposer onSuccess={closePostModal} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default BeautyCommunity;