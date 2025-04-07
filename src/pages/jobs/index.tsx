
import { useEffect, useState } from "react";
import { Briefcase, MapPin, Search, Filter, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJobsData } from "@/hooks/useJobsData";
import { Job } from "@/types/job";
import JobsGrid from "@/components/jobs/JobsGrid";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import FeaturedJobsSection from "@/components/jobs/FeaturedJobsSection";
import JobLoadingState from "@/components/jobs/JobLoadingState";
import JobEmptyState from "@/components/jobs/JobEmptyState";

const JobsPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  
  const { 
    jobs, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    updateSearchTerm, 
    featuredJobs,
    suggestedKeywords
  } = useJobsData();
  
  useEffect(() => {
    document.title = "Job Listings | EmviApp";
  }, []);
  
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };
  
  const handleCloseDetails = () => {
    setSelectedJob(null);
  };
  
  const handleRenewJob = (job: Job) => {
    // This is a placeholder - job renewal will be implemented later
    console.log("Would renew job:", job.id);
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate a renewal process
    setTimeout(() => {
      setIsRenewing(false);
      setRenewalJobId(null);
      
      // Update the expiration status
      setExpirations(prev => ({
        ...prev,
        [job.id]: false
      }));
    }, 1500);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const clearFilters = () => {
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
      language: 'all'
    });
    updateSearchTerm('');
  };
  
  const handleApplyClick = () => {
    if (!isSignedIn) {
      navigate('/sign-in', { state: { returnTo: '/jobs' } });
    } else {
      // Future implementation - actual application flow
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-20">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Explore Salon Job Listings
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Booth rentals, hourly jobs, commissions — discover opportunities near you.
          </p>
          <p className="text-gray-600 italic">
            Khám phá công việc tiệm làm đẹp tại địa phương của bạn.
          </p>
        </div>
        
        {featuredJobs.length > 0 && (
          <FeaturedJobsSection 
            featuredJobs={featuredJobs} 
            onViewDetails={handleViewDetails} 
          />
        )}
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search job titles, skills, or locations..."
                value={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={filters.location || 'all'} 
                onValueChange={(value) => updateFilters({ location: value })}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="ga">Georgia</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filters.employmentType || 'all'} 
                onValueChange={(value) => updateFilters({ employmentType: value })}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-Time">Full Time</SelectItem>
                  <SelectItem value="Part-Time">Part Time</SelectItem>
                  <SelectItem value="Booth Rental">Booth Rental</SelectItem>
                  <SelectItem value="Commission">Commission</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="shrink-0"
                onClick={toggleFilters}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Extended Filters */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Advanced Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.weeklyPay || false}
                    onChange={(e) => updateFilters({ weeklyPay: e.target.checked })}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm text-gray-700">Weekly Pay</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.ownerWillTrain || false}
                    onChange={(e) => updateFilters({ ownerWillTrain: e.target.checked })}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm text-gray-700">Training Provided</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.hasHousing || false}
                    onChange={(e) => updateFilters({ hasHousing: e.target.checked })}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm text-gray-700">Housing Available</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.noSupplyDeduction || false}
                    onChange={(e) => updateFilters({ noSupplyDeduction: e.target.checked })}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm text-gray-700">No Supply Deduction</span>
                </label>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select 
                  value={filters.industry || 'all'} 
                  onValueChange={(value) => updateFilters({ industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="nails">Nails</SelectItem>
                    <SelectItem value="hair">Hair</SelectItem>
                    <SelectItem value="facial">Facial</SelectItem>
                    <SelectItem value="massage">Massage</SelectItem>
                    <SelectItem value="eyelash">Eyelash</SelectItem>
                    <SelectItem value="makeup">Makeup</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filters.language || 'all'} 
                  onValueChange={(value) => updateFilters({ language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="vietnamese">Vietnamese</SelectItem>
                    <SelectItem value="bilingual">Bilingual</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filters.remote ? 'remote' : 'all'} 
                  onValueChange={(value) => updateFilters({ remote: value === 'remote' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Work Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Work Types</SelectItem>
                    <SelectItem value="remote">Remote Available</SelectItem>
                    <SelectItem value="onsite">On-site Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {suggestedKeywords.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Suggested Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedKeywords.slice(0, 8).map((keyword, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs py-1 h-6"
                        onClick={() => updateSearchTerm(keyword)}
                      >
                        {keyword}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="relative">
          {loading ? (
            <JobLoadingState />
          ) : jobs.length === 0 ? (
            <JobEmptyState 
              searchTerm={searchTerm}
              onClearFilters={clearFilters}
            />
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {jobs.length} job {jobs.length === 1 ? 'listing' : 'listings'}
              </p>
              
              <JobsGrid 
                jobs={jobs}
                expirations={expirations}
                onRenew={handleRenewJob}
                isRenewing={isRenewing}
                renewalJobId={renewalJobId}
              />
            </>
          )}
        </div>
        
        {/* CTA at Bottom */}
        {!isSignedIn && (
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">
              Ready to find your next opportunity?
            </h3>
            <p className="text-gray-600 mb-2 max-w-xl mx-auto">
              Join EmviApp to apply for jobs, get notifications about new listings, and connect directly with salon owners.
            </p>
            <p className="text-gray-600 italic mb-6">
              Đăng ký để ứng tuyển và kết nối với chủ tiệm.
            </p>
            <Button 
              size="lg" 
              className="font-medium px-8"
              onClick={() => navigate('/sign-up')}
            >
              Join EmviApp to Apply
            </Button>
          </div>
        )}
        
        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={!!selectedJob}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
