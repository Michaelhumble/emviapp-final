// Unified booking system types aligned with database schema

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'rescheduled' | 'completed';
export type BookingSource = 'web' | 'hubspot' | 'manual';

export type LocationType = 'in_person' | 'remote' | 'both';

// Aligned with database services table
export interface Service {
  id: string;
  title: string; // Maps to database 'title' field
  description?: string;
  duration_minutes: number; // Database field name
  price: number; // Database field (numeric)
  user_id: string; // Artist ID in database
  is_visible?: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Aligned with database artist_availability table
export interface ArtistAvailability {
  id: string;
  artist_id: string;
  day_of_week: string; // 'Monday', 'Tuesday', etc.
  start_time: string; // Time format: 'HH:MM'
  end_time: string; // Time format: 'HH:MM'
  is_available: boolean;
  timezone?: string; // IANA timezone
  slot_duration_minutes?: number;
  buffer_minutes?: number;
  max_advance_days?: number;
  created_at: string;
}

// Time off periods
export interface TimeOff {
  id: string;
  artist_id: string;
  start_date: string; // Date format: 'YYYY-MM-DD'
  end_date: string; // Date format: 'YYYY-MM-DD'
  reason?: string;
  created_at: string;
}

// Aligned with database bookings table
export interface Booking {
  id: string;
  sender_id: string; // Customer ID
  recipient_id: string; // Artist ID
  service_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  date_requested?: string; // Date format: 'YYYY-MM-DD'
  time_requested?: string; // Time format: 'HH:MM'
  appointment_time?: string; // Legacy compatibility
  starts_at?: string; // ISO timestamp
  ends_at?: string; // ISO timestamp
  status?: BookingStatus;
  source?: BookingSource;
  note?: string;
  service_type?: string; // Legacy compatibility
  metadata?: Record<string, any>;
  confirmation_sent_at?: string;
  reminder_sent?: boolean;
  reminder_sent_at?: string;
  calendar_event_id?: string;
  created_at?: string;
}

// For slot generation
export interface BookableSlot {
  artist_id: string;
  service_id: string;
  starts_at: string; // ISO timestamp
  ends_at: string; // ISO timestamp
  available: boolean;
}

// Calendar day view
export interface ArtistCalendarDay {
  date: string; // YYYY-MM-DD
  slots: BookableSlot[];
  bookings: Booking[];
}

// Booking request payload
export interface BookingRequest {
  artist_id: string;
  service_id?: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  starts_at: string; // ISO timestamp
  ends_at: string; // ISO timestamp
  notes?: string;
  source?: BookingSource;
}

// Calendar event for ICS generation
export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO timestamp
  end: string; // ISO timestamp
  description?: string;
  location?: string;
  attendees?: string[];
}

// Analytics tracking
export interface BookingAnalyticsEvent {
  event_name: 'booking_started' | 'booking_submitted' | 'booking_confirmed' | 'booking_cancelled';
  artist_id: string;
  service_id?: string;
  booking_value?: number;
  source: BookingSource;
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