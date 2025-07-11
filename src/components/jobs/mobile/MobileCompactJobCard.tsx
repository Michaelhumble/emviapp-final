import React from 'react';
import { Job } from '@/types/job';
import { ChevronDown, ChevronUp, MapPin, DollarSign, Sparkles, Scissors, Zap, Heart, Star, Palette, Pen, Eye, Brush } from 'lucide-react';
import MobileJobCard from './MobileJobCard';

interface MobileCompactJobCardProps {
  job: Job | any; // Allow expired job type too
  onTap: () => void;
  isExpanded: boolean;
  isExpired?: boolean;
}

const MobileCompactJobCard: React.FC<MobileCompactJobCardProps> = ({
  job,
  onTap,
  isExpanded,
  isExpired = false
}) => {
  // Add comprehensive defensive checks for job object
  if (!job || typeof job !== 'object') {
    console.warn('⚠️ [MOBILE-COMPACT-JOB-CARD] Invalid job object:', job);
    return (
      <div className="border border-gray-200 rounded-lg p-3">
        <p className="text-gray-500 text-sm">Invalid job data</p>
      </div>
    );
  }

  // Ensure job has minimum required fields
  if (!job.id) {
    console.warn('⚠️ [MOBILE-COMPACT-JOB-CARD] Job missing ID:', job);
    return (
      <div className="border border-gray-200 rounded-lg p-3">
        <p className="text-gray-500 text-sm">Job data missing ID</p>
      </div>
    );
  }
  // Get industry icon based on category with null safety
  const getCategoryIcon = (category: string | undefined | null) => {
    const cat = (category && typeof category === 'string' ? category.toLowerCase() : '');
    if (cat.includes('nail')) return <Sparkles className="h-4 w-4 text-purple-600" />;
    if (cat.includes('hair')) return <Scissors className="h-4 w-4 text-indigo-600" />;
    if (cat.includes('barber')) return <Zap className="h-4 w-4 text-blue-600" />;
    if (cat.includes('massage')) return <Heart className="h-4 w-4 text-pink-600" />;
    if (cat.includes('makeup')) return <Palette className="h-4 w-4 text-rose-600" />;
    if (cat.includes('lash') || cat.includes('brow')) return <Eye className="h-4 w-4 text-emerald-600" />;
    if (cat.includes('tattoo')) return <Pen className="h-4 w-4 text-amber-600" />;
    if (cat.includes('esthetic') || cat.includes('skin')) return <Star className="h-4 w-4 text-teal-600" />;
    return <Brush className="h-4 w-4 text-gray-800" />;
  };

  // Format salary display with null safety
  const getSalary = () => {
    if (job.salary && typeof job.salary === 'string') return job.salary;
    if (job.compensation_details && typeof job.compensation_details === 'string') return job.compensation_details;
    return 'Contact for details';
  };

  return (
    <div 
      data-job-id={job.id}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      {/* Compact header - always visible */}
      <div 
        className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${isExpired ? 'opacity-70' : ''}`}
        onClick={onTap}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            {/* Category icon */}
            <div className="mr-3 flex-shrink-0">
              {getCategoryIcon(job.category)}
            </div>
            
            {/* Job info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {(job.company && typeof job.company === 'string' ? job.company : '') || 'Company Name'}
                  </h4>
                  <p className="text-xs font-medium text-gray-800 truncate">
                    {(job.vietnamese_title && typeof job.vietnamese_title === 'string' ? job.vietnamese_title : '') ||
                     (job.title && typeof job.title === 'string' ? job.title : '') || 'Job Title'}
                  </p>
                </div>
                
                <div className="ml-2 text-right flex-shrink-0">
                  <div className="text-xs font-bold text-green-600 mb-1">
                    {getSalary().split(' ')[0]} {/* First part of salary */}
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-800">
                    <MapPin className="h-3 w-3 mr-1 text-gray-600" />
                    {(job.location && typeof job.location === 'string' ? job.location.split(',')[0] : '') || 'TBD'} {/* Just city */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expand icon */}
          <div className="ml-2 flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {/* Status indicator for expired jobs */}
        {isExpired && (
          <div className="mt-2 text-xs text-red-600 font-bold">
            Position Filled • {new Date(job.filled_date).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4">
          <MobileJobCard 
            job={job}
            onViewDetails={() => {}}
            onRenew={() => {}}
            isRenewing={false}
            isExpired={isExpired}
            expanded={true}
          />
        </div>
      )}
    </div>
  );
};

export default MobileCompactJobCard;