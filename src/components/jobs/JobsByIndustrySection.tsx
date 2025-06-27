
import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobGrid from './JobGrid';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';

interface IndustrySection {
  title: string;
  jobs: Job[];
  industry: string;
}

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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (industry: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [industry]: !prev[industry]
    }));
  };

  // Group jobs by industry/type
  const groupJobsByIndustry = (jobs: Job[]): IndustrySection[] => {
    const groups: Record<string, Job[]> = {};
    
    jobs.forEach(job => {
      const industry = job.employment_type || 'General';
      if (!groups[industry]) {
        groups[industry] = [];
      }
      groups[industry].push(job);
    });

    return Object.entries(groups).map(([industry, jobList]) => ({
      title: `${industry} Jobs`,
      jobs: jobList,
      industry
    }));
  };

  const sections = groupJobsByIndustry(jobs);

  const EmptyStateCard = ({ industry }: { industry: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Briefcase className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
        No {industry} Jobs Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to post a {industry.toLowerCase()} job opportunity. Connect with qualified professionals in your area.
      </p>
      <Link to="/post-job">
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
          <Plus className="mr-2 h-4 w-4" />
          Post a {industry} Job
        </Button>
      </Link>
    </div>
  );

  if (sections.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Briefcase className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
            No Job Listings Available
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            There are currently no job postings available. Be the first to post a job opportunity and connect with talented beauty professionals.
          </p>
          <Link to="/post-job">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-8 py-4 text-lg">
              <Plus className="mr-2 h-5 w-5" />
              Post a Job for Free
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.industry} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-600 mt-1">
                {section.jobs.length} {section.jobs.length === 1 ? 'position' : 'positions'} available
              </p>
            </div>
            <Link to="/post-job">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                <Plus className="mr-2 h-4 w-4" />
                Post a {section.industry} Job
              </Button>
            </Link>
          </div>
          
          {section.jobs.length > 0 ? (
            <JobGrid
              jobs={section.jobs}
              expirations={expirations}
              onRenew={onRenew}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
            />
          ) : (
            <EmptyStateCard industry={section.industry} />
          )}
        </div>
      ))}
    </div>
  );
};

export default JobsByIndustrySection;
