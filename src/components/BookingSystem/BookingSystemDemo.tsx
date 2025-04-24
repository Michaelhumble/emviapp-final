
import React from 'react';
import { BookingCalendar } from './index';

const BookingSystemDemo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Artist Booking System
        </h1>
        <p className="text-gray-600">
          Manage your client appointments and schedule
        </p>
      </div>
      
      <BookingCalendar />
    </div>
  );
};

export default BookingSystemDemo;
