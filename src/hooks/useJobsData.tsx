
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Job } from "@/types/job";
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
  payType?: 'commission' | 'hourly' | 'salary' | 'all';
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
  const [sortOption, setSortOption] = useState("recent");

  const isPreviewMode = import.meta.env.DEV || !supabase;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      if (isPreviewMode) {
        // Use mock jobs data for preview/development mode
        let filteredJobs = [...mockJobs];
        
        // Apply filters to mock data
        filteredJobs = applyFilters(filteredJobs, filters, searchTerm);
        
        // Set featured jobs
        const featured = mockJobs.filter(job => job.is_featured).slice(0, 3);
        setFeaturedJobs(featured);
        
        // Extract keywords for suggestions
        extractSuggestedKeywords(mockJobs);
        
        // Apply sorting
        filteredJobs = applySorting(filteredJobs, sortOption);
        
        setJobs(filteredJobs);
      } else {
        // Use real Supabase data
        let query = supabase.from('jobs')
          .select('*');
          
        // Only show non-expired jobs by default
        if (!filters.showExpired) {
          query = query.gt('expires_at', new Date().toISOString());
        }
          
        // Apply filters to query
        query = applyFiltersToQuery(query, filters, searchTerm);
        
        // Apply sorting
        query = applySortingToQuery(query, sortOption);
        
        const { data, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        // Format the data to match Job type
        const formattedJobs = data?.map(formatJobListing) || [];
        
        setJobs(formattedJobs);
        
        // Fetch featured jobs separately
        const { data: featuredData } = await supabase
          .from('jobs')
          .select('*')
          .eq('is_featured', true)
          .gt('expires_at', new Date().toISOString())
          .limit(3);
          
        setFeaturedJobs((featuredData?.map(formatJobListing) || []).slice(0, 3));
        
        // Extract keywords for suggestions from the database
        extractSuggestedKeywords(formattedJobs);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm, sortOption, isPreviewMode]);

  // Helper function to apply filters to an array of jobs (for mock data)
  const applyFilters = (jobs: Job[], filters: JobFilters, searchTerm: string): Job[] => {
    let result = [...jobs];
    
    // Apply search term filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.title && job.title.toLowerCase().includes(query)) ||
        (job.company && job.company.toLowerCase().includes(query)) ||
        (job.description && job.description.toLowerCase().includes(query)) ||
        (job.vietnamese_description && job.vietnamese_description.toLowerCase().includes(query)) ||
        (job.location && job.location.toLowerCase().includes(query))
      );
    }
    
    // Apply featured filter
    if (filters.featured) {
      result = result.filter(job => job.is_featured);
    }
    
    // Apply remote filter
    if (filters.remote) {
      result = result.filter(job => job.is_remote);
    }
    
    // Apply employment type filters
    if (filters.fullTime) {
      result = result.filter(job => job.employment_type === 'Full-Time');
    }
    
    if (filters.partTime) {
      result = result.filter(job => job.employment_type === 'Part-Time');
    }
    
    // Apply location filter
    if (filters.location && filters.location !== 'all') {
      result = result.filter(job => 
        job.location && job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Apply additional filters
    if (filters.weeklyPay) {
      result = result.filter(job => job.weekly_pay === true);
    }
    
    if (filters.ownerWillTrain) {
      result = result.filter(job => job.owner_will_train === true);
    }
    
    if (filters.hasHousing) {
      result = result.filter(job => job.has_housing === true);
    }
    
    if (filters.noSupplyDeduction) {
      result = result.filter(job => job.no_supply_deduction === true);
    }
    
    // Apply employment type filter
    if (filters.employmentType && filters.employmentType !== 'all') {
      result = result.filter(job => job.employment_type === filters.employmentType);
    }

    // Apply pay type filter
    if (filters.payType && filters.payType !== 'all') {
      if (filters.payType === 'commission') {
        result = result.filter(job => 
          job.compensation_type === 'commission' || 
          (job.salary_range && job.salary_range.toLowerCase().includes('commission'))
        );
      } else if (filters.payType === 'hourly') {
        result = result.filter(job => 
          job.compensation_type === 'hourly' || 
          (job.salary_range && job.salary_range.toLowerCase().includes('hour'))
        );
      } else if (filters.payType === 'salary') {
        result = result.filter(job => 
          job.compensation_type === 'salary' || 
          (job.salary_range && job.salary_range.toLowerCase().includes('salary'))
        );
      }
    }
    
    // Apply industry filter
    if (filters.industry && filters.industry !== 'all') {
      result = result.filter(job => 
        job.specialties?.some(s => s.toLowerCase() === filters.industry!.toLowerCase())
      );
    }
    
    // Apply language filter
    if (filters.language && filters.language !== 'all') {
      if (filters.language === 'vietnamese') {
        result = result.filter(job => job.vietnamese_description);
      } else if (filters.language === 'english') {
        result = result.filter(job => job.description && !job.vietnamese_description);
      } else if (filters.language === 'bilingual') {
        result = result.filter(job => job.description && job.vietnamese_description);
      }
    }
    
    // Apply show expired filter
    if (!filters.showExpired) {
      result = result.filter(job => job.status !== 'expired');
    }

    return result;
  };
  
  // Helper function to apply filters to Supabase query
  const applyFiltersToQuery = (query: any, filters: JobFilters, searchTerm: string) => {
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,vietnamese_description.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
    }
    
    if (filters.featured) {
      query = query.eq('is_featured', true);
    }
    
    if (filters.remote) {
      query = query.eq('is_remote', true);
    }
    
    if (filters.fullTime) {
      query = query.eq('employment_type', 'Full-Time');
    }
    
    if (filters.partTime) {
      query = query.eq('employment_type', 'Part-Time');
    }
    
    if (filters.location && filters.location !== 'all') {
      query = query.ilike('location', `%${filters.location}%`);
    }
    
    if (filters.weeklyPay) {
      query = query.eq('weekly_pay', true);
    }
    
    if (filters.ownerWillTrain) {
      query = query.eq('owner_will_train', true);
    }
    
    if (filters.hasHousing) {
      query = query.eq('has_housing', true);
    }
    
    if (filters.noSupplyDeduction) {
      query = query.eq('no_supply_deduction', true);
    }
    
    if (filters.employmentType && filters.employmentType !== 'all') {
      query = query.eq('employment_type', filters.employmentType);
    }
    
    return query;
  };
  
  // Helper function to apply sorting to an array of jobs (for mock data)
  const applySorting = (jobs: Job[], sortOption: string): Job[] => {
    let sortedJobs = [...jobs];
    
    if (sortOption === "recent") {
      // Sort by created_at date (most recent first)
      sortedJobs.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
    } else if (sortOption === "rating") {
      // Sort by rating if available (or something that approximates it)
      sortedJobs.sort((a, b) => {
        const ratingA = a.experience_level === 'Senior' ? 3 : a.experience_level === 'Mid-Level' ? 2 : 1;
        const ratingB = b.experience_level === 'Senior' ? 3 : b.experience_level === 'Mid-Level' ? 2 : 1;
        return ratingB - ratingA;
      });
    }
    
    return sortedJobs;
  };
  
  // Helper function to apply sorting to Supabase query
  const applySortingToQuery = (query: any, sortOption: string) => {
    if (sortOption === "recent") {
      query = query.order('created_at', { ascending: false });
    }
    
    return query;
  };
  
  // Helper function to extract suggested keywords from jobs
  const extractSuggestedKeywords = (jobs: Job[]) => {
    const keywords = new Set<string>();
    
    jobs.forEach(job => {
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
  };
  
  // Helper function to format job listing from DB to match Job type
  const formatJobListing = (job: any): Job => {
    // Make sure we're returning a properly formatted Job object
    return {
      id: job.id || '',
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      created_at: job.created_at || new Date().toISOString(),
      description: job.description || '',
      vietnamese_description: job.vietnamese_description || '',
      employment_type: job.employment_type || '',
      compensation_type: job.compensation_type || '',
      compensation_details: job.compensation_details || '',
      status: job.status || 'active',
      expires_at: job.expires_at || '',
      is_featured: job.is_featured || false,
      is_remote: job.is_remote || false,
      is_vietnamese_listing: job.is_vietnamese_listing || !!job.vietnamese_description,
      weekly_pay: job.weekly_pay || false,
      has_housing: job.has_housing || false,
      owner_will_train: job.owner_will_train || false,
      no_supply_deduction: job.no_supply_deduction || false,
      salary_range: job.salary_range || '',
      specialties: job.specialties || [],
      experience_level: job.experience_level || 'Entry-Level',
      imageUrl: job.image || job.imageUrl || `/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png`,
      image: job.image || job.imageUrl || `/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png`,
      type: job.type || 'job'
    };
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
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
    setActiveRenewalJobId,
    sortOption,
    setSortOption
  };
};

export default useJobsData;
export type { JobFilters };
