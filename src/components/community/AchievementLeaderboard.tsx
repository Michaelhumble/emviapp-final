import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, TrendingUp, Award } from 'lucide-react';
import CTAButton from './CTAButton';

const AchievementLeaderboard = () => {
  const topPerformers = [
    {
      rank: 1,
      name: "Isabella Rodriguez",
      specialty: "Bridal Makeup",
      points: 1250,
      badge: "Diamond",
      achievement: "Most Helpful Community Member",
      avatar: "🥇"
    },
    {
      rank: 2,
      name: "Marcus Chen",
      specialty: "Hair Color Specialist",
      points: 1180,
      badge: "Platinum",
      achievement: "Top Content Creator",
      avatar: "🥈"
    },
    {
      rank: 3,
      name: "Sophia Williams",
      specialty: "Nail Artist",
      points: 1050,
      badge: "Gold",
      achievement: "Rising Star",
      avatar: "🥉"
    },
    {
      rank: 4,
      name: "David Park",
      specialty: "Skincare Expert",
      points: 980,
      badge: "Gold",
      achievement: "Knowledge Sharer",
      avatar: "💎"
    },
    {
      rank: 5,
      name: "Emma Thompson",
      specialty: "Lash Extensions",
      points: 920,
      badge: "Silver",
      achievement: "Community Helper",
      avatar: "⭐"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Diamond': return 'from-blue-400 to-cyan-400';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      default: return 'from-orange-400 to-orange-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Achievement Leaderboard
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating our most active and helpful community members
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topPerformers.slice(0, 3).map((performer, index) => (
              <motion.div
                key={performer.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-6 shadow-lg ${
                  performer.rank === 1 
                    ? 'ring-4 ring-yellow-400/50 transform md:scale-105' 
                    : 'hover:shadow-xl'
                } transition-all duration-300`}
              >
                {performer.rank === 1 && (
                  <Crown className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500" />
                )}
                
                <div className="text-center">
                  <div className="text-4xl mb-4">{performer.avatar}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {performer.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {performer.specialty}
                  </p>
                  
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getBadgeColor(performer.badge)} text-white text-xs font-semibold mb-3`}>
                    <Star className="h-3 w-3" />
                    {performer.badge}
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {performer.points.toLocaleString()} pts
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {performer.achievement}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Rising Stars
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {topPerformers.slice(3).map((performer, index) => (
                <motion.div
                  key={performer.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400 w-8">
                      #{performer.rank}
                    </div>
                    <div className="text-2xl">{performer.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {performer.name}
                        </h4>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getBadgeColor(performer.badge)} text-white text-xs font-semibold`}>
                          {performer.badge}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {performer.specialty}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {performer.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white"
          >
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Ready to Climb the Leaderboard?
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Join our community and start earning points by sharing your expertise, helping others, and showcasing your amazing work!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                type="join_waitlist"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
              >
                Start Your Journey
              </CTAButton>
              
              <CTAButton
                type="vote_now"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 px-8 py-3 rounded-full font-semibold"
              >
                Vote for Featured Artists
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementLeaderboard;
