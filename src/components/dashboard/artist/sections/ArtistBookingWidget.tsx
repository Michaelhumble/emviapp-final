
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ArtistBookingWidget = () => {
  // Mock data - replace with real booking data
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Sarah Chen",
      service: "Gel Manicure",
      time: "2:00 PM",
      date: "Today",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      status: "confirmed"
    },
    {
      id: 2,
      clientName: "Maria Rodriguez",
      service: "Nail Art",
      time: "10:00 AM",
      date: "Tomorrow",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      status: "pending"
    }
  ];

  const hasBookings = upcomingBookings.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-gray-800">Your Schedule 📅</h3>
        {hasBookings && (
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            View All
          </Button>
        )}
      </div>

      {hasBookings ? (
        <Card className="border-0 shadow-lg">
          <div className="p-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">5</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">2</div>
                <div className="text-xs text-gray-600">Today</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">$380</div>
                <div className="text-xs text-gray-600">Revenue</div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="space-y-3 mb-4">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <img
                    src={booking.avatar}
                    alt={booking.clientName}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">
                      {booking.clientName}
                    </div>
                    <div className="text-xs text-gray-600">
                      {booking.service}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">
                      {booking.time}
                    </div>
                    <div className="text-xs text-gray-600">
                      {booking.date}
                    </div>
                  </div>
                  
                  <Badge 
                    className={`${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    } border-0`}
                  >
                    {booking.status}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Booking
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Get Your First Booking! 🚀
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Complete your profile and start accepting appointments! Artists who optimize their profiles get <strong>10x more bookings</strong>. 💪
              </p>
            </motion.div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                Optimize My Profile
              </Button>
              
              <div className="text-xs text-gray-500">
                🎯 Complete artists get booked within 24 hours!
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-blue-100">
              <div className="text-xs text-blue-700 font-medium">
                ⚡ Maria completed her profile and got 3 bookings in one day!
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistBookingWidget;
