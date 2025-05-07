
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Job } from "@/types/job";
import { formatJobListings } from "@/utils/jobs/jobListingFormatter";
import { mockJobs } from "@/utils/jobs/mockJobData";

export interface JobFilters {
  featured?: boolean;
  remote?: boolean;
  fullTime?: boolean;
  partTime?: boolean;
  location?: string;
  weeklyPay?: boolean;
  ownerWillTrain?: boolean;
  employmentType?: string;
  showExpired?: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
  industry?: string;
  language?: string;
  payType?: 'commission' | 'hourly' | 'salary' | 'all'; // Add payType with specific allowed values
}

export const useJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const { user } = useAuth();
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      let filteredJobs = [...mockJobs];
      
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          (job.title && job.title.toLowerCase().includes(query)) ||
          (job.company && job.company.toLowerCase().includes(query)) ||
          (job.description && job.description.toLowerCase().includes(query)) ||
          (job.vietnamese_description && job.vietnamese_description.toLowerCase().includes(query)) ||
          (job.location && job.location.toLowerCase().includes(query))
        );
      }
      
      if (filters.featured) {
        filteredJobs = filteredJobs.filter(job => job.is_featured);
      }
      
      if (filters.remote) {
        filteredJobs = filteredJobs.filter(job => job.is_remote);
      }
      
      if (filters.fullTime) {
        filteredJobs = filteredJobs.filter(job => job.employment_type === 'Full-Time');
      }
      
      if (filters.partTime) {
        filteredJobs = filteredJobs.filter(job => job.employment_type === 'Part-Time');
      }
      
      if (filters.location && filters.location !== 'all') {
        filteredJobs = filteredJobs.filter(job => 
          job.location && job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.weeklyPay) {
        filteredJobs = filteredJobs.filter(job => job.weekly_pay === true);
      }
      
      if (filters.ownerWillTrain) {
        filteredJobs = filteredJobs.filter(job => job.owner_will_train === true);
      }
      
      if (filters.hasHousing) {
        filteredJobs = filteredJobs.filter(job => job.has_housing === true);
      }
      
      if (filters.noSupplyDeduction) {
        filteredJobs = filteredJobs.filter(job => job.no_supply_deduction === true);
      }
      
      if (filters.employmentType && filters.employmentType !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.employment_type === filters.employmentType);
      }
      
      if (filters.payType && filters.payType !== 'all') {
        if (filters.payType === 'commission') {
          filteredJobs = filteredJobs.filter(job => 
            job.compensation_type === 'commission' || 
            (job.salary_range && job.salary_range.toLowerCase().includes('commission'))
          );
        } else if (filters.payType === 'hourly') {
          filteredJobs = filteredJobs.filter(job => 
            job.compensation_type === 'hourly' || 
            (job.salary_range && job.salary_range.toLowerCase().includes('hour'))
          );
        } else if (filters.payType === 'salary') {
          filteredJobs = filteredJobs.filter(job => 
            job.compensation_type === 'salary' || 
            (job.salary_range && job.salary_range.toLowerCase().includes('salary'))
          );
        }
      }
      
      if (filters.industry && filters.industry !== 'all') {
        filteredJobs = filteredJobs.filter(job => 
          job.specialties?.some(s => s.toLowerCase() === filters.industry!.toLowerCase())
        );
      }
      
      if (filters.language && filters.language !== 'all') {
        if (filters.language === 'vietnamese') {
          filteredJobs = filteredJobs.filter(job => job.vietnamese_description);
        } else if (filters.language === 'english') {
          filteredJobs = filteredJobs.filter(job => job.description && !job.vietnamese_description);
        } else if (filters.language === 'bilingual') {
          filteredJobs = filteredJobs.filter(job => job.description && job.vietnamese_description);
        }
      }
      
      if (!filters.showExpired) {
        filteredJobs = filteredJobs.filter(job => job.status !== 'expired');
      }

      const featured = mockJobs.filter(job => job.is_featured).slice(0, 3);
      setFeaturedJobs(featured);
      
      const keywords = new Set<string>();
      mockJobs.forEach(job => {
        if (job.specialties) {
          job.specialties.forEach(s => keywords.add(s));
        }
        if (job.location) {
          keywords.add(job.location);
        }
        if (job.employment_type) {
          keywords.add(job.employment_type);
        }
      });
      setSuggestedKeywords(Array.from(keywords));

      setJobs(filteredJobs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const setActiveRenewalJobId = (jobId: string | null) => {
    setRenewalJobId(jobId);
  };

  return { 
    jobs, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    updateSearchTerm, 
    fetchJobs, 
    featuredJobs,
    suggestedKeywords,
    renewalJobId,
    setActiveRenewalJobId
  };
};
