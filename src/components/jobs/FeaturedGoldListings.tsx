
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

  // Add placeholder jobs to ensure balanced rows (4 cards per row)
  const balancedJobs = [...jobs];
  const remainingCount = 4 - (jobs.length % 4);
  if (remainingCount !== 4) {
    // Generate placeholder jobs using metadata from existing jobs
    for (let i = 0; i < remainingCount; i++) {
      balancedJobs.push({
        id: `gold-placeholder-${i}`,
        title: "Gold Listing Available",
        company: "Your Business Here",
        location: "United States",
        created_at: new Date().toISOString(),
        description: "Reach thousands of potential employees with a Gold Featured listing.",
        image: `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-${(i % 5) + 11}.jpg`,
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
                src={job.image || ""}
                alt={job.title || "Job listing"}
                className={`w-full h-full object-cover ${index >= jobs.length ? 'opacity-70' : ''}`}
                businessName={job.company}
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
