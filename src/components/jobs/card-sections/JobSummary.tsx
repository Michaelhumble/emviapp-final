
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getJobTypeColor } from "../utils/badgeStyles";
import { useAuth } from "@/context/auth";

interface JobSummaryProps {
  employmentType: string;
  salaryRange?: string;
  createdAt: string;
  jobSummary?: string;
  phoneNumber?: string;
  contactEmail?: string;
}

export const JobSummary = ({ 
  employmentType, 
  salaryRange, 
  createdAt, 
  jobSummary,
  phoneNumber,
  contactEmail
}: JobSummaryProps) => {
  const { session } = useAuth();
  
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap gap-4 text-gray-700">
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <Badge variant="outline" className={getJobTypeColor(employmentType)}>
            {employmentType}
          </Badge>
        </div>
        
        {salaryRange && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{salaryRange}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{formatPostedDate(createdAt)}</span>
        </div>
      </div>
      
      {jobSummary && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {jobSummary}
          </p>
        </div>
      )}
      
      {session?.user && (phoneNumber || contactEmail) && (
        <div className="mt-2 text-sm text-gray-600 border-t pt-3 border-gray-100">
          <h4 className="font-medium text-gray-700 mb-1">Contact Information</h4>
          {phoneNumber && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-500">📞</span>
              <span>{phoneNumber}</span>
            </div>
          )}
          {contactEmail && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📧</span>
              <span>{contactEmail}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
