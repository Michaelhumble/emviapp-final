
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell, Filter } from 'lucide-react';
import PremiumHeroSection from '@/components/community/PremiumHeroSection';
import PremiumFeedCard from '@/components/community/PremiumFeedCard';
import InteractiveStorytelling from '@/components/community/InteractiveStorytelling';
import AchievementLeaderboard from '@/components/community/AchievementLeaderboard';
import CuratedLearningHub from '@/components/community/CuratedLearningHub';
import ExpertLiveQA from '@/components/community/ExpertLiveQA';
import ExclusiveLiveEvents from '@/components/community/ExclusiveLive Events';
import PremiumChallenges from '@/components/community/PremiumChallenges';
import PremiumAnalytics from '@/components/community/PremiumAnalytics';
import SponsoredSpotlight from '@/components/community/SponsoredSpotlight';

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample premium feed data with realistic numbers
  const feedPosts = [
    {
      id: '1',
      author: {
        name: 'Isabella Rodriguez',
        avatar: '/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png',
        level: 'Diamond' as const,
        verified: true
      },
      content: 'Just completed my latest bridal transformation! This gorgeous bride wanted a timeless, elegant look that would photograph beautifully. The key was creating a flawless base and enhancing her natural features. What do you think? ✨',
      image: '/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png',
      likes: 127,
      comments: 23,
      shares: 12,
      isTrending: true,
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Marcus Chen',
        avatar: '/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png',
        level: 'Platinum' as const,
        verified: true
      },
      content: 'Sharing my latest color correction journey! This client came to me with severely damaged hair from multiple bleaching sessions. It took 3 appointments, but we achieved her dream blonde while maintaining hair health. Patience and technique are everything! 🎨',
      image: '/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png',
      likes: 89,
      comments: 31,
      shares: 8,
      isTrending: true,
      timeAgo: '4 hours ago'
    },
    {
      id: '3',
      author: {
        name: 'Sophia Williams',
        avatar: '/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png',
        level: 'Gold' as const,
        verified: false
      },
      content: 'Behind-the-scenes of today\'s photoshoot! Working with this amazing model on a bold, editorial look. The theme was "Urban Warrior" - strong, fierce, and unapologetic. Swipe to see the final result! 💪',
      likes: 54,
      comments: 18,
      shares: 6,
      isTrending: false,
      timeAgo: '6 hours ago'
    }
  ];

  return (
    <Layout>
      {/* Premium Hero Section */}
      <PremiumHeroSection />

      {/* Sticky Search Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search community posts, topics, or members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-purple-500"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Interactive Features */}
          <div className="lg:col-span-1 space-y-6">
            <InteractiveStorytelling />
            <AchievementLeaderboard />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Feed Cards */}
            <div className="space-y-6">
              {feedPosts.map((post) => (
                <PremiumFeedCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center py-6">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
                Load More Stories
              </Button>
            </div>
          </div>
        </div>

        {/* Full-width Premium Sections */}
        <div className="space-y-12 mt-12">
          <CuratedLearningHub />
          <ExpertLiveQA />
          <ExclusiveLiveEvents />
          <PremiumChallenges />
          <SponsoredSpotlight />
          <PremiumAnalytics />
        </div>
      </div>
    </Layout>
  );
};

export default Freelancers;
