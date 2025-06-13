
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, Heart, MessageCircle, Users, Award, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PremiumAnalytics = () => {
  const userStats = {
    totalViews: 12847,
    totalLikes: 2341,
    totalComments: 892,
    followers: 1456,
    posts: 34,
    engagementRate: 87,
    weeklyGrowth: 23,
    achievements: 12
  };

  const weeklyData = [
    { day: 'Mon', views: 234, engagement: 45 },
    { day: 'Tue', views: 456, engagement: 67 },
    { day: 'Wed', views: 789, engagement: 89 },
    { day: 'Thu', views: 543, engagement: 76 },
    { day: 'Fri', views: 892, engagement: 94 },
    { day: 'Sat', views: 1234, engagement: 87 },
    { day: 'Sun', views: 987, engagement: 92 }
  ];

  const achievements = [
    { title: "Rising Star", description: "Gained 100+ followers this month", icon: "⭐", unlocked: true },
    { title: "Engagement Master", description: "90%+ engagement rate", icon: "🔥", unlocked: true },
    { title: "Community Leader", description: "Top 10% contributor", icon: "👑", unlocked: true },
    { title: "Viral Creator", description: "Post reached 10K+ views", icon: "🚀", unlocked: false }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Community Impact
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your growth, celebrate achievements, and see your influence in the beauty community
          </p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Eye, label: "Total Views", value: userStats.totalViews.toLocaleString(), color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Heart, label: "Total Likes", value: userStats.totalLikes.toLocaleString(), color: "text-red-500", bg: "bg-red-50" },
            { icon: MessageCircle, label: "Comments", value: userStats.totalComments.toLocaleString(), color: "text-green-500", bg: "bg-green-50" },
            { icon: Users, label: "Followers", value: userStats.followers.toLocaleString(), color: "text-purple-500", bg: "bg-purple-50" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Engagement Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Engagement Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Engagement Rate</span>
                    <span className="text-2xl font-bold text-purple-600">{userStats.engagementRate}%</span>
                  </div>
                  <Progress value={userStats.engagementRate} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">Industry average: 62%</p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Weekly Growth</span>
                    <span className="text-xl font-bold text-green-600">+{userStats.weeklyGrowth}%</span>
                  </div>
                  <Progress value={userStats.weeklyGrowth} className="h-2" />
                </div>

                <div className="grid grid-cols-7 gap-1 mt-4">
                  {weeklyData.map((day) => (
                    <div key={day.day} className="text-center">
                      <div 
                        className="bg-purple-200 rounded mb-1" 
                        style={{ height: `${(day.engagement / 100) * 60}px` }}
                      ></div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Achievements ({userStats.achievements}/15)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.unlocked ? 'bg-white shadow-sm border-l-4 border-l-yellow-400' : 'bg-gray-50 opacity-60'}`}>
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Achievement Progress</p>
                  <Progress value={(userStats.achievements / 15) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{15 - userStats.achievements} more to unlock Elite status</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumAnalytics;
