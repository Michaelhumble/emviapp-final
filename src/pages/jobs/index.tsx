
import React, { useState, useEffect } from 'react';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { vietnameseJobs } from '@/data/protected/vietnameseJobs';
import VietnameseJobSection from '@/components/jobs/VietnameseJobSection';
import JobDetailModal from '@/components/jobs/JobDetailModal';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/auth';

const JobsPage = () => {
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [expiredJobs, setExpiredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    console.log("Jobs page loaded, processing job listings");
    
    // Filter jobs into active, featured, and expired
    const active: Job[] = [];
    const featured: Job[] = [];
    const expired: Job[] = [];
    
    vietnameseJobs.forEach(job => {
      if (job.status === 'expired' || job.pricingTier === 'expired') {
        expired.push(job);
        return;
      }
      
      if (job.is_featured || 
          job.pricingTier === 'premium' || 
          job.pricingTier === 'diamond' || 
          job.pricingTier === 'gold') {
        featured.push(job);
      } else {
        active.push(job);
      }
    });
    
    setActiveJobs(active);
    setFeaturedJobs(featured);
    setExpiredJobs(expired);
  }, []);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleViewJobDetails = (job: Job) => {
    // If user is not signed in, we still allow them to view job details
    // but will restrict contact information in the modal
    setSelectedJob(job);
  };
  
  const closeJobDetails = () => {
    setSelectedJob(null);
  };
  
  const handleRenewJob = (job: Job) => {
    if (!isSignedIn) {
      // If not signed in, direct to auth page or show sign-in modal
      console.log("User needs to sign in to renew a job");
      return;
    }
    
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // In a real app, this would interact with your renewal flow
    // For now, we'll simulate the process with a timeout
    setTimeout(() => {
      console.log(`Job ${job.id} renewal requested`);
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1500);
  };
  
  // Get premium jobs for the top row (if any)
  const premiumJobs = featuredJobs.filter(job => 
    job.pricingTier === 'premium' || job.pricingTier === 'diamond'
  );
  
  // Define expirations object for compatibility with JobsGrid component
  const expirations: Record<string, boolean> = {};
  expiredJobs.forEach(job => {
    expirations[job.id] = true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-3xl font-playfair font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600">Find your next opportunity in the beauty industry</p>
      </div>
      
      <JobSearchBar 
        value={searchTerm} 
        onSearchChange={setSearchTerm}
        onSearch={handleSearch} 
      />
      
      {/* Premium Featured Jobs Row */}
      {premiumJobs.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
              ✨ Premium Featured Listings
            </h2>
            <Button variant="outline" className="hidden md:flex">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First card is special "Reserve this spot" promo */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <div className="text-amber-500 font-semibold mb-2">Top Diamond Featured</div>
                <h3 className="text-xl font-playfair font-bold mb-3">Reserve This Premium Spot</h3>
                <p className="text-gray-700 mb-4">
                  Place your job listing in this highly visible position. 
                  Get up to 5x more applications.
                </p>
                <div className="flex items-center text-amber-700 mb-4">
                  <span className="text-lg font-semibold">$99</span>
                  <span className="text-sm ml-2">/ 30 days</span>
                </div>
              </div>
              
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Reserve This Spot
              </Button>
            </div>
            
            {/* Display up to 2 premium jobs */}
            {premiumJobs.slice(0, 2).map(job => (
              <div 
                key={job.id} 
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
              >
                {job.image && (
                  <div className="aspect-video relative">
                    <img 
                      src={job.image} 
                      alt={job.title || 'Job listing'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                      {job.pricingTier === 'diamond' ? 'Diamond' : 'Premium'}
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="font-playfair font-semibold text-lg mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {job.location}
                  </p>
                  
                  <div className="mt-4">
                    <Button 
                      onClick={() => handleViewJobDetails(job)} 
                      className="w-full"
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Vietnamese job listings section */}
      <VietnameseJobSection 
        vietnameseJobs={vietnameseJobs.filter(job => !job.is_salon_for_sale)} 
        onViewDetails={handleViewJobDetails}
        searchTerm={searchTerm}
      />
      
      {/* Job Detail Modal */}
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
