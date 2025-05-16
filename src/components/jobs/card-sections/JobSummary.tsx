
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getJobTypeColor } from "../utils/badgeStyles";

interface JobSummaryProps {
  employmentType: string;
  salaryRange?: string;
  createdAt: string;
}

export const JobSummary = ({ employmentType, salaryRange, createdAt }: JobSummaryProps) => {
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 text-gray-700">
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
  );
};
