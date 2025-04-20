
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useArtistDashboardData } from './hooks/useArtistDashboardData';
import WelcomeGreeting from './components/WelcomeGreeting';
import { BarChart3, Calendar, Palette, DollarSign, Sparkles, Clock, Users } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AvailabilitySettings } from './availability/AvailabilitySettings';
import { EarningsSection } from './earnings/EarningsSection';
import MainGrid from './components/MainGrid';
import ServicesManager from './services/ServicesManager';
import ClientsTab from './components/tabs/ClientsTab';
import ReferralWidget from './components/ReferralWidget';
import { WeeklyCalendar } from './calendar/WeeklyCalendar';
import BookingsTab from './components/tabs/BookingsTab';
import ArtistReferralRewards from './ArtistReferralRewards';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      className="space-y-6 px-4 md:px-6 py-6"
    >
      <motion.div variants={itemVariants}>
        <WelcomeGreeting />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistReferralRewards />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <CardTitle className="text-xl font-serif">Your Dashboard</CardTitle>
                <CardDescription>
                  Manage your services, bookings, and earnings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs 
              defaultValue="overview" 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <ScrollArea className="w-full">
                  <TabsList className="h-auto bg-transparent w-full justify-start gap-2 p-4">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Overview</span>
                      <span className="sm:hidden">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Calendar</span>
                      <span className="sm:hidden">Calendar</span>
                    </TabsTrigger>
                    <TabsTrigger value="clients" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Clients</span>
                      <span className="sm:hidden">Clients</span>
                    </TabsTrigger>
                    <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Palette className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Services</span>
                      <span className="sm:hidden">Services</span>
                    </TabsTrigger>
                    <TabsTrigger value="earnings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Earnings</span>
                      <span className="sm:hidden">Earnings</span>
                    </TabsTrigger>
                    <TabsTrigger value="availability" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Availability</span>
                      <span className="sm:hidden">Hours</span>
                    </TabsTrigger>
                  </TabsList>
                </ScrollArea>
              </div>
              
              <div className="p-4 md:p-6">
                <TabsContent value="overview" className="mt-0 space-y-6">
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
                
                <TabsContent value="calendar" className="mt-0">
                  <WeeklyCalendar />
                </TabsContent>
                
                <TabsContent value="services" className="mt-0">
                  <ServicesManager />
                </TabsContent>
                
                <TabsContent value="earnings" className="mt-0">
                  <EarningsSection />
                </TabsContent>
                
                <TabsContent value="availability" className="mt-0">
                  <AvailabilitySettings />
                </TabsContent>
                
                <TabsContent value="clients" className="mt-0">
                  <ClientsTab />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ArtistDashboard;
