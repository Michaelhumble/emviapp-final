import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { fetchSalonJobs, fetchUserData, fetchApplicantsForJobs } from "@/utils/salon/statsQueries";
import { calculateProfileCompletion, formatFieldName } from "@/utils/salon/profileUtils";

export interface SalonStats {
  applicantsThisMonth: number;
  activeJobPosts: number;
  creditsRemaining: number;
  profileCompletion: {
    percentage: number;
    incompleteFields: string[];
  };
}

export function useSalonStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SalonStats>({
    applicantsThisMonth: 0,
    activeJobPosts: 0,
    creditsRemaining: 0,
    profileCompletion: {
      percentage: 0,
      incompleteFields: []
    }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    if (!user?.id) return;
    
    console.log("Fetching salon stats for user:", user.id);
    setLoading(true);
    setError(null);
    
    try {
      // Set up date range for applicants this month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      // Run queries in parallel
      const [jobsResponse, userDataResponse] = await Promise.all([
        fetchSalonJobs(user.id),
        fetchUserData(user.id)
      ]);
      
      // Get applicants if we have jobs
      let applicantsCount = 0;
      
      if (jobsResponse.data && jobsResponse.data.length > 0) {
        const jobIds = jobsResponse.data.map(job => job.id);
        console.log(`Found ${jobIds.length} active jobs, fetching applicants...`);
        
        const applicantsResponse = await fetchApplicantsForJobs(jobIds, firstDayOfMonth);
        applicantsCount = applicantsResponse.data?.length || 0;
        console.log(`Found ${applicantsCount} applicants this month`);
      } else {
        console.log("No active jobs found, skipping applicants query");
      }
      
      // Calculate profile completion
      const { completionPercentage, incompleteFields } = calculateProfileCompletion(userDataResponse.data);
      
      // Update state with all fetched data
      setStats({
        activeJobPosts: jobsResponse.data?.length || 0,
        applicantsThisMonth: applicantsCount,
        creditsRemaining: userDataResponse.data.credits || 0,
        profileCompletion: {
          percentage: completionPercentage,
          incompleteFields: incompleteFields
        }
      });
      
      setLastFetched(new Date());
      console.log("Stats updated successfully:", new Date().toISOString());
    } catch (err) {
      console.error("Error fetching salon stats:", err);
      
      // Improved error handling - ensure we always set a proper Error object
      if (err instanceof Error) {
        setError(err);
      } else {
        // Create an Error object if we received something else
        setError(new Error(String(err)));
      }
      
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
