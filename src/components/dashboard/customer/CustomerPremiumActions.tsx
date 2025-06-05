
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Heart,
  Gift,
  TrendingUp,
  Crown,
  Star,
  MapPin,
  Users,
  Sparkles,
  Zap,
  Award,
  ArrowRight
} from 'lucide-react';

const CustomerPremiumActions = () => {
  const quickActions = [
    {
      title: "Book New Service",
      description: "Discover amazing artists near you",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      features: ["AI Matching", "Instant Booking", "Best Prices"]
    },
    {
      title: "Explore Favorites",
      description: "View your saved artists & salons",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      features: ["Quick Access", "New Updates", "Special Offers"]
    },
    {
      title: "Redeem Credits",
      description: "Use your earned beauty credits",
      icon: Gift,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      features: ["2,450 Credits", "Free Services", "VIP Perks"]
    },
    {
      title: "My Journey",
      description: "Track your beauty progress",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      features: ["Analytics", "Achievements", "Insights"]
    }
  ];

  const premiumFeatures = [
    {
      title: "VIP Priority Booking",
      description: "Skip the queue with premium access",
      icon: Crown,
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "Exclusive Events",
      description: "Access to beauty masterclasses",
      icon: Star,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Personal Concierge",
      description: "Dedicated beauty advisor",
      icon: Users,
      color: "from-rose-500 to-pink-500"
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
      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quick Actions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${action.bgColor} rounded-full -translate-y-16 translate-x-16 opacity-50`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {action.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button size="sm" className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 border-0 group`}>
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Premium Features */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 overflow-hidden">
          <CardContent className="p-8 relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full -translate-y-20 translate-x-20 opacity-30" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-200 to-yellow-200 rounded-full translate-y-16 -translate-x-16 opacity-20" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Premium Benefits</h3>
                  <p className="text-gray-600">Exclusive perks for VIP members</p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CustomerPremiumActions;
