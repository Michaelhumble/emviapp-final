
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import FeaturedJobsSection from "@/components/jobs/FeaturedJobsSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import { Job } from "@/types/job";
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
const JobsPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleRenewJob = (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate API call for renewal
    setTimeout(() => {
      console.log(`Renewing job: ${job.id}`);
      setIsRenewing(false);
      setRenewalJobId(null);
      // In a real app, we'd update the job status here
    }, 1500);
  };

  const goToPostJob = () => {
    navigate("/posting/job");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Dummy data for expirations record
  const expirations: Record<string, boolean> = {};

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Browse Job Opportunities | EmviApp</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-playfair font-semibold">Beauty Industry Jobs</h1>
        
        <Button 
          onClick={goToPostJob} 
          className="rounded-full bg-gradient-to-r from-[#9A7B69] to-[#FFB199] hover:scale-105 transition-transform font-semibold flex items-center gap-2"
        >
          <Plus size={18} /> Add Job
        </Button>
      </div>
      
      <JobSearchBar 
        onSearchChange={handleSearchChange} 
        value={searchTerm}
      />
      
      <div className="mt-8 space-y-12">
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <TopDiamondFeaturedSection 
          featuredJobs={[]} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <PremiumListingsSection 
          jobs={[]} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <FeaturedJobsSection 
          featuredJobs={[]} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <FreeListingsSection 
          jobs={[]} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <ExpiredListingsSection 
          jobs={[]} 
          onViewDetails={viewJobDetails} 
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />
      </div>
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </div>
  );
};

export default JobsPage;
