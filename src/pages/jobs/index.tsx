import React, { useState, useEffect, useMemo } from "react";
import { useJobsData, type JobFilters } from "@/hooks/useJobsData";
import { useJobRenewal } from "@/hooks/useJobRenewal";
import { useTranslation } from "@/hooks/useTranslation";
import { Job } from "@/types/job";
import JobListingCard from "@/components/jobs/JobListingCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import JobEmptyState from "@/components/jobs/JobEmptyState"; 
import FeaturedJobsSection from "@/components/jobs/FeaturedJobsSection";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star, DollarSign, MapPin, Search, X, Filter, RefreshCw } from "lucide-react";
import Layout from "@/components/layout/Layout";

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const { t, isVietnamese } = useTranslation();
  const { user } = useAuth();

  const [filters, setFilters] = useState<JobFilters>({
    is_remote: false,
    weekly_pay: false,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: false,
    employment_type: '',
    specialties: [],
  });

  const {
    jobs,
    featuredJobs,
    vietnameseJobs,
    isLoading,
    sortOption,
    setSortOption
  } = useJobsData(filters);

  const {
    renewJob,
    isRenewing,
    renewalJobId
  } = useJobRenewal();

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleRenewJob = async (job: Job) => {
    if (!job.id) {
      toast.error("Job ID is missing");
      return;
    }

    await renewJob(job.id);
  };

  const handleFilterChange = (filterName: keyof JobFilters, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      is_remote: false,
      weekly_pay: false,
      owner_will_train: false,
      has_housing: false,
      no_supply_deduction: false,
      employment_type: '',
      specialties: [],
    });
    setSearchTerm('');
    setIsFiltersVisible(false);
  };

  const handleRemoveFilter = (filterName: string) => {
    if (filterName === 'employment_type') {
      setFilters(prevFilters => ({ ...prevFilters, employment_type: '' }));
    } else if (filterName === 'specialties') {
      setFilters(prevFilters => ({ ...prevFilters, specialties: [] }));
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [filterName]: false }));
    }
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    });
  }, [filters]);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen">
        {/* Hero Section with Background Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-purple-900/90 to-indigo-900/90">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop"
            alt="Jobs background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          <div className="relative px-6 py-12 md:py-16 text-white z-10">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
              Find Your Dream Beauty Career
            </h1>
            <p className="text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto text-white/90">
              Discover opportunities in salons, spas, and beauty businesses across the country
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t("Search jobs...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm w-full transition-all focus:bg-white/20"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className="h-12 px-6 gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200"
              >
                <Filter className="h-5 w-5" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <Card className={`mb-8 transition-all duration-300 ${isFiltersVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="font-playfair">Refine Your Search</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleClearFilters()}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="is_remote" className="text-sm font-medium">Remote</Label>
              <Checkbox
                id="is_remote"
                checked={filters.is_remote || false}
                onCheckedChange={(checked) => handleFilterChange('is_remote', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weekly_pay" className="text-sm font-medium">Weekly Pay</Label>
              <Checkbox
                id="weekly_pay"
                checked={filters.weekly_pay || false}
                onCheckedChange={(checked) => handleFilterChange('weekly_pay', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="owner_will_train" className="text-sm font-medium">Owner Will Train</Label>
              <Checkbox
                id="owner_will_train"
                checked={filters.owner_will_train || false}
                onCheckedChange={(checked) => handleFilterChange('owner_will_train', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="has_housing" className="text-sm font-medium">Has Housing</Label>
              <Checkbox
                id="has_housing"
                checked={filters.has_housing || false}
                onCheckedChange={(checked) => handleFilterChange('has_housing', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="no_supply_deduction" className="text-sm font-medium">No Supply Deduction</Label>
              <Checkbox
                id="no_supply_deduction"
                checked={filters.no_supply_deduction || false}
                onCheckedChange={(checked) => handleFilterChange('no_supply_deduction', checked)}
              />
            </div>

            <div>
              <Label htmlFor="employment_type" className="text-sm font-medium">Employment Type</Label>
              <Select onValueChange={(value) => handleFilterChange('employment_type', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Jobs Section */}
        {featuredJobs.length > 0 && (
          <div className="mb-12">
            <FeaturedJobsSection 
              featuredJobs={featuredJobs}
              onViewDetails={(job) => handleViewJobDetails(job)}
            />
          </div>
        )}

        {/* Vietnamese Jobs Section */}
        {vietnameseJobs.length > 0 && (
          <div className="mb-12">
            <VietnameseJobSection
              vietnameseJobs={vietnameseJobs}
              onViewDetails={(job) => handleViewJobDetails(job)}
            />
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1"
                >
                  {key.split('_').join(' ')}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleRemoveFilter(key)}
                  />
                </Badge>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Results Section */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <JobEmptyState
              searchTerm={searchTerm}
              onClearFilters={handleClearFilters}
              filters={filters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListingCard
                  key={job.id}
                  job={job}
                  isExpired={job.expires_at ? new Date(job.expires_at) < new Date() : false}
                  currentUserId={user?.id}
                  onViewDetails={() => handleViewJobDetails(job)}
                  onRenew={() => handleRenewJob(job)}
                  isRenewing={renewalJobId === job.id && isRenewing}
                />
              ))}
            </div>
          )}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={!!selectedJob}
            onClose={() => setSelectedJob(null)}
            isExpired={selectedJob.expires_at ? new Date(selectedJob.expires_at) < new Date() : false}
            onRenew={handleRenewJob}
            isRenewing={renewalJobId === selectedJob.id && isRenewing}
            isOwner={selectedJob.user_id === user?.id}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
