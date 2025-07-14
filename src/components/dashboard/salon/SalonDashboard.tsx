import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Camera, Users, Briefcase, Settings, Zap, TrendingUp, Crown, Star } from 'lucide-react';

// Import existing components
import SalonStatsGrid from './components/SalonStatsGrid';
import SalonBoostBanner from './components/SalonBoostBanner';
import SalonAnalyticsCharts from './components/SalonAnalyticsCharts';
import ReferralTracker from '@/components/referral/ReferralTracker';
import SalonBookingsOverview from './bookings/SalonBookingsOverview';
import SalonBookingCalendar from './SalonBookingCalendar';
import SalonPhotoManager from './SalonPhotoManager';
import SalonTeamManager from './SalonTeamManager';
import SalonJobManager from './SalonJobManager';
import SalonAIFeatures from './SalonAIFeatures';
import SalonSettings from './SalonSettings';
import SalonNotificationCenter from './SalonNotificationCenter';
import { useSalonInsights } from '@/hooks/useSalonInsights';

const SalonDashboard = () => {
  const { loading } = useSalonInsights();
  const [activeTab, setActiveTab] = useState("overview");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dataLoaded) {
        setDataLoaded(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [dataLoaded]);

  useEffect(() => {
    // Save active tab to localStorage
    localStorage.setItem('salon_dashboard_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    // Restore active tab from localStorage
    const savedTab = localStorage.getItem('salon_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleBoostClick = () => {
    toast.success("Redirecting to salon boost options...");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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
                  Premium Salon Dashboard
                </h1>
                <p className="text-purple-100">
                  Manage your salon with AI-powered insights and premium tools
                </p>
              </div>
              
              {/* Notification Bell */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 relative"
                  onClick={() => toast.success("Notifications panel coming soon!")}
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

        {/* Boost Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SalonBoostBanner onBoostClick={handleBoostClick} />
        </motion.div>
        
        {/* Premium Tab Navigation */}
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-7 gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-purple-100 h-auto">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="calendar" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Calendar</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="photos" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden md:inline">Photos</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="team" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Team</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="jobs" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden md:inline">Jobs</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="ai-labs" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 relative"
              >
                <Zap className="h-4 w-4" />
                <span className="hidden md:inline">AI Labs</span>
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                  NEW
                </Badge>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 py-3 px-3 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
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
              <SalonStatsGrid />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalonAnalyticsCharts loading={loading && !dataLoaded} />
                <ReferralTracker />
              </div>
              <SalonBookingsOverview className="rounded-xl shadow-lg" />
              
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab("photos")}
                    >
                      <Camera className="h-5 w-5" />
                      <span className="text-sm">Manage Photos</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab("team")}
                    >
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Team Hub</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab("jobs")}
                    >
                      <Briefcase className="h-5 w-5" />
                      <span className="text-sm">Post Jobs</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => setActiveTab("ai-labs")}
                    >
                      <Zap className="h-5 w-5" />
                      <span className="text-sm">AI Features</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
              <SalonBookingsOverview />
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
          
          <TabsContent value="ai-labs" className="space-y-4">
            <motion.div 
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <SalonAIFeatures />
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

export default SalonDashboard;