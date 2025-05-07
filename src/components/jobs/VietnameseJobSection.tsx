
import React, { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface VietnameseJobSectionProps {
  vietnameseJobs: Job[];
  onViewDetails: (job: Job) => void;
  searchTerm?: string;
}

const VietnameseJobSection = ({ 
  vietnameseJobs, 
  onViewDetails, 
  searchTerm = "" 
}: VietnameseJobSectionProps) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(vietnameseJobs);
  
  // Filter jobs based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredJobs(vietnameseJobs);
      return;
    }
    
    const filtered = vietnameseJobs.filter(job => 
      job.location && 
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  }, [vietnameseJobs, searchTerm]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredJobs.map((job, index) => {
          // Ensure Magic Nails is always first (top-left position)
          const isMagicNails = job.company?.includes('Magic Nails') || job.title?.includes('Magic Nails');
          
          return (
            <Card 
              key={job.id} 
              className={`overflow-hidden hover:shadow-md transition-shadow duration-200 ${
                isMagicNails ? 'relative border-yellow-300' : ''
              }`}
            >
              {isMagicNails && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 py-1 px-3 text-xs font-medium">
                  ⭐ EmviApp Premium Showcase
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  {(job.is_featured || isMagicNails) && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {isMagicNails ? "⭐ Featured by EmviApp" : "Nổi bật"}
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
          );
        })}
      </div>
    </motion.section>
  );
};

export default VietnameseJobSection;
