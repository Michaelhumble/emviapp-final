
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
  const { getUserName, getServiceDetails } = useUserNameResolver();

  /**
   * Handle new booking creation notifications for customers
   */
  const handleNewBookingCreated = async (booking: BookingData) => {
    const artistName = await getUserName(booking.recipient_id);
    const serviceTitle = booking.service_id 
      ? await getServiceDetails(booking.service_id) 
      : t({
          english: 'a service',
          vietnamese: 'một dịch vụ'
        });
    const dateTime = formatBookingDate(booking.date_requested, booking.time_requested);
    
    toast.success(t({
      english: `Successfully requested booking with ${artistName} for ${serviceTitle} on ${dateTime}`,
      vietnamese: `Đã yêu cầu đặt lịch thành công với ${artistName} cho ${serviceTitle} vào ${dateTime}`
    }));
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
        english: `${artistName} has accepted your booking for ${dateTime}!`,
        vietnamese: `${artistName} đã chấp nhận lịch hẹn của bạn vào ${dateTime}!`
      }));
    } else if (booking.status === 'declined') {
      toast.error(t({
        english: `${artistName} has declined your booking for ${dateTime}`,
        vietnamese: `${artistName} đã từ chối lịch hẹn của bạn vào ${dateTime}`
      }));
    }
  };

  return {
    handleNewBookingCreated,
    handleBookingStatusChange
  };
};
