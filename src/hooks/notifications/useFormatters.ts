
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Hook providing formatting utilities for notifications
 */
export const useFormatters = () => {
  const { t } = useTranslation();

  /**
   * Format a date for display
   */
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

  return {
    formatBookingDate,
    t
  };
};
