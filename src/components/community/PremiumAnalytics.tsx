
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Heart, MessageCircle, BarChart3, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PremiumAnalytics = () => {
  const communityStats = [
    {
      icon: Users,
      label: 'Active Members',
      value: '2,847',
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      label: 'Monthly Engagement',
      value: '84%',
      change: '+8%',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: MessageCircle,
      label: 'Success Stories',
      value: '342',
      change: '+23%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      label: 'Achievements Unlocked',
      value: '1,249',
      change: '+15%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const engagementData = [
    { category: 'Portfolio Shares', percentage: 76, color: 'bg-blue-500' },
    { category: 'Skill Discussions', percentage: 68, color: 'bg-green-500' },
    { category: 'Business Tips', percentage: 82, color: 'bg-purple-500' },
    { category: 'Challenge Participation', percentage: 64, color: 'bg-orange-500' }
  ];

  const achievements = [
    {
      title: 'Rising Star Artists',
      count: 47,
      description: 'New artists gaining recognition',
      icon: '⭐',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Master Mentors',
      count: 23,
      description: 'Experienced pros helping others',
      icon: '💎',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Business Builders',
      count: 31,
      description: 'Growing successful salons',
      icon: '🔥',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Community Analytics
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our community is thriving and growing together with real engagement and meaningful connections.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-4`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.change} this month</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Content Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {engagementData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.category}</span>
                      <span className="font-semibold">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Community Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.gradient} flex items-center justify-center text-xl shadow-lg`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{achievement.count}</div>
                      <div className="text-xs text-gray-500">this month</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Growth Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6" />
                <h3 className="text-xl font-bold">Community Growth</h3>
              </div>
              <p className="text-indigo-100">
                Our community has grown by <span className="font-bold">127%</span> this year, 
                with members booking <span className="font-bold">$2.4M+</span> in services
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumAnalytics;
