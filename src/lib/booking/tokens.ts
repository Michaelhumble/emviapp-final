// Secure token utilities for booking management
import { supabase } from '@/integrations/supabase/client';
import type { ManageBookingToken } from './types';

/**
 * Generate a secure manage token for a booking
 */
export async function generateManageToken(bookingId: string, email: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.rpc('generate_manage_token', {
      p_booking_id: bookingId,
      p_email: email
    });

    if (error) {
      console.error('Error generating manage token:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error generating manage token:', error);
    return null;
  }
}

/**
 * Verify a manage token for a booking
 */
export async function verifyManageToken(token: string, bookingId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('verify_manage_token', {
      p_token: token,
      p_booking_id: bookingId
    });

    if (error) {
      console.error('Error verifying manage token:', error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('Error verifying manage token:', error);
    return false;
  }
}

/**
 * Generate manage URL for booking
 */
export function generateManageUrl(bookingId: string, token: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://preview--emviapp-final.lovable.app';
  
  return `${baseUrl}/bookings/manage?id=${bookingId}&token=${token}`;
}

/**
 * Check if reschedule is allowed (not within 2 hours of start time)
 */
export function canRescheduleBooking(startsAt: string): boolean {
  const bookingTime = new Date(startsAt);
  const now = new Date();
  const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  return hoursUntilBooking > 2; // Allow reschedule if more than 2 hours away
}

/**
 * Check if cancellation is allowed (not within 1 hour of start time)
 */
export function canCancelBooking(startsAt: string): boolean {
  const bookingTime = new Date(startsAt);
  const now = new Date();
  const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  return hoursUntilBooking > 1; // Allow cancel if more than 1 hour away
}