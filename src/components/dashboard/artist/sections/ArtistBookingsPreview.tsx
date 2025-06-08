
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, MapPin, Phone, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtistBookingsPreview = () => {
  const navigate = useNavigate();

  // Realistic beauty industry bookings with Vietnamese names
  const upcomingBookings = [
    {
      id: 1,
      clientName: "Linh Nguyen",
      service: "Gel Manicure + Nail Art",
      time: "10:00 AM",
      date: "Today",
      duration: "90 min",
      price: "$45",
      clientPhoto: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      status: "confirmed",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      clientName: "Mai Tran",
      service: "French Manicure",
      time: "2:30 PM",
      date: "Today",
      duration: "60 min",
      price: "$35",
      clientPhoto: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      status: "confirmed",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      clientName: "Sarah Kim",
      service: "Pedicure + Massage",
      time: "11:00 AM",
      date: "Tomorrow",
      duration: "75 min",
      price: "$55",
      clientPhoto: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      status: "pending",
      phone: "+1 (555) 345-6789"
    }
  ];

  const handleAddSlot = () => {
    // Open add booking slot modal or navigate to calendar
    navigate('/dashboard/artist/booking-calendar');
  };

  const handleViewFullCalendar = () => {
    navigate('/dashboard/artist/booking-calendar');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
            <p className="text-gray-600">Lịch hẹn sắp tới • Your client schedule</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddSlot}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Slot
        </motion.button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4 mb-6">
        {upcomingBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="p-4 bg-gradient-to-r from-white to-gray-50/50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Client Photo */}
              <div className="relative">
                <img
                  src={booking.clientPhoto}
                  alt={booking.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>

              {/* Booking Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{booking.clientName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <p className="text-gray-700 font-medium text-sm mb-2">{booking.service}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {booking.time} • {booking.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {booking.date}
                  </div>
                  <div className="font-semibold text-green-600">
                    {booking.price}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-green-700 font-semibold">Today's Revenue</div>
            <div className="text-2xl font-bold text-green-800">$135</div>
          </div>
          <div className="text-right">
            <div className="text-green-600 text-sm">This Week</div>
            <div className="text-lg font-bold text-green-700">$847</div>
          </div>
        </div>
      </motion.div>

      {/* FOMO Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 mb-4 text-center"
      >
        <div className="text-purple-700 font-semibold text-sm mb-1">
          🔥 You have 3 open slots tomorrow!
        </div>
        <div className="text-purple-600 text-xs">
          Promote your availability to get more bookings ✨
        </div>
      </motion.div>

      {/* View Full Calendar Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewFullCalendar}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold border border-gray-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
      >
        View Full Calendar
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};

export default ArtistBookingsPreview;
