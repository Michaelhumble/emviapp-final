// ICS calendar event generation utilities
import type { Booking, Service } from './types';

/**
 * Generate ICS content for a booking
 */
export function generateBookingICS(
  booking: Booking, 
  service?: Service,
  method: 'REQUEST' | 'CANCEL' = 'REQUEST'
): string {
  const now = new Date();
  const startDate = new Date(booking.starts_at || '');
  const endDate = new Date(booking.ends_at || '');
  
  // Format dates for ICS (YYYYMMDDTHHMMSSZ format in UTC)
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const uid = `booking-${booking.id}@emviapp.com`;
  const sequence = booking.ics_sequence || 0;
  const summary = service?.title || service?.name || 'Beauty Service Appointment';
  const description = [
    `Service: ${summary}`,
    booking.note ? `Notes: ${booking.note}` : '',
    `Booked via EmviApp`,
  ].filter(Boolean).join('\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EmviApp//Booking System//EN',
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(now)}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `SEQUENCE:${sequence}`,
    booking.status === 'cancelled' ? 'STATUS:CANCELLED' : 'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

/**
 * Generate ICS filename for download
 */
export function generateICSFilename(booking: Booking, service?: Service): string {
  const serviceName = service?.title || service?.name || 'appointment';
  const date = booking.date_requested || new Date().toISOString().split('T')[0];
  const safeName = serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  return `${safeName}-${date}.ics`;
}

/**
 * Create downloadable ICS blob
 */
export function createICSDownload(booking: Booking, service?: Service, method: 'REQUEST' | 'CANCEL' = 'REQUEST'): void {
  const icsContent = generateBookingICS(booking, service, method);
  const filename = generateICSFilename(booking, service);
  
  const blob = new Blob([icsContent], { 
    type: 'text/calendar;charset=utf-8' 
  });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}