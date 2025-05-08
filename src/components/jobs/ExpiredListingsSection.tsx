
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ExpiredListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
}

const ExpiredListingsSection = ({
  jobs,
  onViewDetails,
  onRenew,
  isRenewing,
  renewalJobId,
}: ExpiredListingsSectionProps) => {
  if (!jobs.length) return null;

  // Calculate how long ago a job expired
  const getExpiredDaysCount = (job: Job): number => {
    const createdDate = new Date(job.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate);
  };

  // Get appropriate expiration label
  const getExpirationLabel = (job: Job): string => {
    const days = getExpiredDaysCount(job);
    if (days > 365) {
      return "Over 1 year ago";
    }
    return "Expired";
  };

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center mb-6">
        <Clock size={20} className="text-gray-400 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-gray-500 italic">
          Expired Listings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-gray-200 opacity-75 hover:opacity-85 transition-all duration-300"
          >
            <div className="aspect-video relative grayscale hover:grayscale-[0.7] transition-all duration-300">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Expired job listing"}
                className="w-full h-full object-cover"
                businessName={job.company}
              />
              <Badge className="absolute top-2 right-2 bg-gray-500 text-white border-0">
                {getExpirationLabel(job)}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-playfair font-medium text-base text-gray-700">{job.title}</h3>
                <p className="text-gray-500 text-base">{job.company}</p>
              </div>

              <div className="flex items-center text-base text-gray-500 mb-1">
                <MapPin className="h-3 w-3 mr-1" /> {job.location}
              </div>

              <div className="flex items-center text-base text-gray-500 mb-3">
                <Calendar className="h-3 w-3 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              <div className="text-base text-gray-400 italic mb-3">
                <p>Contact details are hidden for expired listings</p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <Button
                  variant="outline"
                  onClick={() => onRenew(job)}
                  disabled={isRenewing && renewalJobId === job.id}
                  className="text-xs font-bold"
                >
                  {isRenewing && renewalJobId === job.id ? "Renewing..." : "Renew Listing"}
                </Button>
                
                <Button
                  className="font-bold bg-purple-500 hover:bg-purple-600 text-white text-xs"
                  onClick={() => onViewDetails(job)}
                >
                  Xem Chi Tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default ExpiredListingsSection;
