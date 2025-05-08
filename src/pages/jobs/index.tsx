
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiamondFeaturedSection from "@/components/jobs/DiamondFeaturedSection";
import JobGrid from "@/components/jobs/JobGrid";
import SalonSalesSection from "@/components/jobs/SalonSalesSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";
import { useJobsData, JobFilters } from "@/hooks/useJobsData";
import { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { diamondJobs } from "@/data/jobs/diamondJobs";

const JobsPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobExpirations, setJobExpirations] = useState<Record<string, boolean>>({});

  const {
    jobs,
    loading,
    error,
    filters,
    updateFilters,
    featuredJobs,
    renewalJobId,
    setActiveRenewalJobId
  } = useJobsData();

  const diamondListings = diamondJobs;
  const premiumListings = jobs.filter(job => job.pricingTier === "premium" && job.status !== "expired");
  const goldListings = jobs.filter(job => job.pricingTier === "gold" && job.status !== "expired");
  const featuredListings = jobs.filter(job => job.is_featured && job.status !== "expired");
  const standardListings = jobs.filter(job => !job.is_featured && job.status !== "expired");
  const expiredListings = jobs.filter(job => job.status === "expired");
  const salonListings = jobs.filter(job => job.is_salon_for_sale === true && job.status !== "expired");

  useEffect(() => {
    // For demo purposes: calculate expiration for older posts
    const expirations: Record<string, boolean> = {};
    jobs.forEach(job => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const diffTime = now.getTime() - createdDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      expirations[job.id] = diffDays > 30;
    });
    setJobExpirations(expirations);
  }, [jobs]);

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
    navigate(`/jobs/${job.id}`);
  };

  const handleRenewJob = (job: Job) => {
    setActiveRenewalJobId(job.id);
    // In a real app, this would initiate the renewal flow
    setTimeout(() => {
      // Simulate renewal completion
      setActiveRenewalJobId(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-playfair font-bold mb-2">Beauty Industry Jobs</h1>
            <p className="text-lg text-gray-600">
              Find your dream job or the perfect candidate for your salon
            </p>
          </div>
          <Button
            onClick={() => navigate("/post-job")}
            className="bg-purple-600 hover:bg-purple-700 font-bold"
          >
            <Plus className="mr-2 h-5 w-5" />
            Post a Job
          </Button>
        </div>
      </div>

      {/* Diamond Featured Section - NEW UPDATED SECTION */}
      <DiamondFeaturedSection />

      {/* Premium Listings */}
      {premiumListings.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
            ⭐ Premium Listings
          </h2>
          <JobGrid 
            jobs={premiumListings} 
            expirations={jobExpirations}
            onRenew={handleRenewJob}
            isRenewing={!!renewalJobId}
            renewalJobId={renewalJobId}
          />
        </motion.section>
      )}

      {/* Gold Listings */}
      {goldListings.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
            🌟 Gold Listings
          </h2>
          <JobGrid 
            jobs={goldListings} 
            expirations={jobExpirations}
            onRenew={handleRenewJob}
            isRenewing={!!renewalJobId}
            renewalJobId={renewalJobId}
          />
        </motion.section>
      )}

      {/* Featured Listings (non-tiered) */}
      {featuredListings.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
            ✨ Featured Opportunities
          </h2>
          <JobGrid 
            jobs={featuredListings} 
            expirations={jobExpirations}
            onRenew={handleRenewJob}
            isRenewing={!!renewalJobId}
            renewalJobId={renewalJobId}
          />
        </motion.section>
      )}

      {/* Salon Sales Section */}
      {salonListings.length > 0 && (
        <SalonSalesSection 
          listings={salonListings} 
          onViewDetails={handleViewJobDetails} 
        />
      )}

      {/* Standard Listings */}
      {standardListings.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
            Recent Job Posts
          </h2>
          <JobGrid 
            jobs={standardListings} 
            expirations={jobExpirations}
            onRenew={handleRenewJob}
            isRenewing={!!renewalJobId}
            renewalJobId={renewalJobId}
          />
        </motion.section>
      )}
      
      {/* Expired Listings */}
      {expiredListings.length > 0 && (
        <ExpiredListingsSection 
          jobs={expiredListings} 
          onViewDetails={handleViewJobDetails} 
          onRenew={handleRenewJob}
          isRenewing={!!renewalJobId}
          renewalJobId={renewalJobId}
        />
      )}
    </div>
  );
};

export default JobsPage;
