
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MoreHorizontal, Plus } from 'lucide-react';

const ArtistBookingsPreview = () => {
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Linh Nguyen",
      service: "Gel Manicure & Nail Art",
      date: "Today",
      time: "2:00 PM",
      status: "confirmed",
      avatar: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
      price: 85
    },
    {
      id: 2,
      clientName: "Hương Trần", 
      service: "Full Set Acrylics",
      date: "Tomorrow",
      time: "10:30 AM",
      status: "pending",
      avatar: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      price: 120
    },
    {
      id: 3,
      clientName: "Mai Phạm",
      service: "French Ombré",
      date: "Dec 10",
      time: "3:15 PM", 
      status: "confirmed",
      avatar: "/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png",
      price: 95
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalRevenue = upcomingBookings.reduce((sum, booking) => sum + booking.price, 0);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Upcoming Bookings 📅</h2>
          <p className="text-lg text-gray-600 font-inter">Your upcoming appointments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          Add Availability
        </motion.button>
      </div>

      {/* Revenue Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">{upcomingBookings.length}</div>
          <div className="text-sm text-gray-600 font-inter">Appointments</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">${totalRevenue}</div>
          <div className="text-sm text-gray-600 font-inter">Revenue</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-playfair font-bold text-gray-900">4.9</div>
          <div className="text-sm text-gray-600 font-inter">Avg Rating</div>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
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
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        booking.status === 'confirmed' ? 'bg-emerald-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-playfair font-semibold text-gray-900 text-lg">{booking.clientName}</h3>
                      <p className="text-gray-600 font-inter">{booking.service}</p>
                      <p className="text-sm text-gray-500 font-inter">${booking.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-inter">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-inter">{booking.time}</span>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
            <p className="text-gray-500 font-inter mb-6">Your schedule is clear - time to attract new clients!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-inter font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Share Your Profile
            </motion.button>
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-inter">
              💡 <strong>Tip:</strong> Artists who respond within 1 hour get 60% more bookings
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-inter font-medium border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              View Calendar
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBookingsPreview;
