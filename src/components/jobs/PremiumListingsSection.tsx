
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

interface PremiumListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const PremiumListingsSection = ({ jobs, onViewDetails }: PremiumListingsSectionProps) => {
  const { isSignedIn } = useAuth();

  if (!jobs.length) return null;

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Premium Listings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Job listing"}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                Featured
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-bold text-lg line-clamp-2">{job.title}</h3>
                <p className="text-gray-600 font-medium">{job.company}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="text-lg mr-1">💰</span> {job.salary_range}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                {job.contact_info?.phone ? (
                  isSignedIn ? (
                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{job.contact_info.phone}</span>
                    </div>
                  ) : (
                    <AuthAction
                      customTitle="Sign in to see contact details"
                      onAction={() => true}
                      fallbackContent={
                        <div className="text-xs text-gray-500 italic flex items-center gap-1">
                          <span className="text-xs">🔒</span>
                          <span>Sign in to see contact details</span>
                        </div>
                      }
                    />
                  )
                ) : null}
              </div>

              <Button
                className="w-full"
                onClick={() => onViewDetails(job)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default PremiumListingsSection;
