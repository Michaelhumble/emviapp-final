
import { useState } from "react";
import { Helmet } from "react-helmet";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { generateVietnameseNailJobs } from "@/utils/jobs/vietnameseNailJobSamples";
import JobGrid from "@/components/jobs/JobGrid";
import useSampleJobsData from "@/hooks/useSampleJobsData";
import { Container } from "@/components/ui/container";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import SmartDealsSection from "@/components/jobs/SmartDealsSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";

const JobsPage = () => {
  const { jobs, loading, error, featuredJobs, updateSearchTerm } = useSampleJobsData();
  const [searchValue, setSearchValue] = useState("");
  const vietnameseJobs = generateVietnameseNailJobs();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateSearchTerm(value);
  };

  const handleRenew = (job: any) => {
    setRenewalJobId(job.id);
    setIsRenewing(true);
    
    // Simulate renewal process
    setTimeout(() => {
      setExpirations(prev => ({
        ...prev,
        [job.id]: false
      }));
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1000);
  };

  const handleViewJobDetails = (job: any) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Split jobs into different categories for the new layout
  const premiumJobs = jobs.filter(job => job.is_featured && !job.status?.includes('expired'));
  const smartDealJobs = jobs.filter(job => !job.is_featured && job.image && !job.status?.includes('expired'));
  const freeJobs = jobs.filter(job => !job.image && !job.status?.includes('expired'));
  const expiredJobs = jobs.filter(job => job.status?.includes('expired'));

  return (
    <Container className="py-8">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Find jobs in the beauty industry. Browse opportunities for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600">
          Find perfect opportunities in the beauty industry
        </p>
      </div>

      <JobSearchBar 
        value={searchValue} 
        onSearchChange={handleSearchChange} 
      />

      {/* Top Diamond Featured Section (locked row) */}
      <TopDiamondFeaturedSection 
        vietnameseJobs={vietnameseJobs} 
        onViewDetails={handleViewJobDetails}
        searchTerm={searchValue}
      />
      
      {/* Premium Listings Section */}
      <PremiumListingsSection 
        jobs={premiumJobs}
        onViewDetails={handleViewJobDetails}
      />
      
      {/* Smart Deals Section */}
      <SmartDealsSection 
        jobs={smartDealJobs}
        onViewDetails={handleViewJobDetails}
      />
      
      {/* Free Listings Section */}
      <FreeListingsSection 
        jobs={freeJobs}
        onViewDetails={handleViewJobDetails}
      />
      
      {/* Expired Listings Section */}
      <ExpiredListingsSection 
        jobs={expiredJobs}
        onRenew={handleRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
        onViewDetails={handleViewJobDetails}
      />

      {/* Add job detail modal for Vietnamese job listings */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={handleCloseJobDetails}
        />
      )}
    </Container>
  );
};

export default JobsPage;
