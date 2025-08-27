// Enhanced booking system types
export interface Service {
  id: string;
  artist_id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  price?: number;
  location_type: 'in_person' | 'remote' | 'both';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArtistAvailability {
  id: string;
  artist_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  timezone: string;
  slot_duration_minutes: number;
  buffer_minutes: number;
  max_advance_days: number;
  created_at: string;
}

export interface TimeOff {
  id: string;
  artist_id: string;
  start_date: string;
  end_date: string;
  reason?: string;
  created_at: string;
}

export interface EnhancedBooking {
  id: string;
  sender_id?: string;
  recipient_id: string;
  service_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  date_requested?: string;
  time_requested?: string;
  starts_at?: string;
  ends_at?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'rescheduled' | 'completed';
  source: string;
  note?: string;
  metadata?: Record<string, any>;
  confirmation_sent_at?: string;
  calendar_event_id?: string;
  created_at: string;
}

export interface BookableSlot {
  start: string; // ISO string
  end: string; // ISO string
  available: boolean;
  service_id?: string;
}

export interface BookingRequest {
  artist_id: string;
  service_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  starts_at: string; // ISO string
  ends_at: string; // ISO string
  notes?: string;
  source?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

// Analytics events
export interface BookingAnalyticsEvent {
  event_name: 'booking_started' | 'booking_submitted' | 'booking_confirmed' | 'booking_cancelled';
  artist_id: string;
  service_id?: string;
  booking_value?: number;
  source: string;
  timestamp: string;
}

// CRM lead data
export interface BookingCRMLead {
  email: string;
  name: string;
  phone?: string;
  source: 'booking';
  artist_id: string;
  service_name?: string;
  booking_date?: string;
  metadata?: Record<string, any>;
}