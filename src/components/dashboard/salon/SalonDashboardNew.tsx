import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Bell, BarChart3, Star, MessageSquare, Users, 
  Briefcase, Calendar, Camera, Settings, Zap, Plus,
  TrendingUp, Target, Award, Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';

// Import components
import SalonStatsOverview from './components/SalonStatsOverview';
import SalonReviewsManager from './components/SalonReviewsManager';
import SalonOffersManager from './components/SalonOffersManager';
import SalonTeamManager from './SalonTeamManager';
import SalonJobManager from './SalonJobManager';
import SalonBookingCalendar from './SalonBookingCalendar';
import SalonPhotoManager from './SalonPhotoManager';
import SalonSettings from './SalonSettings';

const SalonDashboardNew = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications] = useState(3);
  
  // Get salon ID from context or user profile
  const salonId = userProfile?.salon_id || userProfile?.id;
  const { stats, loading } = useSalonDashboard(salonId);

  const getSalonName = () => {
    return userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Your Salon";
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="space-y-6 px-2 sm:px-4 md:px-6 py-4 md:py-8 max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                  <Crown className="h-8 w-8" />
                  {getSalonName()} Dashboard
                </h1>
                <p className="text-purple-100">
                  Manage your salon empire with AI-powered insights and premium tools
                </p>
              </div>
              
              {/* Credit & Level Display */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-bold">{stats.totalCredits} Credits</div>
                  <div className="text-sm text-purple-100">Level 3 Salon</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 relative"
                >
                  <Bell className="h-6 w-6" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900">{stats.todayBookings}</p>
                  <p className="text-sm text-blue-700">Today's Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900">{stats.averageRating}</p>
                  <p className="text-sm text-green-700">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900">{stats.staffCount}</p>
                  <p className="text-sm text-purple-700">Team Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-900">{stats.activeOffers}</p>
                  <p className="text-sm text-amber-700">Active Offers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Premium Tab Navigation */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="w-full grid grid-cols-4 md:grid-cols-8 gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-purple-100 h-auto">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reviews" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Star className="h-4 w-4" />
                <span className="hidden md:inline">Reviews</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="offers" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Target className="h-4 w-4" />
                <span className="hidden md:inline">Offers</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="calendar" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Calendar</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="team" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Team</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="jobs" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden md:inline">Jobs</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="photos" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden md:inline">Photos</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-6">
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
              <SalonTeamManager />
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
              <SalonPhotoManager />
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
      </div>
    </div>
  );
};

export default SalonDashboardNew;