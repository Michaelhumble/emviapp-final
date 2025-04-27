
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UseJobRenewalProps {
  jobId?: string;
  expiresAt?: string | null;
  onSuccess?: () => void;
}

export const useJobRenewal = ({ jobId, expiresAt, onSuccess }: UseJobRenewalProps = {}) => {
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  const renewJob = async (targetJobId?: string) => {
    const idToUse = targetJobId || jobId;
    
    if (!idToUse) {
      toast.error("Job ID is missing");
      return;
    }

    setRenewalJobId(idToUse);
    setIsRenewing(true);

    // Calculate new expiration date (30 days from now)
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 30);

    try {
      const { error } = await supabase
        .from("jobs")
        .update({
          expires_at: newExpiresAt.toISOString(),
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", idToUse);

      if (error) throw error;

      toast.success("Job listing renewed successfully for 30 days");

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error renewing job:", error);
      toast.error("Failed to renew job listing");
    } finally {
      setIsRenewing(false);
      // Reset the renewal job ID after a slight delay
      setTimeout(() => setRenewalJobId(null), 500);
    }
  };

  const calculateDaysRemaining = () => {
    if (!expiresAt) return 0;

    const now = new Date();
    const expDate = new Date(expiresAt);
    const diffTime = expDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining();
  const isExpired = daysRemaining <= 0;
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 5;

  return {
    renewJob,
    isRenewing,
    daysRemaining,
    isExpired,
    isExpiringSoon,
    renewalJobId
  };
};
