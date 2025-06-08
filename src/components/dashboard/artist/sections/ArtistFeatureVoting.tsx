
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, TrendingUp, Plus, Check } from 'lucide-react';

const ArtistFeatureVoting = () => {
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const features = [
    {
      id: 'revenue-tracker',
      title: 'Revenue Analytics Dashboard',
      description: 'Track earnings, tips, and business growth over time',
      votes: 247,
      category: 'Business Tools'
    },
    {
      id: 'social-generator',
      title: 'AI Social Media Post Generator',
      description: 'Auto-create Instagram posts from your portfolio photos',
      votes: 186,
      category: 'Marketing'
    },
    {
      id: 'client-retention',
      title: 'Client Retention Insights',
      description: 'Analytics to help you keep clients coming back',
      votes: 164,
      category: 'Growth'
    },
    {
      id: 'booking-automation',
      title: 'Smart Booking Assistant',
      description: 'AI-powered scheduling that optimizes your calendar',
      votes: 142,
      category: 'Productivity'
    }
  ];

  const handleVote = (featureId: string) => {
    setVotes(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      // Here you would submit the suggestion
      setSuggestion('');
      setShowSuggestionForm(false);
      // Show success message
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Vote className="h-6 w-6 text-indigo-600" />
          Shape EmviApp's Future
        </h2>
        <p className="text-slate-600 font-inter">Vote for features that will help grow your business</p>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-indigo-600 mb-1">Your voice shapes EmviApp!</div>
          <div className="text-sm text-slate-600">Features with the most votes get built first</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                    {feature.category}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>{feature.votes} votes</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(feature.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  votes[feature.id]
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {votes[feature.id] ? (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Voted
                  </div>
                ) : (
                  'Vote'
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {!showSuggestionForm ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSuggestionForm(true)}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          Suggest a Feature
        </motion.button>
      ) : (
        <form onSubmit={handleSuggestionSubmit} className="space-y-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="What feature would help your beauty business grow?"
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={3}
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowSuggestionForm(false)}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Submit Idea
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ArtistFeatureVoting;
