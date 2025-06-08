
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, TrendingUp, Users, Zap, Calendar, MessageSquare, Bell } from 'lucide-react';

const ArtistFeatureVoting = () => {
  const [votedFeatures, setVotedFeatures] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const upcomingFeatures = [
    {
      id: 1,
      title: "AI Nail Design Generator",
      description: "Generate unique nail art designs with AI",
      votes: 1247,
      trending: true,
      category: "Design Tools",
      icon: Zap,
      estimatedRelease: "Q2 2024"
    },
    {
      id: 2,
      title: "Video Portfolio",
      description: "Upload time-lapse videos of your work",
      votes: 892,
      trending: false,
      category: "Portfolio",
      icon: Calendar,
      estimatedRelease: "Q1 2024"
    },
    {
      id: 3,
      title: "Client Chat System",
      description: "Real-time messaging with your clients",
      votes: 734,
      trending: true,
      category: "Communication",
      icon: MessageSquare,
      estimatedRelease: "Q3 2024"
    },
    {
      id: 4,
      title: "Push Notifications",
      description: "Get notified for new bookings instantly",
      votes: 623,
      trending: false,
      category: "Notifications",
      icon: Bell,
      estimatedRelease: "Q1 2024"
    }
  ];

  const handleVote = (featureId: number) => {
    if (!votedFeatures.includes(featureId)) {
      setVotedFeatures([...votedFeatures, featureId]);
      // In real app, this would make an API call
    }
  };

  const hasVoted = (featureId: number) => votedFeatures.includes(featureId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
            <Vote className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feature Voting</h2>
            <p className="text-gray-600">投票新功能 • Vote for new features</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowResults(!showResults)}
          className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-medium transition-colors"
        >
          {showResults ? 'Hide Results' : 'Show Results'}
        </button>
      </div>

      {/* Voting Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
        >
          <div className="text-2xl font-bold text-blue-600">12,847</div>
          <div className="text-sm text-blue-700">Total Votes</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100"
        >
          <div className="text-2xl font-bold text-purple-600">8</div>
          <div className="text-sm text-purple-700">Features in Queue</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
        >
          <div className="text-2xl font-bold text-green-600">{votedFeatures.length}</div>
          <div className="text-sm text-green-700">Your Votes</div>
        </motion.div>
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-6">
        {upcomingFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`p-4 border rounded-xl transition-all duration-300 ${
              hasVoted(feature.id) 
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                : 'bg-white border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Feature Icon */}
              <div className={`p-3 rounded-xl ${
                hasVoted(feature.id) 
                  ? 'bg-indigo-100' 
                  : 'bg-gray-100'
              }`}>
                <feature.icon className={`h-5 w-5 ${
                  hasVoted(feature.id) 
                    ? 'text-indigo-600' 
                    : 'text-gray-600'
                }`} />
              </div>

              {/* Feature Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  {feature.trending && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{feature.category}</span>
                  <span>Est. {feature.estimatedRelease}</span>
                </div>
              </div>

              {/* Voting Section */}
              <div className="text-right">
                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-2"
                    >
                      <div className="text-lg font-bold text-indigo-600">{feature.votes}</div>
                      <div className="text-xs text-gray-500">votes</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVote(feature.id)}
                  disabled={hasVoted(feature.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    hasVoted(feature.id)
                      ? 'bg-indigo-600 text-white cursor-not-allowed'
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                  }`}
                >
                  {hasVoted(feature.id) ? '✓ Voted' : '+ Vote'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOMO Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 text-center"
      >
        <div className="text-purple-700 font-semibold text-sm mb-1">
          🗳️ Your voice shapes EmviApp's future!
        </div>
        <div className="text-purple-600 text-xs">
          Vote now and be the first to try new features ✨
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistFeatureVoting;
