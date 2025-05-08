
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import TopDiamondFeaturedSection from '@/components/jobs/TopDiamondFeaturedSection';
import PremiumListingsSection from '@/components/jobs/PremiumListingsSection';
import GoldListingsSection from '@/components/jobs/GoldListingsSection';
import FreeListingsSection from '@/components/jobs/FreeListingsSection';
import ExpiredListingsSection from '@/components/jobs/ExpiredListingsSection';
import JobDetailModal from '@/components/jobs/JobDetailModal';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Sample data - would come from API in production
import sampleJobs from '@/data/jobsData';

const JobsPage = () => {
  const { isSignedIn, user } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        // In production, this would be an API call
        // For now, transform the sample data
        const transformedJobs = sampleJobs.map(job => ({
          id: job.id.toString(),
          title: job.title,
          company: job.company,
          location: job.location,
          created_at: job.posted || new Date().toISOString(),
          description: job.description,
          salary_range: job.salary || job.price,
          image: job.image || '',
          contact_info: {
            phone: '(555) 123-4567',
            email: 'contact@emviapp.com',
          },
          is_featured: job.featured || false,
          status: job.featured ? 'active' : Math.random() > 0.7 ? 'expired' : 'active',
          // Assign pricing tiers
          pricingTier: job.featured 
            ? Math.random() > 0.5 ? 'diamond' : 'premium' 
            : Math.random() > 0.3 ? 'gold' : 'free'
        }));

        // Ensure Magic Nails is the first entry and diamond tier
        const magicNailsIndex = transformedJobs.findIndex(j => j.company.includes('Magic Nails'));
        if (magicNailsIndex >= 0) {
          const magicNails = {...transformedJobs[magicNailsIndex], pricingTier: 'diamond', status: 'active'};
          transformedJobs.splice(magicNailsIndex, 1);
          transformedJobs.unshift(magicNails);
        }
        
        // Add more expired listings to reach 28
        const expiredListings = Array(28 - transformedJobs.filter(j => j.status === 'expired').length)
          .fill(null)
          .map((_, idx) => ({
            id: `expired-${idx}`,
            title: `Expired Nail Technician Position ${idx + 1}`,
            company: `Former Salon ${idx + 1}`,
            location: 'California',
            created_at: new Date(Date.now() - (40 + idx) * 24 * 60 * 60 * 1000).toISOString(),
            description: 'This position is no longer available.',
            salary_range: '$25-30/hr',
            image: '',
            contact_info: {
              phone: '(555) 123-4567',
              email: 'expired@example.com',
            },
            is_featured: false,
            status: 'expired',
            pricingTier: 'expired'
          }));

        setJobs([...transformedJobs, ...expiredListings]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading jobs:', error);
        toast.error('Failed to load job listings');
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filter jobs by tier
  const diamondJobs = useMemo(() => jobs.filter(job => job.pricingTier === 'diamond' && job.status !== 'expired'), [jobs]);
  const premiumJobs = useMemo(() => jobs.filter(job => job.pricingTier === 'premium' && job.status !== 'expired'), [jobs]);
  const goldJobs = useMemo(() => jobs.filter(job => job.pricingTier === 'gold' && job.status !== 'expired'), [jobs]);
  const freeJobs = useMemo(() => jobs.filter(job => job.pricingTier === 'free' && job.status !== 'expired'), [jobs]);
  const expiredJobs = useMemo(() => jobs.filter(job => job.status === 'expired'), [jobs]);
  
  // Salon listings for sale - using a subset of the jobs data for demo
  const salonListings = useMemo(() => jobs.slice(0, 4).map(job => ({
    ...job,
    type: 'salon',
    isSalonForSale: true,
    price: `$${Math.floor(Math.random() * 50 + 100)}k`,
  })), [jobs]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleRenew = (job: Job) => {
    if (!isSignedIn) {
      toast.error('You must be signed in to renew a listing');
      return;
    }
    
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate renewal API call
    setTimeout(() => {
      setJobs(prevJobs => 
        prevJobs.map(j => 
          j.id === job.id 
            ? {...j, status: 'active', created_at: new Date().toISOString(), pricingTier: 'free'} 
            : j
        )
      );
      
      toast.success('Listing renewed successfully!');
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1500);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading jobs...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Browse beauty industry job opportunities. Find positions for nail technicians, hair stylists, and more."
        />
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Beauty Industry Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find your perfect position in the beauty industry or post your job opening.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Post a Job
          </Button>
          <Button variant="outline">
            Search Jobs
          </Button>
        </div>
      </div>
      
      {/* Diamond Featured Section - 6 cards (3 rows x 2 cards) */}
      <TopDiamondFeaturedSection featuredJobs={diamondJobs} onViewDetails={handleViewDetails} />
      
      {/* Premium Listings Section - 9 cards (3 rows x 3 cards) */}
      <PremiumListingsSection jobs={premiumJobs.slice(0, 9)} onViewDetails={handleViewDetails} />
      
      {/* Gold Listings Section - 16 cards (4 rows x 4 cards) */}
      <GoldListingsSection jobs={goldJobs.slice(0, 16)} onViewDetails={handleViewDetails} />
      
      {/* Featured Nail Salons for Sale */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">🏠 Featured Nail Salons For Sale</h2>
          <Link to="/salons" className="text-purple-600 hover:text-purple-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salonListings.map((salon) => (
            <div key={salon.id} className="card border border-orange-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video relative">
                <img
                  src={salon.image || "https://via.placeholder.com/300x200"}
                  alt={salon.title || "Salon for sale"}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  For Sale
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{salon.title}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {salon.location}
                  </span>
                </p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="font-bold text-green-700">{salon.price}</div>
                  <Button 
                    size="sm" 
                    onClick={() => handleViewDetails(salon)}
                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Free Listings Section - Text only */}
      <FreeListingsSection jobs={freeJobs} onViewDetails={handleViewDetails} />
      
      {/* Expired Listings Section - 28 cards (5 per row) */}
      <ExpiredListingsSection 
        jobs={expiredJobs} 
        onViewDetails={handleViewDetails} 
        onRenew={handleRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
      />
      
      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default JobsPage;
