
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Job } from "@/types/job";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { useAuth } from "@/context/auth";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "@/components/jobs/JobCardContact";
import { useRandomNailImages } from "@/utils/randomImageSelector";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import GoldListingsSection from "@/components/jobs/GoldListingsSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import SalonSalesSection from "@/components/jobs/SalonSalesSection";
import ExpiredListingsSection from "@/components/jobs/ExpiredListingsSection";

// Import mock data
import { premiumJobs } from "@/data/jobs/premiumJobs";
import { freeJobs } from "@/data/jobs/freeJobs";
import { expiredJobs } from "@/data/jobs/expiredJobs";
import { vietnameseSalonSales } from "@/data/jobs/vietnameseSalonSales";

const JobsPage = () => {
  // Set up state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [diamondJobs, setDiamondJobs] = useState<Job[]>([]);
  const [premiereJobs, setPremiereJobs] = useState<Job[]>([]);
  const [goldJobs, setGoldJobs] = useState<Job[]>([]);
  const [freeJobsList, setFreeJobsList] = useState<Job[]>([]);
  const [expiredJobsList, setExpiredJobsList] = useState<Job[]>([]);
  const [salonListings, setSalonListings] = useState<Job[]>([]);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  
  // Get auth context
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { getRandomImage } = useRandomNailImages();

  // Create magic nails diamond job listing
  const magicNailsListing: Job = {
    id: "magic-nails-123",
    title: "Tìm Thợ Nails – Magic Nails",
    company: "Magic Nails",
    location: "Great Falls, MT",
    created_at: new Date().toISOString(),
    description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
    salary_range: "$1,200–$1,500/tuần",
    contact_info: {
      phone: "(406) 770-3070",
      email: "contact@magicnails.com"
    },
    is_featured: true,
    status: "active",
    pricingTier: "diamond",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png"
  };

  useEffect(() => {
    // Create 5 diamond placeholder listings (image-only)
    const diamondPlaceholders: Job[] = Array(5).fill(null).map((_, index) => ({
      id: `diamond-placeholder-${index}`,
      title: "",
      company: "",
      location: "",
      created_at: new Date().toISOString(),
      image: getRandomImage(`diamond-${index}`, "nail"),
      pricingTier: "diamond" as const,
      status: "active",
    }));
    
    // Set diamond jobs with Magic Nails as first listing
    setDiamondJobs([magicNailsListing, ...diamondPlaceholders]);
    
    // Process premium jobs
    const processedPremiumJobs = premiumJobs.map(job => ({
      ...job,
      image: getRandomImage(job.id, "nail"),
    }));
    setPremiereJobs(processedPremiumJobs);
    
    // Create gold jobs
    const goldJobsData: Job[] = Array(16).fill(null).map((_, index) => ({
      id: `gold-job-${index}`,
      title: `Gold Tier Nail Listing ${index + 1}`,
      company: `Golden Nail Salon ${index + 1}`,
      location: `Location ${index + 1}`,
      created_at: new Date().toISOString(),
      description: `This is a gold tier listing for nail services.`,
      salary_range: "$1,000-$1,500/week",
      contact_info: {
        phone: "(555) 123-4567",
        email: `contact${index}@goldnails.com`
      },
      image: getRandomImage(`gold-${index}`, "nail"),
      pricingTier: "gold" as const,
      status: "active",
    }));
    setGoldJobs(goldJobsData);
    
    // Process free jobs
    setFreeJobsList(freeJobs);
    
    // Process expired jobs
    const processedExpiredJobs = expiredJobs.map(job => ({
      ...job,
      image: getRandomImage(`expired-${job.id}`, "nail"),
    }));
    
    // Add additional expired jobs to reach 28 total
    const additionalExpiredCount = 28 - processedExpiredJobs.length;
    if (additionalExpiredCount > 0) {
      const additionalExpiredJobs: Job[] = Array(additionalExpiredCount).fill(null).map((_, index) => ({
        id: `additional-expired-${index}`,
        title: `Expired Nail Job ${index + 1}`,
        company: `Former Nail Salon ${index + 1}`,
        location: index % 2 === 0 ? "Houston, TX" : "Seattle, WA",
        created_at: new Date(Date.now() - (30 + Math.floor(Math.random() * 60)) * 24 * 60 * 60 * 1000).toISOString(),
        image: getRandomImage(`additional-expired-${index}`, "nail"),
        status: "expired",
        pricingTier: "expired" as const,
        contact_info: {
          phone: "(555) 987-6543",
          email: `expired${index}@nailsalon.com`
        }
      }));
      setExpiredJobsList([...processedExpiredJobs, ...additionalExpiredJobs]);
    } else {
      setExpiredJobsList(processedExpiredJobs);
    }
    
    // Process salon listings
    const processedSalonListings = vietnameseSalonSales.map(salon => ({
      ...salon,
      image: getRandomImage(`salon-${salon.id}`, "nail"),
    }));
    setSalonListings(processedSalonListings);
  }, []);

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setIsJobModalOpen(false);
  };

  const handleRenewJob = (job: Job) => {
    setRenewalJobId(job.id);
    setIsRenewing(true);
    
    // Simulate renewal process
    setTimeout(() => {
      // In a real app, this would make an API call to renew the listing
      setIsRenewing(false);
      setRenewalJobId(null);
      alert("This would open a payment flow to renew the listing. Feature coming soon!");
    }, 1500);
  };

  // Check if a job is expired
  const isJobExpired = (job: Job): boolean => {
    if (job.status === "expired") return true;
    
    const createdDate = new Date(job.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };

  return (
    <Layout>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta
          name="description"
          content="Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-playfair font-bold mb-10">Job Listings</h1>

        {/* Diamond Featured Section */}
        <motion.section
          className="mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
              💎 Diamond Featured
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diamondJobs.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={job.image || ""}
                    alt={job.title || "Diamond job listing"}
                    className="w-full h-full object-cover"
                    businessName={job.company}
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-300 to-yellow-500 text-white border-0">
                    Diamond
                  </Badge>
                </div>

                {job.id === "magic-nails-123" ? (
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="font-playfair font-semibold text-xl line-clamp-2">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>

                    <div className="flex items-center text-base text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" /> {job.location}
                    </div>

                    {job.salary_range && (
                      <div className="flex items-center text-base text-gray-600 mb-2">
                        <span className="text-lg mr-1">💰</span> {job.salary_range}
                      </div>
                    )}

                    <div className="text-sm text-gray-700 mb-3">
                      {job.description}
                    </div>

                    <div className="border-t border-gray-100 pt-3 mb-4">
                      {job.contact_info?.phone && (
                        <JobCardContact phoneNumber={job.contact_info.phone} />
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
                        onClick={() => handleViewJobDetails(job)}
                      >
                        Xem Chi Tiết
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-4 flex items-center justify-center">
                    <Badge className="bg-yellow-400 text-white text-sm">
                      Diamond Tier - Premium Exposure
                    </Badge>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Premier Featured Section */}
        <PremiumListingsSection jobs={premiereJobs} onViewDetails={handleViewJobDetails} />

        {/* Gold Featured Section */}
        <GoldListingsSection jobs={goldJobs} onViewDetails={handleViewJobDetails} />

        {/* Salon Sales Section */}
        <SalonSalesSection listings={salonListings} onViewDetails={handleViewJobDetails} />

        {/* Free Listings Section */}
        <FreeListingsSection jobs={freeJobsList} onViewDetails={handleViewJobDetails} />

        {/* Expired Listings Section */}
        <ExpiredListingsSection 
          jobs={expiredJobsList} 
          onViewDetails={handleViewJobDetails} 
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />

        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={isJobModalOpen}
            onClose={handleCloseJobModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
