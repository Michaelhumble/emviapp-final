
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, DollarSign, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ArtistBookingsPreview = () => {
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Sarah Chen",
      service: "Luxury Gel Manicure",
      date: "Today",
      time: "2:30 PM",
      duration: "1h 30m",
      price: 85,
      status: "confirmed",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png"
    },
    {
      id: 2,
      clientName: "Maria Rodriguez",
      service: "Nail Art Design",
      date: "Tomorrow",
      time: "11:00 AM",
      duration: "2h",
      price: 120,
      status: "confirmed",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png"
    },
    {
      id: 3,
      clientName: "Jessica Kim",
      service: "French Manicure",
      date: "Dec 10",
      time: "3:00 PM",
      duration: "1h",
      price: 65,
      status: "pending",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl lg:text-2xl font-bold text-white">Upcoming Bookings</h3>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {upcomingBookings.length} scheduled
          </Badge>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Booking
        </Button>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block">
        <Card className="border-0 shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="p-6">
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <img
                    src={booking.avatar}
                    alt={booking.clientName}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  
                  <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-semibold text-white">{booking.clientName}</div>
                      <div className="text-sm text-gray-300">{booking.service}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="h-4 w-4" />
                      {booking.date}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </div>
                    
                    <div className="text-center">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">${booking.price}</div>
                      <div className="text-xs text-gray-400">{booking.duration}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {upcomingBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-4 border-0 shadow-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={booking.avatar}
                  alt={booking.clientName}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
                <div className="flex-1">
                  <div className="font-semibold text-white">{booking.clientName}</div>
                  <div className="text-sm text-gray-300">{booking.service}</div>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-3 w-3" />
                  {booking.date}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-3 w-3" />
                  {booking.time}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="h-3 w-3" />
                  ${booking.price}
                </div>
                <div className="text-gray-300">
                  {booking.duration}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FOMO Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center"
      >
        <div className="text-sm text-green-200 mb-1">
          🔥 <span className="font-semibold text-white">Your schedule is 87% booked this week!</span>
        </div>
        <div className="text-xs text-green-300">
          Artists with full schedules earn 3x more—keep the momentum! ✨
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistBookingsPreview;
