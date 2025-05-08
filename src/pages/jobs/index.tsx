
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import PremiumListingsSection from '@/components/jobs/PremiumListingsSection';
import ExpiredListingsSection from '@/components/jobs/ExpiredListingsSection';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { Job } from '@/types/job';
import { vietnameseJobs } from '@/data/protected/vietnameseJobs';
import DiamondFeaturedSection from '@/components/jobs/DiamondFeaturedSection';
import GoldFeaturedSection from '@/components/jobs/GoldFeaturedSection';
import FreeListingsSection from '@/components/jobs/FreeListingsSection';
import { useAuth } from '@/context/auth';
import { toast } from '@/components/ui/use-toast';
import VietnameseJobSection from '@/components/jobs/VietnameseJobSection';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [premiumJobs, setPremiumJobs] = useState<Job[]>([]);
  const [goldJobs, setGoldJobs] = useState<Job[]>([]);
  const [freeJobs, setFreeJobs] = useState<Job[]>([]);
  const [expiredJobs, setExpiredJobs] = useState<Job[]>([]);
  const [diamondJobs, setDiamondJobs] = useState<Job[]>([]);
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Set page title
    document.title = "Job Listings | EmviApp";
    
    // Simulate loading jobs data
    const loadJobs = async () => {
      try {
        // Get Vietnamese job listings and add pricing tier
        const allJobs = vietnameseJobs.map((job) => ({
          ...job,
          // Use pricing tier from data if available
          pricingTier: job.pricingTier || 'free'
        }));

        // Create random expiration states for all jobs
        const jobExpirations: Record<string, boolean> = {};
        allJobs.forEach(job => {
          // Make all expired tier jobs actually expired
          jobExpirations[job.id] = job.pricingTier === 'expired';
        });
        
        setExpirations(jobExpirations);

        // Filter jobs by pricing tier
        setDiamondJobs(allJobs.filter(job => job.pricingTier === 'diamond'));
        setPremiumJobs(allJobs.filter(job => job.pricingTier === 'premium'));
        setGoldJobs(allJobs.filter(job => job.pricingTier === 'gold'));
        setFreeJobs(allJobs.filter(job => job.pricingTier === 'free'));
        setExpiredJobs(allJobs.filter(job => job.pricingTier === 'expired'));
        setJobs(allJobs);

      } catch (error) {
        console.error('Error loading jobs:', error);
      }
    };

    loadJobs();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log('Searching for:', term);
    // Implement search logic here if needed
  };

  const handlePostJob = () => {
    if (isSignedIn) {
      navigate('/post-job');
    } else {
      toast({
        title: "Sign in required",
        description: "Please sign in to post a job listing",
        variant: "destructive",
      });
      navigate('/signin');
    }
  };

  const handleViewJobDetails = (job: Job) => {
    console.log('View job details:', job);
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to view full job details",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    // Navigate to job details page or open a modal
  };

  const handleRenewJob = (job: Job) => {
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to renew this listing",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    // Simulate renewal process
    setIsRenewing(true);
    setRenewalJobId(job.id);

    // Simulate API call
    setTimeout(() => {
      // Update job status in the UI
      const updatedExpirations = { ...expirations };
      updatedExpirations[job.id] = false;
      setExpirations(updatedExpirations);

      toast({
        title: "Listing renewed!",
        description: "Your job listing has been successfully renewed.",
        variant: "default",
      });

      // Reset loading state
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Job Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Find and post job opportunities in the beauty industry. Salon jobs, technician positions and more."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Beauty Industry Jobs
          </h1>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <JobSearchBar 
              value={searchTerm} 
              onSearchChange={handleSearchChange}
              onSearch={handleSearch} 
            />
            <Button 
              className="flex gap-2 items-center bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={handlePostJob}
            >
              <PlusCircle size={18} />
              Post a Job
            </Button>
          </div>
        </motion.div>

        {/* Diamond Featured Section */}
        <DiamondFeaturedSection 
          jobs={diamondJobs} 
          onViewDetails={handleViewJobDetails} 
        />

        {/* Premium Listings */}
        <PremiumListingsSection 
          jobs={premiumJobs} 
          onViewDetails={handleViewJobDetails} 
        />
        
        {/* Gold Featured Section */}
        <GoldFeaturedSection 
          jobs={goldJobs} 
          onViewDetails={handleViewJobDetails} 
        />
        
        {/* Vietnamese Job Section - Salons for Sale */}
        <VietnameseJobSection
          vietnameseJobs={vietnameseJobs.filter(job => job.is_salon_for_sale === true)}
          onViewDetails={handleViewJobDetails}
          searchTerm={searchTerm}
        />
        
        {/* Free Listings */}
        <FreeListingsSection 
          jobs={freeJobs} 
          onViewDetails={handleViewJobDetails} 
        />
        
        {/* Expired Listings */}
        <ExpiredListingsSection 
          jobs={expiredJobs}
          onViewDetails={handleViewJobDetails}
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />

        {/* View All Buttons (optional) */}
        <div className="flex justify-center gap-4 mt-12 mb-4">
          <Button 
            variant="outline" 
            className="border-purple-300 hover:bg-purple-50"
            onClick={() => navigate('/salons')}
          >
            View All Salons
          </Button>
          <Button 
            variant="outline"
            className="border-emerald-300 hover:bg-emerald-50"
            onClick={() => navigate('/jobs')}
          >
            View All Nail Jobs
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
