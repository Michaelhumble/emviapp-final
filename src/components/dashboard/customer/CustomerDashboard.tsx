
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
  Edit, User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerViralReferralCenter from './CustomerViralReferralCenter';
import VIPSystem from '@/components/ecosystem/VIPSystem';
import SocialShareSystem from '@/components/ecosystem/SocialShareSystem';
import ProfileEditModal from '@/components/customer/ProfileEditModal';
import ShareWinModal from '@/components/customer/ShareWinModal';

const CustomerDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(1247);
  const [referralCount, setReferralCount] = useState(3);
  const [completedBookings, setCompletedBookings] = useState(12);
  const [reviewsGiven, setReviewsGiven] = useState(8);
  const [level, setLevel] = useState("Level 7 Beauty Explorer");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showShareWin, setShowShareWin] = useState(false);

  const [recentActivities] = useState([
    { type: 'booking', action: 'Booked at Luxe Nails', time: '2 hours ago', points: 25, icon: Heart },
    { type: 'review', action: 'Reviewed Amazing Spa', time: '1 day ago', points: 15, icon: Star },
    { type: 'referral', action: 'Friend joined via your link', time: '2 days ago', points: 50, icon: Users },
    { type: 'share', action: 'Shared to Instagram', time: '3 days ago', points: 10, icon: Share2 }
  ]);

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
    navigator.clipboard.writeText('https://emvi.app/join?ref=EMVI879e69');
    triggerCelebration();
    toast.success('Referral link copied! Share and earn rewards! 🎉');
  };

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  const handleProgressClick = () => {
    toast.info(`You're ${Math.round((totalPoints % 500) / 5)}% to your next level! Keep going! 🚀`);
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
          {/* Profile Avatar with Edit Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowProfileEdit(true)}
              >
                <Avatar className="h-16 w-16 border-4 border-white/20">
                  <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl font-bold">
                    {userProfile?.full_name?.charAt(0) || 'B'}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <Edit className="h-3 w-3 text-white" />
                </motion.div>
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
              {level}
            </Badge>
          </motion.div>
        </motion.div>

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
                <div className="text-2xl font-bold">{currentStreak}</div>
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
                <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
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
                <div className="text-2xl font-bold">{referralCount}</div>
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
                <div className="text-2xl font-bold">{completedBookings}</div>
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
                      <div className="text-lg font-bold">{referralCount}</div>
                      <div className="text-xs opacity-75">Friends</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{referralCount * 50}</div>
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

            {/* VIP Upgrade - PROMINENT */}
            <VIPSystem />

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
                      <span>Level Progress</span>
                      <span>{Math.round((totalPoints % 500) / 5)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 cursor-pointer" onClick={handleProgressClick}>
                      <motion.div 
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalPoints % 500) / 5}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold">{completedBookings}</div>
                      <div className="text-xs opacity-75">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold">{reviewsGiven}</div>
                      <div className="text-xs opacity-75">Reviews</div>
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
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{activity.action}</div>
                            <div className="text-xs opacity-75">{activity.time}</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          +{activity.points}
                        </Badge>
                      </motion.div>
                    ))}
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
                    onClick={() => handleNavigateTo('/jobs')}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-semibold">Explore Jobs</div>
                          <div className="text-xs opacity-75">Advance your career</div>
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
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default CustomerDashboard;
