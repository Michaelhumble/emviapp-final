
import { BookingHistoryItem, ClientData } from "../types";
import { ClientBookingMetadata } from "../types/clientTypes";

export const processBookingMetadata = (metadata: any): { name: string; phone: string } => {
  const clientName = metadata?.client_name || metadata?.customer_name || 'Unknown Client';
  const clientPhone = metadata?.phone || metadata?.client_phone || '';
  return { name: clientName, phone: clientPhone };
};

export const createClientFromBooking = (
  clientId: string,
  metadata: ClientBookingMetadata,
  booking: any,
  servicePrice: number
): ClientData => {
  const { name, phone } = processBookingMetadata(metadata);
  
  return {
    id: clientId,
    name,
    phone,
    notes: '',
    visitCount: 1,
    lastVisit: booking.date_requested,
    totalSpent: servicePrice,
    bookingHistory: [{
      id: booking.id,
      date: booking.date_requested,
      service: booking.services?.title || 'Unnamed service',
      price: servicePrice,
      status: booking.status
    }],
    isManualEntry: false
  };
};

export const createManualClient = (client: any): ClientData => {
  return {
    id: client.id,
    name: client.name,
    phone: client.phone || '',
    notes: client.notes || '',
    visitCount: 0,
    totalSpent: 0,
    bookingHistory: [],
    isManualEntry: true
  };
};
