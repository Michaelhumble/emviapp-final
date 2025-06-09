
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Crown, Users, DollarSign, Calendar, Star, TrendingUp, 
  UserPlus, MessageSquare, Bell, Zap, Gift, Vote,
  Clock, CheckCircle, AlertCircle, Sparkles, ArrowRight,
  BarChart3, Target, Heart, Share2, Coffee, Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface SalonStats {
  dailyRevenue: number;
  weeklyRevenue: number;
  todayAppointments: number;
  clientStreak: number;
  staffCount: number;
  averageRating: number;
  totalClients: number;
  avgClientSpend: number;
  clientReturnRate: number;
  staffRetention: number;
}

const SalonOwnerDashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState<SalonStats>({
    dailyRevenue: 2847,
    weeklyRevenue: 18293,
    todayAppointments: 24,
    clientStreak: 47,
    staffCount: 8,
    averageRating: 4.8,
    totalClients: 342,
    avgClientSpend: 125,
    clientReturnRate: 89,
    staffRetention: 95
  });
  const [liveEvents, setLiveEvents] = useState([
    "Sarah just got a 5-star review! ⭐",
    "New client booked with Maria for tomorrow! 💅",
    "Tony achieved 50 bookings this month! 🎉"
  ]);

  const salonName = userProfile?.salon_name || userProfile?.full_name || "Your Salon";
  const ownerName = userProfile?.full_name || "Salon Owner";

  const handleComingSoon = (featureName: string) => {
    toast.success(`Thanks for voting for ${featureName}! We'll notify you when it's ready.`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6 space-y-6"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent" />
            <CardContent className="relative p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <Avatar className="w-16 h-16 border-4 border-white/20">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-white/20 text-white text-xl">
                      {ownerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Welcome back, {ownerName}! 👑
                    </h1>
                    <p className="text-xl text-purple-100">
                      {salonName} - Salon Empire Control Center
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-emerald-500 text-white px-3 py-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    #1 Trending
                  </Badge>
                  <Badge className="bg-yellow-500 text-white px-3 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
              
              {/* Real-time Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-emerald-300" />
                    <span className="text-emerald-100 text-sm">Today's Revenue</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">${stats.dailyRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-300" />
                    <span className="text-blue-100 text-sm">Appointments</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{stats.todayAppointments}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="text-yellow-100 text-sm">Client Streak</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{stats.clientStreak} days</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-pink-300" />
                    <span className="text-pink-100 text-sm">Team Size</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{stats.staffCount} artists</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FOMO & Viral Growth Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-800">
                <Share2 className="w-5 h-5 mr-2" />
                Viral Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 mb-4">"#{salonName} is trending this week! 🚀"</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Share Success Story
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <UserPlus className="w-5 h-5 mr-2" />
                Invite Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-2">Grow your team</p>
              <div className="mb-4">
                <div className="bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-purple-600 mt-1">$25 reward progress</p>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Invite Team Member
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Gift className="w-5 h-5 mr-2" />
                Refer & Earn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 mb-2">$50 for each salon referral</p>
              <div className="mb-4">
                <div className="bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full w-1/2"></div>
                </div>
                <p className="text-sm text-orange-600 mt-1">2/5 referrals to bonus</p>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Refer Salon Owner
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Operations Command Center */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Zap className="w-6 h-6 mr-2" />
                Operations Command Center
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Button className="h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <div className="text-center">
                    <UserPlus className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Add New Staff</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                  <div className="text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Book Client</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  <div className="text-center">
                    <MessageSquare className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Send Announcement</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  <div className="text-center">
                    <Coffee className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Request Supplies</span>
                  </div>
                </Button>
              </div>

              {/* Staff Leaderboard */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Staff Leaderboard - This Week
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-yellow-500">1st</Badge>
                      <span className="font-medium">Maria Rodriguez</span>
                    </div>
                    <span className="text-emerald-600 font-bold">41 bookings</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gray-400">2nd</Badge>
                      <span className="font-medium">Sarah Kim</span>
                    </div>
                    <span className="text-emerald-600 font-bold">38 bookings</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Intelligence KPIs */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-800">${stats.avgClientSpend}</p>
              <p className="text-sm text-emerald-600">Avg Client Spend</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-800">{stats.clientReturnRate}%</p>
              <p className="text-sm text-blue-600">Client Return Rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">{stats.staffRetention}%</p>
              <p className="text-sm text-purple-600">Staff Retention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-800">{stats.averageRating}</p>
              <p className="text-sm text-yellow-600">Google Rating</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart FOMO Features */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardTitle className="flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Coming Soon - Vote to Unlock! 🗳️
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "POS Integration", votes: 247, icon: BarChart3 },
                  { name: "Calendar Sync", votes: 189, icon: Calendar },
                  { name: "SMS Marketing", votes: 156, icon: MessageSquare },
                  { name: "QuickBooks Sync", votes: 134, icon: DollarSign },
                  { name: "Payroll Export", votes: 98, icon: Users },
                  { name: "Auto Client Invites", votes: 87, icon: UserPlus }
                ].map((feature, index) => (
                  <Card key={feature.name} className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200">
                    <CardContent className="p-4 text-center">
                      <feature.icon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <h4 className="font-bold text-indigo-800 mb-2">{feature.name}</h4>
                      <p className="text-sm text-indigo-600 mb-3">{feature.votes} votes</p>
                      <Button 
                        size="sm" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleComingSoon(feature.name)}
                      >
                        <Vote className="w-4 h-4 mr-1" />
                        Vote
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Feed */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardTitle className="flex items-center">
                <Bell className="w-6 h-6 mr-2" />
                Live Salon Activity 🔥
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <AnimatePresence>
                  {liveEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3"
                    >
                      <p className="text-emerald-800">{event}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inspiration & Support */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Sparkles className="w-5 h-5 mr-2" />
                Daily Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 italic mb-4">
                "Success in the beauty industry isn't just about talent—it's about creating experiences that make people feel their absolute best."
              </p>
              <p className="text-sm text-orange-600">💡 Pro tip: Send thank-you texts after appointments to boost reviews!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-800">
                <Target className="w-5 h-5 mr-2" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Help & Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Community Forum
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Marketing Ideas
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Sticky Footer (Mobile) / Sidebar (Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg">
        <div className="flex justify-around items-center py-2">
          <Button size="sm" variant="ghost" className="flex-col">
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Book</span>
          </Button>
          <Button size="sm" variant="ghost" className="flex-col">
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Pay</span>
          </Button>
          <Button size="sm" variant="ghost" className="flex-col">
            <Gift className="w-5 h-5" />
            <span className="text-xs">Refer</span>
          </Button>
          <Button size="sm" variant="ghost" className="flex-col">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
