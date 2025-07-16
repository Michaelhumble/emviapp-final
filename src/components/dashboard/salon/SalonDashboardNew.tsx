import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Bell, BarChart3, Star, MessageSquare, Users, 
  Briefcase, Calendar, Camera, Settings, Zap, Plus,
  TrendingUp, Target, Award, Sparkles, User
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { useSalonOnboarding } from '@/hooks/useSalonOnboarding';
import Layout from '@/components/layout/Layout';

// Import components
import SalonStatsOverview from './components/SalonStatsOverview';
import SalonReviewsManager from './components/SalonReviewsManager';
import SalonOffersManager from './components/SalonOffersManager';
import SalonTeamManagement from './team/SalonTeamManagement';
import SalonJobManager from './SalonJobManager';
import SalonBookingCalendar from './SalonBookingCalendar';
import SalonPhotoManager from './SalonPhotoManager';
import SalonSettings from './SalonSettings';
import SalonOnboardingWizard from './onboarding/SalonOnboardingWizard';

// Import new modals
import SalonProfileModal from './modals/SalonProfileModal';
import SalonAnalyticsModal from './modals/SalonAnalyticsModal';
import SalonPhotoGalleryModal from './modals/SalonPhotoGalleryModal';
import SalonTeamModal from './modals/SalonTeamModal';

