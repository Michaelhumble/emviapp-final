
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Plus, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

const ArtistFeatureVoting = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "AI Social Post Generator",
      description: "Generate beautiful Instagram posts from your nail photos automatically",
      votes: 247,
      hasVoted: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Client Retention Tracker",
      description: "Track which clients return and get tips to improve retention rates",
      votes: 189,
      hasVoted: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Revenue Analytics Dashboard",
      description: "See your monthly earnings, popular services, and growth trends",
      votes: 156,
      hasVoted: false,
      priority: "high"
    },
    {
      id: 4,
      title: "Smart Booking Reminders",
      description: "Automated SMS/WhatsApp reminders to reduce no-shows",
      votes: 134,
      hasVoted: false,
      priority: "medium"
    }
  ]);

  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  const handleVote = (featureId: number) => {
    setFeatures(prev => prev.map(feature => {
      if (feature.id === featureId && !feature.hasVoted) {
        toast.success('Vote counted! We\'ll prioritize this feature.');
        return {
          ...feature,
          votes: feature.votes + 1,
          hasVoted: true
        };
      }
      return feature;
    }));
  };

  const handleSuggestFeature = () => {
    if (newFeature.trim()) {
      const newId = Math.max(...features.map(f => f.id)) + 1;
      setFeatures(prev => [...prev, {
        id: newId,
        title: newFeature,
        description: "Community suggested feature",
        votes: 1,
        hasVoted: true,
        priority: "low"
      }]);
      setNewFeature('');
      setShowSuggestionForm(false);
      toast.success('Feature suggestion submitted! Thank you for your input.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Vote className="h-7 w-7 text-blue-500" />
          Shape EmviApp's Future
        </h2>
        <p className="text-lg text-gray-600 font-inter">
          Vote for features that help you grow • Your voice matters
          <span className="block text-sm text-gray-500 mt-1">Bình chọn tính năng giúp bạn phát triển</span>
        </p>
        
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Your voice shapes EmviApp!</span>
            <span className="text-sm text-blue-600 ml-auto">You've voted on 1 feature</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border-2 rounded-2xl p-6 transition-all duration-300 ${
              feature.hasVoted 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  {feature.priority === 'high' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{feature.votes} votes</span>
                  </div>
                  {feature.hasVoted && (
                    <span className="text-sm text-blue-600 font-medium">✓ You voted for this</span>
                  )}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: feature.hasVoted ? 1 : 1.05 }}
                whileTap={{ scale: feature.hasVoted ? 1 : 0.95 }}
                onClick={() => handleVote(feature.id)}
                disabled={feature.hasVoted}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  feature.hasVoted
                    ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {feature.hasVoted ? 'Voted' : 'Vote'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Suggest Feature Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6">
        {!showSuggestionForm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSuggestionForm(true)}
            className="w-full flex items-center justify-center gap-3 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Plus className="h-6 w-6" />
            <span className="text-lg font-medium">Suggest a Feature</span>
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-gray-900">What feature would help you most?</span>
            </div>
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="e.g., Automatic client follow-up messages"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSuggestFeature}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-medium"
              >
                Submit
              </motion.button>
              <button
                onClick={() => setShowSuggestionForm(false)}
                className="text-gray-600 hover:text-gray-800 px-6 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtistFeatureVoting;
