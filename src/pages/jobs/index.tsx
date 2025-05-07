
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import JobGrid from "@/components/jobs/JobGrid";
import JobPostCTA from "./JobPostCTA";
import useJobsData from "@/hooks/useJobsData";
import { Job } from "@/types/job";
import { ChevronRight } from "lucide-react";
import VietnameseJobCard from "@/components/jobs/VietnameseJobCard";
import VietnameseJobDetailModal from "@/components/jobs/VietnameseJobDetailModal";
import { vietnameseNailJobs } from "@/data/vietnameseNailJobs"; 
import { vietnameseExpiredJobs } from "@/data/vietnameseNailJobs"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobSearchBar from "@/components/jobs/JobSearchBar";

// Helper function to normalize text for accent-insensitive search
const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Helper function to check if a job matches the search query
const jobMatchesSearch = (job: Job, searchQuery: string): boolean => {
  if (!searchQuery.trim()) return true;
  
  const normalizedQuery = normalizeText(searchQuery);
  
  // Fields to search in
  const searchableFields = [
    job.title || '',
    job.location || '',
    job.company || '',
    job.vietnamese_description || job.description || '',
    job.compensation_details || '',
    job.salary_range || ''
  ];
  
  // Check if any field contains the search query
  return searchableFields.some(field => 
    normalizeText(field.toString()).includes(normalizedQuery)
  );
};

const JobsPage = () => {
  const { jobs, loading, error, renewalJobId, setActiveRenewalJobId } = useJobsData();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [selectedVietnameseJob, setSelectedVietnameseJob] = useState<Job | null>(null);
  const [isVietnameseModalOpen, setIsVietnameseModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("vietnamese");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter jobs based on search query
  const filteredVietnameseJobs = vietnameseNailJobs.filter(job => 
    jobMatchesSearch(job, searchQuery)
  );
  
  const filteredExpiredJobs = vietnameseExpiredJobs.filter(job => 
    jobMatchesSearch(job, searchQuery)
  );
  
  const filteredEnglishJobs = jobs.filter(job => 
    jobMatchesSearch(job, searchQuery)
  );

  useEffect(() => {
    // Check for expired jobs
    const jobExpiration: Record<string, boolean> = {};
    jobs.forEach((job) => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const diffDays = Math.ceil(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      jobExpiration[job.id] = diffDays >= 30;
    });
    setExpirations(jobExpiration);
  }, [jobs]);

  const handleRenewJob = (job: Job) => {
    setActiveRenewalJobId(job.id);
    // In a real app, this would call an API to renew the job
    setTimeout(() => {
      const newExpirations = { ...expirations };
      newExpirations[job.id] = false;
      setExpirations(newExpirations);
      setActiveRenewalJobId(null);
    }, 1000);
  };

  const handleViewVietnameseJobDetails = (job: Job) => {
    setSelectedVietnameseJob(job);
    setIsVietnameseModalOpen(true);
  };

  const closeVietnameseJobDetails = () => {
    setIsVietnameseModalOpen(false);
    setSelectedVietnameseJob(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Helmet>
        <title>Tin tuyển dụng thợ nail | EmviApp</title>
        <meta name="description" content="Danh sách tin tuyển dụng mới nhất cho thợ nail. Tìm việc làm phù hợp với kỹ năng và kinh nghiệm của bạn." />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">
              Beauty Industry Jobs
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <span>Home</span>
              <ChevronRight className="h-3 w-3 mx-1" />
              <span>Jobs</span>
            </div>
          </div>
        </div>

        <JobPostCTA />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="vietnamese">Vietnamese Nail Jobs</TabsTrigger>
            <TabsTrigger value="english">English Jobs</TabsTrigger>
          </TabsList>
          
          {/* Search bar positioned below tabs */}
          <JobSearchBar 
            value={searchQuery}
            onSearchChange={handleSearchChange}
            placeholder={activeTab === "vietnamese" ? "Tìm kiếm theo thành phố, loại việc làm, hoặc từ khóa..." : "Search by city, job type, or keyword..."}
          />
          
          <TabsContent value="vietnamese" className="space-y-8">
            <h2 className="text-2xl font-serif font-medium mb-6">
              Tin tuyển dụng thợ nail mới nhất
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVietnameseJobs.map((job) => (
                <VietnameseJobCard
                  key={job.id}
                  job={job}
                  onViewDetails={() => handleViewVietnameseJobDetails(job)}
                />
              ))}
            </div>
            
            {filteredExpiredJobs && filteredExpiredJobs.length > 0 && (
              <>
                <h2 className="text-2xl font-serif font-medium mb-6 mt-12">
                  Tin tuyển dụng đã hết hạn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                  {filteredExpiredJobs.map((job) => (
                    <VietnameseJobCard
                      key={job.id}
                      job={job}
                      onViewDetails={() => handleViewVietnameseJobDetails(job)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Vietnamese job detail modal */}
            <VietnameseJobDetailModal
              job={selectedVietnameseJob}
              isOpen={isVietnameseModalOpen}
              onClose={closeVietnameseJobDetails}
            />
          </TabsContent>
          
          <TabsContent value="english">
            <h2 className="text-2xl font-serif font-medium mb-6">
              Current Job Listings
            </h2>
            
            {loading ? (
              <div className="py-10 text-center">
                <p>Loading job listings...</p>
              </div>
            ) : error ? (
              <div className="py-10 text-center">
                <p>Error loading jobs. Please try again later.</p>
              </div>
            ) : (
              <JobGrid
                jobs={filteredEnglishJobs}
                expirations={expirations}
                onRenew={handleRenewJob}
                isRenewing={!!renewalJobId}
                renewalJobId={renewalJobId}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default JobsPage;
