
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
 * Hook to handle artist-specific booking notifications
 */
export const useArtistNotifications = () => {
  const { formatBookingDate, t } = useFormatters();
  const { getUserName, getServiceDetails } = useUserNameResolver();

  /**
   * Handle new booking creation notifications for artists
   */
  const handleNewBookingReceived = async (booking: BookingData) => {
    const customerName = await getUserName(booking.sender_id);
    const serviceTitle = booking.service_id 
      ? await getServiceDetails(booking.service_id) 
      : t({
          english: 'a service',
          vietnamese: 'một dịch vụ'
        });
    const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
    
    toast.success(t({
      english: `You have a new appointment with ${customerName} for ${serviceTitle} on ${dateTime}`,
      vietnamese: `Bạn có lịch hẹn mới với ${customerName} cho ${serviceTitle} vào ${dateTime}`
    }), {
      description: t({
        english: 'New Booking Request',
        vietnamese: 'Yêu cầu đặt lịch mới'
      })
    });
  };

  /**
   * Handle booking status change notifications for artists
   */
  const handleBookingStatusChange = async (booking: BookingData, previousStatus?: string) => {
    if (!previousStatus || previousStatus === booking.status) return;
    
    const customerName = await getUserName(booking.sender_id);
    const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
    
    if (booking.status === 'cancelled') {
      toast.error(t({
        english: `The booking with ${customerName} on ${dateTime} has been cancelled.`,
        vietnamese: `Lịch hẹn với ${customerName} vào ${dateTime} đã bị hủy.`
      }), {
        description: t({
          english: 'Booking Cancelled',
          vietnamese: 'Lịch hẹn đã bị hủy'
        })
      });
    } else if (booking.status === 'completed') {
      toast.success(t({
        english: `The booking with ${customerName} on ${dateTime} has been marked as completed.`,
        vietnamese: `Lịch hẹn với ${customerName} vào ${dateTime} đã được đánh dấu là hoàn thành.`
      }), {
        description: t({
          english: 'Booking Completed',
          vietnamese: 'Lịch hẹn đã hoàn thành'
        })
      });
    }
  };

  return {
    handleNewBookingReceived,
    handleBookingStatusChange
  };
};
