
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Crown, Users, TrendingUp, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistComingSoonFeatures = () => {
  const [votedFeatures, setVotedFeatures] = useState<number[]>([]);

  const features = [
    {
      id: 1,
      title: "AI Portfolio Optimizer",
      description: "AI that analyzes your photos and suggests the perfect captions, hashtags, and posting times",
      icon: Brain,
      votes: 1247,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: 2,
      title: "Viral Booking Engine",
      description: "Smart booking system that automatically fills your calendar with high-paying clients",
      icon: Zap,
      votes: 892,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      id: 3,
      title: "Empire Analytics",
      description: "Track your growth, earnings, and client satisfaction with insider metrics",
      icon: TrendingUp,
      votes: 756,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      id: 4,
      title: "VIP Client Network",
      description: "Connect with premium clients who pay 3x more for exclusive artist experiences",
      icon: Crown,
      votes: 634,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    }
  ];

  const handleVote = (featureId: number) => {
    if (!votedFeatures.includes(featureId)) {
      setVotedFeatures([...votedFeatures, featureId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl"
        >
          🚀
        </motion.div>
        <h3 className="text-lg font-bold text-white">Revolutionary Tools Coming Soon</h3>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full border border-purple-500/30"
        >
          VOTE NOW
        </motion.div>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className={`border-0 shadow-xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border ${feature.borderColor}`}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 rounded-full bg-gradient-to-r ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span className="text-white font-semibold">
                          {votedFeatures.includes(feature.id) ? feature.votes + 1 : feature.votes}
                        </span>
                        <span className="text-gray-400 text-sm">votes</span>
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => handleVote(feature.id)}
                          disabled={votedFeatures.includes(feature.id)}
                          className={`${
                            votedFeatures.includes(feature.id)
                              ? 'bg-green-500 hover:bg-green-600'
                              : `bg-gradient-to-r ${feature.color} hover:opacity-90`
                          } border-0 font-semibold transition-all duration-300`}
                        >
                          {votedFeatures.includes(feature.id) ? (
                            <>
                              <Heart className="h-4 w-4 mr-1 fill-current" />
                              Voted!
                            </>
                          ) : (
                            <>
                              <Heart className="h-4 w-4 mr-1" />
                              Vote to Unlock
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FOMO Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl border border-indigo-500/30 text-center"
      >
        <div className="text-xl font-bold text-white mb-2">
          🎯 Unlock Features Faster!
        </div>
        <p className="text-indigo-200 text-sm mb-4">
          Features with <span className="font-bold text-yellow-300">1,000+ votes</span> get built first! 
          Don't miss out on game-changing tools.
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-indigo-300">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            3,547 artists voting
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Next release: Jan 2024
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistComingSoonFeatures;
