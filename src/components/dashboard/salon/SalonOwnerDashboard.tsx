
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  TrendingUp, 
  Users, 
  Calendar, 
  Star, 
  DollarSign, 
  Heart,
  Zap,
  Gift,
  MessageCircle,
  Bell,
  Plus,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Rocket,
  Eye,
  Share2
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SalonStats {
  dailyRevenue: number;
  weeklyBookings: number;
  activeStaff: number;
  customerRetention: number;
  reviewScore: number;
  newClients: number;
  viralScore: number;
}

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  bookings: number;
  rating: number;
  earnings: number;
}

interface ActivityItem {
  id: string;
  type: 'booking' | 'review' | 'payment' | 'achievement';
  message: string;
  timestamp: Date;
  icon: React.ReactNode;
}

const SalonOwnerDashboard = () => {
  const { userProfile, user } = useAuth();
  const [stats, setStats] = useState<SalonStats>({
    dailyRevenue: 2450,
    weeklyBookings: 84,
    activeStaff: 6,
    customerRetention: 89,
    reviewScore: 4.8,
    newClients: 12,
    viralScore: 94
  });

  const [topStaff] = useState<StaffMember[]>([
    { id: '1', name: 'Sarah Chen', avatar: '/placeholder-avatar.jpg', bookings: 28, rating: 4.9, earnings: 3200 },
    { id: '2', name: 'Maria Rodriguez', avatar: '/placeholder-avatar.jpg', bookings: 25, rating: 4.8, earnings: 2890 },
    { id: '3', name: 'Emily Johnson', avatar: '/placeholder-avatar.jpg', bookings: 22, rating: 4.7, earnings: 2650 }
  ]);

  const [recentActivity] = useState<ActivityItem[]>([
    { 
      id: '1', 
      type: 'booking', 
      message: 'New booking: Jessica M. with Sarah Chen', 
      timestamp: new Date(Date.now() - 300000),
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    { 
      id: '2', 
      type: 'review', 
      message: 'Sarah Chen received a 5-star review!', 
      timestamp: new Date(Date.now() - 600000),
      icon: <Star className="h-4 w-4 text-yellow-500" />
    },
    { 
      id: '3', 
      type: 'payment', 
      message: 'Payment received: $180 from Maria K.', 
      timestamp: new Date(Date.now() - 900000),
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    }
  ]);

  const [currentTip, setCurrentTip] = useState(0);
  const businessTips = [
    "💡 Offer a loyalty program to increase customer retention by 25%",
    "🚀 Staff with 4.8+ ratings book 40% more appointments",
    "✨ Salons with active social media see 60% more new clients",
    "🎯 Peak booking times: Tuesday-Thursday, 10am-2pm"
  ];

  useEffect(() => {
    console.log('🏢 SalonOwnerDashboard rendered for user:', user?.email, userProfile?.role);
    
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % businessTips.length);
    }, 8000);

    return () => clearInterval(tipInterval);
  }, [user, userProfile, businessTips.length]);

  const handleQuickAction = (action: string) => {
    toast.success(`${action} feature opening soon! 🚀`);
  };

  const handleInviteStaff = () => {
    toast.success("Staff invitation link copied! Earn $100 per successful invite 💰");
  };

  const handleUpgrade = () => {
    toast.success("Premium features coming soon! You're on the VIP early access list ✨");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const salonName = userProfile?.salon_name || userProfile?.full_name || 'Your Salon';
  const ownerName = userProfile?.full_name || 'Salon Owner';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Premium Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-emerald-600/10" />
        <div className="relative px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-4 ring-purple-200">
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl font-bold">
                    {salonName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Welcome back, {ownerName}! 👋
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">{salonName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Salon
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      Viral Score: {stats.viralScore}%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                  onClick={handleUpgrade}
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Unlock Premium Features
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Business Intelligence KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium">Daily Revenue</p>
                  <p className="text-2xl lg:text-3xl font-bold text-emerald-700">{formatCurrency(stats.dailyRevenue)}</p>
                  <div className="flex items-center text-emerald-600 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs yesterday
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Weekly Bookings</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-700">{stats.weeklyBookings}</p>
                  <div className="flex items-center text-blue-600 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% vs last week
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Active Staff</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-700">{stats.activeStaff}</p>
                  <div className="flex items-center text-purple-600 text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    All online today
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Review Score</p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-700">{stats.reviewScore}</p>
                  <div className="flex items-center text-yellow-600 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    148 reviews this month
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Operations Center */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-6 w-6 text-blue-500" />
                  Operations Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'New Booking', icon: Plus, color: 'blue' },
                    { name: 'Add Staff', icon: Users, color: 'purple' },
                    { name: 'Calendar', icon: Calendar, color: 'emerald' },
                    { name: 'Reviews', icon: Star, color: 'yellow' },
                    { name: 'Payroll', icon: DollarSign, color: 'green' },
                    { name: 'Messages', icon: MessageCircle, color: 'pink' }
                  ].map((action) => (
                    <motion.div
                      key={action.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="h-20 w-full flex-col gap-2 bg-white/50 hover:bg-white/80 border-2 hover:border-purple-200"
                        onClick={() => handleQuickAction(action.name)}
                      >
                        <action.icon className={`h-6 w-6 text-${action.color}-500`} />
                        <span className="text-sm font-medium">{action.name}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Staff Leaderboard */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-500" />
                  Top Performers This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStaff.map((staff, index) => (
                    <motion.div
                      key={staff.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={staff.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {index === 0 && (
                            <Crown className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-600">{staff.bookings} bookings • {staff.rating}⭐</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{formatCurrency(staff.earnings)}</p>
                        <p className="text-xs text-gray-500">this week</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleInviteStaff}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Invite New Staff Member
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* FOMO Growth Engine */}
            <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Earn $100 Per Staff Invite!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100 text-sm mb-4">
                  Your referral program is live! Invite talented artists and earn rewards.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress this month</span>
                    <span>2/5 invites</span>
                  </div>
                  <Progress value={40} className="bg-purple-400/30" />
                  <p className="text-xs text-purple-200">3 more invites to unlock $500 bonus!</p>
                </div>
                <Button 
                  className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50"
                  onClick={handleInviteStaff}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Invite Link
                </Button>
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="mt-0.5">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Inspiration */}
            <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  Business Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTip}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-sm text-gray-700 mb-4"
                  >
                    {businessTips[currentTip]}
                  </motion.p>
                </AnimatePresence>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-emerald-200 hover:bg-emerald-50"
                  onClick={() => toast.success("Pro tips and insights coming to your inbox! 📈")}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Get More Insights
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon Features */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5 text-orange-500" />
                  Coming Soon - Vote Now!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'SMS Marketing', votes: 247 },
                    { name: 'POS Integration', votes: 198 },
                    { name: 'AI Analytics', votes: 156 }
                  ].map((feature) => (
                    <div key={feature.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{feature.name}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs border-orange-200 hover:bg-orange-50"
                        onClick={() => toast.success(`Voted for ${feature.name}! 🗳️`)}
                      >
                        Vote ({feature.votes})
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { name: 'Book', icon: Plus, color: 'blue' },
            { name: 'Staff', icon: Users, color: 'purple' },
            { name: 'Calendar', icon: Calendar, color: 'emerald' },
            { name: 'Messages', icon: MessageCircle, color: 'pink' }
          ].map((action) => (
            <Button
              key={action.name}
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2 px-3"
              onClick={() => handleQuickAction(action.name)}
            >
              <action.icon className={`h-5 w-5 text-${action.color}-500 mb-1`} />
              <span className="text-xs">{action.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonOwnerDashboard;
