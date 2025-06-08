
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../modals/BookingModal';

const ArtistBookingsPreview = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const upcomingBookings = [
    {
      id: 1,
      clientName: "Linh Nguyen",
      service: "Nail Art Design",
      time: "10:00 AM",
      date: "Today",
      status: "confirmed"
    },
    {
      id: 2,
      clientName: "Anh Pham",
      service: "Manicure & Pedicure",
      time: "2:30 PM",
      date: "Today",
      status: "pending"
    },
    {
      id: 3,
      clientName: "Trang Le",
      service: "Gel Polish",
      time: "9:00 AM",
      date: "Tomorrow",
      status: "confirmed"
    }
  ];

  const handleAddBooking = () => {
    setShowBookingModal(true);
  };

  const handleViewAll = () => {
    navigate('/dashboard/artist/bookings');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
            Today's Schedule
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Manage appointments • Track your day
            <span className="block text-sm text-gray-500 mt-1">Quản lý lịch hẹn hôm nay</span>
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddBooking}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          Add Appointment
        </motion.button>
      </div>

      <div className="space-y-4 mb-8">
        {upcomingBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{booking.clientName}</h3>
                  <p className="text-gray-600">{booking.service}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{booking.date}</span>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'confirmed' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">8</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">127</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">96%</div>
            <div className="text-sm text-gray-600">Show Rate</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewAll}
          className="group bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-200 hover:border-emerald-300 px-8 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-300"
        >
          View Full Calendar
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <BookingModal 
        open={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </motion.div>
  );
};

export default ArtistBookingsPreview;
