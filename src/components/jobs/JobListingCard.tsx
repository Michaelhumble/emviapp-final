
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job, ListingType } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, MapPin, Building, Clock, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

interface JobListingCardProps {
  job: Job;
  variant?: 'default' | 'compact';
  showApplyButton?: boolean;
  onApply?: (jobId: string) => void;
  onShare?: () => void;
  isExpired?: boolean; // Add isExpired prop
}

export const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  variant = 'default',
  showApplyButton = true,
  onApply,
  onShare,
  isExpired = false, // Default to false
}) => {
  const { t } = useTranslation();
  const isCompact = variant === 'compact';

  // Format the posted date - handle both createdAt and created_at properties
  const postedDate = job.created_at
    ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true })
    : t({ english: 'Recently', vietnamese: 'Gần đây' });

  // Handle apply button click
  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    }
  };

  // Handle share button click
  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  // Determine badge color based on job type
  const getBadgeVariant = (type: ListingType | undefined): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'full-time':
        return 'default';
      case 'part-time':
        return 'secondary';
      case 'contract':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className={isCompact ? 'pb-2' : undefined}>
        <div className="flex justify-between items-start">
          <CardTitle className={`${isCompact ? 'text-lg' : 'text-xl'} font-semibold`}>
            {job.title}
            {isExpired && (
              <Badge variant="destructive" className="ml-2">
                {t({ english: 'Expired', vietnamese: 'Đã hết hạn' })}
              </Badge>
            )}
          </CardTitle>
          {job.type && (
            <Badge variant={getBadgeVariant(job.type as ListingType)}>
              {job.type}
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center mt-1">
          <Building className="h-4 w-4 mr-1" />
          {job.company || t({ english: 'Unknown Company', vietnamese: 'Công ty chưa xác định' })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={`flex-grow ${isCompact ? 'py-2' : ''}`}>
        {!isCompact && job.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {job.description}
          </p>
        )}
        
        <div className="flex flex-col space-y-2">
          {job.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>
          )}
          
          {/* Use salary_range or compensation if no salary field exists */}
          {(job.salary_range || job.compensation || job.compensation_details) && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{job.salary_range || job.compensation || job.compensation_details}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{postedDate}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={`${isCompact ? 'pt-2' : ''} flex justify-between items-center`}>
        {showApplyButton ? (
          <Button 
            onClick={handleApply}
            className="flex items-center"
            disabled={isExpired}
          >
            {t({ english: 'Apply Now', vietnamese: 'Ứng tuyển ngay' })}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Link to={`/jobs/${job.id}`}>
            <Button variant="outline">
              {t({ english: 'View Details', vietnamese: 'Xem chi tiết' })}
            </Button>
          </Link>
        )}
        
        {onShare && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleShare}
          >
            {t({ english: 'Share', vietnamese: 'Chia sẻ' })}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
