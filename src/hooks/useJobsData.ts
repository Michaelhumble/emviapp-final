
import { useState, useEffect } from "react";
import useSampleJobsData from "./useSampleJobsData";

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

// This is a wrapper hook that will eventually use real data from an API
// For now, it uses our sample data
export const useJobsData = (initialFilters: JobFilters = {}) => {
  const sampleData = useSampleJobsData(initialFilters);
  
  // Here we can add any additional logic or transformations
  // that would normally interact with a real API
  
  // Add advanced filtering, sorting, etc.
  const [sortOption, setSortOption] = useState("recent");
  const [filteredResults, setFilteredResults] = useState(sampleData.jobs);
  
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
    
    setFilteredResults(sortedResults);
  }, [sortOption, sampleData.jobs]);
  
  return {
    ...sampleData,
    jobs: filteredResults,
    sortOption,
    setSortOption
  };
};

export default useJobsData;
