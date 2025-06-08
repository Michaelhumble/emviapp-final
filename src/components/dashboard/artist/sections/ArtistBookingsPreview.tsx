
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Users, ArrowRight } from 'lucide-react';
import BookingModal from '../modals/BookingModal';
import { useNavigate } from 'react-router-dom';

const ArtistBookingsPreview = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const upcomingBookings = [
    {
      id: 1,
      clientName: "Alex Johnson",
      service: "Classic Manicure",
      time: "10:00 AM",
      date: "Today",
      status: "confirmed"
    },
    {
      id: 2,
      clientName: "Jordan Smith",
      service: "Nail Art Design",
      time: "2:30 PM",
      date: "Tomorrow",
      status: "pending"
    },
    {
      id: 3,
      clientName: "Taylor Davis",
      service: "Gel Polish",
      time: "11:15 AM",
      date: "Dec 10",
      status: "confirmed"
    }
  ];

  const handleViewAllBookings = () => {
    navigate('/dashboard/artist/calendar');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
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
              <Calendar className="h-6 w-6 text-indigo-600" />
              Upcoming Bookings
            </h2>
            <p className="text-slate-600 font-inter">Manage your schedule</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Add Appointment
          </motion.button>
        </div>

        <div className="space-y-4 mb-6">
          {upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{booking.clientName}</div>
                    <div className="text-sm text-slate-600">{booking.service}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="h-4 w-4" />
                    {booking.time}
                  </div>
                  <div className="text-sm text-slate-500">{booking.date}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">12</div>
              <div className="text-sm text-slate-600">This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">47</div>
              <div className="text-sm text-slate-600">This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-600">94%</div>
              <div className="text-sm text-slate-600">Completion Rate</div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewAllBookings}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View Full Calendar
          <ArrowRight className="h-4 w-4" />
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
