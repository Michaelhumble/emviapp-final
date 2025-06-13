
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AchievementLeaderboard = () => {
  const achievements = [
    {
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      title: "Community Champion",
      description: "Help 5 fellow professionals",
      progress: 3,
      total: 5,
      reward: "Special Badge + Recognition"
    },
    {
      icon: <Star className="h-6 w-6 text-purple-500" />,
      title: "Story Teller",
      description: "Share 3 inspiring stories",
      progress: 1,
      total: 3,
      reward: "Featured Story Highlight"
    },
    {
      icon: <Award className="h-6 w-6 text-blue-500" />,
      title: "Mentor",
      description: "Guide newcomers to success",
      progress: 0,
      total: 1,
      reward: "Mentor Badge + Credits"
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Isabella Martinez",
      level: "Diamond Professional",
      points: 2,847,
      badge: "🏆",
      achievement: "Top Community Supporter"
    },
    {
      rank: 2,
      name: "James Thompson",
      level: "Platinum Artist",
      points: 2,156,
      badge: "🥈",
      achievement: "Master Storyteller"
    },
    {
      rank: 3,
      name: "Sarah Kim",
      level: "Gold Expert",
      points: 1,923,
      badge: "🥉",
      achievement: "Rising Star Mentor"
    },
    {
      rank: 4,
      name: "Michael Rivera",
      level: "Silver Pro",
      points: 1,678,
      badge: "⭐",
      achievement: "Community Helper"
    },
    {
      rank: 5,
      name: "Emily Chen",
      level: "Bronze Rising",
      points: 1,445,
      badge: "💫",
      achievement: "Inspiring Newcomer"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Journey & Community Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Celebrate progress, inspire others, and see how the community grows together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Your Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                            <span className="text-sm text-purple-600 font-medium">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {achievement.description}
                          </p>
                          <div className="mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                            Reward: {achievement.reward}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Community Leaders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((member, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{member.badge}</span>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-600">#{member.rank}</div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-800">{member.name}</h4>
                          <span className="text-sm font-bold text-purple-600">
                            {member.points.toLocaleString()} pts
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">
                            {member.level}
                          </Badge>
                          <span className="text-xs text-gray-500">{member.achievement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Your Current Rank:</strong> #47 out of 1,247 active members
                  </p>
                  <p className="text-xs text-purple-600">
                    Keep sharing, supporting, and growing with the community! 🌟
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementLeaderboard;
