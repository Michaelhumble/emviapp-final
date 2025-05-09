
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface FeaturedGoldListingsProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FeaturedGoldListings = ({ jobs, onViewDetails }: FeaturedGoldListingsProps) => {
  // Ensure we have jobs to display
  if (!jobs.length) return null;

  // Function to get valid Supabase image URLs with robust validation
  const getValidImageUrl = (job: Job, index: number): string => {
    // If job already has a valid image URL, use it
    if (job.image && 
        !job.image.includes('undefined') && 
        !job.image.includes('null') && 
        job.image.startsWith('https://')) {
      return job.image;
    }
    
    // Use a reliable set of verified images with consistent rotation
    const validImages = [
      '_A long, luxurious nail salon-10.png',
      '_A long, luxurious nail salon-11.png',
      '_A long, luxurious nail salon-12.png', 
      '_A long, luxurious nail salon-13.png',
      '_A long, luxurious nail salon-14.png',
      '_A long, luxurious nail salon-15.png',
      '_A long, luxurious nail salon-16.png',
      '_A long, luxurious nail salon-17.png'
    ];
    
    const imageIndex = index % validImages.length;
    return `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/${validImages[imageIndex]}`;
  };

  // Add placeholder jobs to ensure balanced rows (4 cards per row)
  const balancedJobs = [...jobs];
  const rowSize = 4;
  const remainingCount = rowSize - (jobs.length % rowSize);
  if (remainingCount !== rowSize) {
    // Generate placeholder jobs using correct image paths
    for (let i = 0; i < remainingCount; i++) {
      const imageIndex = i % 8; // Ensure we don't go out of bounds
      const imageUrl = `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-${10 + imageIndex}.png`;
        
      balancedJobs.push({
        id: `gold-placeholder-${i}`,
        title: "Gold Listing Available",
        company: "Your Business Here",
        location: "United States",
        created_at: new Date().toISOString(),
        description: "Reach thousands of potential employees with a Gold Featured listing.",
        image: imageUrl,
        pricingTier: "gold" as const
      });
    }
  }

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          🏆 Gold Featured Listings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {balancedJobs.map((job, index) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={getValidImageUrl(job, index)}
                alt={job.title || "Job listing"}
                className={`w-full h-full object-cover ${index >= jobs.length ? 'opacity-70' : ''}`}
                businessName={job.company}
                priority={true}
              />
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-400 text-white border-0">
                Gold
              </Badge>
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
                {index < jobs.length && job.contact_info?.phone && (
                  <JobCardContact phoneNumber={job.contact_info.phone} />
                )}
              </div>

              <div className="flex justify-end">
                {index < jobs.length ? (
                  <Button
                    className="font-bold bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => onViewDetails(job)}
                  >
                    Xem Chi Tiết
                  </Button>
                ) : (
                  <Button
                    className="font-bold bg-amber-400 text-white opacity-70"
                    disabled
                  >
                    Available Spot
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturedGoldListings;
