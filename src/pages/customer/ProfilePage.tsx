
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Edit, Mail, Phone, MapPin, Crown, Share2, Zap, Star, TrendingUp, Users, Heart, Award, Target, Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from 'sonner';
import BeautyJourneyStats from "@/components/customer/journey/BeautyJourneyStats";
import CommunityImpactCard from "@/components/customer/journey/CommunityImpactCard";
import WishlistPanel from "@/components/customer/journey/WishlistPanel";
import ShareJourneyCard from "@/components/customer/journey/ShareJourneyCard";
import FeatureSuggestionWidget from "@/components/customer/journey/FeatureSuggestionWidget";
import CustomizeProfileCard from "@/components/customer/journey/CustomizeProfileCard";
import VIPSystem from "@/components/ecosystem/VIPSystem";
import SocialShareSystem from "@/components/ecosystem/SocialShareSystem";
import CrossPlatformCTA from "@/components/ecosystem/CrossPlatformCTA";
import ProfileEditModal from "@/components/customer/ProfileEditModal";
import ShareWinModal from "@/components/customer/ShareWinModal";

const CustomerProfilePage = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(1247);
  const [level, setLevel] = useState("Level 7 Beauty Explorer");
  const [referralCount, setReferralCount] = useState(3);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showShareWin, setShowShareWin] = useState(false);
  const [recentActivities] = useState([
    { type: 'booking', action: 'Booked at Luxe Nails', time: '2 hours ago', points: 25 },
    { type: 'review', action: 'Reviewed Amazing Spa', time: '1 day ago', points: 15 },
    { type: 'referral', action: 'Friend joined via your link', time: '2 days ago', points: 50 },
    { type: 'share', action: 'Shared profile on Instagram', time: '3 days ago', points: 10 }
  ]);

  // Redirect if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

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

  const getNextMilestone = () => {
    const nextPoints = Math.ceil(totalPoints / 500) * 500;
    return nextPoints - totalPoints;
  };

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  const handleInviteFriends = () => {
    navigator.clipboard.writeText('https://emvi.app/join?ref=EMVI879e69');
    triggerCelebration();
    toast.success('Referral link copied! Share and earn rewards! 🎉');
  };

  return (
    <Layout>
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
          {/* Personalized Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              {getPersonalizedWelcome()}
            </h1>
            <p className="text-purple-200 text-lg">Your personalized luxury beauty experience awaits</p>
            
            {/* VIP Status Badge */}
            <motion.div 
              className="flex justify-center mt-4 gap-3"
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
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Current Streak */}
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 text-white overflow-hidden relative">
              <CardContent className="p-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={triggerCelebration}
                >
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{currentStreak}</div>
                  <div className="text-sm opacity-90">Day Streak</div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Total Points */}
            <Card className="bg-gradient-to-br from-purple-500 to-blue-500 border-0 text-white overflow-hidden relative">
              <CardContent className="p-6 text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <Star className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
                  <div className="text-sm opacity-90">EmviPoints</div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Referrals */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 text-white overflow-hidden relative">
              <CardContent className="p-6 text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{referralCount}</div>
                  <div className="text-sm opacity-90">Friends Joined</div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Next Milestone */}
            <Card className="bg-gradient-to-br from-pink-500 to-rose-500 border-0 text-white overflow-hidden relative">
              <CardContent className="p-6 text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <Target className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{getNextMilestone()}</div>
                  <div className="text-sm opacity-90">To Next Level</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Viral Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card with Social Actions */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader className="text-center pb-2">
                  <motion.div 
                    className="relative w-24 h-24 mx-auto mb-4 cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    onClick={() => setShowProfileEdit(true)}
                  >
                    <Avatar className="w-24 h-24 border-4 border-white/20">
                      <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-2xl font-bold">
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
                  <CardTitle className="text-xl text-white">{userProfile?.full_name || 'Beauty Lover'}</CardTitle>
                  <p className="text-purple-200">Premium Beauty Member</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                      onClick={() => setShowProfileEdit(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <SocialShareSystem 
                      content={{
                        type: 'profile',
                        title: userProfile?.full_name || 'Beauty Lover',
                        description: 'Join me on EmviApp - the ultimate beauty community!',
                        imageUrl: userProfile?.avatar_url,
                        url: window.location.href
                      }}
                    />
                  </div>

                  {/* Progress to Next Level */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level 8</span>
                      <span>{Math.round((totalPoints % 500) / 5)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalPoints % 500) / 5}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Viral Referral Center */}
              <Card className="bg-gradient-to-br from-amber-400 to-orange-500 border-0 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Gift className="h-6 w-6 mr-2" />
                    Viral Rewards Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90 mb-4">
                    Share EmviApp and unlock exclusive rewards! Earn 50 points per friend.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold"
                      onClick={handleInviteFriends}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share My Link
                    </Button>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{referralCount}</div>
                      <div className="text-xs opacity-75">Friends Joined</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* VIP Upgrade */}
              <VIPSystem />
            </div>

            {/* Right Column - Activity Feed & Navigation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity Feed */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Your Beauty Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
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
                              {activity.type === 'booking' && <Heart className="h-4 w-4" />}
                              {activity.type === 'review' && <Star className="h-4 w-4" />}
                              {activity.type === 'referral' && <Users className="h-4 w-4" />}
                              {activity.type === 'share' && <Share2 className="h-4 w-4" />}
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
                </CardContent>
              </Card>

              {/* Cross-Platform Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card 
                    className="bg-gradient-to-br from-blue-500 to-purple-500 border-0 text-white cursor-pointer"
                    onClick={() => handleNavigateTo('/salons')}
                  >
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Discover Salons</div>
                      <div className="text-xs opacity-75">Find your perfect salon</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card 
                    className="bg-gradient-to-br from-green-500 to-teal-500 border-0 text-white cursor-pointer"
                    onClick={() => handleNavigateTo('/artists')}
                  >
                    <CardContent className="p-6 text-center">
                      <Star className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Top Artists</div>
                      <div className="text-xs opacity-75">Book with the best</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card 
                    className="bg-gradient-to-br from-pink-500 to-rose-500 border-0 text-white cursor-pointer"
                    onClick={() => handleNavigateTo('/jobs')}
                  >
                    <CardContent className="p-6 text-center">
                      <Award className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">Explore Jobs</div>
                      <div className="text-xs opacity-75">Advance your career</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Journey Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BeautyJourneyStats />
                <CommunityImpactCard />
              </div>
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

          {/* Modals */}
          <ProfileEditModal 
            isOpen={showProfileEdit} 
            onClose={() => setShowProfileEdit(false)} 
          />
          <ShareWinModal 
            isOpen={showShareWin} 
            onClose={() => setShowShareWin(false)} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfilePage;
