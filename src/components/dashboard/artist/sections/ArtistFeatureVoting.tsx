
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Plus, TrendingUp, Heart } from 'lucide-react';
import { toast } from 'sonner';

const ArtistFeatureVoting = () => {
  const [votes, setVotes] = useState({
    clientManager: 23,
    aiPostGenerator: 18,
    revenueTracker: 31,
    bookingAutomation: 27,
    portfolioAnalytics: 15
  });
  
  const [userVotes, setUserVotes] = useState(new Set());
  const [showSuggestion, setShowSuggestion] = useState(false);

  const features = [
    {
      id: 'clientManager',
      title: 'Advanced Client Manager',
      description: 'Track client preferences, history, and automate follow-ups',
      votes: votes.clientManager,
      category: 'Business Tools'
    },
    {
      id: 'aiPostGenerator',
      title: 'AI Social Media Posts',
      description: 'Generate professional posts showcasing your work automatically',
      votes: votes.aiPostGenerator,
      category: 'Marketing'
    },
    {
      id: 'revenueTracker',
      title: 'Revenue Analytics Dashboard',
      description: 'Track earnings, popular services, and growth metrics',
      votes: votes.revenueTracker,
      category: 'Analytics'
    },
    {
      id: 'bookingAutomation',
      title: 'Smart Booking Assistant',
      description: 'AI-powered scheduling with automatic confirmations and reminders',
      votes: votes.bookingAutomation,
      category: 'Automation'
    },
    {
      id: 'portfolioAnalytics',
      title: 'Portfolio Performance Insights',
      description: 'See which work gets the most engagement and bookings',
      votes: votes.portfolioAnalytics,
      category: 'Analytics'
    }
  ];

  const handleVote = (featureId: string) => {
    if (userVotes.has(featureId)) {
      toast.error('You have already voted for this feature');
      return;
    }

    setVotes(prev => ({
      ...prev,
      [featureId]: prev[featureId] + 1
    }));
    
    setUserVotes(prev => new Set([...prev, featureId]));
    toast.success('Vote recorded! Thanks for helping shape EmviApp');
  };

  const handleSuggestFeature = () => {
    setShowSuggestion(true);
    toast.success('Feature suggestion submitted! We\'ll review it soon.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Vote className="h-8 w-8 text-purple-500" />
            Shape EmviApp's Future
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Vote for features that will help grow your business
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSuggestFeature}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          Suggest Feature
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              userVotes.has(feature.id)
                ? 'bg-purple-50 border-purple-300'
                : 'bg-gray-50 border-gray-200 hover:border-purple-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="h-4 w-4" />
                <span className="font-medium">{feature.votes} votes</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(feature.id)}
                disabled={userVotes.has(feature.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  userVotes.has(feature.id)
                    ? 'bg-purple-200 text-purple-700 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {userVotes.has(feature.id) ? 'Voted' : 'Vote'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Voting Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your Voice Shapes EmviApp
            </h3>
            <p className="text-gray-600">
              You've voted {userVotes.size} times. Keep voting to influence what we build next!
            </p>
          </div>
          <TrendingUp className="h-12 w-12 text-purple-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistFeatureVoting;
