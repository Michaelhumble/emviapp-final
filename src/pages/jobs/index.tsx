
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import TopDiamondFeaturedSection from "@/components/jobs/TopDiamondFeaturedSection";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";
import SalonSalesSection from "@/components/jobs/SalonSalesSection";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Import job data
import { diamondJobs } from "@/data/jobs/diamondJobs";
import { premiumJobs } from "@/data/jobs/premiumJobs";
import { freeJobs } from "@/data/jobs/freeJobs";
import { expiredJobs } from "@/data/jobs/expiredJobs";
import { vietnameseSalonSales } from "@/data/jobs/vietnameseSalonSales";

// 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER
const JobsPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nailImages, setNailImages] = useState<string[]>([]);
  const [jobsWithImages, setJobsWithImages] = useState<{
    diamond: Job[],
    premium: Job[],
    free: Job[],
    expired: Job[],
    salonSales: Job[]
  }>({
    diamond: [],
    premium: [],
    free: [],
    expired: [],
    salonSales: []
  });
  
  // Fetch nail salon images from Supabase bucket
  useEffect(() => {
    const fetchNailImages = async () => {
      try {
        const { data, error } = await supabase.storage.from('nails').list('', {
          sortBy: { column: 'name', order: 'asc' },
        });
        
        if (error) {
          console.error('Error fetching nail images:', error);
          return;
        }
        
        if (data) {
          // Get public URLs for all images
          const imageUrls = data.map(file => {
            const publicUrl = supabase.storage.from('nails').getPublicUrl(file.name).data.publicUrl;
            return publicUrl;
          });
          
          // Shuffle the array for randomness
          const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);
          setNailImages(shuffledImages);
        }
      } catch (err) {
        console.error('Failed to fetch nail salon images:', err);
      }
    };
    
    fetchNailImages();
  }, []);

  // Apply images to job listings once we have them
  useEffect(() => {
    if (nailImages.length === 0) return;
    
    let imageIndex = 0;
    const getNextImage = () => {
      const image = nailImages[imageIndex];
      imageIndex = (imageIndex + 1) % nailImages.length;
      return image;
    };

    // Preserve the Magic Nails image in diamond jobs
    const updatedDiamondJobs = diamondJobs.map((job, index) => {
      // Don't change Magic Nails image
      if (job.company === "Magic Nails") {
        return job;
      }
      return { ...job, image: getNextImage() };
    });
    
    // Apply images to other job types
    const updatedPremiumJobs = premiumJobs.map(job => ({ ...job, image: getNextImage() }));
    const updatedFreeJobs = freeJobs.map(job => ({ ...job, image: getNextImage() }));
    const updatedExpiredJobs = expiredJobs.map(job => ({ ...job, image: getNextImage() }));
    const updatedSalonSales = vietnameseSalonSales.map(job => ({ ...job, image: getNextImage() }));
    
    setJobsWithImages({
      diamond: updatedDiamondJobs,
      premium: updatedPremiumJobs,
      free: updatedFreeJobs,
      expired: updatedExpiredJobs,
      salonSales: updatedSalonSales
    });
  }, [nailImages]);
  
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleRenewJob = (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate API call for renewal
    setTimeout(() => {
      console.log(`Renewing job: ${job.id}`);
      setIsRenewing(false);
      setRenewalJobId(null);
      // In a real app, we'd update the job status here
    }, 1500);
  };

  const goToPostJob = () => {
    navigate("/posting/job");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Filter jobs based on search term
  const filterJobs = (jobs: Job[]) => {
    if (!searchTerm.trim()) return jobs;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return jobs.filter(job => 
      job.title?.toLowerCase().includes(lowerSearchTerm) || 
      job.company?.toLowerCase().includes(lowerSearchTerm) ||
      job.location.toLowerCase().includes(lowerSearchTerm) ||
      job.description?.toLowerCase().includes(lowerSearchTerm)
    );
  };

  // Use the jobsWithImages state for rendering, or fallback to original data if images haven't loaded
  const filteredDiamondJobs = filterJobs(jobsWithImages.diamond.length > 0 ? jobsWithImages.diamond : diamondJobs);
  const filteredPremiumJobs = filterJobs(jobsWithImages.premium.length > 0 ? jobsWithImages.premium : premiumJobs);
  const filteredFreeJobs = filterJobs(jobsWithImages.free.length > 0 ? jobsWithImages.free : freeJobs);
  const filteredExpiredJobs = filterJobs(jobsWithImages.expired.length > 0 ? jobsWithImages.expired : expiredJobs);
  const filteredSalonSales = filterJobs(jobsWithImages.salonSales.length > 0 ? jobsWithImages.salonSales : vietnameseSalonSales);

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Browse Job Opportunities | EmviApp</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-playfair font-semibold">Beauty Industry Jobs</h1>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            className="rounded-full border-[#9A7B69] text-[#9A7B69] hover:bg-[#9A7B69]/10 flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Back Home
          </Button>
          
          <Button 
            onClick={goToPostJob} 
            className="rounded-full bg-gradient-to-r from-[#9A7B69] to-[#FFB199] hover:scale-105 transition-transform font-semibold flex items-center gap-2"
          >
            <Plus size={18} /> Add Job
          </Button>
        </div>
      </div>
      
      <JobSearchBar 
        onSearchChange={handleSearchChange} 
        value={searchTerm}
      />
      
      <div className="mt-8 space-y-12">
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <TopDiamondFeaturedSection 
          featuredJobs={filteredDiamondJobs.slice(0, 1)} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <PremiumListingsSection 
          jobs={filteredPremiumJobs} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <FreeListingsSection 
          jobs={filteredFreeJobs} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* Vietnamese Salon Sales Section */}
        <SalonSalesSection 
          listings={filteredSalonSales} 
          onViewDetails={viewJobDetails} 
        />
        
        {/* 🚫 DO NOT MODIFY — PROTECTED MARKETING TIER */}
        <ExpiredListingsSection 
          jobs={filteredExpiredJobs} 
          onViewDetails={viewJobDetails} 
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />
      </div>
      
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
