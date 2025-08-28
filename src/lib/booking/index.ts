// Barrel export for unified booking system
export * from './types';
export * from './schemas';
export * from './mappers';
export * from './guards';
export * from './compat';
export * from './tokens';
export * from './ics';

// Re-export commonly used types for convenience
export type {
  Booking,
  Service,
  ArtistAvailability,
  BookableSlot,
  BookingRequest,
  CalendarEvent,
  BookingStatus,
  BookingSource,
  LocationType,
  CancellationReason,
  ManageBookingToken
} from './types';

// Re-export validation schemas
export {
  CreateBookingInput,
  ServiceSchema,
  AvailabilitySchema,
  SlotRequestSchema,
  RescheduleBookingInput,
  CancelBookingInput,
  VerifyManageTokenInput
} from './schemas';

// Re-export core mappers
export {
  rowToBooking,
  rowToService,
  rowToAvailability,
  bookingToHubSpotPayload,
  bookingToCRMLead,
  bookingToCalendarEvent,
  eventToICS
} from './mappers';

// Re-export type guards
export {
  isBooking,
  isService,
  isSlot,
  isValidBookingStatus,
  isValidEmail,
  isValidISODateTime
} from './guards';

// Re-export compatibility helpers
export {
  toLegacyArtistBooking,
  toLegacyEnhancedBooking,
  toLegacyViewModel,
  serviceToLegacyFormat
} from './compat';

// Re-export token utilities
export {
  generateManageToken,
  verifyManageToken,
  generateManageUrl,
  canRescheduleBooking,
  canCancelBooking
} from './tokens';

// Re-export ICS utilities
export {
  generateBookingICS,
  generateICSFilename,
  createICSDownload
} from './ics';