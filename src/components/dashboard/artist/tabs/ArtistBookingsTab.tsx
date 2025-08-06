import React from 'react';
import { motion } from 'framer-motion';
import ArtistBookingsPanel from '../ArtistBookingsPanel';
import BookingStatsCards from '../bookings/BookingStatsCards';
import { BookingAnalytics } from '../bookings/BookingAnalytics';
import { EnhancedBookingCalendar } from '../bookings/EnhancedBookingCalendar';
import { SmartNotificationCenter } from '../notifications/SmartNotificationCenter';
import { ClientManagementSystem } from '../clients/ClientManagementSystem';
import { AutomatedFollowUpSystem } from '../automation/AutomatedFollowUpSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ArtistBookingsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Analytics Overview */}
      <BookingAnalytics />

      {/* Advanced Tabbed Interface */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="list">Bookings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <ArtistBookingsPanel />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <EnhancedBookingCalendar />
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <ClientManagementSystem />
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <AutomatedFollowUpSystem />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <SmartNotificationCenter />
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <BookingStatsCards />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ArtistBookingsTab;