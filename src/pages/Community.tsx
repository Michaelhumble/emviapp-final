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

const Community = () => {
  const { user } = useAuth();
  const { posts, activities, leaderboard, isLoading, createPost, toggleLike, trackShare } = useCommunityData();
  const { activeContest, contestEntries, submitContestEntry, voteForEntry, getTimeUntilEnd } = useContestData();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postType, setPostType] = useState<string>('story');
  const [showProfileModal, setShowProfileModal] = useState<{id: string, type: string} | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSponsorApplication, setShowSponsorApplication] = useState(false);

  const handleCreatePost = (type: string) => {
    setPostType(type);
    setShowCreatePost(true);
  };
  


  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Minimalist Hero Section */}
      <div className="px-8 py-12">
        <RotatingHeroBanner />
      </div>

      {/* Luxury Community Header */}
      <div className="text-center py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-playfair font-bold mb-8 text-foreground leading-tight">
            Beauty Community
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-inter">
            Welcome to the most supportive, professional, and inspiring beauty community in the world.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            Where passion meets profession. Connect, inspire, and grow with talented beauty professionals.
          </p>
        </motion.div>
      </div>

      {/* Sponsor Spotlight - Clean & Minimal */}
      <div className="px-8 py-20">
        <SponsorSpotlight 
          onSponsorClick={(sponsor) => setShowProfileModal({id: sponsor.id, type: 'sponsor'})} 
        />
      </div>

      {/* Top Performers - Elegant Display */}
      <div className="px-8 py-16">
        <TopPerformersCarousel />
      </div>

      {/* Universal Photo Feed - Main Content */}
      <div className="px-8 py-16">
        <UniversalPhotoFeed 
          onProfileClick={(userId) => setShowProfileModal({id: userId, type: 'user'})} 
        />
      </div>

      {/* Weekly Challenge - Minimalist */}
      <div className="px-8 py-16">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Heart className="mx-auto mb-6 text-primary" size={40} />
          <p className="text-xl font-playfair text-foreground font-medium mb-2">
            You belong here
          </p>
          <p className="text-lg text-muted-foreground">
            Your art deserves to be seen
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

    </div>
  );
};

export default Community;