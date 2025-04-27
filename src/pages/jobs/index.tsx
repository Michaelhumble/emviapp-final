
import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout";
import JobListingCard from "@/components/jobs/JobListingCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { useJobsData, JobFilters } from "@/hooks/useJobsData";
import { Job } from "@/types/job";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, X, DollarSign, Star, CheckCircle } from "lucide-react";
import JobEmptyState from "@/components/jobs/JobEmptyState";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import FeaturedJobsSection from "@/components/jobs/FeaturedJobsSection";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { useJobRenewal } from "@/hooks/useJobRenewal";
import { JobsGrid } from "@/components/jobs/JobsGrid";

const JobsPage = () => {
  const { 
    jobs, 
    loading,
    filters,
    updateFilters,
    searchTerm,
    updateSearchTerm,
    suggestedKeywords,
    featuredJobs
  } = useJobsData();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expiredJobs, setExpiredJobs] = useState<Record<string, boolean>>({});
  const { user } = useAuth();
  const currentUserId = user?.id;
  
  const { 
    renewJob, 
    isRenewing,
    renewalJobId
  } = useJobRenewal({
    onSuccess: () => {
      // Update expired status after renewal
      if (selectedJob) {
        setExpiredJobs(prev => ({
          ...prev,
          [selectedJob.id]: false
        }));
      }
    }
  });

  // Check for expired jobs
  useEffect(() => {
    const checkExpirations = () => {
      const expirations: Record<string, boolean> = {};
      
      jobs.forEach(job => {
        // If already marked as expired
        if (job.status === 'expired') {
          expirations[job.id] = true;
          return;
        }
        
        // Check by date (30 days from posting)
        const createdDate = new Date(job.created_at);
        const today = new Date();
        const diffTime = today.getTime() - createdDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        expirations[job.id] = diffDays >= 30;
      });
      
      setExpiredJobs(expirations);
    };
    
    checkExpirations();
  }, [jobs]);

  // Filter for Vietnamese jobs
  const vietnameseJobs = useMemo(() => {
    return jobs.filter(job => 
      job.vietnamese_description && 
      job.vietnamese_description.length > 0 && 
      !expiredJobs[job.id]
    ).slice(0, 4);
  }, [jobs, expiredJobs]);

  // Handle opening job details
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  // Handle closing job details
  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // Handle renewing a job
  const handleRenewJob = async (job: Job) => {
    await renewJob(job.id);
  };

  // Toggle showing filters on mobile
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // Reset all filters
  const resetFilters = () => {
    updateFilters({
      featured: false,
      remote: false,
      fullTime: false,
      partTime: false,
      location: 'all',
      weeklyPay: false,
      ownerWillTrain: false,
      hasHousing: false,
      noSupplyDeduction: false,
      employmentType: 'all',
      industry: 'all',
      language: 'all',
      showExpired: false,
      payType: 'all'
    });
    updateSearchTerm("");
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by updateSearchTerm
  };

  // Search keyword suggestion click
  const handleSuggestionClick = (keyword: string) => {
    updateSearchTerm(keyword);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 md:mb-0">Beauty Industry Jobs & Opportunities</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            Filters
            {Object.values(filters).some(val => val === true || (typeof val === 'string' && val !== 'all')) && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {Object.values(filters).filter(val => val === true || (typeof val === 'string' && val !== 'all')).length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by job title, company, or location"
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => updateSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => updateSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          
          {!searchTerm && suggestedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Try:</span>
              {suggestedKeywords.slice(0, 5).map((keyword, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                  onClick={() => handleSuggestionClick(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          )}
        </form>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters sidebar */}
          <div className={`col-span-12 lg:col-span-3 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filter Jobs</CardTitle>
                  {Object.values(filters).some(val => val === true || (typeof val === 'string' && val !== 'all')) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Job Type Filters */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Job Type</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fullTime" 
                      checked={filters.fullTime}
                      onCheckedChange={(checked) => updateFilters({ fullTime: checked as boolean })}
                    />
                    <Label htmlFor="fullTime">Full Time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="partTime" 
                      checked={filters.partTime}
                      onCheckedChange={(checked) => updateFilters({ partTime: checked as boolean })}
                    />
                    <Label htmlFor="partTime">Part Time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remote" 
                      checked={filters.remote}
                      onCheckedChange={(checked) => updateFilters({ remote: checked as boolean })}
                    />
                    <Label htmlFor="remote">Remote</Label>
                  </div>
                </div>

                {/* Pay Type Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Payment Type</h4>
                  <Select 
                    value={filters.payType || 'all'} 
                    onValueChange={(value) => updateFilters({ payType: value as 'commission' | 'hourly' | 'salary' | 'all' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Payment Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payment Types</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Benefits */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Benefits</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weeklyPay" 
                      checked={filters.weeklyPay}
                      onCheckedChange={(checked) => updateFilters({ weeklyPay: checked as boolean })}
                    />
                    <Label htmlFor="weeklyPay">Weekly Pay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ownerWillTrain" 
                      checked={filters.ownerWillTrain}
                      onCheckedChange={(checked) => updateFilters({ ownerWillTrain: checked as boolean })}
                    />
                    <Label htmlFor="ownerWillTrain">Owner Will Train</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasHousing" 
                      checked={filters.hasHousing}
                      onCheckedChange={(checked) => updateFilters({ hasHousing: checked as boolean })}
                    />
                    <Label htmlFor="hasHousing">Housing Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="noSupplyDeduction" 
                      checked={filters.noSupplyDeduction}
                      onCheckedChange={(checked) => updateFilters({ noSupplyDeduction: checked as boolean })}
                    />
                    <Label htmlFor="noSupplyDeduction">No Supply Deduction</Label>
                  </div>
                </div>

                {/* Featured Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Other Filters</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={filters.featured}
                      onCheckedChange={(checked) => updateFilters({ featured: checked as boolean })}
                    />
                    <Label htmlFor="featured">Featured Jobs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showExpired" 
                      checked={filters.showExpired}
                      onCheckedChange={(checked) => updateFilters({ showExpired: checked as boolean })}
                    />
                    <Label htmlFor="showExpired">Show Expired Listings</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-12 lg:col-span-9">
            {/* Featured jobs section */}
            {!searchTerm && featuredJobs.length > 0 && !filters.featured && (
              <FeaturedJobsSection featuredJobs={featuredJobs} onViewDetails={viewJobDetails} />
            )}

            {/* Vietnamese jobs section */}
            {!searchTerm && vietnameseJobs.length > 0 && !filters.language && (
              <VietnameseJobSection vietnameseJobs={vietnameseJobs} onViewDetails={viewJobDetails} />
            )}

            {/* Active filters */}
            {Object.values(filters).some(val => val === true || (typeof val === 'string' && val !== 'all')) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.featured && (
                  <Badge variant="secondary" className="px-3 py-1">
                    <Star className="h-3 w-3 mr-1" /> Featured
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ featured: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.remote && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Remote
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ remote: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.fullTime && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Full Time
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ fullTime: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.partTime && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Part Time
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ partTime: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.weeklyPay && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Weekly Pay
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ weeklyPay: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.ownerWillTrain && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Owner Will Train
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ ownerWillTrain: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.hasHousing && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Housing Available
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ hasHousing: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.noSupplyDeduction && (
                  <Badge variant="secondary" className="px-3 py-1">
                    No Supply Deduction
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ noSupplyDeduction: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.showExpired && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Including Expired
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ showExpired: false })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.payType && filters.payType !== 'all' && (
                  <Badge variant="secondary" className="px-3 py-1">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {filters.payType === 'commission' ? 'Commission' : 
                     filters.payType === 'hourly' ? 'Hourly' : 
                     filters.payType === 'salary' ? 'Salary' : ''}
                    <button 
                      className="ml-1" 
                      onClick={() => updateFilters({ payType: 'all' })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Results stats */}
            {!loading && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                  {searchTerm ? ` for "${searchTerm}"` : ''}
                </p>
              </div>
            )}
            
            {/* Job listings */}
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="border rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <JobsGrid 
                jobs={jobs}
                expirations={expiredJobs}
                currentUserId={currentUserId}
                onRenew={handleRenewJob}
                isRenewing={isRenewing}
                renewalJobId={renewalJobId || null}
              />
            ) : (
              <JobEmptyState 
                searchTerm={searchTerm} 
                onClearFilters={resetFilters}
              />
            )}
          </div>
        </div>

        {/* Job detail modal */}
        {selectedJob && (
          <JobDetailModal 
            job={selectedJob}
            isOpen={!!selectedJob}
            onClose={closeJobDetails}
            isExpired={expiredJobs[selectedJob.id] || false}
            onRenew={handleRenewJob}
            isRenewing={isRenewing && renewalJobId === selectedJob.id}
            isOwner={currentUserId === selectedJob.user_id}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
