
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";
import { formatJobListings } from "@/utils/jobs/jobListingFormatter";
import { toast } from "@/components/ui/use-toast";

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

export const useJobsData = (searchTerm: string, filters: Filters) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [filters, searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("posts")
        .select("*")
        .eq("post_type", "job");

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      if (filters.weeklyPay) {
        query = query.eq("metadata->>weekly_pay", "true");
      }
      
      if (filters.ownerWillTrain) {
        query = query.eq("metadata->>owner_will_train", "true");
      }
      
      if (filters.employmentType !== "all") {
        query = query.eq("metadata->>employment_type", filters.employmentType);
      }
      
      if (!filters.showExpired) {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        query = query.gte('created_at', thirtyDaysAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform the post data into Job format
      const jobsData: Job[] = (data || []).map(post => {
        const metadata = post.metadata as Record<string, any> || {};
        
        return {
          id: post.id,
          title: post.title,
          compensation_type: metadata.compensation_type || '',
          compensation_details: metadata.compensation_details || '',
          created_at: post.created_at,
          expires_at: post.expires_at,
          status: post.status,
          requirements: metadata.requirements,
          description: post.content,
          salary_range: metadata.salary_range,
          employment_type: metadata.employment_type,
          location: post.location,
          weekly_pay: metadata.weekly_pay === 'true',
          owner_will_train: metadata.owner_will_train === 'true',
          has_housing: metadata.has_housing === 'true',
          no_supply_deduction: metadata.no_supply_deduction === 'true',
          specialties: metadata.specialties || [],
          vietnamese_description: metadata.vietnamese_description,
          contact_info: post.contact_info as Job['contact_info'],
          user_id: post.user_id
        };
      });
      
      const formattedJobs = formatJobListings(jobsData);
      
      let filteredJobs = formattedJobs;
      
      if (filters.hasHousing) {
        filteredJobs = filteredJobs.filter(job => job.has_housing === true);
      }
      
      if (filters.noSupplyDeduction) {
        filteredJobs = filteredJobs.filter(job => job.no_supply_deduction === true);
      }
      
      setJobs(filteredJobs);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return { jobs, loading, fetchJobs };
};
