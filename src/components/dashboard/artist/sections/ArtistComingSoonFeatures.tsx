
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MessageSquare, CreditCard, BarChart, Zap, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistComingSoonFeatures = () => {
  const [votedFeatures, setVotedFeatures] = useState<number[]>([]);

  const comingSoonFeatures = [
    {
      id: 1,
      title: "AI Booking Assistant",
      description: "Smart scheduling that learns your preferences",
      icon: Calendar,
      votes: 247,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      popular: true
    },
    {
      id: 2,
      title: "Client Chat Hub",
      description: "Direct messaging with booking integration",
      icon: MessageSquare,
      votes: 198,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      id: 3,
      title: "Instant Payments",
      description: "Get paid immediately after each service",
      icon: CreditCard,
      votes: 312,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      hot: true
    },
    {
      id: 4,
      title: "Revenue Analytics",
      description: "Track earnings, trends, and growth insights",
      icon: BarChart,
      votes: 156,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: 5,
      title: "Boost Campaigns",
      description: "Promote your profile to 10x more clients",
      icon: Zap,
      votes: 289,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      id: 6,
      title: "Team Management",
      description: "Manage assistants and collaborators",
      icon: Users,
      votes: 134,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30"
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
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-2xl"
          >
            ⚡
          </motion.div>
          <h3 className="text-xl font-bold text-white">Coming Soon</h3>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full border border-yellow-500/30"
          >
            VOTE TO UNLOCK
          </motion.div>
        </div>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10">
        <div className="p-6">
          {/* Header Message */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
            >
              <div className="text-lg font-bold text-white mb-2">
                🚀 Help Us Prioritize!
              </div>
              <div className="text-sm text-purple-200">
                Vote for the features you want most. The top-voted features ship first!
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comingSoonFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl ${feature.bgColor} backdrop-blur-sm border ${feature.borderColor} cursor-pointer`}
                onClick={() => handleVote(feature.id)}
              >
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-1">
                  {feature.popular && (
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                      POPULAR
                    </div>
                  )}
                  {feature.hot && (
                    <div className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
                      🔥 HOT
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Vote Button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {feature.votes + (votedFeatures.includes(feature.id) ? 1 : 0)} votes
                  </div>
                  
                  <Button
                    size="sm"
                    disabled={votedFeatures.includes(feature.id)}
                    className={`
                      ${votedFeatures.includes(feature.id) 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : `bg-gradient-to-r ${feature.color} hover:opacity-90`
                      } 
                      text-white border-0 transition-all duration-200
                    `}
                  >
                    {votedFeatures.includes(feature.id) ? (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        Voted!
                      </>
                    ) : (
                      '+ Vote'
                    )}
                  </Button>
                </div>

                {/* Voted Overlay */}
                {votedFeatures.includes(feature.id) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-green-500/10 rounded-xl border-2 border-green-500/30 flex items-center justify-center"
                  >
                    <div className="text-green-300 font-bold text-lg">✓ Voted!</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-xs text-gray-400">Total Votes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">3</div>
                <div className="text-xs text-gray-400">Shipping Soon</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">
                  {votedFeatures.length}
                </div>
                <div className="text-xs text-gray-400">Your Votes</div>
              </div>
            </div>
          </div>

          {/* FOMO Message */}
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30 text-center">
            <div className="text-sm text-orange-200">
              ⏰ <span className="font-semibold text-white">Early voters get 30-day free access</span> to new features!
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistComingSoonFeatures;
