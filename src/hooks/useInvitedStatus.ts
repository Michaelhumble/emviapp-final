
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export const useInvitedStatus = () => {
  const { user } = useAuth();
  const [isInvited, setIsInvited] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInvitedStatus = async () => {
      if (!user) {
        setIsInvited(null);
        setLoading(false);
        return;
      }

      try {
        // Query the users table to check the invited status
        const { data, error } = await supabase
          .from('users')
          .select('invited')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error checking invited status:", error);
          toast.error("Failed to verify access permissions");
          setIsInvited(false);
        } else {
          setIsInvited(data?.invited || false);
        }
      } catch (error) {
        console.error("Error in invited status check:", error);
        setIsInvited(false);
      } finally {
        setLoading(false);
      }
    };

    checkInvitedStatus();
  }, [user]);

  return { isInvited, loading };
};
