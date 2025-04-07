
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface FeaturedJobsSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FeaturedJobsSection = ({ featuredJobs, onViewDetails }: FeaturedJobsSectionProps) => {
  if (!featuredJobs.length) return null;

  return (
    <motion.section 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Star className="h-5 w-5 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-serif font-bold">Featured Opportunities</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-2 border-yellow-100">
            <div className="h-1 bg-gradient-to-r from-yellow-400 to-primary"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-none">
                  Featured
                </Badge>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <DollarSign className="h-4 w-4 mr-1" /> {job.salary_range}
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1" /> Posted {new Date(job.created_at).toLocaleDateString()}
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">
                {job.description}
              </p>

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

export default FeaturedJobsSection;
