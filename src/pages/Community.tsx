import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, Plus, Home, Search, Bell, User, Camera, MoreHorizontal, Play, Sparkles, Menu, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

// Mock data for now - will connect to real data later
const mockPosts = [
  {
    id: 1,
    user: {
      id: '1',
      name: 'Sofia Bella',
      username: '@sofia_beauty',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face',
      location: 'Los Angeles, CA'
    },
    content: 'Just got my first job through EmviApp! 🎉 After months of searching, I finally found the perfect salon that values creativity and growth. Thank you to this amazing community for all the support and encouragement! ✨',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop',
    type: 'celebration',
    likes: 2847,
    comments: 94,
    shares: 23,
    time: '2h',
    isLiked: false,
    isBookmarked: false,
    isSpotlight: true
  },
  {
    id: 2,
    user: {
      id: '2',
      name: 'Maya Chen',
      username: '@maya_nails',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'San Francisco, CA'
    },
    content: 'Opened my dream salon last month and it\'s been incredible! EmviApp helped me connect with the most talented artists. We\'re not just colleagues, we\'re family. Every day feels like magic! 💎✨',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop',
    type: 'milestone',
    likes: 1923,
    comments: 156,
    shares: 45,
    time: '4h',
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 3,
    user: {
      id: '3',
      name: 'Alex Rivera',
      username: '@alex_cuts',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Miami, FL'
    },
    content: 'This community changed my life. From struggling freelancer to salon owner, every step was supported by incredible people here. Today marks 6 months since I took the leap! 🚀',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=1000&fit=crop',
    type: 'journey',
    likes: 856,
    comments: 32,
    shares: 18,
    time: '6h',
    isLiked: false,
    isBookmarked: true
  }
];

const liveStats = {
  artistsOnline: 1247,
  salonsActive: 89,
  jobsFilled: 156
};

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [currentStatsIndex, setCurrentStatsIndex] = useState(0);
  const [showHeart, setShowHeart] = useState<number | null>(null);

  // Rotate live stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatsIndex(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleDoubleClick = (postId: number) => {
    if (!posts.find(p => p.id === postId)?.isLiked) {
      handleLike(postId);
      setShowHeart(postId);
      setTimeout(() => setShowHeart(null), 1000);
    }
  };

  const statsMessages = [
    `${liveStats.artistsOnline} artists online now`,
    `${liveStats.salonsActive} salons active`,
    `${liveStats.jobsFilled} jobs filled this week`
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* EmviApp Hero Banner */}
      <motion.div 
        className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-40" />
        
        <div className="relative px-6 py-8 text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={24} className="text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              EmviApp
            </h1>
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
            className="text-sm max-w-md mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every win here is real. Every post helps someone. You are the magic of this community. ✨
          </motion.p>
        </div>
      </motion.div>

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

      {/* Spotlight Post of the Day */}
      {posts.find(p => p.isSpotlight) && (
        <motion.div 
          className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 border-b border-border/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <motion.div
              className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={12} className="text-white" />
            </motion.div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Spotlight Story
            </h3>
          </div>
          
          {(() => {
            const spotlightPost = posts.find(p => p.isSpotlight);
            return spotlightPost ? (
              <div className="flex items-start space-x-4">
                <img 
                  src={spotlightPost.user.avatar} 
                  alt={spotlightPost.user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/50"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-semibold">{spotlightPost.user.name}</p>
                    <span className="text-xs text-muted-foreground">from {spotlightPost.user.location}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{spotlightPost.content}</p>
                </div>
              </div>
            ) : null;
          })()}
        </motion.div>
      )}

      {/* Main Feed - One Beautiful Card at a Time */}
      <div className="pb-24">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-background border-b border-border/50 mb-8"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-bold text-base">{post.user.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{post.user.location}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              
              {post.type === 'celebration' && (
                <motion.div
                  className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-white text-xs font-bold">🎉 WIN</span>
                </motion.div>
              )}
              
              {post.type === 'milestone' && (
                <motion.div
                  className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-white text-xs font-bold">💎 MILESTONE</span>
                </motion.div>
              )}
            </div>

            {/* Post Content Text */}
            <div className="px-6 mb-6">
              <p className="text-base leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image - Edge to Edge */}
            <div 
              className="relative overflow-hidden cursor-pointer"
              onDoubleClick={() => handleDoubleClick(post.id)}
            >
              <motion.img 
                src={post.image} 
                alt="Post content"
                className="w-full h-96 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Double tap heart overlay */}
              <AnimatePresence>
                {showHeart === post.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.8 }}
                    >
                      <Heart size={100} className="text-red-500 fill-red-500 drop-shadow-2xl" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-8">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2"
                >
                  <Heart 
                    size={32} 
                    className={`transition-all duration-300 ${
                      post.isLiked 
                        ? 'text-red-500 fill-red-500 scale-110' 
                        : 'text-foreground hover:text-red-400'
                    }`}
                  />
                  <span className="font-bold text-sm">{post.likes.toLocaleString()}</span>
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center space-x-2"
                >
                  <MessageCircle size={32} className="hover:text-blue-400 transition-colors" />
                  <span className="font-bold text-sm">{post.comments}</span>
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center space-x-2"
                >
                  <Share size={32} className="hover:text-green-400 transition-colors" />
                </motion.button>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleBookmark(post.id)}
              >
                <Bookmark 
                  size={32} 
                  className={`transition-all duration-300 ${
                    post.isBookmarked 
                      ? 'text-primary fill-primary scale-110' 
                      : 'text-foreground hover:text-primary'
                  }`}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* Bottom Motivational Ribbon */}
        <motion.div 
          className="text-center py-12 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 rounded-full border border-primary/30"
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.1)",
                "0 0 40px rgba(59, 130, 246, 0.2)",
                "0 0 20px rgba(59, 130, 246, 0.1)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={20} className="text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              You are the magic of this community ✨
            </span>
            <Sparkles size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>

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
      </AnimatePresence>
    </div>
  );
};

export default Community;
