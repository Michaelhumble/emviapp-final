import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Zap, Star, Target, Gift } from 'lucide-react';

interface ChallengeStats {
  entries: number;
  votes: number;
  timeLeft: string;
  prize: string;
}

const WeeklyChallenge = () => {
  const [stats, setStats] = useState<ChallengeStats>({
    entries: 47,
    votes: 892,
    timeLeft: '',
    prize: 'VIP Badge + $200 Credit'
  });

  // Calculate time left until Sunday midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
      nextSunday.setHours(23, 59, 59, 999);
      
      const timeDiff = nextSunday.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      setStats(prev => ({
        ...prev,
        timeLeft: `${days}d ${hours}h ${minutes}m`
      }));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEnterChallenge = () => {
    // This would open the post creation modal with contest tag
    console.log('Opening contest entry form...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mb-8 p-6 bg-gradient-to-br from-purple-500/10 via-primary/5 to-pink-500/10 border-2 border-purple-400/30 rounded-3xl overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Pulsing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-purple-400/50"
        animate={{ 
          borderColor: [
            'rgba(168, 85, 247, 0.5)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(168, 85, 247, 0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating Sparkles */}
      <motion.div
        className="absolute top-4 left-8 w-2 h-2 bg-purple-400 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-12 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-8 left-16 w-1 h-1 bg-yellow-400 rounded-full"
        animate={{ 
          y: [0, -6, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.8, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
              animate={{ 
                rotate: [0, 360],
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 30px rgba(236, 72, 153, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Weekly Challenge
              </h2>
              <p className="text-sm text-muted-foreground">
                Show Your Biggest Win This Week! 🏆
              </p>
            </div>
          </div>

          {/* Prize Badge */}
          <motion.div
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-bold">PRIZE: {stats.prize}</span>
            </div>
          </motion.div>
        </div>

        {/* Challenge Description */}
        <div className="mb-6 p-4 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/30">
          <p className="text-foreground leading-relaxed">
            <strong>This Week's Challenge:</strong> Share your biggest achievement, breakthrough moment, or milestone! 
            Whether it's landing a dream job, opening your salon, hitting a revenue goal, or helping someone succeed – 
            we want to celebrate YOU! 🎉
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl border border-purple-400/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-500 mr-2" />
              <motion.span
                className="text-2xl font-bold text-purple-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stats.entries}
              </motion.span>
            </div>
            <p className="text-xs text-muted-foreground">Entries</p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-2xl border border-pink-400/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-pink-500 mr-2" />
              <motion.span
                className="text-2xl font-bold text-pink-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {stats.votes}
              </motion.span>
            </div>
            <p className="text-xs text-muted-foreground">Votes</p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl border border-orange-400/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-lg font-bold text-orange-600">
                {stats.timeLeft}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Time Left</p>
          </motion.div>
        </div>

        {/* Enter Challenge Button */}
        <motion.button
          onClick={handleEnterChallenge}
          className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-3">
            <Zap className="w-5 h-5" />
            <span>Enter Challenge Now!</span>
            <Trophy className="w-5 h-5" />
          </div>
        </motion.button>

        {/* Rules */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Tag your post with #WeeklyChallenge • Winners announced every Monday • Voting ends Sunday 11:59 PM
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyChallenge;