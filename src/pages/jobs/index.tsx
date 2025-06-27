
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FeaturedGoldListings from "@/components/jobs/FeaturedGoldListings";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import useJobsData from "@/hooks/useJobsData";
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
import { ArrowLeft, Plus } from "lucide-react";
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
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (value: string) => {
    updateSearchTerm(value);
  };

  const refreshFreeJobs = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Container className={`py-8 max-w-7xl ${isMobile ? 'pb-20' : ''}`}>
      {/* Header with Back and Post Free Job buttons */}
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </Button>
        
        <Button
          onClick={() => navigate("/jobs/post-free")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus size={16} /> Post a Free Job
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

      {/* Free Listings Section - 5 cards per row */}
      <FreeListingsSection
        jobs={freeJobs}
        onViewDetails={viewJobDetails}
        key={refreshKey}
      />

      {/* Expired Listings Section - our new unified section with 5 cards per row */}
      <ExpiredListingsSection
        onViewDetails={viewJobDetails}
      />

      {error && (
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
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
