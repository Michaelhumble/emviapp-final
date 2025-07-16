import React from 'react';
import { motion } from 'framer-motion';
import ArtistBookingCalendar from '../ArtistBookingCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';

const ArtistBookingsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Booking Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Total Clients</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold">$2,340</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar & Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistBookingCalendar />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistBookingsTab;