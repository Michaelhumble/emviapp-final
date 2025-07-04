
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Eye
} from 'lucide-react';
import SalonProfileHeader from '@/components/salon-profile/SalonProfileHeader';
import SalonAboutSection from '@/components/salon-profile/SalonAboutSection';
import SalonServicesSection from '@/components/salon-profile/SalonServicesSection';
import SalonTeamSection from '@/components/salon-profile/SalonTeamSection';
import SalonContactSection from '@/components/salon-profile/SalonContactSection';
import SalonBookingFooter from '@/components/salon-profile/SalonBookingFooter';
import SalonBookingsOverview from '@/components/dashboard/salon/bookings/SalonBookingsOverview';
import { BookingsSummaryCard } from '@/components/dashboard/salon/components/BookingsSummaryCard';
import { EarningsCard } from '@/components/dashboard/salon/components/EarningsCard';
import SalonAnalyticsCharts from '@/components/dashboard/salon/components/SalonAnalyticsCharts';
import SalonSettings from '@/components/dashboard/salon/SalonSettings';

interface UnifiedSalonViewProps {
  salon: Job;
  loading?: boolean;
}

const UnifiedSalonView: React.FC<UnifiedSalonViewProps> = ({ salon, loading = false }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Check if current user is the salon owner
  const isOwner = user?.id === salon.user_id;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-8 max-w-7xl mx-auto px-4 py-8">
        <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-36 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-80 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen relative pb-20">
      {/* Debug Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 text-center text-sm font-medium">
        🔧 DEBUG: Unified Salon Profile + Dashboard View Active
      </div>
      
      <SalonProfileHeader salon={salon} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="dashboard" disabled={!isOwner}>
              Dashboard {!isOwner && <Badge variant="secondary" className="ml-2">Owner Only</Badge>}
            </TabsTrigger>
            <TabsTrigger value="bookings" disabled={!isOwner}>Bookings</TabsTrigger>
            <TabsTrigger value="settings" disabled={!isOwner}>Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-10">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <motion.div variants={itemVariants}>
                <SalonAboutSection salon={salon} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <SalonServicesSection 
                  salon={salon} 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <SalonTeamSection salon={salon} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <SalonContactSection salon={salon} />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {isOwner && (
            <>
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Profile Views</p>
                          <p className="text-2xl font-bold text-gray-900">1,234</p>
                        </div>
                        <Eye className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <BookingsSummaryCard />
                  <EarningsCard />
                </div>
                
                <SalonAnalyticsCharts />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                        <p className="text-sm text-gray-600">Average Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">156</p>
                        <p className="text-sm text-gray-600">Total Reviews</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">89%</p>
                        <p className="text-sm text-gray-600">Response Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">24h</p>
                        <p className="text-sm text-gray-600">Avg Response Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="space-y-6">
                <SalonBookingsOverview />
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <SalonSettings />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
      
      <SalonBookingFooter salon={salon} />
    </div>
  );
};

export default UnifiedSalonView;
