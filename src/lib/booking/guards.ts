import type { Booking, Service, ArtistAvailability, BookableSlot, CalendarEvent } from './types';

// Type guard for Booking
export const isBooking = (x: unknown): x is Booking => {
  return !!x && 
    typeof x === 'object' && 
    typeof (x as any).id === 'string' &&
    typeof (x as any).recipient_id === 'string' &&
    typeof (x as any).sender_id === 'string';
};

// Type guard for Service
export const isService = (x: unknown): x is Service => {
  return !!x && 
    typeof x === 'object' && 
    typeof (x as any).id === 'string' &&
    typeof (x as any).title === 'string' &&
    typeof (x as any).duration_minutes === 'number' &&
    typeof (x as any).price === 'number' &&
    typeof (x as any).user_id === 'string';
};

// Type guard for ArtistAvailability
export const isAvailability = (x: unknown): x is ArtistAvailability => {
  return !!x && 
    typeof x === 'object' && 
    typeof (x as any).id === 'string' &&
    typeof (x as any).artist_id === 'string' &&
    typeof (x as any).day_of_week === 'string' &&
    typeof (x as any).start_time === 'string' &&
    typeof (x as any).end_time === 'string';
};

// Type guard for BookableSlot
export const isSlot = (x: unknown): x is BookableSlot => {
  return !!x && 
    typeof x === 'object' && 
    typeof (x as any).starts_at === 'string' && 
    typeof (x as any).ends_at === 'string' &&
    typeof (x as any).artist_id === 'string';
};

// Type guard for CalendarEvent
export const isCalendarEvent = (x: unknown): x is CalendarEvent => {
  return !!x && 
    typeof x === 'object' && 
    typeof (x as any).id === 'string' &&
    typeof (x as any).title === 'string' &&
    typeof (x as any).start === 'string' &&
    typeof (x as any).end === 'string';
};

// Validate booking status
export const isValidBookingStatus = (status: string): status is Booking['status'] => {
  return ['pending', 'confirmed', 'cancelled', 'rescheduled', 'completed'].includes(status);
};

// Validate booking source
export const isValidBookingSource = (source: string): source is Booking['source'] => {
  return ['web', 'hubspot', 'manual'].includes(source);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format (basic)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Validate ISO datetime string
export const isValidISODateTime = (dateTime: string): boolean => {
  try {
    const date = new Date(dateTime);
    return date.toISOString() === dateTime;
  } catch {
    return false;
  }
};

// Validate time format (HH:MM)
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// Validate date format (YYYY-MM-DD)
export const isValidDateFormat = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date) && !isNaN(new Date(date).getTime());
};