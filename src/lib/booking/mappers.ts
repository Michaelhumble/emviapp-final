import type { Database } from '@/integrations/supabase/types';
import type { Booking, Service, ArtistAvailability, CalendarEvent, BookingCRMLead } from './types';

type BookingRow = Database['public']['Tables']['bookings']['Row'];
type ServiceRow = Database['public']['Tables']['services']['Row'];
type AvailabilityRow = Database['public']['Tables']['artist_availability']['Row'];

// Map database row to unified Booking type
export const rowToBooking = (row: BookingRow): Booking => ({
  id: row.id,
  sender_id: row.sender_id,
  recipient_id: row.recipient_id,
  service_id: row.service_id || undefined,
  client_name: row.client_name || undefined,
  client_email: row.client_email || undefined,
  client_phone: row.client_phone || undefined,
  date_requested: row.date_requested || undefined,
  time_requested: row.time_requested || undefined,
  appointment_time: row.appointment_time || undefined,
  starts_at: row.starts_at || undefined,
  ends_at: row.ends_at || undefined,
  status: (row.status as Booking['status']) || 'pending',
  source: (row.source as Booking['source']) || 'web',
  note: row.note || undefined,
  service_type: row.service_type || undefined,
  service_name: row.service_type || undefined, // Alias for compatibility
  metadata: (row.metadata as Record<string, any>) || undefined,
  confirmation_sent_at: row.confirmation_sent_at || undefined,
  reminder_sent: row.reminder_sent || undefined,
  reminder_sent_at: row.reminder_sent_at || undefined,
  calendar_event_id: row.calendar_event_id || undefined,
  created_at: row.created_at || undefined,
});

// Map database row to unified Service type
export const rowToService = (row: ServiceRow): Service => ({
  id: row.id,
  title: row.title,
  name: row.title, // Alias for component compatibility
  description: row.description || undefined,
  duration_minutes: row.duration_minutes,
  price: row.price,
  user_id: row.user_id,
  artist_id: row.user_id, // Alias for component compatibility
  is_visible: row.is_visible || undefined,
  is_active: row.is_visible !== false, // Alias for component compatibility
  location_type: 'in_person', // Default value, could be enhanced later
  image_url: row.image_url || undefined,
  created_at: row.created_at || undefined,
  updated_at: row.updated_at || undefined,
});

// Map database row to unified ArtistAvailability type
export const rowToAvailability = (row: AvailabilityRow): ArtistAvailability => ({
  id: row.id,
  artist_id: row.artist_id,
  day_of_week: row.day_of_week,
  start_time: row.start_time,
  end_time: row.end_time,
  is_available: row.is_available,
  timezone: row.timezone || undefined,
  slot_duration_minutes: row.slot_duration_minutes || undefined,
  buffer_minutes: row.buffer_minutes || undefined,
  max_advance_days: row.max_advance_days || undefined,
  created_at: row.created_at,
});

// Convert booking to HubSpot contact payload
export const bookingToHubSpotPayload = (booking: Booking): Record<string, any> => ({
  email: booking.client_email,
  firstname: booking.client_name?.split(' ')[0] || '',
  lastname: booking.client_name?.split(' ').slice(1).join(' ') || '',
  phone: booking.client_phone || '',
  hs_lead_status: 'NEW',
  source: 'EmviApp Booking',
  artist_id: booking.recipient_id,
  booking_date: booking.date_requested || booking.starts_at,
  service_type: booking.service_type || 'Service',
  booking_id: booking.id,
});

// Convert booking to CRM lead
export const bookingToCRMLead = (booking: Booking, serviceName?: string): BookingCRMLead => ({
  email: booking.client_email || '',
  name: booking.client_name || '',
  phone: booking.client_phone,
  source: 'booking',
  artist_id: booking.recipient_id,
  service_name: serviceName || booking.service_type,
  booking_date: booking.starts_at || booking.date_requested,
  metadata: {
    booking_id: booking.id,
    notes: booking.note,
    source: booking.source,
  },
});

// Convert booking to calendar event for ICS generation
export const bookingToCalendarEvent = (booking: Booking, service?: Service): CalendarEvent => {
  const startTime = booking.starts_at || 
    (booking.date_requested && booking.time_requested 
      ? `${booking.date_requested}T${booking.time_requested}:00.000Z`
      : new Date().toISOString());
  
  const endTime = booking.ends_at || 
    (service?.duration_minutes 
      ? new Date(new Date(startTime).getTime() + service.duration_minutes * 60000).toISOString()
      : new Date(new Date(startTime).getTime() + 60 * 60000).toISOString());

  return {
    id: booking.id,
    title: `${service?.title || booking.service_type || 'Appointment'} - ${booking.client_name || 'Client'}`,
    start: startTime,
    end: endTime,
    description: booking.note || `Appointment with ${booking.client_name}`,
    location: 'TBD',
    attendees: booking.client_email ? [booking.client_email] : [],
  };
};

// Generate ICS file content from calendar event
export const eventToICS = (event: CalendarEvent): string => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string) => {
    return text.replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
  };

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EmviApp//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@emvi.app`,
    `DTSTART:${formatDate(event.start)}`,
    `DTEND:${formatDate(event.end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description || '')}`,
    `LOCATION:${escapeText(event.location || '')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
};

// Legacy compatibility - convert to ArtistBooking interface
export const bookingToLegacyArtist = (booking: Booking) => ({
  id: booking.id,
  client_name: booking.client_name,
  service_type: booking.service_type,
  appointment_date: booking.date_requested,
  appointment_time: booking.time_requested || booking.appointment_time,
  status: booking.status || 'pending',
});

// Legacy compatibility - convert to customer booking view
export const bookingToLegacyCustomer = (booking: Booking, artistName?: string) => ({
  id: booking.id,
  sender_id: booking.sender_id,
  recipient_id: booking.recipient_id,
  client_name: booking.client_name,
  service_id: booking.service_id,
  service_name: booking.service_type,
  date_requested: booking.date_requested,
  time_requested: booking.time_requested,
  appointment_date: booking.date_requested,
  appointment_time: booking.time_requested || booking.appointment_time,
  status: booking.status || 'pending',
  note: booking.note,
  created_at: booking.created_at || new Date().toISOString(),
  artist_name: artistName,
});