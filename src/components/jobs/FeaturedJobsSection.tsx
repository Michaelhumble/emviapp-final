
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { differenceInDays } from 'date-fns';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeaturedJobsSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FeaturedJobsSection = ({ featuredJobs, onViewDetails }: FeaturedJobsSectionProps) => {
  if (!featuredJobs || featuredJobs.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
            Featured Job Opportunities
          </h3>
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
            EmviApp AI Featured
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featuredJobs.slice(0, 3).map((job) => {
            const daysSinceCreation = differenceInDays(
              new Date(), 
              new Date(job.created_at)
            );
            
            return (
              <div 
                key={job.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => onViewDetails(job)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-900">{job.title}</h4>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>
                  {job.is_featured && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.employment_type && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {job.employment_type}
                    </Badge>
                  )}
                  {job.location && (
                    <Badge variant="outline" className="bg-gray-50">
                      {job.location}
                    </Badge>
                  )}
                  {job.weekly_pay && (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Weekly Pay 💰
                    </Badge>
                  )}
                </div>
                
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {job.vietnamese_description || job.description}
                </p>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {daysSinceCreation === 0 ? 'Today' : 
                     daysSinceCreation === 1 ? 'Yesterday' : 
                     `${daysSinceCreation} days ago`}
                  </span>
                  <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-800">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/jobs">
            <Button variant="link" className="text-purple-600 hover:text-purple-800">
              View all job opportunities →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsSection;
