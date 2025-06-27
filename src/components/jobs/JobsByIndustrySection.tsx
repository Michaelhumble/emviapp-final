
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/types/job';
import JobListingCard from './JobListingCard';
import JobEmptyState from './JobEmptyState';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Sparkles, 
  Eye, 
  Palette, 
  Heart, 
  HandMetal,
  Brush,
  Plus
} from 'lucide-react';

interface JobsByIndustrySectionProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onDelete?: (jobId: string) => void;
  checkExpiration?: (job: Job) => boolean;
}

const JobsByIndustrySection = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}: JobsByIndustrySectionProps) => {
  const navigate = useNavigate();

  const getIndustryIcon = (industry: string) => {
    const iconProps = { size: 20, className: "text-blue-600" };
    
    switch (industry.toLowerCase()) {
      case 'nails':
        return <Sparkles {...iconProps} />;
      case 'hair stylist':
        return <Scissors {...iconProps} />;
      case 'barber':
        return <Scissors {...iconProps} />;
      case 'lash':
        return <Eye {...iconProps} />;
      case 'esthetician':
        return <Heart {...iconProps} />;
      case 'spa':
        return <HandMetal {...iconProps} />;
      case 'makeup':
        return <Palette {...iconProps} />;
      case 'permanent makeup':
        return <Brush {...iconProps} />;
      default:
        return <Plus {...iconProps} />;
    }
  };

  const categorizeJobs = (jobs: Job[]) => {
    const categories = {
      'Nails': [] as Job[],
      'Hair Stylist': [] as Job[],
      'Barber': [] as Job[],
      'Lash': [] as Job[],
      'Esthetician': [] as Job[],
      'Spa': [] as Job[],
      'Makeup': [] as Job[],
      'Permanent Makeup': [] as Job[],
      'Other': [] as Job[]
    };

    jobs.forEach(job => {
      const title = job.title?.toLowerCase() || '';
      const description = job.description?.toLowerCase() || '';
      const company = job.company?.toLowerCase() || '';
      
      if (title.includes('nail') || description.includes('nail') || company.includes('nail')) {
        categories['Nails'].push(job);
      } else if (title.includes('hair') && !title.includes('barber') || description.includes('hair stylist') || description.includes('hairstylist')) {
        categories['Hair Stylist'].push(job);
      } else if (title.includes('barber') || description.includes('barber') || company.includes('barber')) {
        categories['Barber'].push(job);
      } else if (title.includes('lash') || title.includes('eyelash') || description.includes('lash') || description.includes('eyelash')) {
        categories['Lash'].push(job);
      } else if (title.includes('esthetician') || title.includes('facial') || description.includes('esthetician') || description.includes('facial')) {
        categories['Esthetician'].push(job);
      } else if (title.includes('spa') || title.includes('massage') || description.includes('spa') || description.includes('massage')) {
        categories['Spa'].push(job);
      } else if (title.includes('makeup') && !title.includes('permanent') || description.includes('makeup') && !description.includes('permanent')) {
        categories['Makeup'].push(job);
      } else if (title.includes('permanent makeup') || title.includes('pmu') || description.includes('permanent makeup') || description.includes('pmu')) {
        categories['Permanent Makeup'].push(job);
      } else {
        categories['Other'].push(job);
      }
    });

    // Sort jobs within each category by newest first
    Object.keys(categories).forEach(category => {
      categories[category as keyof typeof categories].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
    });

    return categories;
  };

  const handleViewDetails = (job: Job) => {
    console.log('Viewing job details:', job);
  };

  const categorizedJobs = categorizeJobs(jobs);

  const handlePostJobClick = () => {
    navigate('/post-job');
  };

  return (
    <div className="space-y-12">
      {Object.entries(categorizedJobs).map(([industry, industryJobs]) => (
        <div key={industry} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getIndustryIcon(industry)}
              <h2 className="text-2xl font-bold text-gray-900">
                {industry} Jobs
                {industryJobs.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({industryJobs.length})
                  </span>
                )}
              </h2>
            </div>
            <Button
              onClick={handlePostJobClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Post a {industry} Job
            </Button>
          </div>

          {industryJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industryJobs.map((job) => (
                <JobListingCard
                  key={job.id}
                  job={job}
                  isExpired={checkExpiration ? checkExpiration(job) : expirations[job.id]}
                  onViewDetails={() => handleViewDetails(job)}
                  onRenew={() => onRenew(job)}
                  onDelete={onDelete ? () => onDelete(job.id) : undefined}
                  isRenewing={isRenewing && renewalJobId === job.id}
                  showOwnerActions={currentUserId === job.user_id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-4">
                {getIndustryIcon(industry)}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {industry} Jobs Available
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to post a {industry.toLowerCase()} job opportunity!
              </p>
              <Button
                onClick={handlePostJobClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Post a {industry} Job
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobsByIndustrySection;
