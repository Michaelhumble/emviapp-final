
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Crown, Sparkles, Zap, Star, TrendingUp, Users, Heart, Award, Target, Gift, 
  Share2, Calendar, MapPin, Scissors, Store, Briefcase, ArrowRight, Plus,
  Edit, User, Trophy, CheckCircle, Coins, BarChart3, Gamepad2, Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerViralReferralCenter from './CustomerViralReferralCenter';
import VIPSystem from '@/components/ecosystem/VIPSystem';
import SocialShareSystem from '@/components/ecosystem/SocialShareSystem';
import ProfileEditModal from '@/components/customer/ProfileEditModal';
import ShareWinModal from '@/components/customer/ShareWinModal';
import CreditsProgress from '@/components/customer/CreditsProgress';
import ReviewsSection from '@/components/customer/ReviewsSection';
import WriteReviewButton from '@/components/customer/WriteReviewButton';
import ConversionAnalytics from '@/components/analytics/ConversionAnalytics';
import LiveLeaderboard from '@/components/social/LiveLeaderboard';
import SocialChallenges from '@/components/social/SocialChallenges';
import AdvancedStreakSystem from '@/components/loyalty/AdvancedStreakSystem';
import OptimizedBookingFlow from '@/components/booking/OptimizedBookingFlow';
import AIProviderDiscovery from '@/components/discovery/AIProviderDiscovery';
import CustomerStoriesHub from '@/components/stories/CustomerStoriesHub';
import SocialMediaIntegration from '@/components/social/SocialMediaIntegration';
import SmartReminderEngine from '@/components/reminders/SmartReminderEngine';
import MapboxProviderMap from '@/components/map/MapboxProviderMap';
import PushNotificationCenter from '@/components/notifications/PushNotificationCenter';
import DashboardAnalytics from '@/components/analytics/DashboardAnalytics';
import NetworkSeeding from '@/components/network/NetworkSeeding';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import { useCustomerBookingHistory } from '@/hooks/useCustomerBookingHistory';
import { creditsManager, CREDIT_REWARDS } from '@/lib/credits';

const CustomerDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { stats, activities, bookings, favorites, loading } = useCustomerDashboard();
  const { bookings: completedBookings, refetch: refetchBookings } = useCustomerBookingHistory();
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showShareWin, setShowShareWin] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [userCredits, setUserCredits] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'challenges' | 'booking' | 'discover' | 'stories' | 'social' | 'map' | 'network' | 'monitor'>('overview');
  const [showMapView, setShowMapView] = useState(false);

  // Load user credits
  useEffect(() => {
    if (user?.id) {
      loadCredits();
    }
  }, [user?.id]);

  const loadCredits = async () => {
    if (!user?.id) return;
    const credits = await creditsManager.getUserCredits(user.id);
    setUserCredits(credits);
  };

  const handleCreditsUpdate = () => {
    loadCredits();
  };

  // Check for new achievements and trigger celebrations
  React.useEffect(() => {
    const earnedAchievements = stats.achievements.filter(a => a.earned);
    const previousEarned = JSON.parse(localStorage.getItem('earnedAchievements') || '[]');
    const newlyEarned = earnedAchievements.filter(a => !previousEarned.includes(a.id));
    
    if (newlyEarned.length > 0) {
      setNewAchievements(newlyEarned.map(a => a.id));
      triggerAchievementCelebration();
      localStorage.setItem('earnedAchievements', JSON.stringify(earnedAchievements.map(a => a.id)));
    }
  }, [stats.achievements]);

  const triggerAchievementCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2', '#00FF7F']
    });
    toast.success('🏆 Achievement Unlocked! Amazing progress!');
  };

  const triggerCelebration = () => {
    setCelebrationActive(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981']
    });
    setTimeout(() => setCelebrationActive(false), 3000);
  };

  const getPersonalizedWelcome = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = userProfile?.full_name || 'Beauty Lover';
    return `${greeting}, ${name}! ✨`;
  };

  const handleInviteFriends = () => {
    const referralCode = userProfile?.referral_code || 'EMVI879e69';
    navigator.clipboard.writeText(`https://emvi.app/join?ref=${referralCode}`);
    triggerCelebration();
    toast.success('Referral link copied! Share and earn rewards! 🎉');
  };

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  const handleProgressClick = () => {
    const progress = Math.round(stats.profileCompletion);
    toast.info(`Profile ${progress}% complete! ${progress < 100 ? 'Complete your profile to unlock more features! 🚀' : 'Profile complete! You\'re amazing! ✨'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
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
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Personalized Welcome Header with Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Profile Avatar with Edit Button - Enhanced */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileEdit(true)}
              >
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-white/20 transition-all duration-300 group-hover:border-white/40">
                    <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl font-bold">
                      {userProfile?.full_name?.charAt(0) || 'B'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Profile completion ring */}
                  <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${stats.profileCompletion}, 100`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Edit className="h-3 w-3 text-white" />
                </motion.div>
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Edit Profile
                </div>
              </motion.div>
              
              <div className="text-left">
                <h1 className="text-3xl font-bold text-white">
                  {getPersonalizedWelcome()}
                </h1>
                <p className="text-purple-200">Your personalized luxury beauty experience awaits</p>
              </div>
            </div>
          </div>
          
          {/* VIP Status & Level */}
          <motion.div 
            className="flex justify-center gap-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
              <Crown className="h-4 w-4 mr-2" />
              VIP Diamond Member
            </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 mr-2" />
                Level {Math.floor(stats.totalPoints / 500) + 1} Beauty Explorer
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs">
                {stats.profileCompletion}% Complete
              </Badge>
          </motion.div>
        </motion.div>

        {/* Phase 2 Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 flex space-x-2">
            {[
              { key: 'overview', label: 'Overview', icon: Star },
              { key: 'discover', label: 'Discover', icon: Search },
              { key: 'map', label: 'Map', icon: MapPin },
              { key: 'stories', label: 'Stories', icon: Heart },
              { key: 'social', label: 'Social', icon: Share2 },
              { key: 'network', label: 'Network', icon: Users },
              { key: 'monitor', label: 'Monitor', icon: BarChart3 },
              { key: 'challenges', label: 'Challenges', icon: Gamepad2 },
              { key: 'booking', label: 'Book Now', icon: Calendar }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeTab === key ? 'default' : 'ghost'}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`flex items-center space-x-2 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Content Based on Active Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Viral Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Streak */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 text-white overflow-hidden relative cursor-pointer"
                  onClick={triggerCelebration}>
              <CardContent className="p-4 text-center">
                <Zap className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <div className="text-xs opacity-90">Day Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Points */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="bg-gradient-to-br from-purple-500 to-blue-500 border-0 text-white overflow-hidden relative cursor-pointer"
                  onClick={handleProgressClick}>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</div>
                <div className="text-xs opacity-90">EmviPoints</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referrals */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 text-white overflow-hidden relative cursor-pointer"
                  onClick={handleInviteFriends}>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.referralCount}</div>
                <div className="text-xs opacity-90">Friends</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bookings */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="bg-gradient-to-br from-pink-500 to-rose-500 border-0 text-white overflow-hidden relative cursor-pointer"
                  onClick={() => handleNavigateTo('/bookings')}>
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalBookings}</div>
                <div className="text-xs opacity-90">Bookings</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Viral Actions */}
          <div className="space-y-6">
            {/* Viral Referral Center - ALWAYS VISIBLE */}
            <Card className="bg-gradient-to-br from-amber-400 to-orange-500 border-0 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Gift className="h-6 w-6 mr-2" />
                  Share & Unlock Exclusive Rewards! 🔥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-4">
                  Share EmviApp with friends and unlock exclusive credits, VIP bonuses, and special rewards! No limits, pure viral rewards. 💰
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold"
                    onClick={handleInviteFriends}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share My Link
                  </Button>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold">{stats.referralCount}</div>
                        <div className="text-xs opacity-75">Friends</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{stats.referralCount * 100}</div>
                        <div className="text-xs opacity-75">Credits</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">∞</div>
                        <div className="text-xs opacity-75">Potential</div>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Credits Progress - PROMINENT */}
            {user?.id && (
              <CreditsProgress 
                userId={user.id}
                credits={userCredits}
                onCreditsUpdate={handleCreditsUpdate}
              />
            )}

            {/* Personal Progress */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="h-5 w-5 mr-2" />
                  Your Beauty Journey Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Completion</span>
                      <span>{stats.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 cursor-pointer" onClick={handleProgressClick}>
                      <motion.div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.profileCompletion}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold">{stats.completedBookings}</div>
                      <div className="text-xs opacity-75">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold">{stats.achievements.filter(a => a.earned).length}</div>
                      <div className="text-xs opacity-75">Achievements</div>
                    </div>
                  </div>
                  
                  {/* Achievements Section */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                      Recent Achievements
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {stats.achievements.filter(a => a.earned).slice(0, 3).map(achievement => (
                        <motion.div
                          key={achievement.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center p-2 bg-white/5 rounded-lg"
                        >
                          <span className="text-lg mr-2">{achievement.icon}</span>
                          <div className="flex-1">
                            <div className="text-xs font-medium">{achievement.name}</div>
                            <div className="text-xs opacity-75">{achievement.description}</div>
                          </div>
                          {newAchievements.includes(achievement.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-green-400 rounded-full"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Activity Feed */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <AnimatePresence>
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-sm">
                            {activity.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{activity.title}</div>
                            <div className="text-xs opacity-75">{activity.description}</div>
                            <div className="text-xs opacity-60">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {activity.points && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            +{activity.points}
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                    {activities.length === 0 && (
                      <div className="text-center py-8 text-white/60">
                        <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Start your beauty journey to see activity here!</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  onClick={() => setShowShareWin(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Latest Win
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Cross-Platform CTAs */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Discover More
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Salon Discovery */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 h-auto p-4"
                    onClick={() => handleNavigateTo('/salons')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Store className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">Discover Salons</div>
                          <div className="text-xs opacity-75">Find your perfect salon</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </motion.div>

                {/* Artist Discovery */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 h-auto p-4"
                    onClick={() => handleNavigateTo('/artists')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Scissors className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">Top Artists</div>
                          <div className="text-xs opacity-75">Book with the best</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </motion.div>

                {/* Job Exploration */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 h-auto p-4"
                    onClick={() => handleNavigateTo('/booking-services')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">Browse Services</div>
                          <div className="text-xs opacity-75">Find your perfect service</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </motion.div>

                {/* Quick Booking */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 h-auto p-4"
                    onClick={() => handleNavigateTo('/booking')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">Book Now</div>
                          <div className="text-xs opacity-75">Quick appointment</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                 </motion.div>
               </CardContent>
             </Card>

             {/* Reviews Section */}
             <ReviewsSection maxReviews={3} />

             {/* Recent Completed Bookings - Review Opportunities */}
             {completedBookings.filter(booking => booking.status === 'completed').length > 0 && (
               <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                 <CardHeader>
                   <CardTitle className="flex items-center text-white">
                     <Star className="h-5 w-5 mr-2 text-yellow-400" />
                     Write Reviews
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-white/70 mb-4">
                     Share your experience and earn 20 EmviPoints per review!
                   </p>
                   <div className="space-y-3 max-h-48 overflow-y-auto">
                     {completedBookings
                       .filter(booking => booking.status === 'completed')
                       .slice(0, 3)
                       .map((booking) => (
                         <motion.div
                           key={booking.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                         >
                           <div className="flex-1">
                             <p className="text-sm font-medium text-white">
                               {booking.artist?.full_name || 'Artist'}
                             </p>
                             <p className="text-xs text-white/60">
                               {booking.service?.title || 'Service'} • {new Date(booking.date_requested || '').toLocaleDateString()}
                             </p>
                           </div>
                           <WriteReviewButton
                             bookingId={booking.id}
                             targetId={booking.artist?.id || ''}
                             targetType="artist"
                             targetName={booking.artist?.full_name || 'Artist'}
                             variant="outline"
                             size="sm"
                             onReviewSubmitted={() => {
                               handleCreditsUpdate();
                               refetchBookings();
                             }}
                             className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                           />
                         </motion.div>
                       ))}
                   </div>
                 </CardContent>
               </Card>
              )}
            </div>
          </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConversionAnalytics />
                <AdvancedStreakSystem />
              </div>
              <LiveLeaderboard />
            </motion.div>
          )}

          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SocialChallenges />
                <LiveLeaderboard type="friends" />
              </div>
            </motion.div>
          )}

          {activeTab === 'discover' && (
            <motion.div key="discover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <AIProviderDiscovery onViewMap={() => setActiveTab('map')} />
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div key="map" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MapboxProviderMap onClose={() => setActiveTab('discover')} />
            </motion.div>
          )}

          {activeTab === 'stories' && (
            <motion.div key="stories" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CustomerStoriesHub />
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div key="social" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="space-y-6">
                <SocialMediaIntegration />
                <SmartReminderEngine />
                <PushNotificationCenter />
              </div>
            </motion.div>
          )}

          {activeTab === 'network' && (
            <motion.div key="network" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <NetworkSeeding />
            </motion.div>
          )}

          {activeTab === 'monitor' && (
            <motion.div key="monitor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DashboardAnalytics />
            </motion.div>
          )}

          {activeTab === 'booking' && (
            <motion.div key="booking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <OptimizedBookingFlow />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Animation */}
        <AnimatePresence>
          {celebrationActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Profile Edit Modal */}
        <ProfileEditModal 
          isOpen={showProfileEdit} 
          onClose={() => setShowProfileEdit(false)} 
        />
        
        {/* Share Win Modal */}
        <ShareWinModal 
          isOpen={showShareWin} 
          onClose={() => setShowShareWin(false)} 
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;
