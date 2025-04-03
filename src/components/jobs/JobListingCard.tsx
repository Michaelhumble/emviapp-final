
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Briefcase, LockIcon, CheckCircle, Users, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";

interface JobListingCardProps {
  job: Job;
  isExpired: boolean;
  currentUserId?: string;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const JobListingCard = ({
  job,
  isExpired,
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing
}: JobListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "part-time":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "contract":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "internship":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
      } h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header with title and trust indicators */}
        <div className="mb-4 flex justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold line-clamp-2 leading-tight mb-1">
              {job.title} – {job.company}, {job.location}
            </h2>
            
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
        
        {/* Job summary section */}
        <div className="flex flex-wrap gap-4 mb-4 text-gray-700">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <Badge variant="outline" className={getJobTypeColor(job.employment_type)}>
              {job.employment_type}
            </Badge>
          </div>
          
          {job.salary_range && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{job.salary_range}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{formatPostedDate(job.created_at)}</span>
          </div>
        </div>
        
        {/* Special tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.weekly_pay && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Weekly Pay 💰
            </Badge>
          )}
          {job.owner_will_train && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              Owner Will Train ✨
            </Badge>
          )}
        </div>
        
        {/* Job description - truncated */}
        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
          {job.description}
        </p>
        
        {/* Expired warning */}
        {isExpired && (
          <div className="mt-2 mb-4 flex flex-col gap-2">
            <Badge variant="destructive" className="flex items-center justify-center gap-1 w-fit">
              <LockIcon size={12} /> Expired
            </Badge>
            <p className="text-xs text-gray-500">Contact info is hidden until renewed</p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="mt-auto pt-4 flex justify-between items-center">
          <Button 
            onClick={onViewDetails}
            className="flex-grow mr-2"
          >
            View Details
          </Button>
          
          {currentUserId === job.user_id && isExpired && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRenew}
              disabled={isRenewing}
              className="whitespace-nowrap"
            >
              {isRenewing ? "Renewing..." : "Renew Post"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
