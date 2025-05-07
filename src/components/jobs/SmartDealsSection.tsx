
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SmartDealsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const SmartDealsSection = ({ jobs, onViewDetails }: SmartDealsSectionProps) => {
  if (!jobs.length) return null;

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-6">
        <Tag size={20} className="text-green-500 mr-2" />
        <h2 className="text-2xl font-serif font-bold">Smart Deals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <TooltipProvider key={job.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="overflow-hidden border border-gray-200 hover:border-green-200 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback
                      src={job.image || ""}
                      alt={job.title || "Job listing"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      <h3 className="font-bold text-base line-clamp-1">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                    </div>

                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <MapPin className="h-3 w-3 mr-1" /> <span className="truncate">{job.location}</span>
                    </div>

                    {job.salary_range && (
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <span className="text-sm mr-1">💰</span> <span className="truncate">{job.salary_range}</span>
                      </div>
                    )}

                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <Calendar className="h-3 w-3 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        className="w-full text-xs h-8"
                        onClick={() => onViewDetails(job)}
                      >
                        Quick View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="p-2 bg-green-50 border border-green-100">
                <p className="text-green-800 text-xs">Smart Deal</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.section>
  );
};

export default SmartDealsSection;
