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
      isVerified: true
    },
    content: 'Just finished this stunning sunset-inspired eye look! 🌅 The golden hour vibes are everything ✨',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop',
    type: 'image',
    likes: 2847,
    comments: 94,
    shares: 23,
    time: '2h',
    isLiked: false,
    isBookmarked: false,
    isTrending: true
  },
  {
    id: 2,
    user: {
      id: '2',
      name: 'Maya Chen',
      username: '@maya_nails',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isVerified: false
    },
    content: 'New nail art tutorial dropping tomorrow! Who\'s ready for these holographic tips? 💎✨',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop',
    type: 'image',
    likes: 1923,
    comments: 156,
    shares: 45,
    time: '4h',
    isLiked: true,
    isBookmarked: false,
    isTrending: false
  },
  {
    id: 3,
    user: {
      id: '3',
      name: 'Alex Rivera',
      username: '@alex_cuts',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    content: 'Fresh fade for my client today! Summer vibes with that clean lineup 🔥',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=1000&fit=crop',
    type: 'image',
    likes: 856,
    comments: 32,
    shares: 18,
    time: '6h',
    isLiked: false,
    isBookmarked: true,
    isTrending: false
  },
  {
    id: 4,
    user: {
      id: '4',
      name: 'Luna Rose',
      username: '@luna_tutorials',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    content: 'Step by step contouring tutorial! Save this for later 💫',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video',
    likes: 4521,
    comments: 287,
    shares: 156,
    time: '8h',
    isLiked: false,
    isBookmarked: false,
    isTrending: true
  }
];

const motivationalMessages = [
  "✨ Powered by beauty. Inspired by community.",
  "🌟 Welcome to the most beautiful beauty community in the world",
  "💎 Where creativity meets inspiration",
  "🎨 Your beauty journey starts here"
];

const topContributors = [
  { name: 'Sofia Bella', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Maya Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Luna Rose', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' }
];

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showHeart, setShowHeart] = useState<number | null>(null);

  // Rotate motivational message every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % motivationalMessages.length);
    }, 5000);
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Motivational Header Banner */}
      <motion.div 
        key={currentMessage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-lg border-b border-border/50"
      >
        <div className="text-center py-2 px-4">
          <motion.p 
            className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {motivationalMessages[currentMessage]}
          </motion.p>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="sticky top-8 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-primary-foreground" />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Community
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-accent/50 transition-colors"
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-accent/50 relative transition-colors"
            >
              <Bell size={20} />
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Top Contributors Strip */}
      <div className="bg-accent/20 border-b border-border/50 p-3">
        <div className="flex items-center space-x-3 overflow-x-auto">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Top Contributors:</span>
          <div className="flex space-x-2">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <img 
                  src={contributor.avatar} 
                  alt={contributor.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/50"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles size={8} className="text-primary-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stories Bar */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4 overflow-x-auto">
        <div className="flex space-x-4">
          {/* Your Story */}
          <motion.div 
            className="flex flex-col items-center space-y-2 min-w-[60px] cursor-pointer"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreatePost(true)}
          >
            <div className="relative">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 p-0.5"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Plus size={20} className="text-primary" />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Plus size={12} className="text-primary-foreground" />
              </motion.div>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Your story</span>
          </motion.div>
          
          {/* Other Stories */}
          {mockPosts.slice(0, 6).map((post, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center space-y-2 min-w-[60px] cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 p-0.5"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </motion.div>
                {post.isTrending && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={10} className="text-white" />
                  </motion.div>
                )}
              </div>
              <span className="text-xs text-muted-foreground truncate w-full text-center font-medium">
                {post.user.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Feed */}
      <div className="pb-24">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-border/50 bg-background"
          >
            {/* Enhanced Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  {post.user.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-sm">{post.user.name}</p>
                    {post.isTrending && (
                      <motion.div
                        className="px-2 py-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center space-x-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles size={10} className="text-white" />
                        <span className="text-white text-xs font-bold">TRENDING</span>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors"
              >
                <MoreHorizontal size={16} />
              </motion.button>
            </div>

            {/* Enhanced Post Media */}
            <div className="relative overflow-hidden">
              {post.type === 'video' ? (
                <div className="relative">
                  <video 
                    src={post.videoUrl}
                    className="w-full aspect-square object-cover"
                    poster={post.image}
                    controls={false}
                    muted
                    loop
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={24} className="text-black ml-1" />
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div 
                  className="relative cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(post.id)}
                >
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full aspect-square object-cover"
                  />
                  
                  {/* Enhanced Double tap overlay */}
                  <AnimatePresence>
                    {showHeart === post.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.6 }}
                        >
                          <Heart size={80} className="text-red-500 fill-red-500 drop-shadow-lg" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-6">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1"
                >
                  <Heart 
                    size={28} 
                    className={`transition-all duration-300 ${
                      post.isLiked 
                        ? 'text-red-500 fill-red-500 scale-110' 
                        : 'text-foreground hover:text-red-400'
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-1"
                >
                  <MessageCircle size={28} className="hover:text-blue-400 transition-colors" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-1"
                >
                  <Share size={28} className="hover:text-green-400 transition-colors" />
                </motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBookmark(post.id)}
              >
                <Bookmark 
                  size={28} 
                  className={`transition-all duration-300 ${
                    post.isBookmarked 
                      ? 'text-primary fill-primary scale-110' 
                      : 'text-foreground hover:text-primary'
                  }`}
                />
              </motion.button>
            </div>

            {/* Enhanced Post Stats */}
            <div className="px-4 pb-2">
              <motion.p 
                className="font-bold text-sm"
                key={post.likes}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
              >
                {post.likes.toLocaleString()} likes
              </motion.p>
            </div>

            {/* Enhanced Post Content */}
            <div className="px-4 pb-4">
              <p className="text-sm leading-relaxed">
                <span className="font-bold mr-2">{post.user.username}</span>
                {post.content}
              </p>
              {post.comments > 0 && (
                <motion.p 
                  className="text-sm text-muted-foreground mt-2 cursor-pointer hover:text-foreground transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View all {post.comments} comments
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}

        {/* EmviApp Signature */}
        <motion.div 
          className="text-center py-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Inspired by Sunshine ☀️
            </span>
            <Sparkles size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full flex items-center justify-center shadow-2xl z-40 border-4 border-background"
        animate={{ 
          boxShadow: [
            "0 10px 30px -10px rgba(59, 130, 246, 0.5)",
            "0 20px 40px -10px rgba(59, 130, 246, 0.7)",
            "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Plus size={28} className="text-primary-foreground" />
      </motion.button>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-around py-3 px-4">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Search, label: 'Search' },
            { icon: Camera, label: 'Camera' },
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

      {/* Enhanced Create Post Modal */}
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
              className="bg-background rounded-3xl p-6 w-full max-w-md border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Camera size={24} className="text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Create Post</h3>
                <p className="text-muted-foreground">
                  Share your latest beauty creation with the world! ✨
                </p>
              </div>
              
              <div className="space-y-3">
                <motion.button 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Camera size={20} />
                  <span>Take Photo</span>
                </motion.button>
                <motion.button 
                  className="w-full bg-secondary/50 text-secondary-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 border border-border/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Video size={20} />
                  <span>Record Video</span>
                </motion.button>
                <motion.button 
                  className="w-full bg-accent/50 text-accent-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 border border-border/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreatePost(false)}
                >
                  <Plus size={20} />
                  <span>Choose from Gallery</span>
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
