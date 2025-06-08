
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Plus, MapPin } from 'lucide-react';

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
      location: "Downtown Studio"
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
      location: "Downtown Studio"
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
      location: "Mobile Service"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Upcoming Bookings</h2>
          <p className="text-gray-600 font-inter">Your schedule for the next 24 hours</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-inter font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Time Slot
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="space-y-0">
          {upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center border border-purple-200">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2">
                      <h3 className="font-inter font-semibold text-gray-900">{booking.client}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-lg font-playfair font-bold text-emerald-600">{booking.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 font-inter font-medium mb-2">{booking.service}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-inter">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time} • {booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-100 rounded-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-playfair font-bold text-gray-900 mb-1">
              💰 $270 scheduled for today
            </div>
            <div className="text-sm text-gray-600 font-inter">
              Keep the momentum going! You're on track for your best month yet.
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-inter font-medium"
          >
            View Full Calendar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistBookingsPreview;
