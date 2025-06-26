
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection = ({ jobs, onViewDetails }: FreeListingsSectionProps) => {
  if (!jobs.length) return null;

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">Free Listings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-base text-gray-600 mb-2">
                  <span className="text-lg mr-1">💰</span> {job.salary_range}
                </div>
              )}

              <div className="flex items-center text-base text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              <div className="flex justify-between items-center mt-3">
                <div>
                  {job.contact_info?.phone && (
                    <JobCardContact phoneNumber={job.contact_info.phone} />
                  )}
                </div>
                
                <Button
                  className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
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

export default FreeListingsSection;
