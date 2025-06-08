
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistBookingWidget = () => {
  // Mock booking data - in real app this would come from API
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Sarah Chen",
      service: "Gel Manicure",
      date: "Today",
      time: "2:30 PM",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      value: 65
    },
    {
      id: 2,
      clientName: "Maria Rodriguez",
      service: "Full Set Acrylics",
      date: "Tomorrow",
      time: "11:00 AM",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      value: 85
    },
    {
      id: 3,
      clientName: "Jessica Kim",
      service: "Nail Art Design",
      date: "Dec 12",
      time: "4:15 PM",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      value: 120
    }
  ];

  const hasBookings = upcomingBookings.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            📅
          </motion.div>
          <h3 className="text-lg font-bold text-white">Your Empire Schedule</h3>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30"
        >
          LIVE
        </motion.div>
      </div>

      {hasBookings ? (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
          <div className="p-6">
            {/* Bookings List */}
            <div className="space-y-4 mb-6">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={booking.avatar}
                      alt={booking.clientName}
                      className="w-12 h-12 rounded-full border-2 border-purple-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{booking.clientName}</div>
                    <div className="text-purple-300 text-xs">{booking.service}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {booking.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-sm">${booking.value}</div>
                    <div className="text-xs text-gray-400">confirmed</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                <div className="text-xl font-bold text-green-400">${upcomingBookings.reduce((sum, b) => sum + b.value, 0)}</div>
                <div className="text-xs text-green-300">Next 3 Days</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <div className="text-xl font-bold text-purple-400">{upcomingBookings.length}</div>
                <div className="text-xs text-purple-300">Bookings</div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm border border-orange-500/30">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
              >
                <Calendar className="h-10 w-10 text-white" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-3">
                Your Empire Awaits! 👑
              </h4>
              <p className="text-orange-200 text-sm mb-4 leading-relaxed">
                <span className="font-bold text-yellow-300">3,247 clients</span> searched for artists like you this week!
                Don't miss out on the booking rush. 🚀
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 text-base font-semibold shadow-xl">
                <TrendingUp className="h-5 w-5 mr-2" />
                Get More Bookings Now
              </Button>
              
              <div className="text-xs text-orange-300">
                💡 Artists with complete profiles get 8x more bookings!
              </div>
            </motion.div>

            {/* FOMO Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 space-y-3"
            >
              <div className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                <div className="text-sm text-orange-200 font-medium">
                  🔥 Maria just got 5 bookings in the last hour!
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-red-500/20">
                <div className="text-sm text-red-200 font-medium">
                  ⚡ Don't let clients book with your competition!
                </div>
              </div>
            </motion.div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ArtistBookingWidget;
