
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
import { expiredJobs } from "@/data/jobs/expiredJobs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SalonSalesSection from "@/components/jobs/SalonSalesSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";

const JobsPage: React.FC = () => {
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
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [jobType, setJobType] = useState<"all" | "active" | "expired">("all");
  const [isRenewing, setIsRenewing] = useState(false);

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleRenew = (job: Job) => {
    setIsRenewing(true);
    setActiveRenewalJobId(job.id);
    
    // Simulate renewal process
    setTimeout(() => {
      setExpirations(prev => ({
        ...prev,
        [job.id]: false
      }));
      setIsRenewing(false);
      setActiveRenewalJobId(null);
    }, 2000);
  };

  const handleSearchChange = (value: string) => {
    updateSearchTerm(value);
  };

  // Filter jobs based on jobType
  const filteredJobs = jobs.filter(job => {
    if (jobType === "active") return !expirations[job.id];
    if (jobType === "expired") return expirations[job.id];
    return true;
  });

  return (
    <Container className="py-8 max-w-7xl">
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

      {/* Expired Listings Section - 5 cards per row */}
      <ExpiredListingsSection
        jobs={expiredJobs}
        onViewDetails={viewJobDetails}
        onRenew={handleRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
      />

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setJobType("all")}>
            All Jobs
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => setJobType("active")}>
            Active Jobs
          </TabsTrigger>
          <TabsTrigger value="expired" onClick={() => setJobType("expired")}>
            Expired
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredJobs.length > 0 ? (
        <JobsGrid 
          jobs={filteredJobs} 
          expirations={expirations}
          onRenew={handleRenew}
          isRenewing={isRenewing}
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