const SalonDashboardNew = () => {
  const { userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications] = useState(3);
  
  // Modal states
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [photoGalleryModalOpen, setPhotoGalleryModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  
  // Get salon ID from context or user profile
  const salonId = currentSalon?.id || userProfile?.id;
  const { stats, loading, reviews, offers, todayBookings } = useSalonDashboard(salonId);
  const { shouldShowOnboarding, markOnboardingComplete } = useSalonOnboarding();

  const getSalonName = () => {
    return currentSalon?.salon_name ||
           userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Your Salon";
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-8 max-w-7xl mx-auto">
        
        {/* Mobile-Optimized Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-2xl border border-white/10">
            {/* Animated Background - Optimized for mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm animate-pulse"></div>
            
            {/* Mobile-Optimized Floating Orbs */}
            <div className="absolute -right-10 sm:-right-20 -top-10 sm:-top-20 w-32 sm:w-60 h-32 sm:h-60 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -left-12 sm:-left-24 -bottom-12 sm:-bottom-24 w-36 sm:w-72 h-36 sm:h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
                >
                  <div className="relative">
                    <Crown className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-400 drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-2xl truncate">
                      {getSalonName()}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-2 py-1 text-xs sm:text-sm">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 text-xs sm:text-sm">
                        Level 3 Elite
                      </Badge>
                    </div>
                  </div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-purple-100 leading-relaxed"
                >
                  Transform your business with AI-powered insights
                </motion.p>
              </div>
              
              {/* Mobile-Optimized Stats & Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                {/* Credit Display - Mobile Optimized */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center sm:text-right"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {stats.totalCredits}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-200 font-medium">Premium Credits</div>
                  <div className="text-xs text-purple-300 mt-1">Next reward: 1,000 XP</div>
                </motion.div>
                
                {/* Mobile-Optimized Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-2 sm:gap-3"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12"
                    onClick={() => setProfileModalOpen(true)}
                  >
                    <User className="h-4 w-4 sm:h-6 sm:w-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 relative"
                  >
                    <Bell className="h-4 w-4 sm:h-6 sm:w-6" />
                    {notifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                      >
                        {notifications}
                      </motion.div>
                    )}
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-3 sm:px-6 py-2 sm:py-3 rounded-xl shadow-2xl border-2 border-yellow-300/50 text-sm sm:text-base h-10 sm:h-auto"
                  >
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Upgrade </span>Pro
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile-Optimized Premium Stats Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-3 sm:p-4 md:p-6 relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-200" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stats.todayBookings}</p>
                  <p className="text-blue-100 text-xs sm:text-sm">Today's Bookings</p>
                  <p className="text-xs text-blue-200 mt-1 hidden sm:block">+12% vs yesterday</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-3 sm:p-4 md:p-6 relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white fill-current" />
                  </div>
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-200" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stats.averageRating}</p>
                  <p className="text-green-100 text-xs sm:text-sm">Avg Rating</p>
                  <p className="text-xs text-green-200 mt-1 hidden sm:block">Top 5% salons</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-3 sm:p-4 md:p-6 relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-200" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stats.staffCount}</p>
                  <p className="text-purple-100 text-xs sm:text-sm">Team Members</p>
                  <p className="text-xs text-purple-200 mt-1 hidden sm:block">Elite team</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-3 sm:p-4 md:p-6 relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-amber-200" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stats.activeOffers}</p>
                  <p className="text-amber-100 text-xs sm:text-sm">Active Offers</p>
                  <p className="text-xs text-amber-200 mt-1 hidden sm:block">Driving growth</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Mobile-Optimized Premium Tab Navigation */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4 sm:space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Mobile: Horizontal Scrollable Tabs */}
            <div className="block md:hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList className="flex w-max min-w-full gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-purple-100 h-auto">
                  <TabsTrigger 
                    value="overview" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="reviews" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Star className="h-4 w-4" />
                    Reviews
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="offers" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Target className="h-4 w-4" />
                    Offers
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="calendar" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="team" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Users className="h-4 w-4" />
                    Team
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="photos" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Camera className="h-4 w-4" />
                    Photos
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="analytics" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="settings" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:block">
              <TabsList className="w-full grid grid-cols-4 lg:grid-cols-8 gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-purple-100 h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden lg:inline">Overview</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="reviews" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Star className="h-4 w-4" />
                  <span className="hidden lg:inline">Reviews</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="offers" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Target className="h-4 w-4" />
                  <span className="hidden lg:inline">Offers</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="calendar" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden lg:inline">Calendar</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="team" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden lg:inline">Team</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="photos" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Camera className="h-4 w-4" />
                  <span className="hidden lg:inline">Photos</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden lg:inline">Analytics</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden lg:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </motion.div>
          
          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <SalonStatsOverview 
                stats={stats} 
                loading={loading}
                salonId={salonId}
                todayBookings={todayBookings}
                reviews={reviews}
                offers={offers}
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonReviewsManager salonId={salonId} />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="offers" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonOffersManager salonId={salonId} />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonBookingCalendar />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonTeamManagement />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonJobManager />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50">
                <CardContent className="p-8 text-center">
                  <Camera className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-teal-900 mb-2">Photo Gallery Manager</h3>
                  <p className="text-teal-700 mb-6">
                    Upload, organize, and showcase your best work to attract more customers.
                  </p>
                  <Button 
                    onClick={() => setPhotoGalleryModalOpen(true)}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Manage Gallery
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-16 w-16 text-violet-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-violet-900 mb-2">Advanced Analytics</h3>
                  <p className="text-violet-700 mb-6">
                    Deep insights into your salon's performance, growth trends, and team analytics.
                  </p>
                  <Button 
                    onClick={() => setAnalyticsModalOpen(true)}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonSettings />
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Onboarding Wizard */}
        <SalonOnboardingWizard
          isOpen={shouldShowOnboarding}
          onClose={() => markOnboardingComplete()}
          onComplete={() => markOnboardingComplete()}
        />

        {/* Modal Components */}
        <SalonProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />

        <SalonAnalyticsModal
          isOpen={analyticsModalOpen}
          onClose={() => setAnalyticsModalOpen(false)}
          salonId={salonId}
        />

        <SalonPhotoGalleryModal
          isOpen={photoGalleryModalOpen}
          onClose={() => setPhotoGalleryModalOpen(false)}
          salonId={salonId}
        />

        <SalonTeamModal
          isOpen={teamModalOpen}
          onClose={() => setTeamModalOpen(false)}
          salonId={salonId}
        />
        </div>
      </div>
    </Layout>
  );
};

export default SalonDashboardNew;