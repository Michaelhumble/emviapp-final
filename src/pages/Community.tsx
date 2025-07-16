import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, Plus, Home, Search, Bell, User, Camera, MoreHorizontal, Play, Sparkles, Menu, Video, Zap, Award, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useContestData } from '@/hooks/useContestData';
import ShareModal from '@/components/community/ShareModal';
import TopSharersLeaderboard from '@/components/community/TopSharersLeaderboard';
import CrossPlatformCTA from '@/components/ecosystem/CrossPlatformCTA';
import VIPSystem from '@/components/ecosystem/VIPSystem';
import SocialShareSystem from '@/components/ecosystem/SocialShareSystem';
import RecentActivityPopup from '@/components/community/RecentActivityPopup';
import WeeklyChallenge from '@/components/community/WeeklyChallenge';
import LiveActivityFeed from '@/components/community/LiveActivityFeed';
import InviteRewards from '@/components/community/InviteRewards';
import InviteEverywhere from '@/components/community/InviteEverywhere';
import TopInvitersLeaderboard from '@/components/community/TopInvitersLeaderboard';
import SponsorApplicationModal from '@/components/community/SponsorApplicationModal';
import WeeklyChallengeEnhanced from '@/components/community/WeeklyChallengeEnhanced';
import TopPerformersCarousel from '@/components/community/TopPerformersCarousel';
import ReactionBadgeSystem from '@/components/community/ReactionBadgeSystem';
import CommunityAboutRules from '@/components/community/CommunityAboutRules';
import RotatingHeroBanner from '@/components/community/RotatingHeroBanner';
import ShareSuccessPopup from '@/components/community/ShareSuccessPopup';
import AIContentEnhancer from '@/components/community/AIContentEnhancer';
import ViralVideoGenerator from '@/components/community/ViralVideoGenerator';
import CreatorMode from '@/components/community/CreatorMode';
import FeaturedSpotlight from '@/components/community/FeaturedSpotlight';
import WhatsHotFeed from '@/components/community/WhatsHotFeed';
import UniversalSearchBar from '@/components/community/UniversalSearchBar';
import FloatingCreateButton from '@/components/community/FloatingCreateButton';
import EnhancedPublicProfileModal from '@/components/community/EnhancedPublicProfileModal';
import SponsorSpotlight from '@/components/community/SponsorSpotlight';
import UniversalPhotoFeed from '@/components/community/UniversalPhotoFeed';

// Viral love messages for the bottom bar
const viralMessages = [
  "Emily just got hired! 🎉",
  "John got 100 likes! ❤️",
  "Salon Lux is trending! 🔥",
  "Maya opened her dream salon! 💎",
  "Alex hit 1k followers! ⭐",
  "Sofia shared her journey! ✨"
];

