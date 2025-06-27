import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobListingCard from './JobListingCard';
import { JobDetailModal } from './JobDetailModal';
import { 
  Scissors, 
  Sparkles, 
  Eye, 
  Heart, 
  Flower2, 
  Palette, 
  PaintBucket, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

const JobsByIndustrySection: React.FC<JobsByIndustrySectionProps> = ({
  jobs,
  expirations,
  currentUserId,
  onRenew,
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handlePostJobClick = (industry: string) => {
    navigate('/post-job-free');
    // Note: In a full implementation, you might want to pass the industry as a URL parameter
    // or store it in context/localStorage to pre-select the category in the form
  };

  const industryCategories = [
    {
      name: 'Nail Technician',
      icon: Sparkles,
      keywords: ['nail', 'manicure', 'pedicure', 'nail tech', 'nail technician', 'nail artist'],
      displayName: 'Nail Tech'
    },
    {
      name: 'Hair Stylist',
      icon: Scissors,
      keywords: ['hair', 'stylist', 'hairdresser', 'colorist', 'hair color', 'hair cut', 'salon'],
      displayName: 'Hair Stylist'
    },
    {
      name: 'Barber',
      icon: Scissors,
      keywords: ['barber', 'barbershop', 'men hair', 'beard', 'mustache', 'fade'],
      displayName: 'Barber'
    },
    {
      name: 'Lash Technician',
      icon: Eye,
      keywords: ['lash', 'eyelash', 'lash extension', 'lash tech', 'eyelash extension'],
      displayName: 'Lash Tech'
    },
    {
      name: 'Esthetician',
      icon: Heart,
      keywords: ['esthetician', 'facial', 'skincare', 'skin care', 'aesthetician'],
      displayName: 'Esthetician'
    },
    {
      name: 'Spa Technician',
      icon: Flower2,
      keywords: ['spa', 'massage', 'wellness', 'relaxation', 'spa tech'],
      displayName: 'Spa Tech'
    },
    {
      name: 'Makeup Artist',
      icon: Palette,
      keywords: ['makeup', 'cosmetics', 'beauty', 'makeup artist', 'mua'],
      displayName: 'Makeup Artist'
    },
    {
      name: 'Permanent Makeup',
      icon: PaintBucket,
      keywords: ['permanent makeup', 'microblading', 'pmua', 'cosmetic tattoo', 'eyebrow tattoo'],
      displayName: 'Permanent Makeup'
    }
  ];

  const categorizeJobs = (jobs: Job[]) => {
    const categorized: Record<string, Job[]> = {};
    const uncategorized: Job[] = [];

    industryCategories.forEach(category => {
      categorized[category.name] = [];
    });

    jobs.forEach(job => {
      let categorized_job = false;
      const jobText = `${job.title} ${job.description}`.toLowerCase();

      for (const category of industryCategories) {
        if (category.keywords.some(keyword => jobText.includes(keyword.toLowerCase()))) {
          categorized[category.name].push(job);
          categorized_job = true;
          break;
        }
      }

      if (!categorized_job) {
        uncategorized.push(job);
      }
    });

    // Sort jobs within each category by newest first
    Object.keys(categorized).forEach(category => {
      categorized[category].sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
    });

    return { categorized, uncategorized };
  };

  const { categorized, uncategorized } = categorizeJobs(jobs);

  const renderJobSection = (categoryName: string, categoryJobs: Job[], icon: React.ElementType, displayName: string) => {
    const IconComponent = icon;
    const hasJobs = categoryJobs.length > 0;

    return (
      <div key={categoryName} className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{displayName} Jobs</h2>
              <p className="text-gray-600">{categoryJobs.length} position{categoryJobs.length !== 1 ? 's' : ''} available</p>
            </div>
          </div>
          <Button
            onClick={() => handlePostJobClick(categoryName)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Post a {displayName} Job
          </Button>
        </div>

        {hasJobs ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoryJobs.map((job) => (
              <JobListingCard
                key={job.id}
                job={job}
                isExpired={checkExpiration ? checkExpiration(job) : expirations[job.id]}
                onViewDetails={() => viewJobDetails(job)}
                onRenew={() => onRenew(job)}
                onDelete={onDelete ? () => onDelete(job.id) : undefined}
                isRenewing={isRenewing && renewalJobId === job.id}
                currentUserId={currentUserId}
                showOwnerActions={job.user_id === currentUserId}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <IconComponent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {displayName} Jobs Yet</h3>
            <p className="text-gray-600 mb-4">Be the first to post a {displayName.toLowerCase()} position!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-8">
        {industryCategories.map(category => 
          renderJobSection(
            category.name, 
            categorized[category.name], 
            category.icon, 
            category.displayName
          )
        )}

        {/* Other/Uncategorized Jobs */}
        {uncategorized.length > 0 && renderJobSection(
          'Other', 
          uncategorized, 
          User, 
          'Other Beauty'
        )}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </>
  );
};

export default JobsByIndustrySection;
