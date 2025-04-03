
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare, Users } from "lucide-react";
import { Job } from "@/types/job";

interface JobCardHeaderProps {
  job: Job;
}

export const JobCardHeader = ({ job }: JobCardHeaderProps) => {
  return (
    <div className="mb-4 flex justify-between">
      <div>
        <h2 className="text-xl font-serif font-semibold line-clamp-2 leading-tight mb-1">
          {job.title} – {job.location}
        </h2>
        <p className="text-gray-700">{job.company}</p>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap gap-2 mt-2">
          {job.trust_indicators?.verified && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Verified Salon
            </Badge>
          )}
          
          {job.trust_indicators?.activelyHiring && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
              <Users className="h-3 w-3" /> Hiring Actively
            </Badge>
          )}
          
          {job.trust_indicators?.chatAvailable && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Chat Available
            </Badge>
          )}
        </div>
      </div>
      
      {job.is_nationwide && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Nationwide
        </Badge>
      )}
    </div>
  );
};
