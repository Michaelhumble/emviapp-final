
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BoostStatus {
  isActive: boolean;
  expiresAt: Date | null;
}

export interface SalonCreditsState {
  credits: number;
  boostStatus: BoostStatus;
  loading: boolean;
  error: Error | null;
  refreshCredits: () => Promise<void>;
}

export function useSalonCredits(): SalonCreditsState {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null
  });

  const fetchCreditData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user's credit balance
      const { data, error } = await supabase
        .from('users')
        .select('credits, boosted_until')
        .eq('id', user.id)
        .eq('role', 'salon')
        .single();
        
      if (error) throw error;
      
      // Set credits
      setCredits(data?.credits || 0);
      
      // Set boost status
      const boostedUntil = data?.boosted_until ? new Date(data.boosted_until) : null;
      const isActive = boostedUntil ? boostedUntil > new Date() : false;
      
      setBoostStatus({
        isActive,
        expiresAt: boostedUntil
      });
      
      console.log("Salon credits data fetched successfully:", { 
        credits: data?.credits,
        boostedUntil,
        isActive
      });
    } catch (err) {
      console.error("Error fetching credit data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to load credit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchCreditData();
    }
  }, [user?.id]);

  return {
    credits,
    boostStatus,
    loading,
    error,
    refreshCredits: fetchCreditData
  };
}
