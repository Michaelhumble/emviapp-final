
import { ArtistClientRow, ClientData, BookingHistoryItem } from "../types";

export const createManualClient = (clientRow: ArtistClientRow): ClientData => {
  return {
    id: clientRow.id,
    name: clientRow.name,
    phone: clientRow.phone || '',
    notes: clientRow.notes || '',
    visitCount: 0,
    totalSpent: 0,
    lastVisit: null,
    bookingHistory: [],
    isManualEntry: true
  };
};

export const processClientBookings = (
  client: ClientData, 
  bookings: any[]
): ClientData => {
  // Find all bookings for this client
  const clientBookings = bookings.filter(booking => {
    const metadata = booking.metadata || {};
    const isForClient = 
      metadata.client_name === client.name || 
      metadata.client_phone === client.phone ||
      metadata.customer_name === client.name;
    
    return isForClient;
  });
  
  // Create booking history entries
  const bookingHistory: BookingHistoryItem[] = clientBookings.map(booking => {
    return {
      id: booking.id,
      date: booking.created_at || booking.date_requested,
      service: booking.services?.title || 'Service',
      price: booking.services?.price || 0,
      status: booking.status
    };
  });
  
  // Calculate metrics
  const totalSpent = bookingHistory.reduce((sum, item) => 
    sum + (item.status === 'completed' ? item.price : 0), 0);
  
  const visitCount = bookingHistory.filter(item => 
    item.status === 'completed').length;
  
  // Find the last visit date
  let lastVisit = null;
  if (bookingHistory.length > 0) {
    const sortedBookings = [...bookingHistory].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    lastVisit = sortedBookings[0]?.date;
  }
  
  return {
    ...client,
    bookingHistory,
    totalSpent,
    visitCount,
    lastVisit
  };
};
