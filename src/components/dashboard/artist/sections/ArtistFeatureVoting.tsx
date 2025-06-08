
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Plus, TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ArtistFeatureVoting = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "AI Social Media Post Generator",
      description: "Automatically create Instagram posts from your work photos",
      votes: 247,
      icon: TrendingUp,
      hasVoted: false
    },
    {
      id: 2,
      title: "Client Growth Analytics",
      description: "Track and analyze how to grow your client base effectively",
      votes: 189,
      icon: Users,
      hasVoted: false
    },
    {
      id: 3,
      title: "Revenue Optimization Tools",
      description: "Smart pricing suggestions and profit tracking",
      votes: 156,
      icon: Target,
      hasVoted: true
    },
    {
      id: 4,
      title: "Advanced Booking Calendar",
      description: "Multi-service scheduling with automatic reminders",
      votes: 203,
      icon: Calendar,
      hasVoted: false
    }
  ]);

  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  const handleVote = (featureId: number) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, votes: feature.votes + 1, hasVoted: true }
        : feature
    ));
    toast.success('Vote recorded! Your voice shapes EmviApp.');
  };

  const handleSuggestFeature = () => {
    if (newFeature.trim()) {
      toast.success('Feature suggestion submitted! We\'ll review it soon.');
      setNewFeature('');
      setShowSuggestionForm(false);
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
          <Vote className="h-6 w-6 text-purple-600" />
          Shape Your Platform
        </h2>
        <p className="text-slate-600 font-inter">Vote on features that will help grow your business</p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-purple-700 mb-1">Your voice shapes EmviApp!</div>
          <div className="text-sm text-slate-600">Help us build tools that grow your business</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">{feature.description}</p>
                  <div className="text-sm text-slate-500">{feature.votes} votes</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(feature.id)}
                disabled={feature.hasVoted}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  feature.hasVoted
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {feature.hasVoted ? 'Voted' : 'Vote'}
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
        <div className="border border-slate-200 rounded-xl p-4">
          <textarea
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Describe a feature that would help grow your business..."
            className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleSuggestFeature}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Submit Suggestion
            </button>
            <button
              onClick={() => setShowSuggestionForm(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ArtistFeatureVoting;
