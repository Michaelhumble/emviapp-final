
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonTeamMember } from "./types";

export const useTeamMembers = () => {
  const { currentSalon } = useSalon();
  const [teamMembers, setTeamMembers] = useState<SalonTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeamMembers = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('salon_staff')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('full_name', { ascending: true });

      if (error) throw error;

      setTeamMembers(data.map(staff => ({
        id: staff.id,
        full_name: staff.full_name,
        role: staff.role,
        specialty: staff.specialty || '',
        status: staff.status as 'active' | 'inactive' | 'pending',
        avatar_url: staff.avatar_url
      })));
    } catch (err: any) {
      console.error("Error fetching team members:", err);
      setError(new Error("Failed to load team members"));
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return {
    teamMembers,
    loading,
    error,
    fetchTeamMembers
  };
};
