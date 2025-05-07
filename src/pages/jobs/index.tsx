
import React, { useState, useEffect } from "react";
import { useJobsData, JobFilters } from "@/hooks/useJobsData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import JobsGrid from "@/components/jobs/JobsGrid";
import { MobileButton } from "@/components/ui/mobile-button";
import { Link } from "react-router-dom";
import AuthAction from "@/components/common/AuthAction";
import { Plus } from "lucide-react";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("vietnamese");
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  
  const { 
    jobs, 
    loading, 
    error, 
    searchTerm, 
    updateSearchTerm, 
    featuredJobs,
    renewalJobId,
    setActiveRenewalJobId
  } = useJobsData();

  const [isRenewing, setIsRenewing] = useState(false);
  const { updateFilters } = useJobsData();

  useEffect(() => {
    if (activeTab === "vietnamese") {
      updateFilters({ language: 'vietnamese' });
    } else if (activeTab === "english") {
      updateFilters({ language: 'english' });
    }
  }, [activeTab, updateFilters]);

  const handleRenewJob = async (job) => {
    setIsRenewing(true);
    setActiveRenewalJobId(job.id);
    
    // Simulate renewal process (replace with actual renewal logic)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // After successful renewal, update the expirations state
    setExpirations(prev => ({ ...prev, [job.id]: false }));
    setIsRenewing(false);
    setActiveRenewalJobId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
            Beauty Industry Jobs
          </h1>
          <p className="text-gray-600 mb-6">
            Find or post job opportunities in the beauty industry
          </p>
          <div className="flex justify-center">
            <AuthAction
              onAction={() => true}
              redirectPath="/post-job"
              customTitle="Sign in to post a job"
            >
              <MobileButton className="bg-primary text-white px-6 py-3">
                Post a Job
              </MobileButton>
            </AuthAction>
          </div>
        </div>

        {/* Tabs and Post Job Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center gap-4 flex-grow">
            <Tabs 
              defaultValue="vietnamese" 
              value={activeTab}
              onValueChange={setActiveTab} 
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="vietnamese">Vietnamese Nail Jobs</TabsTrigger>
                <TabsTrigger value="english">English Jobs</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Post Job button next to tabs */}
            <AuthAction
              onAction={() => true}
              redirectPath="/post-job"
              customTitle="Sign in to post a job"
            >
              <MobileButton 
                className="bg-primary text-white" 
                size="sm"
              >
                <Plus size={18} /> Post Job
              </MobileButton>
            </AuthAction>
          </div>
        </div>

        {/* Search Bar */}
        <JobSearchBar 
          value={searchTerm} 
          onSearchChange={updateSearchTerm} 
        />

        {/* Main Content */}
        {activeTab === "vietnamese" && (
          <JobsGrid 
            jobs={jobs} 
            expirations={expirations}
            onRenew={handleRenewJob}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
          />
        )}
        {activeTab === "english" && (
          <JobsGrid 
            jobs={jobs}
            expirations={expirations}
            onRenew={handleRenewJob}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
          />
        )}
      </div>
      
      {/* Floating Post Job Button */}
      <div className="fixed bottom-16 right-6 z-40 md:bottom-8">
        <AuthAction
          onAction={() => true}
          redirectPath="/post-job"
          customTitle="Sign in to post a job"
        >
          <MobileButton 
            className="bg-primary text-white shadow-lg rounded-full h-12 w-12 md:w-auto md:px-4"
            size="sm"
          >
            <Plus size={20} />
            <span className="hidden md:inline ml-1">Post Job</span>
          </MobileButton>
        </AuthAction>
      </div>
    </div>
  );
};

export default JobsPage;
