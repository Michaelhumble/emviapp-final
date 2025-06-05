
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Crown, 
  Gift, 
  Calendar,
  Heart,
  Star,
  Users,
  Award,
  Target,
  Zap,
  Trophy,
  Sparkles
} from 'lucide-react';

const CustomerPremiumMetrics = () => {
  const metrics = [
    {
      category: "Beauty Journey",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "Credits Earned", value: "2,450", icon: Gift, trend: "+15%" },
        { label: "Badges Unlocked", value: "12", icon: Award, trend: "+2" },
        { label: "Day Streak", value: "28", icon: Zap, trend: "Record!" },
        { label: "Days Active", value: "156", icon: Target, trend: "+12%" }
      ]
    },
    {
      category: "Community Impact",
      icon: Trophy,
      color: "from-emerald-500 to-teal-500",
      stats: [
        { label: "Friends Invited", value: "8", icon: Users, trend: "+3" },
        { label: "Artists Supported", value: "15", icon: Heart, trend: "+5" },
        { label: "Bookings Complete", value: "34", icon: Calendar, trend: "+8" },
        { label: "Reviews Left", value: "22", icon: Star, trend: "+4" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {metrics.map((section, sectionIndex) => (
        <motion.div key={section.category} variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.category}</h3>
                  <p className="text-gray-600">Track your amazing progress</p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-0">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {section.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-10 translate-x-10 opacity-30" />
                      
                      {/* Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center shadow-md`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {stat.trend}
                        </Badge>
                      </div>

                      {/* Value */}
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </div>

                      {/* Trend Indicator */}
                      <div className="mt-3 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs text-emerald-600 font-medium">
                          Growing
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CustomerPremiumMetrics;
