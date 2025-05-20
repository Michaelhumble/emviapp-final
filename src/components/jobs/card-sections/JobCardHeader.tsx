
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";

interface JobCardHeaderProps {
  job: Job;
}

export const JobCardHeader = ({ job }: JobCardHeaderProps) => {
  const isSalonForSale = job.employment_type === "For Sale";
  const salonName = job.salonName || job.company || "Unknown Salon";
  
  return (
    <div className="mb-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="text-gray-600 mb-1">
            {salonName}
          </p>
          <h3 className="font-playfair font-semibold text-lg leading-tight">
            {job.title}
            {job.trust_indicators?.verified && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 inline-flex items-center">
                <Verified className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
          </h3>
        </div>
        
        {isSalonForSale && (
          <Badge className="bg-purple-100 text-purple-800 font-medium">
            For Sale
          </Badge>
        )}
      </div>
    </div>
  );
};
