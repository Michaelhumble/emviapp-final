import { z } from 'zod';

// Booking creation input validation
export const CreateBookingInput = z.object({
  artist_id: z.string().uuid('Invalid artist ID'),
  service_id: z.string().uuid('Invalid service ID').optional(),
  client_name: z.string().min(1, 'Name is required'),
  client_email: z.string().email('Invalid email address'),
  client_phone: z.string().optional(),
  starts_at: z.string().datetime('Invalid start time'),
  ends_at: z.string().datetime('Invalid end time'),
  notes: z.string().optional(),
  source: z.enum(['web', 'hubspot', 'manual']).default('web'),
});

export type CreateBookingInput = z.infer<typeof CreateBookingInput>;

// Service validation
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Service title is required'),
  description: z.string().optional(),
  duration_minutes: z.number().min(5, 'Duration must be at least 5 minutes'),
  price: z.number().min(0, 'Price cannot be negative'),
  user_id: z.string().uuid('Invalid artist ID'),
  is_visible: z.boolean().default(true),
  image_url: z.string().url().optional(),
});

export type ServiceInput = z.infer<typeof ServiceSchema>;

// Availability validation
export const AvailabilitySchema = z.object({
  artist_id: z.string().uuid(),
  day_of_week: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  is_available: z.boolean().default(true),
  timezone: z.string().optional(),
  slot_duration_minutes: z.number().min(5).default(30),
  buffer_minutes: z.number().min(0).default(15),
  max_advance_days: z.number().min(1).default(60),
});

export type AvailabilityInput = z.infer<typeof AvailabilitySchema>;

// Time off validation
export const TimeOffSchema = z.object({
  artist_id: z.string().uuid(),
  start_date: z.string().date('Invalid start date'),
  end_date: z.string().date('Invalid end date'),
  reason: z.string().optional(),
});

export type TimeOffInput = z.infer<typeof TimeOffSchema>;

// Slot request validation
export const SlotRequestSchema = z.object({
  artist_id: z.string().uuid(),
  service_id: z.string().uuid().optional(),
  date: z.string().date('Invalid date'),
  timezone: z.string().default('America/New_York'),
});

export type SlotRequestInput = z.infer<typeof SlotRequestSchema>;

// Reschedule booking validation
export const RescheduleBookingInput = z.object({
  bookingId: z.string().uuid(),
  newStartsAt: z.string().datetime('Invalid start time'),
  newEndsAt: z.string().datetime('Invalid end time'),
  token: z.string().optional(), // For customer self-service
  managedBy: z.enum(['customer', 'artist', 'admin']).default('customer'),
});

export type RescheduleBookingInput = z.infer<typeof RescheduleBookingInput>;

// Cancel booking validation
export const CancelBookingInput = z.object({
  bookingId: z.string().uuid(),
  reason: z.enum(['schedule_conflict', 'no_longer_needed', 'found_alternative', 'personal_emergency', 'other']),
  reasonText: z.string().optional(),
  token: z.string().optional(), // For customer self-service
  managedBy: z.enum(['customer', 'artist', 'admin']).default('customer'),
});

export type CancelBookingInput = z.infer<typeof CancelBookingInput>;

// Manage token verification
export const VerifyManageTokenInput = z.object({
  token: z.string(),
  bookingId: z.string().uuid(),
});

export type VerifyManageTokenInput = z.infer<typeof VerifyManageTokenInput>;