const Community = () => {
  const { user } = useAuth();
  const { posts, activities, leaderboard, isLoading, createPost, toggleLike, trackShare } = useCommunityData();
  const { activeContest, contestEntries, submitContestEntry, voteForEntry, getTimeUntilEnd } = useContestData();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [currentStatsIndex, setCurrentStatsIndex] = useState(0);
  const [currentViralIndex, setCurrentViralIndex] = useState(0);
  const [showHeart, setShowHeart] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{[key: string]: Array<{id: number, user: string, text: string, time: string}>}>({});
  
  // Real stats from database
  const [liveStats, setLiveStats] = useState({
    artistsOnline: 1247,
    salonsActive: 89,
    jobsFilled: 156
  });
  
  const [animatedStats, setAnimatedStats] = useState({
    artistsOnline: 0,
    salonsActive: 0,
    jobsFilled: 0
  });
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [shareSuccessData, setShareSuccessData] = useState({
    points: 10,
    newRank: 5,
    bonusMessage: 'You\'re on fire! 🔥'
  });
  const [showProfileModal, setShowProfileModal] = useState<{id: string, type: string} | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  

  // Animate stats count up on load
  useEffect(() => {
    const animateCountUp = () => {
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setAnimatedStats({
          artistsOnline: Math.floor(liveStats.artistsOnline * progress),
          salonsActive: Math.floor(liveStats.salonsActive * progress),
          jobsFilled: Math.floor(liveStats.jobsFilled * progress)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    animateCountUp();
  }, []);

  // Rotate live stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatsIndex(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate viral messages every 4 seconds  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentViralIndex(prev => (prev + 1) % viralMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLength);
  };

  // Check if text needs truncation
  const needsTruncation = (text: string) => text.length > 120;

  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    console.log('Toggle post expansion called for post:', postId);
    console.log('Current expanded posts:', expandedPosts);
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        console.log('Removing post from expanded:', postId);
        newSet.delete(postId);
      } else {
        console.log('Adding post to expanded:', postId);
        newSet.add(postId);
      }
      console.log('New expanded posts set:', newSet);
      return newSet;
    });
  };

  // Add comment to post
  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: user?.email?.split('@')[0] || 'You',
      text: newComment,
      time: 'now'
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    
    setNewComment('');
  };

  // Share functionality
  const handleShare = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const shareUrl = `${window.location.origin}/community/post/${postId}`;
    const shareText = `Check out this amazing post by ${post.profiles?.full_name || 'EmviApp user'} on EmviApp! ✨`;

    // Track the share in database
    await trackShare('post', postId, 'other');

    // Check if native sharing is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EmviApp Community Post',
          text: shareText,
          url: shareUrl,
        });
        
        // Show success popup after successful share
        setShareSuccessData({
          points: 10,
          newRank: Math.floor(Math.random() * 10) + 1,
          bonusMessage: Math.random() > 0.5 ? 'You\'re climbing fast! 🚀' : 'Sharing superstar! ⭐'
        });
        setShowShareSuccess(true);
        
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      
      // Show success popup for copy action too
      setShareSuccessData({
        points: 5,
        newRank: Math.floor(Math.random() * 10) + 1,
        bonusMessage: 'Link copied! Share it everywhere! 📋'
      });
      setShowShareSuccess(true);
    }
  };

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
  };

  const handleDoubleClick = async (postId: string) => {
    await toggleLike(postId);
    setShowHeart(postId);
    setTimeout(() => setShowHeart(null), 1000);
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    return 'now';
  };

  const statsMessages = [
    `${animatedStats.artistsOnline} artists online now`,
    `${animatedStats.salonsActive} salons active`,
    `${animatedStats.jobsFilled} jobs filled this week`
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Rotating Hero Banner */}
      <div className="px-6 py-8">
        <RotatingHeroBanner />
      </div>

      {/* EmviApp Hero Banner with Sparkling Effects */}
      <motion.div 
        className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b border-border/50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Multiple layered gradients for glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/5" />
        
        {/* Animated sparkle particles in background */}
        <motion.div
          className="absolute top-4 left-8 w-2 h-2 bg-primary/40 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-12 right-12 w-1 h-1 bg-yellow-400/60 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.4, 1, 0.4] 
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-purple-400/50 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.7, 0.2] 
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        
        <div className="relative px-6 py-8 text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Glow ring around the logo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-purple-400/40"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Sparkles size={28} className="text-primary-foreground relative z-10" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              EmviApp
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg font-medium text-muted-foreground mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Inspired by Sunshine ☀️
          </motion.p>
          
          <motion.p 
            className="text-sm max-w-lg mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every win here is real. Every post helps someone.
          </motion.p>
        </div>
      </motion.div>


      {/* Universal Search Bar */}
      <div className="px-6 py-6 border-b border-border/50">
        <UniversalSearchBar 
          onResultClick={(result) => setShowProfileModal({id: result.id, type: result.type})} 
        />
      </div>

      {/* Sponsor Spotlight */}
      <div className="px-6 py-6 border-b border-border/50">
        <SponsorSpotlight 
          onSponsorClick={(sponsor) => setShowProfileModal({id: sponsor.id, type: 'sponsor'})} 
        />
      </div>

      {/* Live Stats Ticker */}
      <motion.div 
        className="bg-accent/30 border-b border-border/50 py-3 px-6 overflow-hidden"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-600 font-bold">LIVE NOW</span>
            <span className="text-muted-foreground">·</span>
            <motion.span
              key={currentStatsIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-foreground"
            >
              {statsMessages[currentStatsIndex]}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* What's Hot Feed */}
      <div className="px-6 py-8">
        <WhatsHotFeed />
      </div>

      {/* Weekly Challenge */}
      <div className="px-6 pt-8">
        <WeeklyChallenge />
      </div>

      {/* Top Sharers Leaderboard */}
      <TopSharersLeaderboard />

      {/* Universal Photo Feed - Facebook for Beauty */}
      <div className="px-6 pb-24">
        <UniversalPhotoFeed 
          onProfileClick={(userId) => setShowProfileModal({id: userId, type: 'user'})} 
        />
      </div>

        {/* Viral Love Bar */}
        <motion.div 
          className="relative bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-blue-50/60 border-y border-border/30 py-4 px-6 mb-8 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          
          <div className="relative flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <motion.div
                className="flex items-center space-x-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp size={20} className="text-pink-500" />
                <span className="text-sm font-bold text-pink-600">VIRAL LOVE</span>
              </motion.div>
              
              <span className="text-muted-foreground">·</span>
              
              <motion.div
                key={currentViralIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-foreground font-medium text-sm">
                  {viralMessages[currentViralIndex]}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Motivational Ribbon */}
        <motion.div 
          className="text-center py-12 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 px-8 py-5 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 rounded-full border border-primary/30 backdrop-blur-sm"
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 25px rgba(59, 130, 246, 0.15)",
                "0 0 45px rgba(59, 130, 246, 0.25)",
                "0 0 25px rgba(59, 130, 246, 0.15)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={22} className="text-primary" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              You are the magic of this community ✨
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={22} className="text-primary" />
            </motion.div>
          </motion.div>
          
          {/* Inspired by Sunshine signature */}
          <motion.p 
            className="text-sm text-muted-foreground mt-6 italic"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Inspired by Sunshine ☀️
          </motion.p>
        </motion.div>
      {/* Share Your Win Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-28 right-6 px-6 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-full flex items-center space-x-2 shadow-2xl z-40 border-4 border-background"
        animate={{ 
          boxShadow: [
            "0 10px 30px -10px rgba(34, 197, 94, 0.4)",
            "0 20px 50px -10px rgba(59, 130, 246, 0.6)",
            "0 10px 30px -10px rgba(168, 85, 247, 0.4)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles size={20} className="text-white" />
        <span className="text-white font-bold text-sm">Share Your Win</span>
      </motion.button>

      {/* Recent Activity Popup */}
      <RecentActivityPopup />

      {/* Live Activity Feed */}
      <LiveActivityFeed />

      {/* Share Success Popup */}
      <ShareSuccessPopup 
        isVisible={showShareSuccess}
        onClose={() => setShowShareSuccess(false)}
        points={shareSuccessData.points}
        newRank={shareSuccessData.newRank}
        bonusMessage={shareSuccessData.bonusMessage}
      />

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <ShareModal
            isOpen={true}
            onClose={() => setShowShareModal(null)}
            post={posts.find(p => p.id === showShareModal) ? {
              id: parseInt(showShareModal),
              user: {
                name: posts.find(p => p.id === showShareModal)?.profiles?.full_name || 'EmviApp User',
                avatar: posts.find(p => p.id === showShareModal)?.profiles?.avatar_url || '',
                location: ''
              },
              content: posts.find(p => p.id === showShareModal)?.content || '',
              type: 'story',
              image: posts.find(p => p.id === showShareModal)?.image_urls?.[0]
            } : undefined}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-around py-3 px-4">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Search, label: 'Search' },
            { icon: Camera, label: 'Create' },
            { icon: Bell, label: 'Activity', badge: 12 },
            { icon: User, label: 'Profile' },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl relative transition-all duration-300 ${
                item.active 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon size={24} />
              {item.badge && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.badge}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Celebrate Now Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-background rounded-3xl p-8 w-full max-w-md border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Celebrate Now!</h3>
                <p className="text-muted-foreground text-base">
                  Share your latest win, milestone, or beautiful creation with our amazing community! ✨
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.button 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Camera size={24} />
                  <span>Share a Win 🎉</span>
                </motion.button>
                
                <motion.button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Heart size={24} />
                  <span>Celebrate Journey 💎</span>
                </motion.button>
                
                <motion.button 
                  className="w-full bg-accent/60 text-accent-foreground py-4 px-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 border border-border/50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Plus size={24} />
                  <span>Upload from Gallery</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Comment Modal */}
        {showCommentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowCommentModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-background rounded-3xl w-full max-w-lg max-h-[80vh] border border-border/50 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <MessageCircle size={24} className="text-blue-500" />
                  <span>Comments</span>
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCommentModal(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </motion.button>
              </div>

              {/* Comments List */}
              <div className="max-h-96 overflow-y-auto p-6 space-y-4">
                {(comments[showCommentModal] || []).map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-primary/30 to-purple-400/30 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{comment.user[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-accent/50 rounded-2xl p-3">
                        <p className="font-semibold text-sm text-primary">{comment.user}</p>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-3">{comment.time}</p>
                    </div>
                  </motion.div>
                ))}
                
                {(!comments[showCommentModal] || comments[showCommentModal].length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Be the first to comment! ✨</p>
                  </div>
                )}
              </div>

              {/* Add Comment */}
              <div className="p-6 border-t border-border/50">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {user?.email?.[0]?.toUpperCase() || 'Y'}
                    </span>
                  </div>
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-accent/50 border border-border/50 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && showCommentModal) {
                          handleAddComment(showCommentModal);
                        }
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => showCommentModal && handleAddComment(showCommentModal)}
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Community;