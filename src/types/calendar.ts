
export interface Booking {
  id: string;
  customer_name?: string;
  customer_id?: string;
  artist_id: string;
  service_id?: string;
  service_name?: string;
  start_time: string;
  end_time?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

export interface AvailabilityRecord {
  id: string;
  artist_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available?: boolean;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  isAvailable: boolean;
  bookings: Booking[];
}

export interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
}
