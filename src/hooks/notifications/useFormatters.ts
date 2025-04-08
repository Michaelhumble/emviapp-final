
import { useTranslation } from "@/hooks/useTranslation";
import { format } from "date-fns";

export const useFormatters = () => {
  const { t } = useTranslation();

  const formatBookingDate = (dateStr: string, timeStr: string) => {
    try {
      const formattedDate = format(new Date(dateStr), "MMMM dd, yyyy");
      return `${formattedDate} at ${timeStr}`;
    } catch (error) {
      return `${dateStr} at ${timeStr}`;
    }
  };

  return {
    formatBookingDate,
    t
  };
};
