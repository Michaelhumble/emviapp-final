
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MoreHorizontal } from 'lucide-react';

const ArtistBookingsPreview = () => {
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Client A",
      service: "Gel Manicure",
      date: "Today",
      time: "2:00 PM",
      status: "confirmed",
      avatar: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png"
    },
    {
      id: 2,
      clientName: "Client B", 
      service: "Nail Art Design",
      date: "Tomorrow",
      time: "10:30 AM",
      status: "pending",
      avatar: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png"
    },
    {
      id: 3,
      clientName: "Client C",
      service: "Full Set Acrylics",
      date: "Dec 10",
      time: "3:15 PM", 
      status: "confirmed",
      avatar: "/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Upcoming Bookings</h2>
          <p className="text-gray-600 font-inter">Your schedule for the next few days</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-inter font-medium flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          View All
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {upcomingBookings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={booking.avatar}
                        alt={booking.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        booking.status === 'confirmed' ? 'bg-emerald-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-playfair font-semibold text-gray-900">{booking.clientName}</h3>
                      <p className="text-sm text-gray-600 font-inter">{booking.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span className="font-inter">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-inter">{booking.time}</span>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-inter">No upcoming bookings</p>
            <p className="text-sm text-gray-400 mb-4 font-inter">Your schedule is clear for now</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-inter font-medium"
            >
              Add Availability
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistBookingsPreview;
