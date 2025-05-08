
import { useState, useEffect, useCallback } from "react";
import useSampleJobsData, { JobFilters } from "./useSampleJobsData";

// This is a wrapper hook that will eventually use real data from an API
// For now, it uses our sample data
export const useJobsData = (initialFilters: JobFilters = {}) => {
  const sampleData = useSampleJobsData(initialFilters);
  
  // Here we can add any additional logic or transformations
  // that would normally interact with a real API
  
  // Add advanced filtering, sorting, etc.
  const [sortOption, setSortOption] = useState("recent");
  const [filteredResults, setFilteredResults] = useState(sampleData.jobs);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  
  // Apply additional sorting when sort option changes
  useEffect(() => {
    let sortedResults = [...sampleData.jobs];
    
    if (sortOption === "recent") {
      // Sort by most recent first (would use date in real app)
      sortedResults = sortedResults;
    } else if (sortOption === "rating") {
      // Sort by rating if available
      sortedResults = sortedResults.sort((a, b) => {
        const ratingA = a.experience_level === 'Senior' ? 3 : a.experience_level === 'Mid-Level' ? 2 : 1;
        const ratingB = b.experience_level === 'Senior' ? 3 : b.experience_level === 'Mid-Level' ? 2 : 1;
        return ratingB - ratingA;
      });
    }
    
    // Filter out expired jobs from the main jobs grid to prevent duplication 
    // since we're showing them in the ExpiredListingsSection component
    sortedResults = sortedResults.filter(job => job.status !== 'expired');
    
    setFilteredResults(sortedResults);
  }, [sortOption, sampleData.jobs]);
  
  const setActiveRenewalJobId = (jobId: string | null) => {
    setRenewalJobId(jobId);
  };
  
  return {
    ...sampleData,
    jobs: filteredResults,
    sortOption,
    setSortOption,
    renewalJobId,
    setActiveRenewalJobId
  };
};

export default useJobsData;
export type { JobFilters };
