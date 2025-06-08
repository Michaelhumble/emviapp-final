
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, TrendingUp, Zap, Star } from 'lucide-react';
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
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-2xl"
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent backdrop-blur-sm"></div>
      
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

      <div className="relative z-10 p-8 lg:p-12 text-white">
        {/* Animated Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className={`${badge.color} ${badge.textColor} border-0 px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2`}>
                <badge.icon className="h-4 w-4" />
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message with Crown Animation */}
        <motion.div className="flex items-center gap-4 mb-6">
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
            className="text-5xl lg:text-6xl"
          >
            👑
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold leading-tight"
          >
            Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Superstar'}!
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-purple-100 text-lg lg:text-xl leading-relaxed mb-8"
        >
          Your empire is thriving! You're not just creating beauty—you're building a legacy that inspires millions. ✨
        </motion.p>

        {/* Desktop: Side by side layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-4 border border-white/30"
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
              className="text-3xl"
            >
              🔥
            </motion.span>
            <div>
              <div className="text-lg font-bold">7-day streak!</div>
              <div className="text-sm text-purple-200">Keep the momentum going!</div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-6 w-6 text-yellow-300" />
            </motion.div>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm text-purple-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <div className="text-sm text-purple-200">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">$2,847</div>
              <div className="text-sm text-purple-200">This Month</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
