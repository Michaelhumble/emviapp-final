
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../modals/BookingModal';

const ArtistBookingsPreview = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const upcomingBookings = [
    {
      id: 1,
      clientName: "Linh Chi",
      service: "Nail Art Design",
      date: "Hôm nay",
      time: "14:30",
      status: "confirmed",
      avatar: "LC"
    },
    {
      id: 2,
      clientName: "Minh Anh", 
      service: "Manicure + Pedicure",
      date: "Mai",
      time: "10:00",
      status: "pending",
      avatar: "MA"
    },
    {
      id: 3,
      clientName: "Thu Hương",
      service: "Gel Polish",
      date: "Thứ 4",
      time: "16:15",
      status: "confirmed", 
      avatar: "TH"
    }
  ];

  const handleAddAppointment = () => {
    setShowBookingModal(true);
  };

  const handleViewAll = () => {
    navigate('/dashboard/artist/booking-calendar');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      default:
        return status;
    }
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
              Lịch Hẹn Sắp Tới 📅
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Manage your bookings • Stay organized
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddAppointment}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Thêm Lịch Hẹn
          </motion.button>
        </div>

        <div className="space-y-4 mb-8">
          {upcomingBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  {booking.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="font-inter font-bold text-gray-900">{booking.clientName}</h3>
                      <p className="text-gray-600">{booking.service}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">47</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">98%</div>
              <div className="text-sm text-gray-600">Show Rate</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="group bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-200 hover:border-blue-300 px-8 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-300"
          >
            Xem Tất Cả
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      <BookingModal 
        open={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </div>
  );
};

export default ArtistBookingsPreview;
