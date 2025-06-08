
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Calendar, Users, Plus } from 'lucide-react';
import { useAuth } from '@/context/auth';
import CreatePostModal from '../modals/CreatePostModal';

const ArtistWelcomeHero = () => {
  const { userProfile } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Artist';

  const handleGetStarted = () => {
    document.querySelector('[data-section="portfolio"]')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-3xl p-8 text-white mb-8 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-rose-600/10 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <Crown className="h-8 w-8 text-amber-400" />
                <span className="text-amber-400 font-inter font-medium">Premium Artist</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-playfair font-bold mb-4"
              >
                Welcome back, {firstName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-purple-100 mb-6 font-inter max-w-2xl"
              >
                Your creative empire awaits. Manage bookings, showcase your artistry, and grow your client base with premium tools designed for success.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-8 py-4 rounded-2xl font-inter font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Sparkles className="h-6 w-6" />
                  Get Started Today
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreatePost(true)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-inter font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/20"
                >
                  <Plus className="h-6 w-6" />
                  Share an Update
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg"
              >
                <Calendar className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-purple-200">Total Bookings</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg"
              >
                <Users className="h-8 w-8 text-emerald-300 mx-auto mb-3" />
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-purple-200">Happy Clients</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <CreatePostModal 
        open={showCreatePost} 
        onClose={() => setShowCreatePost(false)} 
      />
    </>
  );
};

export default ArtistWelcomeHero;
