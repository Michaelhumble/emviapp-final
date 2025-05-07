
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection = ({ jobs, onViewDetails }: FreeListingsSectionProps) => {
  const { isSignedIn } = useAuth();

  if (!jobs.length) return null;

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Free Listings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="border border-gray-200 hover:border-gray-300 transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="text-lg mr-1">💰</span> {job.salary_range}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              {job.description && (
                <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                  {job.description}
                </p>
              )}

              <div className="flex justify-between items-center mt-3">
                <div>
                  {job.contact_info?.phone && isSignedIn && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{job.contact_info.phone}</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(job)}
                >
                  View Details
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
