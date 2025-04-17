
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useArtistDashboardData } from './hooks/useArtistDashboardData';
import AnalyticsWidget from './components/AnalyticsWidget';
import { WeeklyCalendar } from './calendar/WeeklyCalendar';
import ServicesManager from './services/ServicesManager';
import ReferralWidget from './components/ReferralWidget';
import { EarningsSection } from './earnings/EarningsSection';
import MainGrid from './components/MainGrid';
import { BarChart3, Calendar, Palette, DollarSign, Sparkles, Clock } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AvailabilitySettings } from './availability/AvailabilitySettings';

const hasErrors = (errors: any[]) => errors.some(error => error !== null && error !== undefined);

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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <CardTitle className="text-xl font-serif">Your Dashboard</CardTitle>
                <CardDescription>
                  Manage your services, bookings, and earnings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs 
              defaultValue="overview" 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 h-auto bg-slate-100/50 w-full">
                <TabsTrigger value="overview" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Calendar</span>
                  <span className="sm:hidden">Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <Palette className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Services</span>
                  <span className="sm:hidden">Services</span>
                </TabsTrigger>
                <TabsTrigger value="earnings" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Earnings</span>
                  <span className="sm:hidden">Earnings</span>
                </TabsTrigger>
                <TabsTrigger value="availability" className="py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Availability</span>
                  <span className="sm:hidden">Hours</span>
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
                    <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0" />
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
                <EarningsSection />
              </TabsContent>
              
              <TabsContent value="availability" className="space-y-6 mt-6 p-0">
                <AvailabilitySettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ArtistDashboard;
