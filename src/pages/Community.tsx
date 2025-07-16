import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Info } from 'lucide-react';
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
import FloatingCreateButton from '@/components/community/FloatingCreateButton';
import EnhancedPublicProfileModal from '@/components/community/EnhancedPublicProfileModal';
import SponsorSpotlight from '@/components/community/SponsorSpotlight';
import UniversalPhotoFeed from '@/components/community/UniversalPhotoFeed';

const Community = () => {
  const { user } = useAuth();
  const { posts, activities, leaderboard, isLoading, createPost, toggleLike, trackShare } = useCommunityData();
  const { activeContest, contestEntries, submitContestEntry, voteForEntry, getTimeUntilEnd } = useContestData();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState<{id: string, type: string} | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSponsorApplication, setShowSponsorApplication] = useState(false);
  


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimalist Hero Section */}
      <div className="px-8 py-12">
        <RotatingHeroBanner />
      </div>

      {/* Luxury Community Header */}
      <div className="text-center py-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Beauty Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where passion meets profession. Connect, inspire, and grow with the world's most talented beauty professionals.
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

      {/* Community Rules - Accessible */}
      <div className="px-8 py-16 text-center">
        <Button 
          variant="outline" 
          onClick={() => setShowAboutModal(true)}
          className="flex items-center gap-2"
        >
          <Info size={16} />
          Community Guidelines
        </Button>
      </div>

      {/* Footer Message */}
      <div className="text-center py-20 px-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="mx-auto mb-4 text-primary" size={32} />
          <p className="text-lg text-muted-foreground italic">
            Inspired by Sunshine ☀️
          </p>
        </motion.div>
      </div>

      {/* Floating Create Button - Luxury */}
      <FloatingCreateButton
        onCreatePost={() => setShowCreatePost(true)}
        onCreateJob={() => window.open('/jobs/create', '_blank')}
        onAskCommunity={() => setShowCreatePost(true)}
        onApplySponsor={() => setShowSponsorApplication(true)}
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

      {/* Create Post Modal - Simple & Elegant */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl p-8 w-full max-w-md shadow-xl border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <Sparkles className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="text-2xl font-semibold mb-6">Share Your Story</h3>
                <Button 
                  onClick={() => {
                    setShowCreatePost(false);
                    toast.success('Feature coming soon! 🎉');
                  }}
                  className="w-full"
                  size="lg"
                >
                  Create Post
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Community;