
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Star, 
  Clock,
  MapPin,
  Sparkles,
  Crown,
  Gift,
  Zap,
  Heart,
  Target,
  Award,
  MessageCircle,
  Settings,
  Bell,
  Briefcase,
  BarChart3,
  Wallet,
  UserPlus,
  Share2,
  Copy,
  ExternalLink,
  Coffee,
  Scissors,
  Palette,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

const SalonOwnerDashboard = () => {
  const { user, userProfile, userRole } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // GIANT DEBUG BANNER AND CONSOLE LOG
  console.log('🚨 RENDERING DASHBOARD FOR ROLE:', userRole, '— USING FILE: SalonOwnerDashboard.tsx (src/components/dashboard/salon/SalonOwnerDashboard.tsx)');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Today\'s Bookings', value: '12', change: '+8%', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Revenue This Week', value: '$3,240', change: '+15%', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Active Staff', value: '8', change: '+2 new', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Client Satisfaction', value: '4.9★', change: '+0.2', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Manage Bookings', color: 'bg-blue-500', action: () => toast.info('Opening booking manager...') },
    { icon: Users, label: 'Team Dashboard', color: 'bg-purple-500', action: () => toast.info('Opening team management...') },
    { icon: BarChart3, label: 'Analytics', color: 'bg-green-500', action: () => toast.info('Opening analytics...') },
    { icon: Settings, label: 'Salon Settings', color: 'bg-gray-500', action: () => toast.info('Opening settings...') }
  ];

  const recentActivity = [
    { type: 'booking', message: 'New booking: Sarah Chen for Gel Manicure', time: '2 min ago', icon: Calendar },
    { type: 'payment', message: 'Payment received: $85 from Mike Johnson', time: '5 min ago', icon: DollarSign },
    { type: 'review', message: '5★ review from Jennifer Liu', time: '10 min ago', icon: Star },
    { type: 'staff', message: 'Lisa Wong checked in for shift', time: '15 min ago', icon: Users }
  ];

  const teamLeaderboard = [
    { name: 'Lisa Wong', bookings: 24, revenue: '$1,240', rating: 4.9, avatar: 'LW' },
    { name: 'David Chen', bookings: 18, revenue: '$950', rating: 4.8, avatar: 'DC' },
    { name: 'Maria Garcia', bookings: 15, revenue: '$780', rating: 4.7, avatar: 'MG' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-6 text-center shadow-xl">
        <h1 className="text-4xl font-black mb-2">🏢 SALON OWNER DASHBOARD LOADED</h1>
        <p className="text-xl font-bold">FILE: SalonOwnerDashboard.tsx</p>
        <p className="text-lg">PATH: src/components/dashboard/salon/SalonOwnerDashboard.tsx</p>
        <p className="text-lg">USER ROLE: {userRole} | USER: {user?.email}</p>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <Avatar className="h-20 w-20 border-4 border-white/20">
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {greeting}, {userProfile?.full_name || 'Beauty Boss'}! ✨
                  </h1>
                  <div className="flex items-center space-x-4 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile?.location || 'San Jose, CA'}</span>
                    <Clock className="h-4 w-4 ml-4" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="container mx-auto px-6 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}></div>
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`h-8 w-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      <Badge className="bg-green-100 text-green-700 border-0">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      onClick={action.action}
                      className={`w-full justify-start ${action.color} hover:opacity-90 text-white`}
                    >
                      <action.icon className="h-4 w-4 mr-3" />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamLeaderboard.map((member, index) => (
                    <div key={member.name} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {index === 0 && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.bookings} bookings • {member.revenue}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Real-time Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-green-500" />
                    Live Activity
                    <Badge className="ml-auto bg-green-100 text-green-700">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <activity.icon className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Growth & FOMO Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Referral Program */}
            <Card className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Earn $100 Per Referral! 💰</h3>
                    <p className="text-white/80">Invite salon owners and earn credits</p>
                  </div>
                  <Gift className="h-12 w-12 text-white/80" />
                </div>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <p className="text-sm mb-2">Your Referral Link:</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-white/20 px-3 py-1 rounded text-sm flex-1 truncate">
                      emvi.app/join?ref={userProfile?.referral_code || 'SALON123'}
                    </code>
                    <Button size="sm" className="bg-white/20 hover:bg-white/30">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share & Earn
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon Features */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                  Coming Soon
                  <Badge className="ml-auto bg-purple-100 text-purple-700">VIP Access</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">SMS Marketing</span>
                    </div>
                    <Button size="sm" variant="outline">Vote</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">POS Integration</span>
                    </div>
                    <Button size="sm" variant="outline">Vote</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">AI Analytics</span>
                    </div>
                    <Button size="sm" variant="outline">Vote</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Inspiration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0 shadow-xl mb-8">
              <CardContent className="p-8 text-center">
                <Heart className="h-8 w-8 mx-auto mb-4 text-white/80" />
                <h3 className="text-2xl font-bold mb-2">Today's Inspiration</h3>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  "Your salon is more than a business—it's a place where confidence is created and dreams come true. Every client leaves feeling more beautiful than when they arrived. ✨"
                </p>
                <Button className="mt-4 bg-white/20 hover:bg-white/30 text-white">
                  <Coffee className="h-4 w-4 mr-2" />
                  Need Support? Chat Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button variant="ghost" size="sm" className="flex-col h-16">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Bookings</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-16">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">Staff</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-16">
              <BarChart3 className="h-5 w-5 mb-1" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-16">
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
