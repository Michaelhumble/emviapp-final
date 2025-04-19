
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSalon } from "@/context/salon";

export interface TeamInviteData {
  full_name: string;
  phone_number: string;
  role: string;
}

export interface TeamInviteResponse {
  invite_code: string;
  expires_at: string;
}

export const useTeamInvites = () => {
  const { currentSalon } = useSalon();
  const [isLoading, setIsLoading] = useState(false);

  const createInvite = async (data: TeamInviteData): Promise<TeamInviteResponse | null> => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return null;
    }

    try {
      setIsLoading(true);
      
      // Call the create_team_invite function which should accept full_name parameter
      // If the database function doesn't accept p_full_name, we need to update it
      // For now, we'll handle this by providing a default in the backend function
      const { data: invite, error } = await supabase.rpc(
        'create_team_invite',
        {
          p_salon_id: currentSalon.id,
          p_phone_number: data.phone_number,
          p_role: data.role,
          p_full_name: data.full_name || "Unnamed Member"
        }
      );

      if (error) throw error;

      // Handle the response properly based on its structure
      if (Array.isArray(invite) && invite.length > 0) {
        // If it's an array, take the first element
        return invite[0] as TeamInviteResponse;
      } else if (invite && typeof invite === 'object') {
        // If it's already a single object
        return invite as TeamInviteResponse;
      }
      
      toast.error("Failed to create invite - unexpected response format");
      return null;
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
