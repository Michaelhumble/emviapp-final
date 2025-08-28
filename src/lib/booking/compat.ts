// Legacy compatibility layer for existing code
import type { Booking, Service } from './types';

// Legacy ArtistBooking interface for compatibility
export interface ArtistBooking {
  id: string;
  client_name?: string | null;
  service_type?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  status: string;
}

// Legacy EnhancedBooking interface for compatibility
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

// Convert unified Booking to legacy ArtistBooking format
export const toLegacyArtistBooking = (booking: Booking): ArtistBooking => ({
  id: booking.id,
  client_name: booking.client_name || null,
  service_type: booking.service_type || null,
  appointment_date: booking.date_requested || null,
  appointment_time: booking.time_requested || booking.appointment_time || null,
  status: booking.status || 'pending',
});

// Convert unified Booking to legacy EnhancedBooking format
export const toLegacyEnhancedBooking = (booking: Booking): EnhancedBooking => ({
  id: booking.id,
  sender_id: booking.sender_id,
  recipient_id: booking.recipient_id,
  service_id: booking.service_id,
  client_name: booking.client_name,
  client_email: booking.client_email,
  client_phone: booking.client_phone,
  date_requested: booking.date_requested,
  time_requested: booking.time_requested,
  starts_at: booking.starts_at,
  ends_at: booking.ends_at,
  status: booking.status || 'pending',
  source: booking.source || 'web',
  note: booking.note,
  metadata: booking.metadata,
  confirmation_sent_at: booking.confirmation_sent_at,
  calendar_event_id: booking.calendar_event_id,
  created_at: booking.created_at || new Date().toISOString(),
});

// Convert legacy ArtistBooking to unified Booking
export const fromLegacyArtistBooking = (artistBooking: ArtistBooking, recipientId: string): Booking => ({
  id: artistBooking.id,
  sender_id: '', // Unknown in legacy format
  recipient_id: recipientId,
  client_name: artistBooking.client_name || undefined,
  service_type: artistBooking.service_type || undefined,
  date_requested: artistBooking.appointment_date || undefined,
  time_requested: artistBooking.appointment_time || undefined,
  appointment_time: artistBooking.appointment_time || undefined,
  status: (artistBooking.status as Booking['status']) || 'pending',
  source: 'web',
});

// Legacy view model with computed properties
export const toLegacyViewModel = (booking: Booking, artistName?: string) => ({
  ...booking,
  fullName: booking.client_name || '',
  artist_name: artistName,
  // Computed properties for display
  displayDate: booking.date_requested || booking.starts_at?.split('T')[0],
  displayTime: booking.time_requested || booking.appointment_time || 
    (booking.starts_at ? new Date(booking.starts_at).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : ''),
  isUpcoming: () => {
    const bookingDate = new Date(booking.starts_at || booking.date_requested || '');
    return bookingDate > new Date();
  },
  isPending: () => booking.status === 'pending',
  isConfirmed: () => booking.status === 'confirmed',
  isCancelled: () => booking.status === 'cancelled',
  isCompleted: () => booking.status === 'completed',
});

// Adapter for components expecting different service shapes
export const serviceToLegacyFormat = (service: Service) => ({
  id: service.id,
  name: service.title, // Map title to name
  description: service.description,
  duration: service.duration_minutes, // Remove _minutes suffix
  durationMins: service.duration_minutes,
  price: service.price,
  priceCents: Math.round(service.price * 100), // Convert to cents
  artist_id: service.user_id, // Map user_id to artist_id
  artistId: service.user_id,
  locationType: 'in_person' as const, // Default value
  location_type: 'in_person' as const,
  is_active: service.is_visible !== false, // Map is_visible to is_active
  isActive: service.is_visible !== false,
  image_url: service.image_url,
  created_at: service.created_at,
  updated_at: service.updated_at,
});

// Reverse adapter from legacy service format
export const serviceFromLegacyFormat = (legacyService: any): Service => ({
  id: legacyService.id,
  title: legacyService.name || legacyService.title,
  description: legacyService.description,
  duration_minutes: legacyService.duration || legacyService.durationMins || legacyService.duration_minutes,
  price: legacyService.price || (legacyService.priceCents ? legacyService.priceCents / 100 : 0),
  user_id: legacyService.artist_id || legacyService.artistId || legacyService.user_id,
  is_visible: legacyService.is_active !== false && legacyService.isActive !== false,
  image_url: legacyService.image_url,
  created_at: legacyService.created_at,
  updated_at: legacyService.updated_at,
});