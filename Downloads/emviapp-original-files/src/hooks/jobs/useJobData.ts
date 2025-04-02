
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Job } from '../../types/job';

export interface JobFiltersState {
  searchTerm: string;
  location: string;
  jobType: string;
  specialty: string;
  salary: string;
}

export const useJobData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<JobFiltersState>({
    searchTerm: "",
    location: "",
    jobType: "",
    specialty: "",
    salary: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filterJobs = (newFilters: JobFiltersState) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from("jobs")
          .select("*");
        
        if (filters.location) {
          query = query.ilike("location", `%${filters.location}%`);
        }
        
        if (filters.jobType) {
          query = query.eq("job_type", filters.jobType);
        }
        
        if (filters.specialty) {
          query = query.eq("specialty", filters.specialty);
        }
        
        if (filters.searchTerm) {
          query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
        }
        
        if (filters.salary) {
          // Parse salary range and filter accordingly
          const [min, max] = filters.salary.split('-').map(Number);
          if (max) {
            query = query.gte('min_salary', min).lte('max_salary', max);
          } else if (filters.salary.includes('+')) {
            // Handle "100000+" case
            const minValue = parseInt(filters.salary);
            query = query.gte('min_salary', minValue);
          } else {
            query = query.lte('max_salary', min);
          }
        }
        
        query = query.order("created_at", { ascending: false });
        
        const { data, error } = await query;
          
        if (error) {
          throw error;
        }
        
        setJobs(data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);
  
  return { jobs, loading, error, filters, handleFilterChange, filterJobs };
};
