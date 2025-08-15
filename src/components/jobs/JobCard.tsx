import React from 'react';
import { Job } from '@/types/job';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import JobCardContact from '@/components/jobs/JobCardContact';

interface JobCardProps {
  job: Job;
  onRenew?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onRenew }) => {
  const formatSalary = (salary: any) => {
    if (typeof salary === 'number') return `$${salary.toLocaleString()}`;
    if (typeof salary === 'string') return salary;
    if (salary?.min && salary?.max) return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    return 'Competitive';
  };

  const getPriorityBadge = (tier: string) => {
    const tiers = {
      'diamond': { label: 'Diamond', color: 'bg-purple-600 text-white' },
      'gold': { label: 'Gold', color: 'bg-yellow-500 text-white' },
      'premium': { label: 'Premium', color: 'bg-blue-600 text-white' },
      'free': { label: 'Standard', color: 'bg-gray-500 text-white' }
    };
    
    const config = tiers[tier as keyof typeof tiers] || tiers.free;
    return (
      <Badge className={`${config.color} text-xs font-semibold`}>
        {config.label}
      </Badge>
    );
  };

  // Derive expired state for pill rendering
  const now = new Date();
  const createdAt = job.created_at ? new Date(job.created_at) : new Date(0);
  const expiresAt = job.expires_at ? new Date(job.expires_at as any) : null;
  const activeWindow = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  const isActive = job.status === 'active' && ((expiresAt && expiresAt > now) || (!expiresAt && activeWindow > now));
  const isExpired = !isActive;

  return (
    <Card 
      className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 bg-white"
      data-job-id={job.id}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {job.title || 'Untitled Job'}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {job.company || job.contact_info?.owner_name || 'Company Name'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isExpired && (
              <Badge variant="secondary" className="bg-muted text-foreground/70 text-[10px] px-2 py-0.5 rounded-full">
                Expired
              </Badge>
            )}
            {getPriorityBadge(job.pricing_tier || 'free')}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{job.location || 'Location TBD'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-green-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold">{formatSalary(job.compensation_details || job.salary_range)}</span>
            </div>
          </div>

          {job.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {job.description}
            </p>
          )}

          {job.specialties && job.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {job.specialties.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.specialties.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="space-y-3">
          {/* Contact Information with Premium Gate */}
          <JobCardContact phoneNumber={job.contact_info?.phone} />
          
          <div className="flex gap-2 w-full">
            <Button 
              className="flex-1 touch-manipulation min-h-[44px]" 
              size="sm"
            >
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="touch-manipulation min-h-[44px]"
              onClick={() => {/* Handle apply */}}
            >
              Apply
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};