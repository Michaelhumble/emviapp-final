
import React from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, DollarSign, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface VietnameseJobSectionProps {
  vietnameseJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const VietnameseJobSection = ({ vietnameseJobs, onViewDetails }: VietnameseJobSectionProps) => {
  if (!vietnameseJobs.length) return null;

  return (
    <motion.section 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-1">Vietnamese-Speaking Jobs</h2>
          <p className="text-gray-600">
            Opportunities that welcome Vietnamese speakers
          </p>
        </div>
        <div className="mt-2 md:mt-0 bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-800">
          <p className="font-medium">Công việc dành cho người nói tiếng Việt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vietnameseJobs.slice(0, 4).map((job) => (
          <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                {job.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Nổi bật
                  </span>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <DollarSign className="h-4 w-4 mr-1" /> {job.salary_range}
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              {job.vietnamese_description && (
                <p className="text-gray-700 italic mb-4 line-clamp-2">
                  {job.vietnamese_description}
                </p>
              )}

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onViewDetails(job)}
              >
                Xem Chi Tiết
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default VietnameseJobSection;
