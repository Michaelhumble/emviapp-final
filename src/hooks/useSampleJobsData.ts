
import { useState, useEffect, useCallback } from "react";
import sampleJobs from "@/data/sampleJobs";

export interface JobFilters {
  featured?: boolean;
  remote?: boolean;
  fullTime?: boolean;
  partTime?: boolean;
  location?: string;
  weeklyPay?: boolean;
  ownerWillTrain?: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
  employmentType?: string;
  industry?: string;
  language?: string;
  showExpired?: boolean;
  payType?: 'commission' | 'hourly' | 'salary' | 'all';
}

export const useSampleJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    featured: false,
    remote: false,
    fullTime: false,
    partTime: false,
    location: 'all',
    weeklyPay: false,
    ownerWillTrain: false,
    hasHousing: false,
    noSupplyDeduction: false,
    employmentType: 'all',
    industry: 'all',
    language: 'all',
    showExpired: false,
    payType: 'all',
    ...initialFilters
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<typeof sampleJobs>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);

  // Generate suggested keywords based on job data
  useEffect(() => {
    const keywords = new Set<string>();
    sampleJobs.forEach(job => {
      job.specialties?.forEach(s => keywords.add(s));
      if (job.employment_type) keywords.add(job.employment_type);
      if (job.company) keywords.add(job.company);
    });
    setSuggestedKeywords(Array.from(keywords));
  }, []);

  // Set featured jobs
  useEffect(() => {
    const featured = sampleJobs.filter(job => job.is_featured);
    setFeaturedJobs(featured.slice(0, 3));
  }, []);

  // Filter jobs based on current filters and search term
  const filterJobs = useCallback(() => {
    setLoading(true);
    
    try {
      let result = [...sampleJobs];
      
      // Apply search term filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        result = result.filter(job => 
          (job.title && job.title.toLowerCase().includes(search)) ||
          (job.company && job.company.toLowerCase().includes(search)) ||
          (job.description && job.description.toLowerCase().includes(search)) ||
          (job.location && job.location.toLowerCase().includes(search)) ||
          (job.vietnamese_description && job.vietnamese_description.toLowerCase().includes(search)) ||
          (job.specialties && job.specialties.some(s => s.toLowerCase().includes(search)))
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
        result = result.filter(job => job.location && job.location.includes(filters.location!));
      }
      
      // Apply additional filters
      if (filters.weeklyPay) {
        result = result.filter(job => job.weekly_pay);
      }
      
      if (filters.ownerWillTrain) {
        result = result.filter(job => job.owner_will_train);
      }
      
      if (filters.hasHousing) {
        result = result.filter(job => job.has_housing);
      }
      
      if (filters.noSupplyDeduction) {
        result = result.filter(job => job.no_supply_deduction);
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
          job.specialties && job.specialties.some(s => 
            s.toLowerCase().includes(filters.industry!.toLowerCase())
          )
        );
      }
      
      // Apply language filter
      if (filters.language && filters.language !== 'all') {
        // This is a placeholder - in a real app we'd have language data
        // For now, if Vietnamese is selected, only show jobs with Vietnamese descriptions
        if (filters.language === 'vietnamese') {
          result = result.filter(job => job.vietnamese_description && job.vietnamese_description.length > 0);
        }
      }
      
      // Apply show expired filter
      if (!filters.showExpired) {
        result = result.filter(job => job.status !== 'expired');
      }
      
      setFilteredJobs(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  // Update filters and trigger filtering
  useEffect(() => {
    filterJobs();
  }, [filterJobs]);

  // Function to update filters
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Function to update search term
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return {
    jobs: filteredJobs,
    loading,
    error,
    filters,
    searchTerm,
    updateFilters,
    updateSearchTerm,
    featuredJobs,
    suggestedKeywords
  };
};

export default useSampleJobsData;
