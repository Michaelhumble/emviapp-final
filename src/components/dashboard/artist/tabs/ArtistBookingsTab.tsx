import React from 'react';
import { motion } from 'framer-motion';
import ArtistBookingsPanel from '../ArtistBookingsPanel';
import BookingStatsCards from '../bookings/BookingStatsCards';
import { BookingAnalytics } from '../bookings/BookingAnalytics';
import { EnhancedBookingCalendar } from '../bookings/EnhancedBookingCalendar';
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

      {/* Tabbed Interface for Different Views */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Booking List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <ArtistBookingsPanel />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <EnhancedBookingCalendar />
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <BookingStatsCards />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ArtistBookingsTab;