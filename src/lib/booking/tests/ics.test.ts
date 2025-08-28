import { describe, it, expect } from 'vitest';
import { generateBookingICS, generateICSFilename } from '../ics';
import type { Booking, Service } from '../types';

describe('ICS Utilities', () => {
  const mockBooking: Booking = {
    id: 'test-booking-id',
    sender_id: 'customer-id',
    recipient_id: 'artist-id',
    client_name: 'John Doe',
    client_email: 'john@example.com',
    date_requested: '2024-01-15',
    time_requested: '10:00',
    starts_at: '2024-01-15T10:00:00Z',
    ends_at: '2024-01-15T11:00:00Z',
    status: 'confirmed',
    note: 'Test booking notes',
    ics_sequence: 0,
    created_at: '2024-01-10T12:00:00Z'
  };

  const mockService: Service = {
    id: 'service-id',
    title: 'Hair Cut',
    name: 'Hair Cut',
    duration_minutes: 60,
    price: 50,
    user_id: 'artist-id',
    artist_id: 'artist-id',
    is_active: true,
    location_type: 'in_person'
  };

  describe('generateBookingICS', () => {
    it('should generate valid ICS content for REQUEST method', () => {
      const ics = generateBookingICS(mockBooking, mockService, 'REQUEST');
      
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('END:VCALENDAR');
      expect(ics).toContain('METHOD:REQUEST');
      expect(ics).toContain(`UID:booking-${mockBooking.id}@emviapp.com`);
      expect(ics).toContain('SUMMARY:Hair Cut');
      expect(ics).toContain('SEQUENCE:0');
      expect(ics).toContain('STATUS:CONFIRMED');
    });

    it('should generate valid ICS content for CANCEL method', () => {
      const cancelledBooking = { ...mockBooking, status: 'cancelled' as const };
      const ics = generateBookingICS(cancelledBooking, mockService, 'CANCEL');
      
      expect(ics).toContain('METHOD:CANCEL');
      expect(ics).toContain('STATUS:CANCELLED');
    });

    it('should handle booking without service', () => {
      const ics = generateBookingICS(mockBooking, undefined, 'REQUEST');
      
      expect(ics).toContain('SUMMARY:Beauty Service Appointment');
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('END:VCALENDAR');
    });

    it('should include booking notes in description', () => {
      const ics = generateBookingICS(mockBooking, mockService, 'REQUEST');
      
      expect(ics).toContain('DESCRIPTION:Service: Hair Cut\\nNotes: Test booking notes\\nBooked via EmviApp');
    });
  });

  describe('generateICSFilename', () => {
    it('should generate filename with service name and date', () => {
      const filename = generateICSFilename(mockBooking, mockService);
      expect(filename).toBe('hair-cut-2024-01-15.ics');
    });

    it('should handle booking without service', () => {
      const filename = generateICSFilename(mockBooking, undefined);
      expect(filename).toBe('appointment-2024-01-15.ics');
    });

    it('should sanitize service name for filename', () => {
      const serviceWithSpecialChars = { 
        ...mockService, 
        title: 'Hair Cut & Styling!!!' 
      };
      const filename = generateICSFilename(mockBooking, serviceWithSpecialChars);
      expect(filename).toBe('hair-cut---styling----2024-01-15.ics');
    });
  });
});