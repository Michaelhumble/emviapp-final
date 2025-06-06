
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Star, 
  Users, 
  Award,
  Zap,
  Crown,
  Target,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PremiumArtistDashboard = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
      </div>

      {/* Floating Money Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 blur-xl"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-400/30 blur-xl"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Premium Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Your Empire Dashboard
              </h1>
              <Crown className="h-8 w-8 text-yellow-400 ml-3" />
            </div>
            <p className="text-xl text-gray-300 font-light">
              Track your journey to $100K+ annual revenue
            </p>
          </motion.div>

          {/* Earnings Spotlight */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-8 w-8 text-white mr-2" />
                      <span className="text-white/80 text-lg font-medium">This Month's Revenue</span>
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">$1,250</div>
                    <div className="flex items-center text-white/90">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      <span className="text-lg">+32% from last month</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 text-sm mb-1">On track for</div>
                    <div className="text-3xl font-bold text-white">$15K</div>
                    <div className="text-white/80 text-sm">this year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">32</div>
                <div className="text-gray-300 text-sm">Total Bookings</div>
                <div className="text-green-400 text-xs mt-1">+12% this month</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-yellow-500/20 p-3 rounded-full">
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">4.9</div>
                <div className="text-gray-300 text-sm">Average Rating</div>
                <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">89%</div>
                <div className="text-gray-300 text-sm">Repeat Clients</div>
                <div className="text-purple-400 text-xs mt-1">Industry leading</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-pink-500/20 p-3 rounded-full">
                    <Award className="h-8 w-8 text-pink-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">Top 5%</div>
                <div className="text-gray-300 text-sm">Platform Ranking</div>
                <div className="text-pink-400 text-xs mt-1">Elite status</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Action Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Revenue Booster */}
            <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg border border-amber-300/30 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-amber-500/20 p-3 rounded-full mr-4">
                    <Zap className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Revenue Accelerator</h3>
                    <p className="text-amber-200">Boost your earnings by 40%</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white">
                    <Sparkles className="h-5 w-5 text-amber-400 mr-3" />
                    <span>Premium profile placement</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Sparkles className="h-5 w-5 text-amber-400 mr-3" />
                    <span>AI-powered pricing optimization</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Sparkles className="h-5 w-5 text-amber-400 mr-3" />
                    <span>VIP client matching</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 text-lg shadow-lg">
                  Activate Pro ($49/month)
                </Button>
              </CardContent>
            </Card>

            {/* Growth Insights */}
            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg border border-emerald-300/30 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-500/20 p-3 rounded-full mr-4">
                    <Target className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Growth Insights</h3>
                    <p className="text-emerald-200">Scale to 6-figure income</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-emerald-400 font-semibold mb-1">Next Revenue Goal</div>
                    <div className="text-white text-lg">$2,000/month (+60%)</div>
                    <div className="bg-emerald-500/20 rounded-full h-2 mt-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="text-emerald-200 text-sm">
                    💡 Book 8 more premium services to hit your goal
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 text-lg shadow-lg">
                  View Strategy Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Showcase */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Sparkles className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Your Million-Dollar Portfolio</h3>
                  </div>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                    Manage Portfolio
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-blue-400" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-pink-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumArtistDashboard;
