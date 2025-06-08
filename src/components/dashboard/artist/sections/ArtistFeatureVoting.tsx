
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

const ArtistFeatureVoting = () => {
  const [votes, setVotes] = useState({
    1: 1247,
    2: 892,
    3: 634,
    4: 445
  });

  const [userVotes, setUserVotes] = useState<Record<number, boolean>>({});
  const [voting, setVoting] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "AI Photo Enhancement",
      description: "Automatically enhance your nail art photos with AI filters",
      icon: "🤖",
      category: "Photography"
    },
    {
      id: 2,
      title: "Virtual Nail Try-On",
      description: "Let clients preview nail designs on their hands via AR",
      icon: "📱",
      category: "AR/VR"
    },
    {
      id: 3,
      title: "Advanced Booking System",
      description: "Smart scheduling with automated reminders and rescheduling",
      icon: "📅",
      category: "Scheduling"
    },
    {
      id: 4,
      title: "Client Preference Memory",
      description: "AI remembers each client's favorite styles and colors",
      icon: "🧠",
      category: "AI Memory"
    }
  ];

  const handleVote = async (featureId: number) => {
    if (userVotes[featureId]) {
      toast.error("You already voted for this feature!");
      return;
    }

    setVoting(featureId);
    
    // Simulate API call
    setTimeout(() => {
      setVotes(prev => ({
        ...prev,
        [featureId]: prev[featureId] + 1
      }));
      
      setUserVotes(prev => ({
        ...prev,
        [featureId]: true
      }));
      
      setVoting(null);
      toast.success("Vote submitted! Thanks for helping shape EmviApp 🚀");
    }, 1000);
  };

  const getTotalVotes = () => {
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  };

  const getVotePercentage = (featureId: number) => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((votes[featureId] / total) * 100) : 0;
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Vote className="h-8 w-8 text-purple-600" />
            Feature Voting 🗳️
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Help us build the future • Vote for upcoming features • Shape EmviApp
          </p>
        </div>

        {/* Voting Stats Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-inter font-bold text-gray-900 mb-1">Community Votes</h3>
              <p className="text-gray-600">Join {getTotalVotes().toLocaleString()} artists shaping the future</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">{getTotalVotes().toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Votes</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: feature.id * 0.1 }}
              className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                userVotes[feature.id] 
                  ? 'border-emerald-200 bg-emerald-50' 
                  : 'border-gray-100 hover:border-purple-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-inter font-bold text-gray-900">{feature.title}</h3>
                    <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full inline-block">
                      {feature.category}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              {/* Vote Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{votes[feature.id]} votes</span>
                  <span className="font-medium text-gray-900">{getVotePercentage(feature.id)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getVotePercentage(feature.id)}%` }}
                    transition={{ duration: 1, delay: feature.id * 0.2 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Vote Button */}
              <motion.button
                whileHover={{ scale: userVotes[feature.id] ? 1 : 1.05 }}
                whileTap={{ scale: userVotes[feature.id] ? 1 : 0.95 }}
                onClick={() => handleVote(feature.id)}
                disabled={userVotes[feature.id] || voting === feature.id}
                className={`w-full py-3 rounded-xl font-inter font-medium transition-all duration-300 ${
                  userVotes[feature.id]
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200 cursor-not-allowed'
                    : voting === feature.id
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {userVotes[feature.id] ? (
                  <>✅ Voted!</>
                ) : voting === feature.id ? (
                  <>⏳ Voting...</>
                ) : (
                  <>🗳️ Vote for This!</>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Community Insights */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="font-inter font-bold text-gray-900">Community Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-gray-600">Want AI Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">67%</div>
              <div className="text-sm text-gray-600">Need Better Booking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">73%</div>
              <div className="text-sm text-gray-600">Want AR Try-On</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <Lightbulb className="h-5 w-5" />
              <span className="font-inter font-medium">
                💡 <strong>Next update:</strong> The top voted feature will be released in Q2 2024!
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistFeatureVoting;
