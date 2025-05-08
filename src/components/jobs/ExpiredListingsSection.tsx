
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Lock } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { expiredListings } from "@/data/expiredListings";

interface ExpiredListingsSectionProps {
  onViewDetails?: (job: Job) => void;
}

const ExpiredListingsSection = ({ onViewDetails }: ExpiredListingsSectionProps) => {
  if (!expiredListings?.length) return null;

  return (
    <motion.section
      className="mt-12 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-gray-600 flex items-center gap-2">
          <span className="text-xl lg:text-2xl">🕓</span> Recently Expired Beauty Industry Listings
        </h2>
        <p className="text-gray-500 mt-2">
          These listings are now closed, but new jobs are posted daily. Sign in to unlock future posts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {expiredListings.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-gray-200 opacity-90 hover:opacity-100 transition-all duration-300 h-full flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-600/10 z-10" />
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Job listing"}
                className="w-full h-full object-cover grayscale"
                businessName={job.company}
              />
              
              <div className="absolute top-2 left-2 z-20">
                <Badge className="bg-gray-500 text-white border-0 text-xs">
                  Expired
                </Badge>
              </div>
              
              {job.industry && (
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-white text-gray-800 border border-gray-300 font-medium text-xs">
                    {job.industry}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4 flex-grow flex flex-col">
              <div className="mb-2 flex-grow">
                <h3 className="font-playfair font-medium text-base text-gray-700 line-clamp-2">{job.title}</h3>
                <p className="text-gray-500 text-sm">{job.company}</p>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="h-3 w-3 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <span className="text-base mr-1">💰</span> {job.salary_range}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-3 w-3 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>
              
              <div className="text-xs text-gray-500 mb-3 line-clamp-2">
                {job.description}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Lock className="h-3 w-3 mr-1" /> 
                    <span>Sign in to see contact details</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="text-xs py-1 px-2 h-auto bg-gray-100 text-gray-400 border-gray-200"
                  >
                    Expired
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default ExpiredListingsSection;
