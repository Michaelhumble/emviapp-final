
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, MapPin, Briefcase, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import JobsGrid from '@/components/jobs/JobsGrid';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJobsData } from '@/hooks/useJobsData';

const JobsPage = () => {
  const navigate = useNavigate();
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  
  const { 
    jobs, 
    loading, 
    error, 
    filters, 
    updateFilters,
    featuredJobs,
  } = useJobsData({
    showExpired: false
  });
  
  // Mock expirations since we don't have real data yet
  const expirations: Record<string, boolean> = {};
  jobs.forEach(job => {
    expirations[job.id] = false;
  });
  
  // Handle job renewal (placeholder for now)
  const handleRenewJob = (job: any) => {
    setRenewalJobId(job.id);
    setIsRenewing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1500);
  };
  
  useEffect(() => {
    document.title = "Jobs & Opportunities | EmviApp";
  }, []);
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Error loading job listings
            </h2>
            <p className="text-gray-600">
              Please try again later. If this problem persists, contact support.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Beauty & Salon Jobs
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Find your dream position or post open roles at top salons and spas across the country
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto text-base"
            onClick={() => navigate('/post-job')}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Post a Job
          </Button>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-4 rounded-lg shadow-sm mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filters:</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Location Filter */}
              <div className="flex flex-col space-y-1 w-full">
                <label className="text-sm text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </label>
                <Select
                  value={filters.location || 'all'}
                  onValueChange={(value) => updateFilters({ location: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="los angeles">Los Angeles</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                    <SelectItem value="dallas">Dallas</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="denver">Denver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Employment Type Filter */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-500 flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Position Type
                </label>
                <Select
                  value={filters.employmentType || 'all'}
                  onValueChange={(value) => updateFilters({ employmentType: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Commission">Commission</SelectItem>
                    <SelectItem value="Booth Rental">Booth Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pay Type Filter */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Pay Type
                </label>
                <Select
                  value={filters.payType || 'all'}
                  onValueChange={(value) => {
                    if (value === 'weekly_pay') {
                      updateFilters({ weeklyPay: true });
                    } else {
                      updateFilters({ 
                        weeklyPay: false,
                        payType: value
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Pay Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pay Types</SelectItem>
                    <SelectItem value="weekly_pay">Weekly Pay</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Jobs Section (if available) */}
        {featuredJobs && featuredJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-semibold text-gray-900">Featured Opportunities</h2>
            </div>
            <JobsGrid
              jobs={featuredJobs}
              expirations={expirations}
              onRenew={handleRenewJob}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
            />
          </motion.div>
        )}

        {/* All Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-semibold text-gray-900">All Available Positions</h2>
          </div>
          
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600">Loading opportunities...</p>
            </div>
          ) : jobs.length > 0 ? (
            <JobsGrid
              jobs={jobs}
              expirations={expirations}
              onRenew={handleRenewJob}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
            />
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs matching your criteria</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back soon for new opportunities</p>
              <Button variant="outline" onClick={() => updateFilters({ 
                location: 'all', 
                employmentType: 'all',
                payType: 'all',
                weeklyPay: false
              })}>
                Reset Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default JobsPage;
