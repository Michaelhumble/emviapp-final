import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { toast } from "sonner";

export interface UniversalInvite {
  id: string;
  salon_id: string;
  invite_code: string;
  created_by: string;
  max_uses: number;
  current_uses: number;
  default_role: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'expired' | 'disabled';
  metadata: Record<string, any>;
}

export interface UniversalInviteResponse {
  invite_code: string;
  expires_at: string;
}

export const useUniversalInvites = () => {
  const { currentSalon } = useSalon();
  const [universalInvites, setUniversalInvites] = useState<UniversalInvite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUniversalInvites = async () => {
    if (!currentSalon?.id) {
      setUniversalInvites([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('universal_team_invites')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast to match our interface
      const typedData = (data || []).map(invite => ({
        ...invite,
        status: invite.status as 'active' | 'expired' | 'disabled',
        metadata: invite.metadata as Record<string, any>
      }));
      
      setUniversalInvites(typedData);
    } catch (err: any) {
      console.error('Error fetching universal invites:', err);
      setError(new Error('Failed to load universal invites'));
      setUniversalInvites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createUniversalInvite = async (
    maxUses: number,
    defaultRole: string = 'technician'
  ): Promise<UniversalInviteResponse | null> => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return null;
    }

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.rpc(
        'create_universal_team_invite',
        {
          p_salon_id: currentSalon.id,
          p_max_uses: maxUses,
          p_default_role: defaultRole
        }
      );

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        const invite = data[0];
        await fetchUniversalInvites(); // Refresh list
        toast.success(`Universal invite link created! ${maxUses} spots available.`);
        return {
          invite_code: invite.invite_code,
          expires_at: invite.expires_at
        };
      } else if (data && typeof data === 'object') {
        const typedInvite = data as unknown as { invite_code: string; expires_at: string };
        await fetchUniversalInvites(); // Refresh list
        toast.success(`Universal invite link created! ${maxUses} spots available.`);
        return {
          invite_code: typedInvite.invite_code,
          expires_at: typedInvite.expires_at
        };
      }
      
      toast.error("Failed to create universal invite - unexpected response format");
      return null;
    } catch (error: any) {
      console.error('Error creating universal invite:', error);
      toast.error("Failed to create universal invite");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const disableUniversalInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from('universal_team_invites')
        .update({ status: 'disabled' })
        .eq('id', inviteId);

      if (error) throw error;
      
      await fetchUniversalInvites(); // Refresh list
      toast.success("Universal invite disabled");
    } catch (error: any) {
      console.error('Error disabling universal invite:', error);
      toast.error("Failed to disable universal invite");
    }
  };

  const acceptUniversalInvite = async (
    inviteCode: string,
    fullName: string,
    phoneNumber: string,
    email?: string
  ) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.rpc(
        'accept_universal_invite',
        {
          p_invite_code: inviteCode,
          p_full_name: fullName,
          p_phone_number: phoneNumber,
          p_email: email || null
        }
      );

      if (error) throw error;

      if (data && typeof data === 'object' && 'success' in data) {
        const result = data as any;
        if (result.success) {
          toast.success(String(result.message) || 'Successfully joined the team!');
          return { success: true, salonId: result.salon_id, staffId: result.staff_id };
        } else {
          toast.error(String(result.message) || 'Failed to accept invite');
          return { success: false, message: String(result.message) };
        }
      }
      
      toast.error("Unexpected response format");
      return { success: false, message: "Unexpected response format" };
    } catch (error: any) {
      console.error('Error accepting universal invite:', error);
      toast.error("Failed to accept invite");
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversalInvites();
  }, [currentSalon?.id]);

  return {
    universalInvites,
    isLoading,
    error,
    createUniversalInvite,
    disableUniversalInvite,
    acceptUniversalInvite,
    fetchUniversalInvites
  };
};