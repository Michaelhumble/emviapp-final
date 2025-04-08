
import { toast } from 'sonner';
import { useFormatters } from './useFormatters';
import { useUserNameResolver } from './useUserNameResolver';

interface BookingData {
  id: string;
  sender_id: string;
  recipient_id: string;
  status: string;
  date_requested: string;
  time_requested: string;
  service_id?: string;
}

/**
 * Hook to handle customer-specific booking notifications
 */
export const useCustomerNotifications = () => {
  const { formatBookingDate, t } = useFormatters();
  const { getUserName } = useUserNameResolver();

  /**
   * Handle new booking creation notifications for customers
   */
  const handleNewBookingCreated = async (booking: BookingData) => {
    const artistName = await getUserName(booking.recipient_id);
    const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
    
    toast.success(t({
      english: `Your booking request with ${artistName} for ${dateTime} has been sent.`,
      vietnamese: `Yêu cầu đặt lịch của bạn với ${artistName} vào ${dateTime} đã được gửi.`
    }), {
      description: t({
        english: 'Booking Sent',
        vietnamese: 'Đã gửi lịch hẹn'
      })
    });
  };

  /**
   * Handle booking status change notifications for customers
   */
  const handleBookingStatusChange = async (booking: BookingData, previousStatus?: string) => {
    if (!previousStatus || previousStatus === booking.status) return;
    
    const artistName = await getUserName(booking.recipient_id);
    const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
    
    if (booking.status === 'accepted') {
      toast.success(t({
        english: `Your booking with ${artistName} on ${dateTime} has been confirmed.`,
        vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã được xác nhận.`
      }), {
        description: t({
          english: 'Booking Confirmed',
          vietnamese: 'Lịch hẹn đã được xác nhận'
        })
      });
    } else if (booking.status === 'declined') {
      toast.error(t({
        english: `Your booking with ${artistName} on ${dateTime} has been declined.`,
        vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã bị từ chối.`
      }), {
        description: t({
          english: 'Booking Declined',
          vietnamese: 'Lịch hẹn bị từ chối'
        })
      });
    } else if (booking.status === 'cancelled') {
      toast.error(t({
        english: `Your booking with ${artistName} on ${dateTime} has been cancelled.`,
        vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã bị hủy.`
      }), {
        description: t({
          english: 'Booking Cancelled',
          vietnamese: 'Lịch hẹn đã bị hủy'
        })
      });
    } else if (booking.status === 'completed') {
      toast.success(t({
        english: `Your booking with ${artistName} on ${dateTime} has been marked as completed.`,
        vietnamese: `Lịch hẹn của bạn với ${artistName} vào ${dateTime} đã được đánh dấu là hoàn thành.`
      }), {
        description: t({
          english: 'Booking Completed',
          vietnamese: 'Lịch hẹn đã hoàn thành'
        })
      });
    }
  };

  return {
    handleNewBookingCreated,
    handleBookingStatusChange
  };
};
