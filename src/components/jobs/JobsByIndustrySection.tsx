
import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobListingCard from './JobListingCard';
import { JobDetailModal } from './JobDetailModal';

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

const INDUSTRY_SECTIONS = [
  { key: 'nails', title: 'Nail Technician Jobs', keywords: ['nail', 'nails', 'manicure', 'pedicure', 'nail tech'] },
  { key: 'hair', title: 'Hair Stylist Jobs', keywords: ['hair', 'stylist', 'hairdresser', 'colorist', 'salon'] },
  { key: 'barber', title: 'Barber Jobs', keywords: ['barber', 'barbershop', 'men\'s hair', 'fade', 'beard'] },
  { key: 'lash', title: 'Lash Technician Jobs', keywords: ['lash', 'lashes', 'eyelash', 'extensions', 'lash tech'] },
  { key: 'esthetician', title: 'Esthetician Jobs', keywords: ['esthetician', 'facial', 'skincare', 'skin care', 'aesthetician'] },
  { key: 'spa', title: 'Spa Technician Jobs', keywords: ['spa', 'massage', 'wellness', 'body treatment', 'relaxation'] },
  { key: 'makeup', title: 'Makeup Artist Jobs', keywords: ['makeup', 'cosmetics', 'beauty', 'mua', 'makeup artist'] },
  { key: 'permanent', title: 'Permanent Makeup Jobs', keywords: ['permanent makeup', 'microblading', 'pmu', 'eyebrow', 'tattoo'] },
  { key: 'other', title: 'Other Beauty Jobs', keywords: [] }
];

const categorizeJob = (job: Job): string => {
  const searchText = `${job.title} ${job.description} ${job.employment_type}`.toLowerCase();
  
  for (const section of INDUSTRY_SECTIONS.slice(0, -1)) { // Exclude 'other' from automatic matching
    if (section.keywords.some(keyword => searchText.includes(keyword))) {
      return section.key;
    }
  }
  
  return 'other'; // Default to 'other' if no match found
};

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

  // Group jobs by industry
  const jobsByIndustry = jobs.reduce((acc, job) => {
    const industry = categorizeJob(job);
    if (!acc[industry]) {
      acc[industry] = [];
    }
    acc[industry].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  // Sort jobs within each industry by newest first
  Object.keys(jobsByIndustry).forEach(industry => {
    jobsByIndustry[industry].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  });

  const isExpired = (job: Job): boolean => {
    if (checkExpiration) {
      return checkExpiration(job);
    }
    
    if (job.status === 'expired') {
      return true;
    }
    
    if (expirations && expirations[job.id] !== undefined) {
      return expirations[job.id];
    }
    
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 30;
  };

  const isOwner = (job: Job): boolean => {
    return currentUserId === job.user_id;
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="space-y-12">
        {INDUSTRY_SECTIONS.map((section) => {
          const sectionJobs = jobsByIndustry[section.key] || [];
          
          return (
            <div key={section.key} className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {sectionJobs.length} {sectionJobs.length === 1 ? 'job' : 'jobs'} available
                </p>
              </div>
              
              {sectionJobs.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sectionJobs.map((job) => (
                    <JobListingCard 
                      key={job.id}
                      job={job}
                      isExpired={isExpired(job)}
                      currentUserId={currentUserId}
                      onViewDetails={() => viewJobDetails(job)}
                      onRenew={() => onRenew(job)}
                      onDelete={onDelete && isOwner(job) ? () => onDelete(job.id) : undefined}
                      isRenewing={isRenewing && renewalJobId === job.id}
                      showOwnerActions={isOwner(job)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="text-gray-400 mb-4 text-4xl">
                    {section.key === 'nails' && '💅'}
                    {section.key === 'hair' && '✂️'}
                    {section.key === 'barber' && '💈'}
                    {section.key === 'lash' && '👁️'}
                    {section.key === 'esthetician' && '✨'}
                    {section.key === 'spa' && '🧘‍♀️'}
                    {section.key === 'makeup' && '💄'}
                    {section.key === 'permanent' && '🎨'}
                    {section.key === 'other' && '💼'}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No {section.title.toLowerCase()} yet
                  </h3>
                  <p className="text-gray-600">
                    Be the first to post a job opportunity in this category!
                  </p>
                </div>
              )}
            </div>
          );
        })}
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
