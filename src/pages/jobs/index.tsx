
import React, { useState, useEffect } from 'react';
import { Container } from "@/components/ui/container";
import { diamondJobs } from "@/data/jobs/diamondJobs";
import { premiumJobs } from "@/data/jobs/premiumJobs";
import { freeJobs } from "@/data/jobs/freeJobs";
import { expiredJobs } from "@/data/jobs/expiredJobs";
import { vietnameseSalonSales } from "@/data/jobs/vietnameseSalonSales";
import { Job } from "@/types/job";
import PremiumListingsSection from "@/components/jobs/PremiumListingsSection";
import GoldListingsSection from "@/components/jobs/GoldListingsSection";
import FreeListingsSection from "@/components/jobs/FreeListingsSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { assignImagesToEntities } from '@/utils/randomImageSelector';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar } from "lucide-react"; // Import MapPin from lucide-react
import JobCardContact from "@/components/jobs/JobCardContact";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // States for each job category
  const [diamondListings, setDiamondListings] = useState<Job[]>([]);
  const [premiumListings, setPremiumListings] = useState<Job[]>([]);
  const [goldListings, setGoldListings] = useState<Job[]>([]);
  const [freeListings, setFreeListings] = useState<Job[]>([]);
  const [expiredListings, setExpiredListings] = useState<Job[]>([]);
  const [salonSales, setSalonSales] = useState<Job[]>([]);
  
  // For renewal functionality
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  
  useEffect(() => {
    // Load and assign random images to jobs
    // Preserve Magic Nails diamond image by setting preserveFirst to true
    const assignedDiamondJobs = assignImagesToEntities(diamondJobs, true);
    setDiamondListings(assignedDiamondJobs);
    
    const assignedPremiumJobs = assignImagesToEntities(premiumJobs);
    setPremiumListings(assignedPremiumJobs);
    
    // Create gold tier listings with premium styling but lower in hierarchy
    // We need to cast to the proper pricingTier type
    const goldJobs = premiumJobs.map(job => ({
      ...job,
      id: `gold-${job.id}`,
      pricingTier: "featured" as "diamond" | "premium" | "featured" | "standard" | "starter" | "free" | "expired"
    }));
    const assignedGoldJobs = assignImagesToEntities(goldJobs);
    setGoldListings(assignedGoldJobs);
    
    const assignedFreeJobs = assignImagesToEntities(freeJobs);
    setFreeListings(assignedFreeJobs);
    
    const assignedExpiredJobs = assignImagesToEntities(expiredJobs);
    setExpiredListings(assignedExpiredJobs);
    
    const assignedSalonSales = assignImagesToEntities(vietnameseSalonSales);
    setSalonSales(assignedSalonSales);
  }, []);
  
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };
  
  const handleCloseDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };
  
  const handleRenewListing = (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    // In a real app, this would trigger the renewal flow
    setTimeout(() => {
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 2000);
  };
  
  const goToSalonsPage = () => {
    navigate("/salons");
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-playfair font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600">Find the perfect job opportunity in the beauty industry</p>
      </div>
      
      {/* Diamond Tier Listings - 3 rows of 2 cards each */}
      {diamondListings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
            💎 Diamond Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diamondListings.slice(0, 6).map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <img
                    src={job.image || "/lovable-uploads/74b3ba02-2378-41d7-8cb5-023145e94700.png"}
                    alt={job.title || "Job listing"}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-white border-0">
                    Diamond
                  </Badge>
                  {job.featured_text && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      {job.featured_text}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
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

                  <div className="flex items-center text-base text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
                  </div>

                  <div className="border-t border-gray-100 pt-3 mb-4">
                    {job.contact_info?.phone && (
                      <JobCardContact 
                        phoneNumber={job.contact_info.phone}
                        showAlways={false}
                      />
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => handleViewDetails(job)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {/* Premium Listings - 3 rows of 3 cards each */}
      {premiumListings.length > 0 && (
        <PremiumListingsSection 
          jobs={premiumListings} 
          onViewDetails={handleViewDetails} 
        />
      )}
      
      {/* Gold Tier Listings - 4 rows of 4 cards each */}
      {goldListings.length > 0 && (
        <GoldListingsSection 
          jobs={goldListings.slice(0, 16)} 
          onViewDetails={handleViewDetails} 
        />
      )}
      
      {/* Featured Nail Salons for Sale */}
      {salonSales.length > 0 && (
        <section className="mt-8 mb-12 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
              🏠 Featured Nail Salons for Sale
            </h2>
            <Button 
              onClick={goToSalonsPage} 
              variant="outline" 
              className="absolute top-0 right-0"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salonSales.slice(0, 4).map((salon) => {
              // For salon sales, handle type compatibility by casting
              const job: Job = {
                ...salon,
                type: "salon" as "salon" | "job" | "opportunity"
              };
              
              return (
                <Card
                  key={salon.id}
                  className="overflow-hidden border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-video relative">
                    <img
                      src={salon.image || ""}
                      alt={salon.title || "Salon for sale"}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0">
                      For Sale
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-playfair font-semibold text-lg line-clamp-2">{salon.title}</h3>
                      <p className="text-gray-600">{salon.location}</p>
                    </div>
                    
                    {salon.sale_price && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="text-base mr-1">💰</span> ${salon.sale_price}
                      </div>
                    )}
                    
                    <div className="border-t border-orange-50 pt-3 mb-3">
                      {salon.contact_info?.phone && (
                        <JobCardContact phoneNumber={salon.contact_info.phone} />
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        className="font-bold bg-purple-500 hover:bg-purple-600 text-white text-xs"
                        onClick={() => handleViewDetails(job)}
                      >
                        Xem Chi Tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Free Listings Section - No Images */}
      {freeListings.length > 0 && (
        <FreeListingsSection 
          jobs={freeListings} 
          onViewDetails={handleViewDetails} 
        />
      )}
      
      {/* Expired Listings Section */}
      {expiredListings.length > 0 && (
        <section className="mt-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
              🕓 Expired Listings
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {expiredListings.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 opacity-70 grayscale"
              >
                <div className="aspect-video relative">
                  <img
                    src={job.image || ""}
                    alt={job.title || "Job listing"}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0">
                    Expired
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Button
                      variant="outline"
                      className="font-medium text-xs"
                      onClick={() => handleRenewListing(job)}
                      disabled={isRenewing && renewalJobId === job.id}
                    >
                      {isRenewing && renewalJobId === job.id ? "Renewing..." : "Renew Listing"}
                    </Button>
                    
                    <Button
                      className="font-bold bg-purple-500 hover:bg-purple-600 text-white text-xs"
                      onClick={() => handleViewDetails(job)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
};

export default JobsPage;
