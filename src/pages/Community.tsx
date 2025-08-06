import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Users, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useContestData } from '@/hooks/useContestData';
import { toast } from 'sonner';
import InviteEverywhere from '@/components/community/InviteEverywhere';
import TopInvitersLeaderboard from '@/components/community/TopInvitersLeaderboard';
import SponsorApplicationModal from '@/components/community/SponsorApplicationModal';
import WeeklyChallengeEnhanced from '@/components/community/WeeklyChallengeEnhanced';
import TopPerformersCarousel from '@/components/community/TopPerformersCarousel';
import ReactionBadgeSystem from '@/components/community/ReactionBadgeSystem';
import CommunityAboutRules from '@/components/community/CommunityAboutRules';
import RotatingHeroBanner from '@/components/community/RotatingHeroBanner';
import FloatingActionButton from '@/components/community/FloatingActionButton';
import { UniversalPostModal } from '@/components/community/UniversalPostModal';
import EnhancedPublicProfileModal from '@/components/community/EnhancedPublicProfileModal';
import SponsorSpotlight from '@/components/community/SponsorSpotlight';
import UniversalPhotoFeed from '@/components/community/UniversalPhotoFeed';
import { UniversalMessageModal } from '@/components/community/UniversalMessageModal';
import FOMOEngagement from '@/components/community/FOMOEngagement';
import LiveNotifications from '@/components/community/LiveNotifications';
import PersonalizedSmartFeed from '@/components/community/PersonalizedSmartFeed';
import CreatorSpotlight from '@/components/community/CreatorSpotlight';
import SuccessWall from '@/components/community/SuccessWall';
import ProgressStreakTracker from '@/components/community/ProgressStreakTracker';
import LiveActivityFeed from '@/components/community/LiveActivityFeed';
import SocialCommercePost from '@/components/community/SocialCommercePost';
import BeautyBattlesLeaderboard from '@/components/community/BeautyBattlesLeaderboard';
import VipLounge from '@/components/community/VipLounge';
import RealTimeFOMONotifications from '@/components/community/RealTimeFOMONotifications';
import ViralReferralEngine from '@/components/community/ViralReferralEngine';
import AISmartRecommendations from '@/components/community/AISmartRecommendations';

