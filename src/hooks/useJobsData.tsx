
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  description: string;
  salon_id: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  status: string;
  compensation_type: string;
  compensation_details: string;
  requirements: string;
}

interface Filters {
  weeklyPay?: boolean;
  ownerWillTrain?: boolean;
  employmentType?: string;
  showExpired?: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

const useJobsData = (searchTerm?: string, filters?: Filters) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshJobs = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const fetchJobs = () => {
    refreshJobs();
  };

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        // Apply filters if provided
        if (filters) {
          if (filters.weeklyPay === true) {
            query = query.eq("weekly_pay", true);
          }
          
          if (filters.ownerWillTrain === true) {
            query = query.eq("owner_will_train", true);
          }
          
          if (filters.hasHousing === true) {
            query = query.eq("has_housing", true);
          }
          
          if (filters.noSupplyDeduction === true) {
            query = query.eq("no_supply_deduction", true);
          }
          
          if (filters.employmentType && filters.employmentType !== "all") {
            query = query.eq("employment_type", filters.employmentType);
          }
          
          if (!filters.showExpired) {
            // Only show non-expired jobs
            query = query.gt("expires_at", new Date().toISOString());
          }
        }

        // Apply search if provided
        if (searchTerm && searchTerm.trim() !== '') {
          query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setJobs(data as Job[]);
        }
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [searchTerm, filters, refreshTrigger]);

  const deleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) {
        throw error;
      }

      // Update local state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      toast.success("Job listing deleted successfully");
    } catch (err: any) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job listing");
      return false;
    }
    return true;
  };

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", jobId);

      if (error) {
        throw error;
      }

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status } : job
        )
      );

      return true;
    } catch (err) {
      console.error("Error updating job status:", err);
      return false;
    }
  };

  return {
    jobs,
    loading,
    error,
    refreshJobs,
    fetchJobs,
    deleteJob,
    updateJobStatus,
  };
};

export default useJobsData;
