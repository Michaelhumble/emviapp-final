
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface GoldListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const GoldListingsSection = ({ jobs, onViewDetails }: GoldListingsSectionProps) => {
  if (!jobs.length) return null;

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          🥇 Gold Featured
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Job listing"}
                className="w-full h-full object-cover"
                businessName={job.company}
              />
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0">
                Gold
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-playfair font-semibold text-base line-clamp-2">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="h-3 w-3 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="text-base mr-1">💰</span> {job.salary_range}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="h-3 w-3 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              <div className="border-t border-amber-50 pt-2 mb-3">
                {job.contact_info?.phone && (
                  <JobCardContact phoneNumber={job.contact_info.phone} />
                )}
              </div>

              <div className="flex justify-end">
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

export default GoldListingsSection;
