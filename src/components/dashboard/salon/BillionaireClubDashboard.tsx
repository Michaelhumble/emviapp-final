import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Crown, Sparkles, TrendingUp, Calendar, Users, Star, 
  Zap, Trophy, Target, Clock, DollarSign, Flame as Fire, 
  ArrowUp, BookOpen, Camera, MessageSquare, Settings,
  Award, Gem, Rocket, Zap as Lightning, Heart, Eye, Timer,
  Building2, ChevronRight, Plus, Bell, Gift, Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

// Real-time live activity components
const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'booking', message: '2 new bookings in the last hour!', icon: Calendar, color: 'text-green-500', time: '2m ago' },
    { id: 2, type: 'review', message: 'New 5-star review from Sarah M.', icon: Star, color: 'text-yellow-500', time: '5m ago' },
    { id: 3, type: 'earning', message: '$1,240 earned today', icon: DollarSign, color: 'text-emerald-500', time: '8m ago' },
    { id: 4, type: 'artist', message: 'Maya completed training milestone', icon: Trophy, color: 'text-purple-500', time: '12m ago' },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['booking', 'review', 'earning', 'artist'][Math.floor(Math.random() * 4)],
        message: [
          'New booking from premium client!',
          'Another 5-star review received!',
          '$320 payment processed',
          'Staff achievement unlocked!'
        ][Math.floor(Math.random() * 4)],
        icon: [Calendar, Star, DollarSign, Trophy][Math.floor(Math.random() * 4)],
        color: ['text-green-500', 'text-yellow-500', 'text-emerald-500', 'text-purple-500'][Math.floor(Math.random() * 4)],
        time: 'now'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-0 text-white overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fire className="h-5 w-5 text-orange-400 animate-pulse" />
          Live Activity
          <Badge className="bg-red-500 text-white animate-pulse ml-auto">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90 truncate">{activity.message}</p>
                <p className="text-xs text-white/60">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// Earnings showcase with real-time updates
