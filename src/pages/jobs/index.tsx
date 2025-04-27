
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';
import JobsGrid from '@/components/jobs/JobsGrid';
import useJobsData from '@/hooks/useJobsData';
import JobDetailModal from '@/components/jobs/JobDetailModal';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { useAuth } from '@/context/auth';
import { useJobRenewal } from '@/hooks/useJobRenewal';
import { useTranslation } from '@/hooks/useTranslation';
import { differenceInDays } from 'date-fns';
import { toast } from 'sonner';

const JobsPage = () => {
  const { t, isVietnamese } = useTranslation();
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Initialize with empty filters
  const { 
    jobs, 
    loading, 
    error, 
    filters, 
    updateFilters,
    searchTerm,
    updateSearchTerm,
    featuredJobs,
    suggestedKeywords,
    renewalJobId,
    setActiveRenewalJobId
  } = useJobsData({
    remote: false,
    weeklyPay: false,
    ownerWillTrain: false,
    hasHousing: false,
    noSupplyDeduction: false,
  });
  
  const { renewJob, isRenewing } = useJobRenewal({
    onSuccess: () => {
      toast.success("Job listing renewed successfully!");
    }
  });
  
  const [jobExpirations, setJobExpirations] = useState({});
  
  // Calculate which jobs are expired
  useEffect(() => {
    const expirations = {};
    jobs.forEach(job => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const isExpired = differenceInDays(now, createdDate) >= 30;
      expirations[job.id] = isExpired || job.status === 'expired';
    });
    setJobExpirations(expirations);
  }, [jobs]);
  
  const handleRenewJob = async (job) => {
    if (!user) {
      toast.error("You need to sign in to renew a job listing");
      return;
    }
    
    setActiveRenewalJobId(job.id);
    await renewJob(job.id);
    setActiveRenewalJobId(null);
  };
  
  const handleResetFilters = () => {
    updateFilters({
      remote: false,
      weeklyPay: false,
      ownerWillTrain: false,
      hasHousing: false,
      noSupplyDeduction: false,
      employmentType: 'all',
      payType: 'all',
      industry: 'all',
      language: 'all'
    });
    updateSearchTerm('');
  };
  
  const openJobDetails = (job) => {
    setSelectedJob(job);
  };
  
  const closeJobDetails = () => {
    setSelectedJob(null);
  };
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Jobs</h2>
            <p className="mb-4">There was an error loading the job listings. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="rounded-xl bg-gradient-to-r from-violet-100 to-blue-100 p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="font-playfair text-3xl md:text-4xl font-semibold mb-2 text-gray-800">
              {isVietnamese ? 'Cơ Hội Việc Làm Nghề Nail' : 'Nail Industry Job Opportunities'}
            </h1>
            <p className="text-gray-700 mb-6 max-w-xl">
              {isVietnamese 
                ? 'Tìm kiếm công việc hoàn hảo cho sự nghiệp của bạn trong ngành nail. Hàng trăm cơ hội đang chờ đợi.'
                : 'Find the perfect position for your career in the nail industry. Hundreds of opportunities waiting for you.'}
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 py-6 border-2 focus:ring-2 focus:ring-blue-300 rounded-lg shadow-sm w-full"
                placeholder={isVietnamese ? 'Tìm kiếm công việc...' : 'Search jobs...'}
                value={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-dots-pattern opacity-10"></div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">
                  {isVietnamese ? 'Bộ lọc' : 'Filters'}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  {isVietnamese ? 'Đặt lại' : 'Reset'}
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Remote Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="remote" 
                    checked={filters.remote} 
                    onCheckedChange={(checked) => updateFilters({ remote: !!checked })}
                  />
                  <Label
                    htmlFor="remote"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Từ xa' : 'Remote'}</Label>
                  </Label>
                </div>
                
                {/* Weekly Pay Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="weeklyPay" 
                    checked={filters.weeklyPay}
                    onCheckedChange={(checked) => updateFilters({ weeklyPay: !!checked })}
                  />
                  <Label
                    htmlFor="weeklyPay"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Trả lương hàng tuần' : 'Weekly Pay'}</Label>
                  </Label>
                </div>
                
                {/* Owner Will Train Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="ownerWillTrain" 
                    checked={filters.ownerWillTrain}
                    onCheckedChange={(checked) => updateFilters({ ownerWillTrain: !!checked })}
                  />
                  <Label
                    htmlFor="ownerWillTrain"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Chủ sẽ đào tạo' : 'Owner Will Train'}</Label>
                  </Label>
                </div>
                
                {/* Employment Type Filter */}
                <div className="space-y-2">
                  <Label className="font-medium">{isVietnamese ? 'Loại việc làm' : 'Employment Type'}</Label>
                  <Select 
                    value={filters.employmentType || 'all'} 
                    onValueChange={(value) => updateFilters({ employmentType: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{isVietnamese ? 'Tất cả' : 'All Types'}</SelectItem>
                      <SelectItem value="Full-Time">{isVietnamese ? 'Toàn thời gian' : 'Full-Time'}</SelectItem>
                      <SelectItem value="Part-Time">{isVietnamese ? 'Bán thời gian' : 'Part-Time'}</SelectItem>
                      <SelectItem value="For Sale">{isVietnamese ? 'Bán salon' : 'For Sale'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Has Housing Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="hasHousing" 
                    checked={filters.hasHousing}
                    onCheckedChange={(checked) => updateFilters({ hasHousing: !!checked })}
                  />
                  <Label
                    htmlFor="hasHousing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Có nhà ở' : 'Housing Available'}</Label>
                  </Label>
                </div>
                
                {/* No Supply Deduction Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="noSupplyDeduction" 
                    checked={filters.noSupplyDeduction}
                    onCheckedChange={(checked) => updateFilters({ noSupplyDeduction: !!checked })}
                  />
                  <Label
                    htmlFor="noSupplyDeduction"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Không khấu trừ tiếp liệu' : 'No Supply Deduction'}</Label>
                  </Label>
                </div>
                
                {/* Pay Type Filter */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="commissionPay" 
                    checked={filters.payType === 'commission'}
                    onCheckedChange={(checked) => updateFilters({ payType: checked ? 'commission' : 'all' })}
                  />
                  <Label
                    htmlFor="commissionPay"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Label className="cursor-pointer">{isVietnamese ? 'Hoa hồng' : 'Commission Pay'}</Label>
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="lg:col-span-3">
            <h2 className="font-playfair text-2xl font-semibold mb-6">
              {searchTerm ? `${isVietnamese ? 'Kết quả tìm kiếm cho' : 'Search results for'} "${searchTerm}"` : 
                isVietnamese ? 'Danh sách công việc' : 'Job Listings'}
              {!loading && <span className="text-gray-500 font-normal ml-2 text-lg">({jobs.length})</span>}
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : jobs.length > 0 ? (
              <JobsGrid 
                jobs={jobs} 
                expirations={jobExpirations}
                currentUserId={user?.id}
                onRenew={handleRenewJob}
                isRenewing={isRenewing}
                renewalJobId={renewalJobId}
              />
            ) : (
              <JobEmptyState 
                searchTerm={searchTerm} 
                onClearFilters={handleResetFilters}
                filters={filters}
              />
            )}
          </div>
        </div>
        
        {selectedJob && (
          <JobDetailModal 
            job={selectedJob} 
            isOpen={!!selectedJob} 
            onClose={closeJobDetails}
            isOwner={user?.id === selectedJob.user_id}
            isExpired={jobExpirations[selectedJob.id]}
            onRenew={handleRenewJob}
            isRenewing={isRenewing && renewalJobId === selectedJob.id}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
