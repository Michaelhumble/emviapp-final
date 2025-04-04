
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Job } from "@/types/job";

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

        // Create the initial query
        let queryBuilder = supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        // Only apply filters if provided
        if (filters) {
          // Handle boolean filters - using strict equality and local variables
          const weeklyPayFilter = filters.weeklyPay === true;
          if (weeklyPayFilter) {
            queryBuilder = queryBuilder.eq("weekly_pay", true);
          }
          
          const ownerWillTrainFilter = filters.ownerWillTrain === true;
          if (ownerWillTrainFilter) {
            queryBuilder = queryBuilder.eq("owner_will_train", true);
          }
          
          const hasHousingFilter = filters.hasHousing === true;
          if (hasHousingFilter) {
            queryBuilder = queryBuilder.eq("has_housing", true);
          }
          
          const noSupplyFilter = filters.noSupplyDeduction === true;
          if (noSupplyFilter) {
            queryBuilder = queryBuilder.eq("no_supply_deduction", true);
          }
          
          // Handle string filters
          const employmentType = filters.employmentType;
          if (typeof employmentType === 'string' && employmentType !== "" && employmentType !== "all") {
            queryBuilder = queryBuilder.eq("employment_type", employmentType);
          }
          
          // Handle date comparison
          const hideExpiredFilter = filters.showExpired === false;
          if (hideExpiredFilter) {
            queryBuilder = queryBuilder.gt("expires_at", new Date().toISOString());
          }
        }

        // Apply search if provided
        if (searchTerm && searchTerm.trim() !== '') {
          queryBuilder = queryBuilder.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        // Execute the query
        const { data, error: queryError } = await queryBuilder;

        if (queryError) {
          throw queryError;
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
