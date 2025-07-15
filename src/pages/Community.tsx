import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, Plus, Home, Search, Bell, User, Menu, Camera, MoreHorizontal } from 'lucide-react';
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Just finished this stunning sunset-inspired eye look! 🌅 The golden hour vibes are everything ✨',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop',
    likes: 2847,
    comments: 94,
    shares: 23,
    time: '2h',
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    user: {
      id: '2',
      name: 'Maya Chen',
      username: '@maya_nails',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    content: 'New nail art tutorial dropping tomorrow! Who\'s ready for these holographic tips? 💎✨',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Fresh fade for my client today! Summer vibes with that clean lineup 🔥',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=1000&fit=crop',
    likes: 856,
    comments: 32,
    shares: 18,
    time: '6h',
    isLiked: false,
    isBookmarked: true
  }
];

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Menu size={20} />
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              EmviApp
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-accent relative"
            >
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stories Bar */}
      <div className="border-b border-border p-4 overflow-x-auto">
        <div className="flex space-x-4">
          {/* Your Story */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Plus size={20} className="text-primary" />
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Your story</span>
          </div>
          
          {/* Other Stories */}
          {mockPosts.slice(0, 5).map((post, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 min-w-[60px]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 p-0.5">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground truncate w-full text-center">
                {post.user.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="pb-20">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-border"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-accent"
              >
                <MoreHorizontal size={16} />
              </motion.button>
            </div>

            {/* Post Image */}
            <div className="relative">
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full aspect-square object-cover"
              />
              
              {/* Double tap overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                onDoubleClick={() => handleLike(post.id)}
              >
                <AnimatePresence>
                  {post.isLiked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart size={60} className="text-red-500 fill-red-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1"
                >
                  <Heart 
                    size={24} 
                    className={`transition-colors ${
                      post.isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center space-x-1"
                >
                  <MessageCircle size={24} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center space-x-1"
                >
                  <Share size={24} />
                </motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBookmark(post.id)}
              >
                <Bookmark 
                  size={24} 
                  className={`transition-colors ${
                    post.isBookmarked ? 'text-primary fill-primary' : 'text-foreground'
                  }`}
                />
              </motion.button>
            </div>

            {/* Post Stats */}
            <div className="px-4 pb-2">
              <p className="font-semibold text-sm">{post.likes.toLocaleString()} likes</p>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-sm">
                <span className="font-semibold mr-2">{post.user.username}</span>
                {post.content}
              </p>
              {post.comments > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  View all {post.comments} comments
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg z-40"
      >
        <Plus size={24} className="text-primary-foreground" />
      </motion.button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2 px-4">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Search, label: 'Search' },
            { icon: Camera, label: 'Camera' },
            { icon: Bell, label: 'Activity', badge: 12 },
            { icon: User, label: 'Profile' },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl relative ${
                item.active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={24} />
              {item.badge && (
                <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Create Post Modal - Simple for now */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Create Post</h3>
              <p className="text-muted-foreground mb-4">
                Share your latest beauty creation with the community!
              </p>
              <div className="flex space-x-3">
                <button 
                  className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium"
                  onClick={() => setShowCreatePost(false)}
                >
                  Take Photo
                </button>
                <button 
                  className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg font-medium"
                  onClick={() => setShowCreatePost(false)}
                >
                  Choose from Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
