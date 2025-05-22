
import { useState, useEffect } from 'react';
import { differenceInDays, isPast, parseISO } from 'date-fns';
import { toast } from 'sonner';

export interface ExpirationCheckOptions {
  expiresAt: string | null;
  onExpired?: () => void;
  onExpiring?: (daysLeft: number) => void;
  warningThresholdDays?: number;
  showToast?: boolean;
}

export const useExpirationCheck = ({
  expiresAt,
  onExpired,
  onExpiring,
  warningThresholdDays = 7,
  showToast = true,
}: ExpirationCheckOptions) => {
  const [isExpired, setIsExpired] = useState(false);
  const [isExpiring, setIsExpiring] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!expiresAt) return;

    const expDate = parseISO(expiresAt);
    const expired = isPast(expDate);
    setIsExpired(expired);

    if (expired) {
      if (onExpired) onExpired();
      if (showToast) {
        toast.warning("Listing has expired", {
          description: "This listing is no longer visible to the public."
        });
      }
      setDaysLeft(0);
      return;
    }

    const days = differenceInDays(expDate, new Date());
    setDaysLeft(days);

    if (days <= warningThresholdDays) {
      setIsExpiring(true);
      if (onExpiring) onExpiring(days);
      if (showToast) {
        toast.info("Listing will expire soon", {
          description: `${days} days left before this listing expires.`
        });
      }
    }
  }, [expiresAt, onExpired, onExpiring, warningThresholdDays, showToast]);

  return { isExpired, isExpiring, daysLeft };
};
