
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';

const ArtistWelcomeHero = () => {
  const { userProfile } = useAuth();
  
  const badges = [
    { label: "Top Artist", icon: Crown, color: "bg-yellow-100 text-yellow-800" },
    { label: "Rising Star", icon: TrendingUp, color: "bg-purple-100 text-purple-800" },
    { label: "Verified", icon: Sparkles, color: "bg-blue-100 text-blue-800" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.4 }}
            >
              <Badge className={`${badge.color} border-0 flex items-center gap-1`}>
                <badge.icon className="h-3 w-3" />
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Artist'}! 👑
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-purple-100 text-base leading-relaxed"
        >
          You're building something amazing. Your clients are loving it, and your empire is growing! ✨
        </motion.p>

        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2"
        >
          <span className="text-2xl">🔥</span>
          <span className="text-sm font-medium">7 day streak!</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
