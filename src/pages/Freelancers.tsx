
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell, Filter } from 'lucide-react';
import PremiumHeroSection from '@/components/community/PremiumHeroSection';
import PremiumFeedCard from '@/components/community/PremiumFeedCard';
import CommunityStories from '@/components/community/CommunityStories';
import AchievementLeaderboard from '@/components/community/AchievementLeaderboard';
import SponsorTeasers from '@/components/community/SponsorTeasers';
import CommunityQA from '@/components/community/CommunityQA';
import SuccessNotifications from '@/components/community/SuccessNotifications';
import AIFeaturesVoting from '@/components/community/AIFeaturesVoting';

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample premium feed data with realistic, believable numbers
  const feedPosts = [
    {
      id: '1',
      author: {
        name: 'Isabella Rodriguez',
        avatar: '',
        level: 'Diamond' as const,
        verified: true
      },
      content: 'Just completed my latest bridal transformation! This gorgeous bride wanted a timeless, elegant look that would photograph beautifully. The key was creating a flawless base and enhancing her natural features. What do you think? ✨',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1926&auto=format&fit=crop',
      likes: 87,
      comments: 19,
      shares: 8,
      isTrending: true,
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Marcus Chen',
        avatar: '',
        level: 'Platinum' as const,
        verified: true
      },
      content: 'Sharing my latest color correction journey! This client came to me with severely damaged hair from multiple bleaching sessions. It took 3 appointments, but we achieved her dream blonde while maintaining hair health. Patience and technique are everything! 🎨',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1926&auto=format&fit=crop',
      likes: 64,
      comments: 23,
      shares: 6,
      isTrending: true,
      timeAgo: '4 hours ago'
    },
    {
      id: '3',
      author: {
        name: 'Sophia Williams',
        avatar: '',
        level: 'Gold' as const,
        verified: false
      },
      content: 'Behind-the-scenes of today\'s photoshoot! Working with this amazing model on a bold, editorial look. The theme was "Urban Warrior" - strong, fierce, and unapologetic. Swipe to see the final result! 💪',
      image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=1926&auto=format&fit=crop',
      likes: 42,
      comments: 14,
      shares: 4,
      isTrending: false,
      timeAgo: '6 hours ago'
    }
  ];

  return (
    <Layout hideFooter={true}>
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

      {/* Main Content */}
      <div className="space-y-0">
        {/* Community Stories Section */}
        <CommunityStories />

        {/* Main Feed */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {feedPosts.map((post) => (
              <PremiumFeedCard key={post.id} post={post} />
            ))}

            {/* Load More Button */}
            <div className="text-center py-6">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
                Load More Stories
              </Button>
            </div>
          </div>
        </div>

        {/* NEW: AI Features Voting Section */}
        <AIFeaturesVoting />

        {/* Achievements & Leaderboard */}
        <AchievementLeaderboard />

        {/* Sponsor Teasers */}
        <SponsorTeasers />

        {/* Community Q&A */}
        <CommunityQA />
      </div>

      {/* Success Notifications */}
      <SuccessNotifications />
    </Layout>
  );
};

export default Freelancers;
