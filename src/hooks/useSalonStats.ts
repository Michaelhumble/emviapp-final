
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface SalonStats {
  applicantsThisMonth: number;
  activeJobPosts: number;
  creditsRemaining: number;
}

export function useSalonStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SalonStats>({
    applicantsThisMonth: 0,
    activeJobPosts: 0,
    creditsRemaining: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Set up date range for applicants this month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      // Run all queries in parallel using Promise.all
      const [jobsResponse, userData] = await Promise.all([
        // Query 1: Fetch active job posts
        supabase
          .from('jobs')
          .select('id')
          .eq('salon_id', user.id)
          .eq('status', 'active'),
          
        // Query 2: Fetch user credits
        supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .single()
      ]);
      
      // Handle any errors from the job posts query
      if (jobsResponse.error) throw jobsResponse.error;
      
      // Handle any errors from the user data query
      if (userData.error) throw userData.error;
      
      // Prepare for applicants query (only if we have job posts)
      let applicantsCount = 0;
      
      if (jobsResponse.data && jobsResponse.data.length > 0) {
        const jobIds = jobsResponse.data.map(job => job.id);
        
        // Query 3: Fetch applicants this month (only needed if we have jobs)
        const applicantsResponse = await supabase
          .from('job_applications')
          .select('id')
          .in('job_id', jobIds)
          .gte('created_at', firstDayOfMonth.toISOString());
          
        if (applicantsResponse.error) throw applicantsResponse.error;
        
        applicantsCount = applicantsResponse.data?.length || 0;
      }
      
      // Update state with all fetched data
      setStats({
        activeJobPosts: jobsResponse.data?.length || 0,
        applicantsThisMonth: applicantsCount,
        creditsRemaining: userData?.data?.credits || 0
      });
      
      setLastFetched(new Date());
    } catch (err) {
      console.error("Error fetching salon stats:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      // Keep previous stats if there's an error
      toast.error("Failed to update dashboard stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  
  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id, fetchStats]);
  
  // Set up auto-refresh every 5 minutes
  useEffect(() => {
    if (!user?.id) return;
    
    const intervalId = setInterval(() => {
      console.log("Auto-refreshing salon stats...");
      fetchStats();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, [user?.id, fetchStats]);
  
  return {
    stats,
    loading,
    error,
    lastFetched,
    refresh: fetchStats
  };
}
