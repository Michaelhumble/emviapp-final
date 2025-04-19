
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
      
      // Call the create_team_invite function
      // Using destructuring for clarity to only include parameters the function accepts
      const params = {
        p_salon_id: currentSalon.id,
        p_phone_number: data.phone_number,
        p_role: data.role
      };
      
      // Add comment to clarify that we're not using full_name in the RPC call yet
      // We'll need to update the Supabase function to accept this parameter
      const { data: invite, error } = await supabase.rpc(
        'create_team_invite',
        params
      );

      if (error) throw error;

      // Handle the response properly based on its structure
      if (Array.isArray(invite) && invite.length > 0) {
        // If it's an array, take the first element and cast properly
        const firstInvite = invite[0] as { invite_code: string; expires_at: string };
        return {
          invite_code: firstInvite.invite_code,
          expires_at: firstInvite.expires_at
        };
      } else if (invite && typeof invite === 'object') {
        // If it's already a single object, ensure it matches our interface
        const typedInvite = invite as { invite_code: string; expires_at: string };
        return {
          invite_code: typedInvite.invite_code,
          expires_at: typedInvite.expires_at
        };
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
