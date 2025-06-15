
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Award, Sparkles } from 'lucide-react';

const CommunityImpactStats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$47.2M",
      label: "Total Member Earnings",
      description: "Generated this year",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: TrendingUp,
      value: "340%",
      label: "Average Income Growth",
      description: "Within first 12 months",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      value: "47,284",
      label: "Active Members",
      description: "Growing by 2,847/week",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Award,
      value: "2,847",
      label: "Success Stories",
      description: "Life-changing wins",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const achievements = [
    "Featured in Allure Magazine",
    "Endorsed by Top Celebrity Stylists", 
    "Partner with Leading Beauty Brands",
    "Trusted by Salon Chains Nationwide"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair"
          >
            Real Impact, Real Results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Every week, thousands of beauty professionals transform their careers through our community
          </motion.p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-2 font-playfair">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-8">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-purple-800 font-semibold">Industry Recognition</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700"
              >
                {achievement}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityImpactStats;
