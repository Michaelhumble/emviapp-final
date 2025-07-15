import React, { useState } from 'react';
import { SocialFeed } from '@/components/community/SocialFeed';
import { MobileNavigation } from '@/components/community/MobileNavigation';
import { CreatePostModal } from '@/components/community/CreatePostModal';
import { TrendingSection } from '@/components/community/TrendingSection';
import { motion } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';

const Community = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Mobile Header - Instagram/TikTok Style */}
      <div className="sticky top-0 z-40 bg-black bg-opacity-90 backdrop-blur-lg border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </motion.button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              EmviApp
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white"
            >
              <Search size={24} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative text-gray-400 hover:text-white"
            >
              <Bell size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile First Design */}
      <div className="flex">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-80 p-6 border-r border-gray-800 h-screen overflow-y-auto">
          <TrendingSection />
        </div>

        {/* Center Feed - Full width on mobile */}
        <div className="flex-1 max-w-2xl mx-auto">
          <SocialFeed onCreatePost={() => setIsCreatePostOpen(true)} />
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden xl:block w-80 p-6 border-l border-gray-800">
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl font-medium"
                >
                  Share Your Work
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Instagram/TikTok Style */}
      <MobileNavigation onCreatePost={() => setIsCreatePostOpen(true)} />

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />
    </div>
  );
};

export default Community;