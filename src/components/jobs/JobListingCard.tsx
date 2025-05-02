
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { Clock, MapPin, Calendar, DollarSign } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { JobExpirationInfo } from './card-sections/JobExpirationInfo';

interface JobListingCardProps {
  job: Job;
  isExpired: boolean;
  currentUserId?: string;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  isExpired,
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing
}) => {
  const isOwner = currentUserId && job.user_id === currentUserId;
  
  const formatPostedDate = () => {
    try {
      const createdAt = new Date(job.created_at);
      return formatDistanceToNow(createdAt, { addSuffix: true });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 h-full flex flex-col ${isExpired ? 'opacity-75 border-gray-200' : 'hover:shadow-md'}`}>
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            {job.is_featured && !isExpired && (
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Featured</Badge>
            )}
            {isExpired && (
              <Badge variant="destructive">Expired</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{formatPostedDate()}</span>
        </div>
        
        {job.salary_range && (
          <div className="flex items-center text-sm text-green-600 mb-3">
            <DollarSign className="h-3.5 w-3.5 mr-1.5" />
            <span>{job.salary_range}</span>
          </div>
        )}

        <p className="text-gray-700 mb-auto">
          {job.vietnamese_description ? (
            <span className="line-clamp-3">{job.vietnamese_description}</span>
          ) : (
            <span className="line-clamp-3">{job.description}</span>
          )}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3 mb-4">
          {job.employment_type && (
            <Badge variant="secondary" className="text-xs">{job.employment_type}</Badge>
          )}
          {job.weekly_pay && (
            <Badge variant="secondary" className="text-xs">Weekly Pay</Badge>
          )}
          {job.has_housing && (
            <Badge variant="secondary" className="text-xs">Housing</Badge>
          )}
          {job.owner_will_train && (
            <Badge variant="secondary" className="text-xs">Training</Badge>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {isExpired ? 'Expired' : 'Active'}
          </div>
          
          <div className="space-x-2">
            {isOwner && isExpired && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRenew}
                disabled={isRenewing}
              >
                {isRenewing ? 'Renewing...' : 'Renew'}
              </Button>
            )}
            
            <Button 
              size="sm" 
              onClick={onViewDetails}
              disabled={isExpired && !isOwner}
              variant={isExpired && !isOwner ? "outline" : "default"}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