const Community = () => {
  const { user } = useAuth();
  const { posts, activities, leaderboard, isLoading, createPost, toggleLike, trackShare } = useCommunityData();
  const { activeContest, contestEntries, submitContestEntry, voteForEntry, getTimeUntilEnd } = useContestData();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postType, setPostType] = useState<string>('story');
  const [showProfileModal, setShowProfileModal] = useState<{id: string, type: string} | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSponsorApplication, setShowSponsorApplication] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState<{id: string, name: string, avatar?: string, role?: string} | null>(null);

  const handleCreatePost = (type: string) => {
    console.log('🚀 handleCreatePost called with type:', type);
    console.log('🚀 Current user:', user ? 'logged in' : 'not logged in');
    setPostType(type);
    setShowCreatePost(true);
    console.log('🚀 setShowCreatePost(true) called');
  };
  
  const handleJoinNow = () => {
    console.log('🎯 handleJoinNow called');
    console.log('🎯 Current user:', user ? 'logged in' : 'not logged in');
    if (!user) {
      toast.success("Join our community and start earning today! 🚀");
      // Navigate to signup
    } else {
      console.log('🎯 User logged in, calling setShowCreatePost(true)');
      setShowCreatePost(true);
    }
  };

  const handleViewTrending = () => {
    // Scroll to trending section or filter
    toast.success("Check out what's trending! 🔥");
  };

  const handleViewContest = () => {
    // Scroll to contest section
    document.getElementById('weekly-challenge')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* FOMO Engagement Section - THE HOOK */}
      <div className="px-8 py-8">
        <FOMOEngagement 
          onJoinNow={handleJoinNow}
          onViewChallenge={handleViewContest}
          onViewLeaderboard={() => document.getElementById('top-performers')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>

      {/* Phase 3: Desktop-Optimized Viral Growth Engine */}
      <div className="px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-16 gap-4 lg:gap-8 max-w-[1600px] mx-auto">
          {/* Left Sidebar - AI & FOMO (Desktop: 4 cols, Mobile: full width) */}
          <div className="xl:col-span-4 space-y-6">
            <AISmartRecommendations />
            <SuccessWall 
              onSignUp={handleJoinNow}
              onViewProfile={(userId) => setShowProfileModal({id: userId, type: 'user'})}
            />
          </div>

          {/* Main Content - Enhanced Social Commerce (Desktop: 8 cols, Mobile: full width) */}
          <div className="xl:col-span-8 space-y-6">
            {/* Desktop Hero Section */}
            <div className="hidden lg:block mb-8">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <h1 className="text-4xl font-bold mb-4">Beauty Community Hub</h1>
                  <p className="text-xl text-purple-100 mb-6">Where talent meets opportunity. Connect, create, and earn.</p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                      Start Creating
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Join Community
                    </Button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-20">
                  <div className="w-32 h-32 bg-white rounded-full blur-2xl" />
                </div>
              </div>
            </div>

            <PersonalizedSmartFeed 
              onSignUp={handleJoinNow}
              onCreatePost={() => handleCreatePost('story')}
              onViewProfile={(userId) => setShowProfileModal({id: userId, type: 'user'})}
            />
            
            {/* Enhanced Social Commerce Post for Desktop */}
            <div className="lg:bg-gradient-to-br lg:from-purple-50 lg:via-white lg:to-pink-50 lg:p-6 lg:rounded-2xl lg:border lg:border-purple-200">
              <SocialCommercePost 
                post={{
                  id: 'featured-1',
                  user: {
                    name: 'Sarah Chen',
                    avatar: '/api/placeholder/48/48',
                    isVerified: true,
                    specialties: ['Nail Art', 'Color Theory']
                  },
                  content: 'Just finished this autumn-inspired nail design! 🍂 The gradient technique took 2 hours but the result is absolutely stunning. Book me for similar looks!',
                  images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
                  serviceOffering: {
                    name: 'Autumn Gradient Nails',
                    price: 85,
                    duration: '2 hours',
                    available: true
                  },
                  tipJar: {
                    enabled: true,
                    goal: 100,
                    current: 47
                  },
                  affiliateProducts: [
                    {
                      id: '1',
                      name: 'Premium Nail Polish Set',
                      price: 45,
                      commission: 15,
                      image: '/api/placeholder/120/120'
                    },
                    {
                      id: '2',
                      name: 'Professional Nail Tools',
                      price: 65,
                      commission: 20,
                      image: '/api/placeholder/120/120'
                    }
                  ],
                  engagement: {
                    likes: 234,
                    comments: 45,
                    shares: 12,
                    bookings: 8
                  }
                }}
                onBook={(postId) => toast.success("Booking request sent!")}
                onTip={(postId, amount) => toast.success(`Tipped $${amount}! Thank you for supporting creators.`)}
                onLike={(postId) => toast.success("Post liked!")}
                onShare={(postId) => toast.success("Post shared!")}
              />
            </div>

            {/* Desktop Live Stats Bar */}
            <div className="hidden lg:block">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">2.4M</p>
                      <p className="text-sm text-gray-600">Community Earnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">15,892</p>
                      <p className="text-sm text-gray-600">Jobs Matched</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">98.2%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-pink-600">Live</p>
                      <p className="text-sm text-gray-600">Real-time Updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - VIP & Viral Growth (Desktop: 4 cols, Mobile: full width) */}
          <div className="xl:col-span-4 space-y-6">
            <BeautyBattlesLeaderboard />
            <ViralReferralEngine />
            <VipLounge />
            <ProgressStreakTracker />
            <LiveActivityFeed />
          </div>
        </div>
      </div>

      {/* Real-Time FOMO Notifications Overlay - Enhanced for Desktop */}
      <RealTimeFOMONotifications 
        onNotificationClick={(notification) => {
          toast.success(`Opening ${notification.title}`);
        }}
      />

      {/* Legacy Content - Now Secondary */}
      <div className="px-8 py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Top Performers - Compact Display */}
          <div id="top-performers">
            <TopPerformersCarousel />
          </div>

          {/* Universal Photo Feed - Secondary Content */}
          <div>
            <UniversalPhotoFeed 
              onProfileClick={(userId) => setShowProfileModal({id: userId, type: 'user'})}
              onMessageClick={(userId, userName, userAvatar, userRole) => 
                setShowMessageModal({id: userId, name: userName, avatar: userAvatar, role: userRole})
              }
            />
          </div>
        </div>
      </div>

      {/* Weekly Challenge - Minimalist */}
      <div id="weekly-challenge" className="px-8 py-16">
        <WeeklyChallengeEnhanced />
      </div>

      {/* Invite System - Clean */}
      <div className="px-8 py-16">
        <TopInvitersLeaderboard />
      </div>

      {/* Invite Everywhere - Subtle */}
      <div className="px-8 py-16">
        <InviteEverywhere />
      </div>

      {/* Community Guidelines - Prominent Top Right Position */}
      <div className="absolute top-8 right-8 z-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-border/50 bg-background/95 backdrop-blur-lg hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary/20"
            aria-label="Open community guidelines"
          >
            <ShieldCheck size={18} className="text-primary" />
            <span className="font-inter font-medium">Guidelines</span>
          </Button>
        </motion.div>
      </div>

      {/* Footer Message */}
      <div className="text-center py-24 px-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: "easeOut" }}
        >
          <Heart className="mx-auto mb-6 text-primary" size={40} />
          <p className="text-xl font-playfair text-foreground font-medium mb-2">
            Love their work? Tell them, follow them, or send a message
          </p>
          <p className="text-lg text-muted-foreground">
            Connection is a click away
          </p>
        </motion.div>
      </div>

      {/* Universal Floating Action Button */}
      <FloatingActionButton
        onCreatePost={handleCreatePost}
      />

      {/* Enhanced Public Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <EnhancedPublicProfileModal
            isOpen={true}
            onClose={() => setShowProfileModal(null)}
            profileId={showProfileModal.id}
            profileType={showProfileModal.type}
          />
        )}
      </AnimatePresence>

      {/* Sponsor Application Modal */}
      <AnimatePresence>
        {showSponsorApplication && (
          <SponsorApplicationModal
            isOpen={true}
            onClose={() => setShowSponsorApplication(false)}
            onSubmit={(application) => {
              console.log('Sponsor application submitted:', application);
              toast.success('Sponsor application submitted! We\'ll review it soon.');
              setShowSponsorApplication(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Community About Rules Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <CommunityAboutRules
            isOpen={true}
            onClose={() => setShowAboutModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Universal Post Creation Modal */}
      <UniversalPostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        initialPostType={postType}
      />

      {/* Universal Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <UniversalMessageModal
            isOpen={true}
            onClose={() => setShowMessageModal(null)}
            recipientId={showMessageModal.id}
            recipientName={showMessageModal.name}
            recipientAvatar={showMessageModal.avatar}
            recipientRole={showMessageModal.role}
          />
        )}
      </AnimatePresence>

      {/* Live Notifications for FOMO */}
      <LiveNotifications 
        onJoinNow={handleJoinNow}
        onViewTrending={handleViewTrending}
        onViewContest={handleViewContest}
      />
    </div>
  );
};

export default Community;