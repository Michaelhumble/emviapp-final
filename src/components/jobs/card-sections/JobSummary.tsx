
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Share2, Clock, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import { format } from 'date-fns';
import { usePricing } from '@/context/pricing/PricingContext';

interface JobSummaryProps {
  job: Job;
  onApply?: () => void;
  onShare?: () => void;
}

const JobSummary: React.FC<JobSummaryProps> = ({ job, onApply, onShare }) => {
  const { pricingOptions } = usePricing();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };
  
  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          {job.pricingTier && (
            <span className={`px-2 py-0.5 text-xs rounded ${
              job.pricingTier === 'premium' 
                ? 'bg-purple-100 text-purple-800' 
                : job.pricingTier === 'gold' 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {job.pricingTier.charAt(0).toUpperCase() + job.pricingTier.slice(1)}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center text-gray-600">
            <Briefcase size={16} className="mr-2" />
            <span className="text-sm">{job.employment_type || job.jobType || 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{job.location || 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <DollarSign size={16} className="mr-2" />
            <span className="text-sm">{job.compensation_details || job.salary_range || 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">Posted: {formatDate(job.created_at)}</span>
          </div>
        </div>
        
        {job.weekly_pay || job.has_housing || job.owner_will_train || job.no_supply_deduction ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {job.weekly_pay && (
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">
                Weekly Pay
              </span>
            )}
            {job.has_housing && (
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                Housing Provided
              </span>
            )}
            {job.owner_will_train && (
              <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs">
                Owner Will Train
              </span>
            )}
            {job.no_supply_deduction && (
              <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs">
                No Supply Deduction
              </span>
            )}
          </div>
        ) : null}
        
        <div className="pt-4 border-t flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Eye size={16} />
            <span>247 views</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {onShare && (
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 size={16} className="mr-1" /> Share
              </Button>
            )}
            {onApply && (
              <Button size="sm" onClick={onApply}>
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSummary;
