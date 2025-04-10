
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

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
    
    setLoading(true);
    setError(null);
    
    try {
      // Set up date range for applicants this month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      // Run all queries in parallel using Promise.all
      const [jobsResponse, userDataResponse] = await Promise.all([
        // Query 1: Fetch active job posts
        supabase
          .from('jobs')
          .select('id')
          .eq('salon_id', user.id)
          .eq('status', 'active'),
          
        // Query 2: Fetch user credits and profile data
        supabase
          .from('users')
          .select('credits, full_name, salon_name, location, bio, phone, instagram, website, avatar_url')
          .eq('id', user.id)
          .single()
      ]);
      
      // Handle errors from the queries
      if (jobsResponse.error) throw jobsResponse.error;
      if (userDataResponse.error) throw userDataResponse.error;
      
      // Now we know userDataResponse is not an error, so we can safely access data
      const userData = userDataResponse.data;
      
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
      
      // Calculate profile completion percentage and missing fields
      const profile = userData;
      const requiredFields = [
        'full_name',
        'salon_name', 
        'location', 
        'bio', 
        'phone',
        'avatar_url'
      ];
      
      const optionalFields = [
        'instagram',
        'website'
      ];
      
      const missingRequiredFields = requiredFields.filter(
        field => !profile || !profile[field as keyof typeof profile]
      );
      
      const missingOptionalFields = optionalFields.filter(
        field => !profile || !profile[field as keyof typeof profile]
      );
      
      // Calculate weighted completion percentage (required fields count more)
      const requiredFieldsCompleted = requiredFields.length - missingRequiredFields.length;
      const optionalFieldsCompleted = optionalFields.length - missingOptionalFields.length;
      
      // Required fields are 80% of the weight, optional are 20%
      const requiredWeight = 0.8;
      const optionalWeight = 0.2;
      
      const requiredCompletion = requiredFields.length > 0 
        ? (requiredFieldsCompleted / requiredFields.length) * requiredWeight 
        : 0;
        
      const optionalCompletion = optionalFields.length > 0 
        ? (optionalFieldsCompleted / optionalFields.length) * optionalWeight 
        : 0;
        
      const completionPercentage = Math.round((requiredCompletion + optionalCompletion) * 100);
      
      // Format field names for display
      const formatFieldName = (field: string): string => {
        switch (field) {
          case 'full_name': return 'Business Name';
          case 'salon_name': return 'Salon Name';
          case 'avatar_url': return 'Logo/Photo';
          default:
            return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
        }
      };
      
      // Update state with all fetched data
      setStats({
        activeJobPosts: jobsResponse.data?.length || 0,
        applicantsThisMonth: applicantsCount,
        creditsRemaining: userData?.credits || 0,
        profileCompletion: {
          percentage: completionPercentage,
          incompleteFields: [
            ...missingRequiredFields.map(formatFieldName),
            ...missingOptionalFields.map(formatFieldName)
          ]
        }
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
