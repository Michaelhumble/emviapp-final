
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useArtistDashboardData } from './hooks/useArtistDashboardData';
import AnalyticsWidget from './components/AnalyticsWidget';
import { WeeklyCalendar } from './calendar/WeeklyCalendar';
import ServicesManager from './services/ServicesManager';
import ReferralWidget from './components/ReferralWidget';
import EarningsSection from './components/EarningsSection';
import MainGrid from './components/MainGrid';
import { BarChart3, Calendar, Palette, DollarSign, Sparkles } from 'lucide-react';

const ArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    earningsData,
    isLoadingEarnings
  } = useArtistDashboardData(activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 pb-2">
            <CardTitle className="text-xl font-serif">Your Dashboard</CardTitle>
            <CardDescription>
              Manage your services, bookings, and earnings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs 
              defaultValue="overview" 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto bg-slate-100/50">
                <TabsTrigger value="overview" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="calendar" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="services" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <Palette className="h-4 w-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="earnings" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Earnings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6 p-0">
                <MainGrid 
                  bookings={recentBookings}
                  isLoadingBookings={isLoadingBookings}
                  stats={stats}
                />
                
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-3 text-purple-700">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Pro Tip: Complete your profile to attract 70% more clients</span>
                  </div>
                </motion.div>
                
                <ReferralWidget />
              </TabsContent>
              
              <TabsContent value="calendar" className="space-y-6 mt-6 p-0">
                <WeeklyCalendar />
              </TabsContent>
              
              <TabsContent value="services" className="space-y-6 mt-6 p-0">
                <ServicesManager />
              </TabsContent>
              
              <TabsContent value="earnings" className="space-y-6 mt-6 p-0">
                <AnalyticsWidget stats={stats} isLoading={isLoadingStats} />
                <EarningsSection 
                  earningsData={earningsData}
                  isLoading={isLoadingEarnings}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ArtistDashboard;
