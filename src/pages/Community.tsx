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
      {/* Premium Sunrise Hero Section - Viral Energy */}
      <div className="relative overflow-hidden">
        {/* Sunrise Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-300 to-pink-400">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/30 via-transparent to-pink-200/40" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Live Stats Bar - Celebration Style */}
        <div className="relative px-4 md:px-8 pt-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-2xl">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                {/* Online Now - Pulsing Dot */}
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 5px rgba(34, 197, 94, 0.5)",
                        "0 0 20px rgba(34, 197, 94, 0.8)",
                        "0 0 5px rgba(34, 197, 94, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-800 font-bold text-sm md:text-base">
                    🔥 1,847 online now
                  </span>
                </motion.div>

                {/* Posts Today - Sparkle Effect */}
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.div>
                  <span className="text-orange-800 font-bold text-sm md:text-base">
                    342 posts today
                  </span>
                </motion.div>

                {/* Earnings - Glow Effect */}
                <motion.div 
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(251, 191, 36, 0.3)",
                      "0 0 25px rgba(251, 191, 36, 0.6)",
                      "0 0 10px rgba(251, 191, 36, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-2xl">💰</span>
                  <span className="text-yellow-800 font-bold text-sm md:text-base">
                    $12,456 earned today
                  </span>
                </motion.div>

                {/* Success Rate - Bounce Effect */}
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-2xl">🎯</span>
                  <span className="text-pink-800 font-bold text-sm md:text-base">
                    98.2% success rate
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-purple-800 via-pink-700 to-orange-600 bg-clip-text text-transparent">
                  Beauty Creators
                </span>
                <br />
                <span className="text-orange-800">Making Bank! 💎</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-700 mb-8 max-w-3xl mx-auto font-medium">
                Join 12,000+ creators earning serious money from their beauty skills
              </p>
            </motion.div>

            {/* Viral CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.button
                onClick={handleJoinNow}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transform transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(168, 85, 247, 0.3)",
                    "0 15px 40px rgba(168, 85, 247, 0.5)",
                    "0 10px 30px rgba(168, 85, 247, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Start Earning Now
              </motion.button>
              
              <motion.button
                onClick={handleViewContest}
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-orange-600 border-2 border-orange-300 hover:border-orange-400 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏆 Join Contest
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 text-orange-700"
            >
              <div className="flex -space-x-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 border-3 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </div>
              <span className="font-semibold">💜 Trusted by thousands worldwide</span>
            </motion.div>
          </div>
        </div>
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
            {/* Desktop Enhanced Hero Section - Premium Sunrise */}
            <div className="hidden lg:block mb-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-200 via-orange-300 to-pink-400 p-8 shadow-2xl">
                {/* Sparkle Animation Background */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 grid grid-cols-2 gap-8 items-center">
                  <div>
                    <motion.h1 
                      className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-800 via-pink-700 to-orange-600 bg-clip-text text-transparent"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Beauty Creators Making Bank! 💎
                    </motion.h1>
                    <p className="text-xl text-orange-800 mb-6 font-medium">
                      Join the most profitable beauty community. Start earning from your passion today.
                    </p>
                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => handleCreatePost('story')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🚀 Start Creating
                      </motion.button>
                      <motion.button
                        onClick={handleJoinNow}
                        className="bg-white/90 backdrop-blur-sm hover:bg-white text-orange-600 border-2 border-orange-300 px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        💰 Join Community
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Live Stats Display */}
                  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30">
                    <h3 className="text-orange-800 font-bold text-lg mb-4 text-center">🔥 Live Success Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      >
                        <p className="text-3xl font-bold text-green-700">$2.4M</p>
                        <p className="text-sm text-green-600">Monthly Earnings</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <p className="text-3xl font-bold text-blue-700">15,892</p>
                        <p className="text-sm text-blue-600">Success Stories</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <p className="text-3xl font-bold text-purple-700">98.2%</p>
                        <p className="text-sm text-purple-600">Success Rate</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      >
                        <p className="text-3xl font-bold text-pink-700">🔴 Live</p>
                        <p className="text-sm text-pink-600">Real-time Updates</p>
                      </motion.div>
                    </div>
                  </div>
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
                    avatar: '/src/assets/avatar-beauty-1.jpg',
                    isVerified: true,
                    specialties: ['Nail Art', 'Color Theory']
                  },
                  content: 'Just finished this holographic sunset nail design! ✨ The gradient technique took 2 hours but the result is absolutely stunning. Book me for similar looks!',
                  images: ['/src/assets/autumn-nail-art.jpg', '/src/assets/nail-art-showcase.jpg'],
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
                      image: '/src/assets/luxury-beauty-products.jpg'
                    },
                    {
                      id: '2',
                      name: 'Professional Nail Tools',
                      price: 65,
                      commission: 20,
                      image: '/src/assets/nail-care-workshop.jpg'
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

            {/* Desktop Live Stats Bar - Celebration Mode */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-100 via-orange-100 to-pink-100 border-2 border-orange-200 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative grid grid-cols-4 gap-6">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0)",
                        "0 0 0 8px rgba(34, 197, 94, 0.1)",
                        "0 0 0 0 rgba(34, 197, 94, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-4xl font-bold text-green-600 mb-1">💰$2.4M</p>
                    <p className="text-sm text-green-700 font-medium">Community Earnings</p>
                    <motion.div 
                      className="h-1 bg-green-300 rounded-full mt-2"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 0 8px rgba(59, 130, 246, 0.1)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <p className="text-4xl font-bold text-blue-600 mb-1">🎯15,892</p>
                    <p className="text-sm text-blue-700 font-medium">Jobs Matched</p>
                    <motion.div 
                      className="h-1 bg-blue-300 rounded-full mt-2"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(168, 85, 247, 0)",
                        "0 0 0 8px rgba(168, 85, 247, 0.1)",
                        "0 0 0 0 rgba(168, 85, 247, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <p className="text-4xl font-bold text-purple-600 mb-1">✨98.2%</p>
                    <p className="text-sm text-purple-700 font-medium">Success Rate</p>
                    <motion.div 
                      className="h-1 bg-purple-300 rounded-full mt-2"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(236, 72, 153, 0)",
                        "0 0 0 8px rgba(236, 72, 153, 0.1)",
                        "0 0 0 0 rgba(236, 72, 153, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <motion.p 
                      className="text-4xl font-bold text-pink-600 mb-1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🔴 Live
                    </motion.p>
                    <p className="text-sm text-pink-700 font-medium">Real-time Updates</p>
                    <motion.div 
                      className="h-1 bg-pink-300 rounded-full mt-2"
                      animate={{ 
                        background: [
                          "linear-gradient(90deg, #f9a8d4, #f9a8d4)",
                          "linear-gradient(90deg, #f9a8d4, #ec4899, #f9a8d4)",
                          "linear-gradient(90deg, #f9a8d4, #f9a8d4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
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