const EarningsShowcase = ({ stats }: { stats: any }) => {
  const [todayEarnings, setTodayEarnings] = useState(1240);
  const [weeklyEarnings, setWeeklyEarnings] = useState(8960);
  const [monthlyEarnings, setMonthlyEarnings] = useState(32450);

  useEffect(() => {
    // Simulate real-time earnings updates
    const interval = setInterval(() => {
      setTodayEarnings(prev => prev + Math.floor(Math.random() * 100));
      if (Math.random() > 0.7) {
        setWeeklyEarnings(prev => prev + Math.floor(Math.random() * 200));
        setMonthlyEarnings(prev => prev + Math.floor(Math.random() * 300));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const triggerEarningsCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2']
    });
    toast.success('🎉 Amazing earnings! Keep up the fantastic work!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Today's Earnings */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={triggerEarningsCelebration}
        className="cursor-pointer"
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <ArrowUp className="h-4 w-4 text-green-200" />
            </div>
            <div className="text-3xl font-bold mb-1">${todayEarnings.toLocaleString()}</div>
            <div className="text-emerald-100 text-sm">Today's Earnings</div>
            <div className="text-xs text-emerald-200 mt-1">+12% vs yesterday</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Earnings */}
      <motion.div whileHover={{ scale: 1.02, y: -2 }}>
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8" />
              <Fire className="h-4 w-4 text-orange-300" />
            </div>
            <div className="text-3xl font-bold mb-1">${weeklyEarnings.toLocaleString()}</div>
            <div className="text-blue-100 text-sm">This Week</div>
            <div className="text-xs text-blue-200 mt-1">Best week this month!</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Earnings */}
      <motion.div whileHover={{ scale: 1.02, y: -2 }}>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <Crown className="h-8 w-8" />
              <Trophy className="h-4 w-4 text-yellow-300" />
            </div>
            <div className="text-3xl font-bold mb-1">${monthlyEarnings.toLocaleString()}</div>
            <div className="text-purple-100 text-sm">This Month</div>
            <div className="text-xs text-purple-200 mt-1">Record-breaking!</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// VIP Achievement System
const VIPAchievements = () => {
  const [achievements] = useState([
    { id: 1, title: 'Revenue Rockstar', description: '$50K+ this month', icon: Crown, earned: true, rarity: 'legendary' },
    { id: 2, title: '5-Star Specialist', description: '50+ five-star reviews', icon: Star, earned: true, rarity: 'epic' },
    { id: 3, title: 'Team Builder', description: '10+ staff members', icon: Users, earned: false, rarity: 'rare', progress: 70 },
    { id: 4, title: 'Booking Beast', description: '1000+ bookings', icon: Calendar, earned: false, rarity: 'rare', progress: 85 },
  ]);

  const rarityColors = {
    legendary: 'from-yellow-400 to-orange-500',
    epic: 'from-purple-400 to-pink-500',
    rare: 'from-blue-400 to-cyan-500',
    common: 'from-gray-400 to-gray-500'
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-purple-900 border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          VIP Achievements
          <Badge className="bg-yellow-500 text-black ml-auto">Elite Status</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} bg-opacity-20 border border-white/20`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}>
                <achievement.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  {achievement.earned && <Gem className="h-4 w-4 text-yellow-400" />}
                </div>
                <p className="text-sm text-white/70">{achievement.description}</p>
                {!achievement.earned && achievement.progress && (
                  <div className="mt-2">
                    <Progress value={achievement.progress} className="h-2" />
                    <p className="text-xs text-white/60 mt-1">{achievement.progress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

// Sticky Action Bar
const StickyActionBar = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-4 md:w-80"
    >
      <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 border-0 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Book
            </Button>
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4 mr-1" />
              Photo
            </Button>
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Gift className="h-4 w-4 mr-1" />
              Offer
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const BillionaireClubDashboard = () => {
  const { userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id || userProfile?.id;
  const { stats, loading, reviews, offers, todayBookings } = useSalonDashboard(salonId);

  const getSalonName = () => {
    return currentSalon?.salon_name ||
           userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Your Elite Salon";
  };

  const [streakDays] = useState(12);
  const [vipLevel] = useState(3);
  const [todayGoal] = useState(85);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Elite Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-gradient-to-r from-yellow-400 to-orange-500">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                      {getSalonName().charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {getSalonName()}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Billionaire Club
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Level {vipLevel} Elite
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Fire className="h-3 w-3 mr-1" />
                      {streakDays} Day Streak
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.totalCredits}</div>
                  <div className="text-sm text-white/70">Elite Credits</div>
                </div>
                <Separator orientation="vertical" className="h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{todayGoal}%</div>
                  <div className="text-sm text-white/70">Today's Goal</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earnings Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <EarningsShowcase stats={stats} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Activity Feed */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <LiveActivityFeed />
              </motion.div>

              {/* Today's Performance */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-purple-800 border-0 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-400" />
                      Today's Elite Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.todayBookings}</div>
                        <div className="text-sm text-white/70">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{stats.averageRating}</div>
                        <div className="text-sm text-white/70">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{stats.staffCount}</div>
                        <div className="text-sm text-white/70">Team</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{stats.activeOffers}</div>
                        <div className="text-sm text-white/70">Offers</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white/70">Daily Goal Progress</span>
                        <span className="text-sm text-green-400">{todayGoal}%</span>
                      </div>
                      <Progress value={todayGoal} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* VIP Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <VIPAchievements />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Elite Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Create VIP Booking
                    </Button>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Hire Elite Artist
                    </Button>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Showcase Gallery
                    </Button>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Gift className="h-4 w-4 mr-2" />
                      Premium Promotion
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Recent Reviews Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  5-Star Spotlight
                  <Badge className="bg-white/20 text-white ml-auto">Hot 🔥</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.slice(0, 3).map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="mb-4 last:mb-0 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.customer?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                          {review.customer?.full_name?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.customer?.full_name || 'Anonymous'}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-300 fill-current' : 'text-white/30'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-white/90">{review.review_text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sticky Action Bar */}
        <StickyActionBar />
      </div>
    </Layout>
  );
};

export default BillionaireClubDashboard;