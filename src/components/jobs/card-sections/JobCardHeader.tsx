
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface JobCardHeaderProps {
  job: Job;
}

export const JobCardHeader = ({ job }: JobCardHeaderProps) => {
  const isSalonForSale = job.employment_type === "For Sale";
  
  return (
    <div className="mb-3">
      {job.image && (
        <div className="aspect-video rounded-md mb-4 overflow-hidden">
          <ImageWithFallback
            src={job.image}
            alt={job.title || "Job listing"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            fallbackImage="https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      )}
      
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-playfair font-semibold text-lg leading-tight">
            {job.title}
            {job.trust_indicators?.verified && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 inline-flex items-center">
                <Verified className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
          </h3>
          <p className="text-gray-600 mt-1">
            {job.company}
          </p>
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
