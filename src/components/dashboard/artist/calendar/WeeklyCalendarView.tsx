
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { WeeklyCalendar } from './WeeklyCalendar';
import { Booking } from '@/types/booking';

interface WeeklyCalendarViewProps {
  currentDate: Date;
  bookings: Booking[];
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ currentDate, bookings }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <WeeklyCalendar />
      
      {bookings.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No bookings scheduled for this week.
        </div>
      )}
    </motion.div>
  );
};

export default WeeklyCalendarView;
