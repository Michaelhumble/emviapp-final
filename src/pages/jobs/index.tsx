
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FeaturedGoldListings from "@/components/jobs/FeaturedGoldListings";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import JobDetailModal from "@/components/jobs/JobDetailModal";
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
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
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

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (value: string) => {
    updateSearchTerm(value);
  };

  return (
    <Container className="py-8 max-w-7xl">
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

      {/* Free Listings Section - 5 cards per row */}
      <FreeListingsSection
        jobs={freeJobs}
        onViewDetails={viewJobDetails}
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length > 0 ? (
        <JobsGrid 
          jobs={jobs} 
          expirations={{}}
          onRenew={() => {}} 
          isRenewing={false}
          renewalJobId={renewalJobId}
        />
      ) : (
        <Alert className="bg-muted">
          <AlertDescription>
            No jobs found matching your search criteria. Please try different keywords.
          </AlertDescription>
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
