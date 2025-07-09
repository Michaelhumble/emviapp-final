import React from 'react';
import { Job } from '@/types/job';
import { ChevronDown, ChevronUp, MapPin, DollarSign } from 'lucide-react';
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
  // Get industry emoji based on category
  const getCategoryEmoji = (category: string) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('nail')) return '💅';
    if (cat.includes('hair')) return '✂️';
    if (cat.includes('barber')) return '💈';
    if (cat.includes('massage')) return '💆';
    if (cat.includes('makeup')) return '💄';
    if (cat.includes('lash') || cat.includes('brow')) return '👁️';
    if (cat.includes('tattoo')) return '🎨';
    if (cat.includes('esthetic') || cat.includes('skin')) return '✨';
    return '🏢';
  };

  // Format salary display
  const getSalary = () => {
    if (job.salary) return job.salary;
    if (job.compensation_details) return job.compensation_details;
    return 'Contact for details';
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Compact header - always visible */}
      <div 
        className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${isExpired ? 'opacity-70' : ''}`}
        onClick={onTap}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            {/* Category emoji */}
            <span className="text-lg mr-3 flex-shrink-0">
              {getCategoryEmoji(job.category)}
            </span>
            
            {/* Job info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {job.company || 'Company Name'}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {job.vietnamese_title || job.title || 'Job Title'}
                  </p>
                </div>
                
                <div className="ml-2 text-right flex-shrink-0">
                  <div className="text-xs font-medium text-green-600 mb-1">
                    {getSalary().split(' ')[0]} {/* First part of salary */}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {job.location?.split(',')[0] || 'TBD'} {/* Just city */}
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
          <div className="mt-2 text-xs text-red-600 font-medium">
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