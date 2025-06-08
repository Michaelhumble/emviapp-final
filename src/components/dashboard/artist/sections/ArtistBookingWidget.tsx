
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, TrendingUp } from 'lucide-react';

const ArtistBookingWidget = () => {
  // Mock check for bookings - in real app, this would come from data
  const hasBookings = false; // Set to true to show bookings, false to show FOMO card

  if (!hasBookings) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"
          >
            <Calendar className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready for Your First Booking? 🗓️
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            Once you complete your profile and upload portfolio photos, clients will start booking! Artists average <span className="font-bold text-blue-600">12 bookings</span> in their first month.
          </p>

          <div className="p-4 bg-white/60 rounded-xl border border-blue-100 mb-4">
            <div className="text-center">
              <p className="text-3xl mb-2">📈</p>
              <p className="font-semibold text-blue-600 mb-1">Complete Your Setup</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full w-2/3"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">67% complete • Add 3 more photos to finish</p>
            </div>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Complete Profile Setup
          </Button>
          
          <div className="text-xs text-gray-500 bg-white/60 p-3 rounded-lg mt-3">
            💰 <strong>Earning Potential:</strong> Complete artists earn $150-500 per week in Los Angeles!
          </div>
        </CardContent>
      </Card>
    );
  }

  // Has bookings - show calendar widget
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Your Schedule 📅</CardTitle>
              <p className="text-sm text-gray-600">This week's bookings</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Today's Bookings */}
        <div className="space-y-2">
          {[
            { time: "10:00 AM", client: "Sarah M.", service: "Gel Manicure", status: "confirmed" },
            { time: "2:00 PM", client: "Jessica L.", service: "Nail Art", status: "confirmed" },
            { time: "4:30 PM", client: "Maria R.", service: "Pedicure", status: "pending" }
          ].map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{booking.client}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">{booking.time}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <p className="text-lg font-bold text-blue-600">8</p>
            <p className="text-xs text-gray-600">This Week</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <p className="text-lg font-bold text-green-600">$640</p>
            <p className="text-xs text-gray-600">Earnings</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-lg font-bold text-green-600">+15%</p>
            </div>
            <p className="text-xs text-gray-600">vs Last Week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistBookingWidget;
