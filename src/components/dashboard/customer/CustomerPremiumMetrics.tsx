
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
  Zap,
  Trophy,
  Gem
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerPremiumMetrics = () => {
  const metrics = [
    {
      icon: Crown,
      title: "Premium Credits",
      value: "1,250",
      label: "Available Balance",
      trend: "+15%",
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      accentColor: "text-purple-600",
      premium: true
    },
    {
      icon: Heart,
      title: "Favorites",
      value: "0", 
      label: "Saved artists",
      action: "Discover artists",
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-50 to-rose-50",
      accentColor: "text-pink-600"
    },
    {
      icon: Calendar,
      title: "Bookings",
      value: "0",
      label: "This month", 
      action: "Book service",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      accentColor: "text-emerald-600"
    },
    {
      icon: Star,
      title: "Reviews",
      value: "0",
      label: "Given",
      action: "Share experience",
      color: "from-amber-500 to-yellow-600", 
      bgColor: "from-amber-50 to-yellow-50",
      accentColor: "text-amber-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
          Your Beauty Analytics
        </h2>
        <p className="text-gray-600">Track your premium beauty journey</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div key={metric.title} variants={itemVariants}>
            <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
              
              {/* Premium Badge */}
              {metric.premium && (
                <motion.div 
                  className="absolute top-4 right-4 z-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-0 shadow-lg">
                    <Crown className="h-3 w-3 mr-1" />
                    VIP
                  </Badge>
                </motion.div>
              )}

              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

              <CardContent className="p-8 relative z-10">
                {/* Icon with enhanced styling */}
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <metric.icon className="h-8 w-8 text-white" />
                  
                  {/* Sparkle effect for premium */}
                  {metric.premium && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                    {metric.title}
                  </h3>
                  <div className="flex items-baseline gap-3 mb-2">
                    <motion.span 
                      className="text-4xl font-bold text-gray-900"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      {metric.value}
                    </motion.span>
                    {metric.trend && (
                      <motion.div 
                        className="flex items-center gap-1 text-green-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-bold">{metric.trend}</span>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {metric.label}
                  </p>
                </div>

                {/* Action or Status */}
                <div className="flex items-center justify-between">
                  {metric.action ? (
                    <motion.div 
                      className={`text-xs ${metric.accentColor} font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300`}
                      whileHover={{ x: 5 }}
                    >
                      <Zap className="h-3 w-3" />
                      {metric.action}
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-purple-700 font-bold">
                      <Trophy className="h-3 w-3" />
                      Unlimited Access
                    </div>
                  )}
                  
                  {metric.premium && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Gem className="h-4 w-4 text-purple-600" />
                    </motion.div>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-white/30 to-transparent rounded-full group-hover:scale-110 transition-transform duration-500" />
                
                {/* Premium sparkle effect */}
                {index === 0 && (
                  <motion.div 
                    className="absolute top-4 left-4 opacity-40"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Award className="h-5 w-5 text-purple-600" />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomerPremiumMetrics;
