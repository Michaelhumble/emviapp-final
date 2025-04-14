
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface JobCardHeaderProps {
  job: Job;
}

export const JobCardHeader = ({ job }: JobCardHeaderProps) => {
  // Check if it's a job for a salon that's for sale
  const isSalonForSale = job.employment_type === "For Sale";
  
  return (
    <div className="mb-3">
      {/* If there's a job image or salon image, display it */}
      {job.image && (
        <div className="h-40 rounded-md mb-4 overflow-hidden">
          <ImageWithFallback
            src={job.image}
            alt={job.title || "Job listing"}
            className="h-full w-full object-cover"
            fallbackImage="https://emvi.app/images/fallback-profile.jpg"
          />
        </div>
      )}
      
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold text-lg">
            {job.title}
            {job.trust_indicators?.verified && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 inline-flex items-center">
                <Verified className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
          </h3>
          <p className="text-gray-600">
            {job.company}
          </p>
        </div>
        
        {/* Only show a sale badge for salon sales */}
        {isSalonForSale && (
          <Badge className="bg-purple-100 text-purple-800">
            For Sale
          </Badge>
        )}
      </div>
    </div>
  );
};
