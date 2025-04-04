
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

const useJobsData = (userId?: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshJobs = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        // If userId is provided, filter by salon_id
        if (userId) {
          query = query.eq("salon_id", userId);
        } else {
          // If no userId, only fetch active jobs
          query = query.eq("status", "active");
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

    fetchJobs();
  }, [userId, refreshTrigger]);

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
    deleteJob,
    updateJobStatus,
  };
};

export default useJobsData;
