
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Plus, Sparkles } from 'lucide-react';

const ArtistBookingsPreview = () => {
  const upcomingBookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Premium Manicure + Art",
      time: "2:00 PM",
      date: "Today",
      duration: "90 min",
      price: "$85",
      status: "confirmed",
      avatar: "https://i.pravatar.cc/40?img=1"
    },
    {
      id: 2,
      client: "Emily Chen",
      service: "Gel Extensions",
      time: "4:30 PM",
      date: "Today",
      duration: "120 min",
      price: "$120",
      status: "confirmed",
      avatar: "https://i.pravatar.cc/40?img=2"
    },
    {
      id: 3,
      client: "Jessica Rodriguez",
      service: "Pedicure Deluxe",
      time: "10:00 AM",
      date: "Tomorrow",
      duration: "75 min",
      price: "$65",
      status: "pending",
      avatar: "https://i.pravatar.cc/40?img=3"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30"
          >
            <Calendar className="h-6 w-6 text-indigo-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white">Upcoming Bookings</h2>
            <p className="text-sm text-gray-400">Next 24 hours</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Add Slot</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {upcomingBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <motion.img
                src={booking.avatar}
                alt={booking.client}
                className="w-12 h-12 rounded-full border-2 border-white/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{booking.client}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {booking.status}
                    </span>
                    <span className="text-lg font-bold text-emerald-400">{booking.price}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{booking.service}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>{booking.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOMO Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 text-center"
      >
        <div className="text-sm text-emerald-200">
          💰 <span className="font-semibold text-white">$270 scheduled for today</span> • Keep the momentum going!
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistBookingsPreview;
