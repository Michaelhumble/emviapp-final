
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Plus, Eye } from 'lucide-react';
import BookingModal from '../modals/BookingModal';
import { useNavigate } from 'react-router-dom';

const ArtistBookingsPreview = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const upcomingBookings = [
    {
      id: 1,
      client: "Alex Johnson",
      service: "Manicure & Nail Art",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed"
    },
    {
      id: 2,
      client: "Taylor Davis",
      service: "Pedicure",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "pending"
    },
    {
      id: 3,
      client: "Jordan Kim",
      service: "Full Set",
      date: "Dec 10",
      time: "1:00 PM",
      status: "confirmed"
    }
  ];

  const handleViewAllBookings = () => {
    // Navigate to full bookings page
    navigate('/dashboard/artist/bookings');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              Upcoming Bookings
            </h2>
            <p className="text-slate-600 font-inter">Manage your appointments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Add Appointment
          </motion.button>
        </div>

        <div className="space-y-4 mb-6">
          {upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{booking.client}</h3>
                    <p className="text-slate-600 text-sm">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-slate-700 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-slate-600">This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">24</div>
              <div className="text-sm text-slate-600">This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">$2,340</div>
              <div className="text-sm text-slate-600">Revenue</div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewAllBookings}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Eye className="h-4 w-4" />
          View Full Calendar
        </motion.button>
      </motion.div>

      <BookingModal 
        open={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>
  );
};

export default ArtistBookingsPreview;
