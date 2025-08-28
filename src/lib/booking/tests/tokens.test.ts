import { describe, it, expect } from 'vitest';
import { canRescheduleBooking, canCancelBooking } from '../tokens';

describe('Booking Token Utilities', () => {
  describe('canRescheduleBooking', () => {
    it('should allow reschedule if more than 2 hours away', () => {
      const futureTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(); // 3 hours from now
      expect(canRescheduleBooking(futureTime)).toBe(true);
    });

    it('should not allow reschedule if less than 2 hours away', () => {
      const nearTime = new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(); // 1 hour from now
      expect(canRescheduleBooking(nearTime)).toBe(false);
    });

    it('should not allow reschedule if time has passed', () => {
      const pastTime = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(); // 1 hour ago
      expect(canRescheduleBooking(pastTime)).toBe(false);
    });
  });

  describe('canCancelBooking', () => {
    it('should allow cancel if more than 1 hour away', () => {
      const futureTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours from now
      expect(canCancelBooking(futureTime)).toBe(true);
    });

    it('should not allow cancel if less than 1 hour away', () => {
      const nearTime = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes from now
      expect(canCancelBooking(nearTime)).toBe(false);
    });

    it('should not allow cancel if time has passed', () => {
      const pastTime = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(); // 1 hour ago
      expect(canCancelBooking(pastTime)).toBe(false);
    });
  });
});