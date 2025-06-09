
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Star, 
  Plus, 
  Settings,
  Bell,
  Heart,
  DollarSign,
  Eye
} from 'lucide-react';

const SalonOwnerDashboard = () => {
  const { user, userProfile, userRole } = useAuth();
  const [voteCounts, setVoteCounts] = useState({
    pos: 42,
    marketing: 38,
    sms: 31,
    payroll: 29,
    calendar: 24
  });

  // Debug logging
  console.log('🏢 SalonDashboard rendered for user:', user?.email, userRole);

  const handleVote = (feature: string) => {
    setVoteCounts(prev => ({
      ...prev,
      [feature]: prev[feature as keyof typeof prev] + 1
    }));
  };

  // Mock data for demo purposes
  const stats = {
    dailyRevenue: 2847,
    weeklyBookings: 142,
    clientStreak: 28,
    avgRating: 4.8,
    staffCount: 12,
    monthlyGrowth: 23
  };

  const staffLeaderboard = [
    { name: "Sarah M.", bookings: 41, avatar: "" },
    { name: "Jessica L.", bookings: 38, avatar: "" },
    { name: "Michael R.", bookings: 35, avatar: "" }
  ];

  const liveActivity = [
    "🌟 Sarah just got a 5-star review!",
    "📅 New client booked with Jessica",
    "💰 Daily revenue goal reached!",
    "🎉 Michael completed certification"
  ];

  const comingSoonFeatures = [
    { name: "POS Integration", description: "Accept payments directly", votes: voteCounts.pos, key: "pos" },
    { name: "SMS Marketing", description: "Automated client campaigns", votes: voteCounts.sms, key: "sms" },
    { name: "Smart Payroll", description: "Auto-calculate commissions", votes: voteCounts.payroll, key: "payroll" },
    { name: "Calendar Sync", description: "Google/Apple integration", votes: voteCounts.calendar, key: "calendar" },
    { name: "Marketing Hub", description: "Social media management", votes: voteCounts.marketing, key: "marketing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Debug Banner */}
      <div className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">🏢 SALON OWNER DASHBOARD LOADED SUCCESSFULLY</h1>
          <p className="text-sm opacity-90">User: {user?.email} | Role: {userRole}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white/30">
                <AvatarImage src={userProfile?.avatar_url} />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {userProfile?.salon_name?.[0] || user?.email?.[0]?.toUpperCase() || 'S'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {userProfile?.salon_name || 'Salon Owner'}!
                </h1>
                <p className="text-white/80 text-lg">Your empire awaits your command</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">${stats.dailyRevenue}</div>
                <div className="text-sm opacity-80">Today's Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.weeklyBookings}</div>
                <div className="text-sm opacity-80">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.avgRating}⭐</div>
                <div className="text-sm opacity-80">Rating</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, label: "Monthly Growth", value: `+${stats.monthlyGrowth}%`, color: "emerald" },
            { icon: Users, label: "Staff Members", value: stats.staffCount, color: "blue" },
            { icon: Calendar, label: "Client Streak", value: `${stats.clientStreak} days`, color: "purple" },
            { icon: Star, label: "Reviews", value: "4.8/5.0", color: "amber" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 text-${stat.color}-500`} />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FOMO & Growth Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                #1 Trending Salon This Week! 🔥
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Share your success and attract more clients!</p>
              <Button variant="secondary" className="w-full bg-white text-pink-600 hover:bg-gray-100">
                Share Success Story
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                Refer & Earn $50
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Invite another salon owner and both get rewards!</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <div className="bg-white h-2 rounded-full w-3/4"></div>
              </div>
              <Button variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-gray-100">
                Invite Friend ($37.50/50)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Operations Center */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Operations Command Center</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Staff Leaderboard */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Staff Leaderboard 🏆</h3>
              <div className="space-y-3">
                {staffLeaderboard.map((staff, index) => (
                  <div key={staff.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{staff.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{staff.name}</span>
                    </div>
                    <Badge className="bg-purple-600 text-white">
                      {staff.bookings} bookings
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Add Booking", icon: Plus, color: "blue" },
                  { label: "Add Staff", icon: Users, color: "emerald" },
                  { label: "Send Alert", icon: Bell, color: "amber" },
                  { label: "Settings", icon: Settings, color: "purple" }
                ].map((action) => (
                  <Button 
                    key={action.label} 
                    variant="outline" 
                    className={`flex flex-col items-center gap-2 h-auto py-4 border-2 border-${action.color}-200 hover:bg-${action.color}-50`}
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Coming Soon - Vote to Unlock! 🗳️</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoonFeatures.map((feature) => (
                <Card key={feature.key} className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold mb-2">{feature.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{feature.votes} votes</Badge>
                      <Button 
                        size="sm" 
                        onClick={() => handleVote(feature.key)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Vote ▲
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Eye className="w-6 h-6" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">{activity}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {index + 1}m ago
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspiration Section */}
        <Card className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Daily Inspiration</h3>
            <p className="text-lg italic mb-4">
              "Success in the beauty industry comes from making every client feel beautiful inside and out."
            </p>
            <Button variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Get Business Tips
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { label: "Book", icon: Calendar },
            { label: "Staff", icon: Users },
            { label: "Earn", icon: DollarSign },
            { label: "Settings", icon: Settings }
          ].map((item) => (
            <Button key={item.label} variant="ghost" size="sm" className="flex flex-col gap-1">
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
