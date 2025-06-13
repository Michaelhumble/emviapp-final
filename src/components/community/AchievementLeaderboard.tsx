
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, Medal, Vote } from 'lucide-react';
import CTAButton from './CTAButton';

const AchievementLeaderboard = () => {
  const topPerformers = [
    {
      id: 1,
      name: "Isabella Rodriguez",
      level: "Diamond",
      points: 2850,
      badge: "👑",
      achievement: "Top Transformation Artist",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      name: "Marcus Chen", 
      level: "Platinum",
      points: 2340,
      badge: "💎",
      achievement: "Color Correction Master",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 3,
      name: "Sophia Williams",
      level: "Gold", 
      points: 1980,
      badge: "🥇",
      achievement: "Editorial Makeup Expert",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Beauty Achievers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating our community's most inspiring transformations and achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${performer.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {performer.badge}
                      </div>
                      <div className="absolute -top-1 -right-1">
                        {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                        {index === 1 && <Medal className="h-6 w-6 text-purple-500" />}
                        {index === 2 && <Trophy className="h-6 w-6 text-yellow-600" />}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{performer.name}</h3>
                      <p className="text-purple-600 font-medium">{performer.level} Level</p>
                      <p className="text-sm text-gray-600">{performer.achievement}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900">{performer.points.toLocaleString()}</span>
                    </div>
                    <CTAButton
                      type="vote_now"
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      metadata={{ targetType: 'leaderboard_entry', targetId: performer.id.toString() }}
                    >
                      <Vote className="h-4 w-4 mr-1" />
                      Vote
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500 mb-4">
              🎯 <strong>How to climb the leaderboard:</strong> Share transformations, get community votes, and help fellow artists grow!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementLeaderboard;
