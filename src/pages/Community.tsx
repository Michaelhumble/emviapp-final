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
    setPostType(type);
    setShowCreatePost(true);
  };
  


  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Ultra-Compact Hero Section */}
      <div className="text-center px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users size={24} className="text-primary/60" />
            <h1 className="text-2xl font-playfair font-bold text-foreground leading-tight">
              Beauty Community
            </h1>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-snug font-inter font-medium">
            Where artists, salons, and clients connect, grow, and inspire—together.
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
          onMessageClick={(userId, userName, userAvatar, userRole) => 
            setShowMessageModal({id: userId, name: userName, avatar: userAvatar, role: userRole})
          }
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

    </div>
  );
};

export default Community;