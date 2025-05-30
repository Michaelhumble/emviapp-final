
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FeaturedGoldListings from "@/components/jobs/FeaturedGoldListings";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useJobsFromDatabase } from "@/hooks/useJobsFromDatabase";

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { jobs, loading, error } = useJobsFromDatabase();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Filter jobs by search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Organize jobs by pricing tier
  const diamondJobs = filteredJobs.filter(job => job.pricing_tier === 'diamond');
  const premiumJobs = filteredJobs.filter(job => job.pricing_tier === 'premium');
  const goldJobs = filteredJobs.filter(job => job.pricing_tier === 'gold');
  const freeJobs = filteredJobs.filter(job => job.pricing_tier === 'free' || job.pricing_tier === 'basic');

  if (loading) {
    return (
      <Container className={`py-8 max-w-7xl ${isMobile ? 'pb-20' : ''}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job listings...</p>
        </div>
      </Container>
    );
  }

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
      
      {error && (
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Diamond jobs at the top - 2 cards per row */}
      {diamondJobs.length > 0 && (
        <TopDiamondFeaturedSection 
          featuredJobs={diamondJobs} 
          onViewDetails={viewJobDetails} 
        />
      )}
      
      {/* Premium Jobs Section - 3 cards per row */}
      {premiumJobs.length > 0 && (
        <PremiumListingsSection 
          jobs={premiumJobs}
          onViewDetails={viewJobDetails}
        />
      )}

      {/* Gold Jobs Section - 4 cards per row */}
      {goldJobs.length > 0 && (
        <FeaturedGoldListings
          jobs={goldJobs}
          onViewDetails={viewJobDetails}
        />
      )}

      {/* Free Listings Section - 5 cards per row */}
      {freeJobs.length > 0 && (
        <FreeListingsSection
          jobs={freeJobs}
          onViewDetails={viewJobDetails}
        />
      )}

      {/* Expired Listings Section */}
      <ExpiredListingsSection
        onViewDetails={viewJobDetails}
      />

      {/* Show message if no jobs found */}
      {!loading && jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No job listings found.</p>
          <Button onClick={() => navigate("/jobs/create")}>
            Create Job Listing
          </Button>
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
