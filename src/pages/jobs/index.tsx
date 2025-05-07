import { useState } from "react";
import { Helmet } from "react-helmet";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import VietnameseJobSection from "@/components/jobs/VietnameseJobSection";
import { generateVietnameseNailJobs } from "@/utils/jobs/vietnameseNailJobSamples";
import JobGrid from "@/components/jobs/JobGrid";
import useSampleJobsData from "@/hooks/useSampleJobsData";
import { Container } from "@/components/ui/container";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import { Job } from "@/types/job";
import ImageWithFallback from '@/components/ui/ImageWithFallback'; // Fix import statement

// 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
const JobsPage = () => {
  const { jobs, loading, error, featuredJobs, updateSearchTerm } = useSampleJobsData();
  const [searchValue, setSearchValue] = useState("");
  const vietnameseJobs = generateVietnameseNailJobs();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateSearchTerm(value);
  };

  const handleRenew = (job: any) => {
    setRenewalJobId(job.id);
    setIsRenewing(true);
    
    // Simulate renewal process
    setTimeout(() => {
      setExpirations(prev => ({
        ...prev,
        [job.id]: false
      }));
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1000);
  };

  const handleViewJobDetails = (job: any) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Function to assign pricing tier to jobs that don't have one
  const assignDefaultTier = (job: Job): Job => {
    if (job.pricingTier) return job;
    
    // Default logic for tiers based on existing properties
    if (job.status?.includes('expired')) {
      return { ...job, pricingTier: 'expired' };
    } else if (job.is_featured && job.isPinned) {
      return { ...job, pricingTier: 'diamond' };
    } else if (job.is_featured) {
      return { ...job, pricingTier: 'premium' };
    } else if (job.image) {
      return { ...job, pricingTier: 'featured' };
    } else {
      return { ...job, pricingTier: 'free' };
    }
  };

  // Apply tier assignment to all jobs
  const jobsWithTiers = jobs.map(assignDefaultTier);

  // Split jobs into different tiers for structured display
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const diamondJobs = jobsWithTiers.filter(job => job.pricingTier === 'diamond');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const premiumJobs = jobsWithTiers.filter(job => job.pricingTier === 'premium');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const featuredListingJobs = jobsWithTiers.filter(job => job.pricingTier === 'featured');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const standardJobs = jobsWithTiers.filter(job => job.pricingTier === 'standard');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const starterJobs = jobsWithTiers.filter(job => job.pricingTier === 'starter');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const freeJobs = jobsWithTiers.filter(job => job.pricingTier === 'free');
  
  // 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
  const expiredJobs = jobsWithTiers.filter(job => job.pricingTier === 'expired' || job.status?.includes('expired'));

  return (
    <Container className="py-8">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Find jobs in the beauty industry. Browse opportunities for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600">
          Find perfect opportunities in the beauty industry
        </p>
      </div>

      <JobSearchBar 
        value={searchValue} 
        onSearchChange={handleSearchChange} 
      />

      {/* 1. 💎 Top Diamond Featured ($999.99/year) */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-medium mb-4">
          <span className="mr-2">💎</span> 
          Top Diamond Featured
        </h2>
        <TopDiamondFeaturedSection 
          vietnameseJobs={vietnameseJobs} 
          onViewDetails={handleViewJobDetails}
          searchTerm={searchValue}
        />
      </section>

      {/* 2. 🟣 Premium Listings ($34.99–$144.99) */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {premiumJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">🟣</span>
            Premium Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-purple-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleViewJobDetails(job)}
              >
                <div className="relative">
                  {job.image && (
                    <div className="aspect-video bg-gray-100">
                      <ImageWithFallback
                        src={job.image}
                        alt={job.title || "Premium job listing"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                  <div className="mt-4 flex justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    <button 
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewJobDetails(job);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. 🟪 Featured Listings ($19.99–$24.99) */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {featuredListingJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">🟪</span>
            Featured Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredListingJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-purple-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                onClick={() => handleViewJobDetails(job)}
              >
                <div className="relative">
                  {job.image && (
                    <div className="aspect-video bg-gray-100">
                      <ImageWithFallback
                        src={job.image}
                        alt={job.title || "Featured job listing"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    <button 
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewJobDetails(job);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. 🟨 $9.99–$14.99 Paid Listings */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {standardJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">🟨</span>
            Standard Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standardJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
                onClick={() => handleViewJobDetails(job)}
              >
                {job.image && (
                  <div className="aspect-video bg-gray-100">
                    <ImageWithFallback
                      src={job.image}
                      alt={job.title || "Standard job listing"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                  <div className="mt-2 text-right">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewJobDetails(job);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. 🟩 $5 Starter Listings */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {starterJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">🟩</span>
            Starter Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {starterJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-gray-200 rounded-lg p-4"
                onClick={() => handleViewJobDetails(job)}
              >
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
                <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                  <button 
                    className="text-gray-600 hover:text-gray-800 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewJobDetails(job);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. ⚪ Free Listings */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {freeJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">⚪</span>
            Free Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-gray-100 bg-gray-50 rounded-lg p-4"
                onClick={() => handleViewJobDetails(job)}
              >
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
                <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                {job.contact_info?.phone && (
                  <p className="text-gray-500 text-sm mt-2">
                    Contact: {job.contact_info.phone}
                  </p>
                )}
                <div className="text-right mt-2">
                  <button 
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewJobDetails(job);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. 🚫 Expired Listings */}
      {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
      {expiredJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-4">
            <span className="mr-2">🚫</span>
            Expired Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiredJobs.map((job) => (
              <div 
                key={job.id} 
                className="border border-gray-200 rounded-lg p-4 opacity-70"
                onClick={() => handleViewJobDetails(job)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-500">{job.title}</h3>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                    Expired
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{job.company}</p>
                <p className="text-gray-400 text-sm mt-1">{job.location}</p>
                <div className="flex justify-between items-center mt-3">
                  <button 
                    className="text-gray-500 hover:text-gray-700 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRenew(job);
                    }}
                  >
                    Renew Listing
                  </button>
                  <button 
                    className="text-gray-500 hover:text-gray-700 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewJobDetails(job);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Job detail modal for viewing full job details */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={handleCloseJobDetails}
        />
      )}
    </Container>
  );
};

export default JobsPage;
