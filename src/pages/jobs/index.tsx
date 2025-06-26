
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FeaturedGoldListings from "@/components/jobs/FeaturedGoldListings";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import useJobsData from "@/hooks/useJobsData";
import { useRealJobs } from "@/hooks/useRealJobs";
import { Job } from "@/types/job";
import { diamondJobs } from "@/data/jobs/diamondJobs";
import { premiumJobs } from "@/data/jobs/premiumJobs";
import { goldJobs } from "@/data/protected/vietnameseJobs";
import { vietnameseSalonSales } from "@/data/jobs/vietnameseSalonSales";
import { freeJobs } from "@/data/jobs/freeJobs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SalonSalesSection from "@/components/jobs/SalonSalesSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { 
    jobs, 
    loading, 
    error, 
    searchTerm, 
    updateSearchTerm,
    renewalJobId,
    setActiveRenewalJobId
  } = useJobsData();
  
  const { realJobs, loading: realJobsLoading, error: realJobsError } = useRealJobs();
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (value: string) => {
    updateSearchTerm(value);
  };

  // Combine real jobs with free jobs section
  const combinedFreeJobs = [...realJobs, ...freeJobs];

  return (
    <Container className={`py-8 max-w-7xl ${isMobile ? 'pb-20' : ''}`}>
      {/* Back to Home button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Button>
      </div>
      
      <h1 className="text-3xl font-playfair font-bold mb-6">
        Beauty Industry Jobs
      </h1>

      <JobSearchBar 
        value={searchTerm} 
        onSearchChange={handleSearchChange}
        placeholder="Tìm kiếm việc làm theo thành phố, bang, hoặc từ khóa..."
      />
      
      {/* Diamond jobs at the top - 2 cards per row, 6 total */}
      <TopDiamondFeaturedSection 
        featuredJobs={diamondJobs} 
        onViewDetails={viewJobDetails} 
      />
      
      {/* Premium Jobs Section - 3 cards per row, 9 total */}
      <PremiumListingsSection 
        jobs={premiumJobs}
        onViewDetails={viewJobDetails}
      />

      {/* Gold Jobs Section - 4 cards per row, 16 total */}
      <FeaturedGoldListings
        jobs={goldJobs}
        onViewDetails={viewJobDetails}
      />

      {/* Salon Sales Section - 4 cards in total */}
      <SalonSalesSection
        listings={vietnameseSalonSales}
        onViewDetails={viewJobDetails}
      />

      {/* Free Listings Section - 5 cards per row - NOW INCLUDES REAL JOBS */}
      <FreeListingsSection
        jobs={combinedFreeJobs}
        onViewDetails={viewJobDetails}
      />

      {/* Expired Listings Section - our new unified section with 5 cards per row */}
      <ExpiredListingsSection
        onViewDetails={viewJobDetails}
      />

      {(error || realJobsError) && (
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertDescription>
            {error?.message || realJobsError?.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading indicator for real jobs */}
      {realJobsLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading latest job postings...</p>
        </div>
      )}
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </Container>
  );
};

export default JobsPage;
