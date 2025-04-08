
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

interface BookingChangePayload {
  new: {
    id: string;
    sender_id: string;
    recipient_id: string;
    status: string;
    date_requested: string;
    time_requested: string;
    service_id?: string;
  };
  old?: {
    status?: string;
  };
}

/**
 * Hook to listen for booking changes and display notifications
 */
export const useBookingNotifications = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;

    // Function to get user name from ID
    const getUserName = async (userId: string): Promise<string> => {
      try {
        const { data } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', userId)
          .single();
        
        return data?.full_name || t('Unknown user');
      } catch (error) {
        console.error('Error fetching user:', error);
        return t('Unknown user');
      }
    };

    // Function to get service details
    const getServiceDetails = async (serviceId: string) => {
      try {
        const { data } = await supabase
          .from('services')
          .select('title')
          .eq('id', serviceId)
          .single();
        
        return data?.title || t('a service');
      } catch (error) {
        console.error('Error fetching service:', error);
        return t('a service');
      }
    };

    // Format date for display
    const formatBookingDate = (date: string, time: string) => {
      if (!date) return '';
      try {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString();
        return `${formattedDate} ${time || ''}`;
      } catch (e) {
        return `${date} ${time || ''}`;
      }
    };

    // Set up channel for bookings where user is involved
    const channel = supabase
      .channel('booking-notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'bookings',
          filter: `sender_id=eq.${user.id}`
        }, 
        async (payload) => {
          const booking = payload.new as BookingChangePayload['new'];
          const artistName = await getUserName(booking.recipient_id);
          const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
          
          // Notification for customer when they create a booking
          toast({
            title: t({
              english: 'Booking Sent',
              vietnamese: 'Đã gửi lịch hẹn'
            }),
            description: t({
              english: `Your booking request with ${artistName} for ${dateTime} has been sent.`,
              vietnamese: `Yêu cầu đặt lịch của bạn với ${artistName} vào ${dateTime} đã được gửi.`
            })
          });
        })
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        }, 
        async (payload) => {
          const booking = payload.new as BookingChangePayload['new'];
          const customerName = await getUserName(booking.sender_id);
          const serviceTitle = booking.service_id ? await getServiceDetails(booking.service_id) : t('a service');
          const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
          
          // Notification for artist when they receive a booking
          toast({
            title: t({
              english: 'New Booking Request',
              vietnamese: 'Yêu cầu đặt lịch mới'
            }),
            description: t({
              english: `You have a new appointment with ${customerName} for ${serviceTitle} on ${dateTime}`,
              vietnamese: `Bạn có lịch hẹn mới với ${customerName} cho ${serviceTitle} vào ${dateTime}`
            })
          });
        })
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings',
          filter: `sender_id=eq.${user.id}`
        }, 
        async (payload: BookingChangePayload) => {
          if (!payload.old || payload.old.status === payload.new.status) return;
          
          const booking = payload.new;
          const artistName = await getUserName(booking.recipient_id);
          const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
          
          // Status change notifications for customer
          if (booking.status === 'accepted') {
            toast({
              title: t({
                english: 'Booking Confirmed',
                vietnamese: 'Lịch hẹn đã được xác nhận'
              }),
              description: t({
                english: `Your booking with ${artistName} on ${dateTime} has been confirmed.`,
                vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã được xác nhận.`
              })
            });
          } else if (booking.status === 'declined') {
            toast({
              title: t({
                english: 'Booking Declined',
                vietnamese: 'Lịch hẹn bị từ chối'
              }),
              description: t({
                english: `Your booking with ${artistName} on ${dateTime} has been declined.`,
                vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã bị từ chối.`
              })
            });
          } else if (booking.status === 'cancelled') {
            toast({
              title: t({
                english: 'Booking Cancelled',
                vietnamese: 'Lịch hẹn đã bị hủy'
              }),
              description: t({
                english: `Your booking with ${artistName} on ${dateTime} has been cancelled.`,
                vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã bị hủy.`
              })
            });
          } else if (booking.status === 'completed') {
            toast({
              title: t({
                english: 'Booking Completed',
                vietnamese: 'Lịch hẹn đã hoàn thành'
              }),
              description: t({
                english: `Your booking with ${artistName} on ${dateTime} has been marked as completed.`,
                vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã được đánh dấu là hoàn thành.`
              })
            });
          }
        })
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        }, 
        async (payload: BookingChangePayload) => {
          if (!payload.old || payload.old.status === payload.new.status) return;
          
          const booking = payload.new;
          const customerName = await getUserName(booking.sender_id);
          const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
          
          // Status change notifications for artist
          if (booking.status === 'cancelled') {
            toast({
              title: t({
                english: 'Booking Cancelled',
                vietnamese: 'Lịch hẹn đã bị hủy'
              }),
              description: t({
                english: `The booking with ${customerName} on ${dateTime} has been cancelled.`,
                vietnamese: `Lịch hẹn với ${customerName} vào ${dateTime} đã bị hủy.`
              })
            });
          } else if (booking.status === 'completed') {
            toast({
              title: t({
                english: 'Booking Completed',
                vietnamese: 'Lịch hẹn đã hoàn thành'
              }),
              description: t({
                english: `The booking with ${customerName} on ${dateTime} has been marked as completed.`,
                vietnamese: `Lịch hẹn với ${customerName} vào ${dateTime} đã được đánh dấu là hoàn thành.`
              })
            });
          }
        })
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, t]);

  return null; // This hook doesn't return anything, it just sets up listeners
};
