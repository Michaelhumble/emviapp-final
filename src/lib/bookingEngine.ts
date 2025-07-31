// 🚀 UNIFIED BOOKING ENGINE - Single Source of Truth
// Powers ALL dashboards: Artist, Salon, Customer, Freelancer

import { supabase } from '@/integrations/supabase/client';
import { analytics } from '@/lib/analytics';
import { performanceMonitor } from '@/lib/performanceMonitor';

export interface BookingEvent {
  id: string;
  type: 'booking_created' | 'booking_updated' | 'booking_cancelled' | 'booking_confirmed' | 'payment_completed';
  booking_id: string;
  customer_id: string;
  artist_id: string;
  salon_id?: string;
  service_id?: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_intent_id?: string;
  amount?: number;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface BookingConflict {
  type: 'time_overlap' | 'artist_unavailable' | 'salon_closed' | 'double_booking';
  message: string;
  conflicting_booking_id?: string;
  suggested_times?: string[];
}

export class UnifiedBookingEngine {
  private static instance: UnifiedBookingEngine;
  private realtimeChannel: any;
  private eventListeners: Map<string, Function[]> = new Map();

  public static getInstance(): UnifiedBookingEngine {
    if (!UnifiedBookingEngine.instance) {
      UnifiedBookingEngine.instance = new UnifiedBookingEngine();
    }
    return UnifiedBookingEngine.instance;
  }

  constructor() {
    this.initializeRealtime();
  }

  // 🔴 REAL-TIME SYNC ENGINE
  private initializeRealtime(): void {
    this.realtimeChannel = supabase
      .channel('booking_events')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, (payload) => {
        console.log('📡 Real-time booking event:', payload);
        this.handleRealtimeEvent(payload);
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'booking_audit_log'
      }, (payload) => {
        console.log('📊 Booking audit event:', payload);
        this.handleAuditEvent(payload);
      })
      .subscribe();
  }

  private handleRealtimeEvent(payload: any): void {
    const eventType = this.mapDatabaseEventToBookingEvent(payload);
    
    if (eventType) {
      // Emit to all listeners
      this.emit('booking_event', {
        type: eventType,
        booking: payload.new || payload.old,
        change_type: payload.eventType
      });

      // Track analytics
      analytics.trackEvent({
        action: eventType,
        category: 'booking_realtime',
        label: payload.new?.status || 'unknown',
        custom_parameters: {
          booking_id: payload.new?.id || payload.old?.id,
          artist_id: payload.new?.recipient_id || payload.old?.recipient_id,
          real_time: true
        }
      });
    }
  }

  // 🎯 CONFLICT DETECTION ENGINE
  async detectConflicts(bookingData: {
    artist_id: string;
    date_requested: string;
    time_requested: string;
    duration_minutes?: number;
    exclude_booking_id?: string;
  }): Promise<BookingConflict[]> {
    const startTime = performance.now();
    const conflicts: BookingConflict[] = [];

    try {
      // Check for time overlaps
      const { data: existingBookings, error } = await supabase
        .from('bookings')
        .select('id, time_requested, date_requested, service_id')
        .eq('recipient_id', bookingData.artist_id)
        .eq('date_requested', bookingData.date_requested)
        .in('status', ['pending', 'confirmed'])
        .neq('id', bookingData.exclude_booking_id || '');

      if (error) throw error;

      // Check for time conflicts
      for (const booking of existingBookings || []) {
        if (this.isTimeOverlap(booking.time_requested, bookingData.time_requested)) {
          conflicts.push({
            type: 'time_overlap',
            message: `Time slot conflicts with existing booking at ${booking.time_requested}`,
            conflicting_booking_id: booking.id
          });
        }
      }

      // Check artist availability
      const isAvailable = await this.checkArtistAvailability(
        bookingData.artist_id,
        bookingData.date_requested,
        bookingData.time_requested
      );

      if (!isAvailable) {
        conflicts.push({
          type: 'artist_unavailable',
          message: 'Artist is not available at this time',
          suggested_times: await this.getSuggestedTimes(bookingData.artist_id, bookingData.date_requested)
        });
      }

      performanceMonitor.trackAPICall('conflict_detection', performance.now() - startTime, 200);
      return conflicts;
    } catch (error) {
      console.error('❌ Conflict detection failed:', error);
      performanceMonitor.trackAPICall('conflict_detection', performance.now() - startTime, 500);
      return [];
    }
  }

