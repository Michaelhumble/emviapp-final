
import React from 'react';
import { useAuth } from '@/context/auth';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerWelcomeBanner from './CustomerWelcomeBanner';
import CustomerMetricsSection from './CustomerMetricsSection';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Crown, 
  Calendar, 
  Heart, 
  Star, 
  MapPin, 
  Gift,
  TrendingUp,
  Users,
  Clock,
  Zap,
  Trophy,
  Target,
  Award
} from 'lucide-react';

const CustomerDashboard = () => {
  const { userProfile } = useAuth();
  const { bookings, favorites, loading } = useCustomerDashboard();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const beautyJourneyStats = [
    { label: "Credits Earned", value: "2,450", icon: Gift, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Badges Unlocked", value: "12", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Day Streak", value: "28", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Days Active", value: "156", icon: Target, color: "text-blue-600", bg: "bg-blue-50" }
  ];

  const communityImpact = [
    { label: "Friends Invited", value: "8", icon: Users, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Artists Supported", value: "15", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Bookings Complete", value: "34", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Reviews Left", value: "22", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" }
  ];

  const quickActions = [
    { title: "Book New Service", description: "Discover amazing artists near you", icon: Calendar, color: "purple" },
    { title: "Explore Favorites", description: "View your saved artists & salons", icon: Heart, color: "pink" },
    { title: "Redeem Credits", description: "Use your earned beauty credits", icon: Gift, color: "emerald" },
    { title: "My Journey", description: "Track your beauty progress", icon: TrendingUp, color: "blue" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Premium Header */}
          <motion.div variants={itemVariants}>
            <CustomerDashboardHeader profile={userProfile} />
          </motion.div>

          {/* Welcome Banner */}
          <motion.div variants={itemVariants}>
            <CustomerWelcomeBanner isProfileTrending={true} />
          </motion.div>

          {/* Beauty Journey Stats */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    My Beauty Journey
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {beautyJourneyStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`${stat.bg} rounded-2xl p-6 text-center relative overflow-hidden`}
                    >
                      <div className="absolute top-2 right-2">
                        <stat.icon className={`h-5 w-5 ${stat.color} opacity-50`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Impact */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Community Impact
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {communityImpact.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`${stat.bg} rounded-2xl p-6 text-center relative overflow-hidden`}
                    >
                      <div className="absolute top-2 right-2">
                        <stat.icon className={`h-5 w-5 ${stat.color} opacity-50`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${
                        action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        action.color === 'pink' ? 'from-pink-500 to-pink-600' :
                        action.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                        'from-blue-500 to-blue-600'
                      } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Upcoming */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                      <Clock className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Earned 50 credits</p>
                        <p className="text-sm text-gray-600">Completed booking with Sarah M.</p>
                      </div>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-100 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Added new favorite</p>
                        <p className="text-sm text-gray-600">Saved Luxe Beauty Spa</p>
                      </div>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                    <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0">
                      <Calendar className="h-3 w-3 mr-1" />
                      2 Booked
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">Manicure & Pedicure</p>
                        <Crown className="h-4 w-4 text-amber-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">with Emma at Nail Paradise</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        Tomorrow, 2:00 PM
                        <MapPin className="h-3 w-3 ml-2" />
                        Downtown
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">Hair Styling</p>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">with Alex at Style Studio</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        Friday, 10:00 AM
                        <MapPin className="h-3 w-3 ml-2" />
                        Midtown
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
