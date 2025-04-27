
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useJobsData, JobFilters } from "@/hooks/useJobsData";
import { Job } from "@/types/job";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import JobFiltersComponent from "@/components/jobs/JobFilters";
import { differenceInDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { ArrowRight, MailCheck } from "lucide-react";
import { useJobRenewal } from "@/hooks/useJobRenewal";
import { useTranslation } from "@/hooks/useTranslation";
import { FeaturedJobsSection } from "@/components/jobs/FeaturedJobsSection";
import VietnameseJobsSection from "@/components/jobs/VietnameseJobSection";
import JobEmptyState from "@/components/jobs/JobEmptyState";
import JobLoadingState from "@/components/jobs/JobLoadingState";

// Main component
const JobsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { user } = useAuth();
  const { isVietnamese } = useTranslation();
  const { renewJob, isRenewing, renewalJobId } = useJobRenewal();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  
  // Get search params and create initial filters
  const searchParams = new URLSearchParams(location.search);
  
  const initialFilters: JobFilters = {
    featured: searchParams.get('featured') === 'true',
    remote: searchParams.get('remote') === 'true',
    fullTime: searchParams.get('fullTime') === 'true',
    partTime: searchParams.get('partTime') === 'true',
    location: searchParams.get('location') || undefined,
    weeklyPay: searchParams.get('weeklyPay') === 'true',
    ownerWillTrain: searchParams.get('ownerWillTrain') === 'true',
    employmentType: searchParams.get('employmentType') || undefined,
    industry: searchParams.get('industry') || undefined,
    language: searchParams.get('language') || undefined,
    showExpired: searchParams.get('showExpired') === 'true',
    hasHousing: searchParams.get('hasHousing') === 'true',
    noSupplyDeduction: searchParams.get('noSupplyDeduction') === 'true',
    payType: (searchParams.get('payType') as 'commission' | 'hourly' | 'salary' | 'all') || undefined,
  };

  const { jobs, loading, error, filters, updateFilters, featuredJobs, searchTerm, updateSearchTerm } = useJobsData(initialFilters);

  // Handle job selection
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  // Close job modal
  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.featured) params.set('featured', 'true');
    if (filters.remote) params.set('remote', 'true');
    if (filters.fullTime) params.set('fullTime', 'true');
    if (filters.partTime) params.set('partTime', 'true');
    if (filters.location) params.set('location', filters.location);
    if (filters.weeklyPay) params.set('weeklyPay', 'true');
    if (filters.ownerWillTrain) params.set('ownerWillTrain', 'true');
    if (filters.employmentType) params.set('employmentType', filters.employmentType);
    if (filters.industry) params.set('industry', filters.industry);
    if (filters.language) params.set('language', filters.language);
    if (filters.showExpired) params.set('showExpired', 'true');
    if (filters.hasHousing) params.set('hasHousing', 'true');
    if (filters.noSupplyDeduction) params.set('noSupplyDeduction', 'true');
    if (filters.payType) params.set('payType', filters.payType);
    
    if (searchTerm) params.set('search', searchTerm);
    
    const queryString = params.toString();
    const newUrl = `${location.pathname}${queryString ? `?${queryString}` : ''}`;
    
    window.history.replaceState({}, '', newUrl);
  }, [filters, searchTerm, location.pathname]);

  // Check job expirations
  useEffect(() => {
    const checkExpirations = () => {
      const expirationsMap: Record<string, boolean> = {};
      
      jobs.forEach(job => {
        // If already marked as expired
        if (job.status === 'expired') {
          expirationsMap[job.id] = true;
          return;
        }
        
        // Calculate based on created_at
        const createdDate = new Date(job.created_at);
        const now = new Date();
        const daysDifference = differenceInDays(now, createdDate);
        
        expirationsMap[job.id] = daysDifference >= 30;
      });
      
      setExpirations(expirationsMap);
    };
    
    if (jobs.length > 0) {
      checkExpirations();
    }
  }, [jobs]);

  // Handle job renewal
  const handleRenewJob = async (job: Job) => {
    try {
      await renewJob(job);
      setAlertMessage("Job renewed successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error renewing job:", error);
      setAlertMessage("Failed to renew job. Please try again.");
      setShowAlert(true);
    }
  };

  // Group Vietnamese jobs for special section
  const vietnameseJobs = jobs.filter(job => job.vietnamese_description && !expirations[job.id]);

  // Filter regular jobs (non-Vietnamese or explicitly included in both sections)
  const displayJobs = jobs.filter(job => {
    if (filters.language === 'vietnamese') {
      return job.vietnamese_description;
    }
    
    if (filters.language === 'english') {
      return !job.vietnamese_description;
    }
    
    // All jobs for "all" language filter
    return true;
  });

  // Check if we should show empty state
  const showEmptyState = !loading && displayJobs.length === 0;

  // Handle alert dismissal
  const onDismissAlert = () => {
    setShowAlert(false);
  };

  const handleFilterChange = (filterName: string, value: any) => {
    switch (filterName) {
      case 'language':
        updateFilters({ language: value });
        break;
      case 'industry':
        updateFilters({ industry: value });
        break;
      case 'employmentType':
        updateFilters({ employmentType: value });
        break;
      case 'location':
        updateFilters({ location: value });
        break;
      case 'remote':
        updateFilters({ remote: value });
        break;
      case 'fullTime':
        updateFilters({ fullTime: value });
        break;
      case 'partTime':
        updateFilters({ partTime: value });
        break;
      case 'weeklyPay':
        updateFilters({ weeklyPay: value });
        break;
      case 'ownerWillTrain':
        updateFilters({ ownerWillTrain: value });
        break;
      case 'hasHousing':
        updateFilters({ hasHousing: value });
        break;
      case 'noSupplyDeduction':
        updateFilters({ noSupplyDeduction: value });
        break;
      case 'showExpired':
        updateFilters({ showExpired: value });
        break;
      case 'payType':
        updateFilters({ payType: value });
        break;
      default:
        break;
    }
  };

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Alert for job renewal */}
        {showAlert && (
          <Alert className="mb-6" variant="default">
            <MailCheck className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              {alertMessage}
              <Button variant="outline" onClick={onDismissAlert}>Dismiss</Button>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
              {isVietnamese ? "Cơ Hội Việc Làm" : "Job Opportunities"}
            </h1>
            <p className="text-gray-600 max-w-xl">
              {isVietnamese 
                ? "Tìm kiếm cơ hội việc làm mới trong ngành làm đẹp"
                : "Find your next opportunity in the beauty industry"
              }
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate("/post/job")}
              className="flex items-center gap-2"
            >
              {isVietnamese ? "Đăng Việc Làm" : "Post a Job"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <JobFiltersComponent 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          searchTerm={searchTerm}
        />
        
        {/* Featured Jobs Section - Always visible */}
        <FeaturedJobsSection jobs={featuredJobs} />
        
        {/* Show Vietnamese Job Section if applicable */}
        {vietnameseJobs.length > 0 && !filters.language && (
          <VietnameseJobsSection jobs={vietnameseJobs} />
        )}
        
        {/* Main Content */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">
            {isVietnamese ? "Danh Sách Việc Làm" : "Job Listings"}
            {displayJobs.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {displayJobs.length}
              </Badge>
            )}
          </h2>
          
          {/* Loading State */}
          {loading && <JobLoadingState />}
          
          {/* Error State */}
          {error && (
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700">{error.message}</p>
            </div>
          )}
          
          {/* Empty State */}
          {showEmptyState && <JobEmptyState filters={filters} />}
          
          {/* Job Grid */}
          {!loading && displayJobs.length > 0 && (
            <JobsGrid 
              jobs={displayJobs}
              expirations={expirations}
              currentUserId={user?.id}
              onRenew={handleRenewJob}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
            />
          )}
        </div>
        
        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={!!selectedJob}
            onClose={handleCloseModal}
            isExpired={expirations[selectedJob.id] || selectedJob.status === 'expired'}
            onRenew={handleRenewJob}
            isRenewing={isRenewing && renewalJobId === selectedJob.id}
            isOwner={user?.id === selectedJob.user_id}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
