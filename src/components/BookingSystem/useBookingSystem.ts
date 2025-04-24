
import { useState, useEffect } from 'react';
import { Booking, BookingFormData } from './types';
import { mockBookings } from './mockData';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const useBookingSystem = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call to fetch bookings
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be a Supabase call
        // const { data, error } = await supabase.from('bookings').select('*');
        
        // For now, use our mock data
        setTimeout(() => {
          setBookings(mockBookings);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getBookingsForDate = (date: Date | null) => {
    if (!date) return [];
    
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookings.filter(booking => booking.date === dateStr);
  };

  const addBooking = (bookingData: BookingFormData) => {
    const newBooking: Booking = {
      id: uuidv4(),
      clientName: bookingData.clientName,
      serviceName: bookingData.serviceName,
      date: format(bookingData.date, 'yyyy-MM-dd'),
      time: bookingData.time,
      status: 'pending',
      notes: bookingData.notes
    };

    // In a real implementation, this would be a Supabase insert
    // await supabase.from('bookings').insert([newBooking]);
    
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    // In a real implementation, this would be a Supabase update
    // await supabase.from('bookings').update({ status }).eq('id', id);
    
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const deleteBooking = (id: string) => {
    // In a real implementation, this would be a Supabase delete
    // await supabase.from('bookings').delete().eq('id', id);
    
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  return {
    bookings,
    selectedDate,
    setSelectedDate,
    getBookingsForDate,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    loading,
    error
  };
};
