import { useState } from "react";
import { Helmet } from "react-helmet";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { generateVietnameseNailJobs } from "@/utils/jobs/vietnameseNailJobSamples";
import JobGrid from "@/components/jobs/JobGrid";
import useSampleJobsData from "@/hooks/useSampleJobsData";
import { Container } from "@/components/ui/container";

const JobsPage = () => {
  const { jobs, loading, error, featuredJobs, updateSearchTerm } = useSampleJobsData();
  const [searchValue, setSearchValue] = useState("");
  const vietnameseJobs = generateVietnameseNailJobs();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);

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

      {/* Pass the search term to the VietnameseJobSection */}
      <VietnameseJobSection 
        vietnameseJobs={vietnameseJobs} 
        onViewDetails={(job) => console.log("View details", job.id)}
        searchTerm={searchValue}
      />

      {/* Keep the rest of the page unchanged */}
      <JobGrid 
        jobs={jobs}
        expirations={expirations}
        onRenew={handleRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
      />
    </Container>
  );
};

export default JobsPage;
