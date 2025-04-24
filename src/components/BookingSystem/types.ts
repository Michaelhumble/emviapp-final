
export interface Booking {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface BookingFormData {
  clientName: string;
  serviceName: string;
  date: Date;
  time: string;
  notes?: string;
}
