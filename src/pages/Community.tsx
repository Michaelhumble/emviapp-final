import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Users, Heart } from 'lucide-react';
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

      {/* Phase 1: FOMO-Driven Layout */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - FOMO & Progress */}
          <div className="lg:col-span-3 space-y-6">
            <SuccessWall 
              onSignUp={handleJoinNow}
              onViewProfile={(userId) => setShowProfileModal({id: userId, type: 'user'})}
            />
            <ProgressStreakTracker />
            <LiveActivityFeed />
          </div>

          {/* Main Content - Smart Feed */}
          <div className="lg:col-span-6">
            <PersonalizedSmartFeed 
              onSignUp={handleJoinNow}
              onCreatePost={() => handleCreatePost('story')}
              onViewProfile={(userId) => setShowProfileModal({id: userId, type: 'user'})}
            />
          </div>

          {/* Right Sidebar - Creator Spotlight */}
          <div className="lg:col-span-3">
            <CreatorSpotlight 
              onApplyForSpotlight={() => toast.success("Application submitted! We'll review it soon.")}
              onViewProfile={(userId) => setShowProfileModal({id: userId, type: 'user'})}
              onSignUp={handleJoinNow}
            />
          </div>
        </div>
      </div>

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