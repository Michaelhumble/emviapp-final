
// COMMUNITY PAGE UPDATE - Enhanced leaderboard with premium club feel
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, Medal, Vote, Users, TrendingUp, Award } from 'lucide-react';
import CTAButton from './CTAButton';

const AchievementLeaderboard = () => {
  const topPerformers = [
    {
      id: 1,
      name: "Isabella Rodriguez",
      level: "Diamond Elite",
      points: 2850,
      badge: "👑",
      achievement: "Transformation Queen",
      color: "from-blue-400 via-cyan-400 to-blue-600",
      avatar: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
      followers: "2.3k",
      monthlyGrowth: "+340"
    },
    {
      id: 2,
      name: "Marcus Chen", 
      level: "Platinum Master",
      points: 2340,
      badge: "💎",
      achievement: "Color Genius",
      color: "from-purple-400 via-purple-500 to-purple-600",
      avatar: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
      followers: "1.8k",
      monthlyGrowth: "+280"
    },
    {
      id: 3,
      name: "Sophia Williams",
      level: "Gold Specialist", 
      points: 1980,
      badge: "🥇",
      achievement: "Editorial Artist",
      color: "from-yellow-400 via-yellow-500 to-yellow-600",
      avatar: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
      followers: "1.2k",
      monthlyGrowth: "+190"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Elite Beauty Achievers
            </h2>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Celebrating our community's most inspiring transformations and achievements
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Rankings updated live • Vote to influence next month's winners</span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' 
                }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:border-purple-200 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${performer.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    #{index + 1}
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className={`absolute inset-0 bg-gradient-to-br ${performer.color}`} />
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6 ml-16">
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${performer.color} p-1 shadow-xl`}>
                        <img 
                          src={performer.avatar} 
                          alt={performer.name}
                          className="w-full h-full rounded-full object-cover bg-gray-200"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 text-2xl">
                        {performer.badge}
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                        {index === 1 && <Medal className="h-6 w-6 text-purple-500" />}
                        {index === 2 && <Trophy className="h-6 w-6 text-yellow-600" />}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{performer.name}</h3>
                      <p className="text-purple-600 font-semibold text-lg">{performer.level}</p>
                      <p className="text-gray-600 font-medium">{performer.achievement}</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{performer.followers} followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">{performer.monthlyGrowth} this month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <span className="text-3xl font-bold text-gray-900">{performer.points.toLocaleString()}</span>
                    </div>
                    <CTAButton
                      type="vote_now"
                      size="sm"
                      className={`bg-gradient-to-r ${performer.color} hover:opacity-90 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      metadata={{ targetType: 'leaderboard_entry', targetId: performer.id.toString() }}
                    >
                      <Vote className="h-4 w-4 mr-2" />
                      Vote
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How to climb section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100"
          >
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                🎯 How to Join the Elite Leaderboard
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900">Share Amazing Work</p>
                  <p className="text-gray-600">Post transformations that inspire</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900">Get Community Love</p>
                  <p className="text-gray-600">Earn votes from fellow artists</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900">Help Others Grow</p>
                  <p className="text-gray-600">Support and mentor newcomers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementLeaderboard;
