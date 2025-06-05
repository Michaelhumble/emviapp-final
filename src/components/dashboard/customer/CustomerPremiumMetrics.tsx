
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Heart, 
  Calendar, 
  Star, 
  TrendingUp,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerPremiumMetrics = () => {
  const metrics = [
    {
      icon: Crown,
      title: "Premium Beauty Experience",
      value: "1,250",
      label: "Credits Available",
      trend: "+15%",
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50"
    },
    {
      icon: Heart,
      title: "Favorites",
      value: "0", 
      label: "Saved artists",
      action: "Add favorites",
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-50 to-rose-50"
    },
    {
      icon: Calendar,
      title: "Bookings",
      value: "0",
      label: "This month", 
      action: "Book now",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      icon: Star,
      title: "Reviews",
      value: "0",
      label: "Given",
      action: "Leave review",
      color: "from-amber-500 to-yellow-600", 
      bgColor: "from-amber-50 to-yellow-50"
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {metrics.map((metric, index) => (
        <motion.div key={metric.title} variants={itemVariants}>
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
            
            {/* Premium Badge for first card */}
            {index === 0 && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>
            )}

            <CardContent className="p-6 relative z-10">
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {metric.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </span>
                  {metric.trend && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">{metric.trend}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {metric.label}
                </p>
              </div>

              {/* Action or Decoration */}
              {metric.action ? (
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {metric.action}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-purple-600 font-medium">
                  <Award className="h-3 w-3" />
                  Unlimited access
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-white/20 to-transparent rounded-full" />
              {index === 0 && (
                <div className="absolute top-2 left-2 opacity-30">
                  <Zap className="h-4 w-4 text-purple-600" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CustomerPremiumMetrics;