  // 💳 PAYMENT INTEGRATION
  async createBookingWithPayment(bookingData: {
    customer_id: string;
    artist_id: string;
    service_id: string;
    date_requested: string;
    time_requested: string;
    note?: string;
    payment_method_id?: string;
  }): Promise<{ booking: any; payment_intent?: any; conflicts: BookingConflict[] }> {
    
    // 1. Detect conflicts first
    const conflicts = await this.detectConflicts({
      artist_id: bookingData.artist_id,
      date_requested: bookingData.date_requested,
      time_requested: bookingData.time_requested
    });

    if (conflicts.length > 0) {
      return { booking: null, conflicts };
    }

    // 2. Get service details for payment
    const { data: service } = await supabase
      .from('artist_services')
      .select('id, name, price, duration')
      .eq('id', bookingData.service_id)
      .single();

    let payment_intent = null;

    // 3. Create payment intent if service has a price
    if (service?.price && service.price > 0) {
      try {
        const { data: paymentData } = await supabase.functions.invoke('create-payment-intent', {
          body: {
            amount: Math.round(service.price * 100), // Convert to cents
            customer_id: bookingData.customer_id,
            booking_metadata: {
              service_name: service.name,
              artist_id: bookingData.artist_id,
              date: bookingData.date_requested,
              time: bookingData.time_requested
            }
          }
        });
        payment_intent = paymentData;
      } catch (error) {
        console.error('💳 Payment intent creation failed:', error);
        throw new Error('Payment processing failed. Please try again.');
      }
    }

    // 4. Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        sender_id: bookingData.customer_id,
        recipient_id: bookingData.artist_id,
        service_id: bookingData.service_id,
        date_requested: bookingData.date_requested,
        time_requested: bookingData.time_requested,
        note: bookingData.note,
        status: payment_intent ? 'pending_payment' : 'pending',
        metadata: {
          payment_intent_id: payment_intent?.id,
          service_price: service?.price,
          requires_payment: !!payment_intent
        }
      })
      .select()
      .single();

    if (error) throw error;

    // 5. Log the event for AI/ML
    await this.logBookingEvent({
      id: `evt_${Date.now()}`,
      type: 'booking_created',
      booking_id: booking.id,
      customer_id: bookingData.customer_id,
      artist_id: bookingData.artist_id,
      service_id: bookingData.service_id,
      date_requested: bookingData.date_requested,
      time_requested: bookingData.time_requested,
      status: booking.status,
      payment_status: payment_intent ? 'pending' : undefined,
      payment_intent_id: payment_intent?.id,
      amount: service?.price,
      created_at: new Date().toISOString()
    });

    // 6. Send notifications
    await this.sendBookingNotifications(booking, 'created');

    // 7. Track analytics
    analytics.trackBookingCreated({
      bookingId: booking.id,
      serviceType: service?.name || 'Unknown',
      servicePrice: service?.price || 0,
      artistId: bookingData.artist_id
    });

    return { booking, payment_intent, conflicts: [] };
  }

  // 📧 NOTIFICATION ENGINE
  private async sendBookingNotifications(booking: any, event_type: string): Promise<void> {
    try {
      await supabase.functions.invoke('send-booking-notifications', {
        body: {
          booking_id: booking.id,
          event_type,
          booking_data: booking
        }
      });
    } catch (error) {
      console.error('📧 Notification sending failed:', error);
      // Don't throw - notifications are non-critical
    }
  }

  // 🤖 AI/ML LOGGING
  private async logBookingEvent(event: BookingEvent): Promise<void> {
    try {
      await supabase
        .from('booking_events_log')
        .insert({
          event_id: event.id,
          event_type: event.type,
          booking_id: event.booking_id,
          customer_id: event.customer_id,
          artist_id: event.artist_id,
          salon_id: event.salon_id,
          event_data: {
            date_requested: event.date_requested,
            time_requested: event.time_requested,
            status: event.status,
            payment_status: event.payment_status,
            amount: event.amount,
            metadata: event.metadata
          },
          created_at: event.created_at
        });

      console.log('🤖 Event logged for AI/ML:', event.type, event.booking_id);
    } catch (error) {
      console.error('🤖 Event logging failed:', error);
    }
  }

  // 🔄 EVENT SYSTEM
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('📡 Event listener error:', error);
      }
    });
  }

  // 🔍 UTILITY METHODS
  private isTimeOverlap(time1: string, time2: string): boolean {
    // Simple time overlap check - can be enhanced with duration
    return time1 === time2;
  }

  private async checkArtistAvailability(artist_id: string, date: string, time: string): Promise<boolean> {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
    const { data } = await supabase
      .from('artist_availability')
      .select('start_time, end_time')
      .eq('artist_id', artist_id)
      .eq('day_of_week', dayName)
      .eq('is_available', true);

    if (!data || data.length === 0) return false;

    const requestedTime = new Date(`1970-01-01T${time}`);
    return data.some(slot => {
      const startTime = new Date(`1970-01-01T${slot.start_time}`);
      const endTime = new Date(`1970-01-01T${slot.end_time}`);
      return requestedTime >= startTime && requestedTime <= endTime;
    });
  }

  private async getSuggestedTimes(artist_id: string, date: string): Promise<string[]> {
    // Return suggested available times - simplified for now
    return ['10:00', '14:00', '16:00'];
  }

  private mapDatabaseEventToBookingEvent(payload: any): string | null {
    switch (payload.eventType) {
      case 'INSERT': return 'booking_created';
      case 'UPDATE': 
        if (payload.new?.status === 'cancelled') return 'booking_cancelled';
        if (payload.new?.status === 'confirmed') return 'booking_confirmed';
        return 'booking_updated';
      case 'DELETE': return 'booking_cancelled';
      default: return null;
    }
  }

  // 🧹 CLEANUP
  destroy(): void {
    if (this.realtimeChannel) {
      supabase.removeChannel(this.realtimeChannel);
    }
    this.eventListeners.clear();
  }
}

// Export singleton instance
export const bookingEngine = UnifiedBookingEngine.getInstance();