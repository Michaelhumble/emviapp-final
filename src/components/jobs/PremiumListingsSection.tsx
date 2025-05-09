
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface PremiumListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const PremiumListingsSection = ({ jobs, onViewDetails }: PremiumListingsSectionProps) => {
  // Create extra premium placeholders to reach required number for balanced rows
  const premiumJobs = [...jobs];
  
  // Calculate how many more items we need for a balanced grid of 4 cards per row
  const rowSize = 4;
  const remainingCount = rowSize - (jobs.length % rowSize);
  if (remainingCount !== rowSize) {
    for (let i = 0; i < remainingCount; i++) {
      // Use verified image paths for placeholders
      const imageIndex = i % 8; // Keep within bounds of known good images
      const fallbackImageUrl = `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-${10 + imageIndex}.png`;
      
      premiumJobs.push({
        id: `premium-placeholder-${i}`,
        title: "Premium Position Available",
        company: "Your Business Here",
        location: "United States",
        created_at: new Date().toISOString(),
        description: "This premium position will make your business stand out. Reach thousands of potential customers or employees.",
        image: fallbackImageUrl,
        pricingTier: "premium" as const
      });
    }
  }

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          💎 Premium Listings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {premiumJobs.map((job, index) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Job listing"}
                className={`w-full h-full object-cover ${index >= jobs.length ? 'opacity-70' : ''}`}
                businessName={job.company}
                fallbackImage={`https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-${10 + (index % 8)}.png`}
              />
              <Badge className={`absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 ${index >= jobs.length ? 'opacity-70' : ''}`}>
                Premium
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

              {index < jobs.length && job.contact_info?.phone && (
                <div className="border-t border-gray-100 pt-3 mb-4">
                  <JobCardContact phoneNumber={job.contact_info.phone} />
                </div>
              )}

              <div className="flex justify-end">
                {index < jobs.length ? (
                  <Button
                    className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => onViewDetails(job)}
                  >
                    Xem Chi Tiết
                  </Button>
                ) : (
                  <Button
                    className="font-bold bg-purple-400 text-white opacity-70"
                    disabled
                  >
                    Premium Position
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

export default PremiumListingsSection;
