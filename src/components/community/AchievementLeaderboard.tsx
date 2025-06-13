
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Diamond, Crown, Medal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AchievementLeaderboard = () => {
  const userAchievements = [
    { 
      id: 1, 
      title: "Community Helper", 
      description: "Helped 25+ community members", 
      icon: Star, 
      progress: 80, 
      unlocked: false 
    },
    { 
      id: 2, 
      title: "Storyteller", 
      description: "Shared 10 inspiring stories", 
      icon: Diamond, 
      progress: 100, 
      unlocked: true 
    },
    { 
      id: 3, 
      title: "Mentor", 
      description: "Guided 5+ new members", 
      icon: Crown, 
      progress: 60, 
      unlocked: false 
    }
  ];

  const leaderboard = [
    { 
      rank: 1, 
      name: "Isabella M.", 
      points: 2847, 
      badge: "Diamond", 
      icon: "💎" 
    },
    { 
      rank: 2, 
      name: "Marcus C.", 
      points: 2456, 
      badge: "Platinum", 
      icon: "⭐" 
    },
    { 
      rank: 3, 
      name: "Sofia W.", 
      points: 2103, 
      badge: "Gold", 
      icon: "🏆" 
    },
    { 
      rank: 4, 
      name: "David R.", 
      points: 1892, 
      badge: "Silver", 
      icon: "🥈" 
    },
    { 
      rank: 5, 
      name: "Maya L.", 
      points: 1634, 
      badge: "Bronze", 
      icon: "🥉" 
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Achievements & Community Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Celebrate your journey and be inspired by our community stars
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Your Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900">Your Achievements</h3>
            </div>

            <div className="space-y-6">
              {userAchievements.map((achievement) => (
                <div key={achievement.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                        : 'bg-gray-200'
                    }`}>
                      <achievement.icon className={`h-6 w-6 ${
                        achievement.unlocked ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-100 text-green-800">Unlocked!</Badge>
                    )}
                  </div>
                  
                  <div className="ml-16">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Medal className="h-8 w-8 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900">Community Leaders</h3>
            </div>

            <div className="space-y-4">
              {leaderboard.map((member, index) => (
                <motion.div
                  key={member.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    member.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    member.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                    member.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                    'bg-gradient-to-r from-purple-400 to-purple-600'
                  }`}>
                    {member.rank}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                    {member.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {member.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{member.points.toLocaleString()} points</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <p className="text-center text-sm text-gray-600">
                🎯 <strong>Your Rank:</strong> #47 with 892 points
              </p>
              <p className="text-center text-xs text-gray-500 mt-1">
                Keep engaging to climb the leaderboard!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementLeaderboard;
