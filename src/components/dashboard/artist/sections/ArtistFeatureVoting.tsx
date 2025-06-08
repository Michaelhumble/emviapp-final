
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Users, Calendar, Zap, Heart } from 'lucide-react';

const ArtistFeatureVoting = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "AI Photo Enhancement",
      description: "Automatically enhance your nail photos with AI filters",
      votes: 1247,
      icon: Zap,
      trending: true,
      voted: false
    },
    {
      id: 2,
      title: "Client Chat Integration",
      description: "Built-in messaging system with your clients",
      votes: 892,
      icon: Users,
      trending: false,
      voted: true
    },
    {
      id: 3,
      title: "Advanced Booking Calendar",
      description: "Smart scheduling with conflict detection",
      votes: 756,
      icon: Calendar,
      trending: true,
      voted: false
    },
    {
      id: 4,
      title: "Portfolio Analytics",
      description: "Detailed insights on your most popular work",
      votes: 634,
      icon: TrendingUp,
      trending: false,
      voted: false
    }
  ]);

  const handleVote = (featureId: number) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            votes: feature.voted ? feature.votes - 1 : feature.votes + 1,
            voted: !feature.voted 
          }
        : feature
    ));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Shape the Future 🚀</h2>
          <p className="text-lg text-gray-600 font-inter">Vote on features that matter to your business</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          Suggest Feature
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-playfair font-bold text-gray-900 text-xl mb-1">Most Wanted Features</h3>
              <p className="text-gray-600 font-inter">Help us prioritize what to build next</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-playfair font-bold text-gray-900">
                {features.reduce((sum, f) => sum + f.votes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-inter">Total Votes</div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="divide-y divide-gray-100">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${
                  feature.trending 
                    ? 'bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200/50' 
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50'
                }`}>
                  <feature.icon className={`h-6 w-6 ${
                    feature.trending ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-playfair font-semibold text-gray-900">{feature.title}</h4>
                    {feature.trending && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-inter font-bold"
                      >
                        🔥 TRENDING
                      </motion.span>
                    )}
                  </div>
                  <p className="text-gray-600 font-inter text-sm">{feature.description}</p>
                </div>

                {/* Vote Section */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-playfair font-bold text-gray-900">
                      {feature.votes.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 font-inter">votes</div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(feature.id)}
                    className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                      feature.voted
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700'
                    }`}
                  >
                    {feature.voted ? (
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 fill-current" />
                        Voted
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Vote
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOMO Footer */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-200/50 p-6">
          <div className="text-center">
            <p className="text-gray-700 font-inter mb-3">
              🎯 <strong>Top voted features get built first!</strong> Your voice shapes EmviApp's future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-inter font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Features →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistFeatureVoting;
