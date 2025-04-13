
export type BookingStatus = 'all' | 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined; // Make 'to' optional to match react-day-picker's DateRange
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceName: string;
  servicePrice?: number;
  serviceDuration?: number;
  date: Date | null;
  time: string;
  status: string;
  notes: string;
  createdAt: string;
  assignedStaffId?: string | null;
  assignedStaffName?: string | null;
}
