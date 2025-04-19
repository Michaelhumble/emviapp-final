
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSalon } from "@/context/salon";

export interface TeamInviteData {
  phone_number: string;
  role: string;
}

export const useTeamInvites = () => {
  const { currentSalon } = useSalon();
  const [isLoading, setIsLoading] = useState(false);

  const createInvite = async (data: TeamInviteData) => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return null;
    }

    try {
      setIsLoading(true);
      
      const { data: invite, error } = await supabase.rpc(
        'create_team_invite',
        {
          p_salon_id: currentSalon.id,
          p_phone_number: data.phone_number,
          p_role: data.role
        }
      );

      if (error) throw error;
      
      return invite;
    } catch (error) {
      console.error('Error creating team invite:', error);
      toast.error("Failed to create invite");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createInvite,
    isLoading
  };
};
