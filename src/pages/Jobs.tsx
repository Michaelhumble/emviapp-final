
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { usePostExpirationCheck } from "@/hooks/usePostExpirationCheck";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import { Job } from "@/types/job";
import JobFilters from "@/components/jobs/JobFilters";
import JobLoadingState from "@/components/jobs/JobLoadingState";
import JobEmptyState from "@/components/jobs/JobEmptyState";
import JobsGrid from "@/components/jobs/JobsGrid";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { useJobsData, JobFilters as JobFilterOptions } from "@/hooks/useJobsData";
import { useJobRenewal } from "@/hooks/useJobRenewal";
import { differenceInDays } from 'date-fns';

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    weeklyPay: false,
    ownerWillTrain: false,
    employmentType: "all",
    showExpired: true,
    hasHousing: false,
    noSupplyDeduction: false
  });
  const { user } = useAuth();
  
  const { jobs, loading, error, fetchJobs } = useJobsData();
  const { 
    renewJob,
    isRenewing,
    daysRemaining,
    isExpired,
    isExpiringSoon
  } = useJobRenewal({
    jobId: "", 
    expiresAt: null,
    onSuccess: () => fetchJobs()
  });
  
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  
  const jobIds = jobs.map((job) => job.id);
  const { expirations, isLoading: isExpirationLoading } = usePostExpirationCheck(jobIds);
  
  const resetFilters = () => {
    setFilters({
      weeklyPay: false,
      ownerWillTrain: false,
      employmentType: "all",
      showExpired: true,
      hasHousing: false,
      noSupplyDeduction: false
    });
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const checkExpiration = (job: Job): boolean => {
    if (job.is_sample) {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const differenceInDays = Math.floor(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return differenceInDays >= 30;
    }
    
    return expirations[job.id] === true;
  };
  
  const prepareRenewal = (job: Job) => {
    setRenewalJobId(job.id);
    renewJob();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Beauty Industry Job Listings
            </h1>
            <h2 className="text-xl text-gray-700 font-medium mb-4">
              Tìm Việc Nail Lương Cao, Bao Lương Nếu Cần
            </h2>
            <p className="text-gray-600 mb-6">
              Find your perfect position in top salons across the country or browse our 
              Vietnamese nail job listings. Filter by job type, pay structure, and more.
            </p>

            <JobFilters 
              filters={filters}
              searchTerm={searchTerm}
              onFiltersChange={handleFiltersChange}
              onSearchChange={handleSearchChange}
              onResetFilters={resetFilters}
              showVietnameseFilters={true}
            />
          </div>

          {loading || isExpirationLoading ? (
            <JobLoadingState />
          ) : jobs.length === 0 ? (
            <JobEmptyState onResetFilters={resetFilters} />
          ) : (
            <JobsGrid 
              jobs={jobs}
              expirations={expirations}
              currentUserId={user?.id}
              onRenew={prepareRenewal}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
              checkExpiration={checkExpiration}
            />
          )}
          
          <VietnameseJobSection checkExpiration={checkExpiration} />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
