
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface DiamondListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const DiamondListingsSection = ({ jobs, onViewDetails }: DiamondListingsSectionProps) => {
  if (!jobs.length) return null;

  const magicNailsJob = jobs[0]; // First job is always Magic Nails
  const placeholderJobs = jobs.slice(1); // Rest are placeholder image-only cards

  return (
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
        {/* Magic Nails Card - Always first */}
        <Card
          key={magicNailsJob.id}
          className="overflow-hidden border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-white"
        >
          <div className="aspect-video relative">
            <ImageWithFallback
              src={magicNailsJob.image || ""}
              alt={magicNailsJob.title || "Magic Nails job listing"}
              className="w-full h-full object-cover"
              businessName={magicNailsJob.company}
            />
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
              Diamond
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-lg">{magicNailsJob.title}</h3>
              <p className="text-gray-700 font-medium">{magicNailsJob.company}</p>
            </div>

            <div className="flex items-center text-base text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" /> {magicNailsJob.location}
            </div>

            {magicNailsJob.salary_range && (
              <div className="flex items-center text-base text-gray-600 mb-2">
                <span className="text-lg mr-1">💰</span> {magicNailsJob.salary_range}
              </div>
            )}

            {magicNailsJob.description && (
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {magicNailsJob.description}
              </p>
            )}

            <div className="border-t border-yellow-100 pt-3 mb-3">
              {magicNailsJob.contact_info?.phone && (
                <JobCardContact phoneNumber={magicNailsJob.contact_info.phone} />
              )}
            </div>

            <div className="flex justify-end">
              <Button
                className="font-bold bg-purple-500 hover:bg-purple-600 text-white text-xs"
                onClick={() => onViewDetails(magicNailsJob)}
              >
                Xem Chi Tiết
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Diamond Cards */}
        {placeholderJobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-white"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt="Diamond tier nail service"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                Diamond
              </Badge>
            </div>

            <CardContent className="p-6 flex flex-col items-center justify-center">
              <h3 className="font-playfair font-semibold text-lg text-center mb-2">Diamond Tier</h3>
              <p className="text-gray-600 text-center mb-4">Premium Exposure</p>
              
              <div className="flex justify-center">
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

export default DiamondListingsSection;
