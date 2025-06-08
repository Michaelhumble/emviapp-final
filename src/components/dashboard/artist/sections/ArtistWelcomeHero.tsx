
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const ArtistWelcomeHero = () => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Artist';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-6 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 text-center text-white">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
        >
          <Crown className="h-8 w-8 text-yellow-300" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Welcome back, {firstName}! 👑
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-purple-100 text-lg mb-6"
        >
          Your beauty empire is growing! Ready to make some magic happen today?
        </motion.p>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Star className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium">Top Performer</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <TrendingUp className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">Rising Star</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button 
            className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            🚀 Unlock Premium Features
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistWelcomeHero;
