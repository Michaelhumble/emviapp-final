
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';

const ArtistWelcomeHero = () => {
  const { userProfile } = useAuth();
  
  const badges = [
    { label: "Elite Artist", icon: Crown, color: "bg-gradient-to-r from-yellow-400 to-orange-500", textColor: "text-white" },
    { label: "Rising Star", icon: TrendingUp, color: "bg-gradient-to-r from-purple-500 to-pink-500", textColor: "text-white" },
    { label: "Verified Pro", icon: Sparkles, color: "bg-gradient-to-r from-blue-500 to-cyan-500", textColor: "text-white" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 text-white shadow-2xl"
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
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
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10">
        {/* Animated Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className={`${badge.color} ${badge.textColor} border-0 px-3 py-1 text-sm font-medium shadow-lg flex items-center gap-1.5`}>
                <badge.icon className="h-3.5 w-3.5" />
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message with Crown Animation */}
        <motion.div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
            className="text-4xl"
          >
            👑
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl font-bold"
          >
            Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Superstar'}!
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-purple-100 text-base leading-relaxed mb-6"
        >
          Your empire is thriving! You're not just creating beauty—you're building a legacy. ✨
        </motion.p>

        {/* Streak Counter with Fire Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            🔥
          </motion.span>
          <div>
            <div className="text-sm font-medium">7-day streak!</div>
            <div className="text-xs text-purple-200">Keep the momentum going!</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-5 w-5 text-yellow-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
