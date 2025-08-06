import React from 'react';
import { motion } from 'framer-motion';
import ArtistBookingsPanel from '../ArtistBookingsPanel';
import BookingStatsCards from '../bookings/BookingStatsCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const ArtistBookingsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Dynamic Booking Stats */}
      <BookingStatsCards />

      {/* Bookings Management */}
      <ArtistBookingsPanel />
    </motion.div>
  );
};

export default ArtistBookingsTab;