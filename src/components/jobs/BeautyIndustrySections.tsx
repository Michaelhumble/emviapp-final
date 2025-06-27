
import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobGrid from './JobGrid';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface IndustrySection {
  title: string;
  jobs: Job[];
  category: string;
}

interface BeautyIndustrySectionsProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onDelete?: (jobId: string) => void;
  checkExpiration?: (job: Job) => boolean;
}

// Custom SVG icons for each category
const NailTechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6V4C14 2.9 13.1 2 12 2Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M12 8V22" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="20" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
  </svg>
);

const HairStylistIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 6 6 6 10C6 12 7 14 8 16C9 18 10 20 12 22C14 20 15 18 16 16C17 14 18 12 18 10C18 6 16 2 12 2Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="8" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
  </svg>
);

const LashTechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="8" ry="5" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M6 10C8 8 10 9 12 10C14 9 16 8 18 10" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 14C8 16 10 15 12 14C14 15 16 16 18 14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BarberIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L6 9L9 12L6 15L3 12Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M9 12H21" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6" cy="12" r="1" fill="#8B5CF6"/>
  </svg>
);

const SpaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C16 3 19 6 19 12C19 16 16 19 12 19C8 19 5 16 5 12C5 6 8 3 12 3Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V17" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H16" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TattooIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L16 10L14 12L6 4L8 2Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M14 12L20 18L18 20L12 14L14 12Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="10" cy="6" r="1" fill="#8B5CF6"/>
  </svg>
);

const EstheticianIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <path d="M8 14C9 16 11 17 12 17C13 17 15 16 16 14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="9" r="1" fill="#8B5CF6"/>
    <circle cx="15" cy="9" r="1" fill="#8B5CF6"/>
  </svg>
);

const MakeupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L12 3L21 12L12 21L3 12Z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
  </svg>
);

const OtherIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="6" cy="6" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="18" cy="6" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="6" cy="18" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
    <circle cx="18" cy="18" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
  </svg>
);

const BeautyIndustrySections = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}: BeautyIndustrySectionsProps) => {
  
  // Group jobs by category
  const groupJobsByCategory = (jobs: Job[]): IndustrySection[] => {
    const categoryGroups: Record<string, Job[]> = {};
    
    // Only include jobs that have a category
    const validJobs = jobs.filter(job => job.category && job.category.trim() !== '');
    
    validJobs.forEach(job => {
      const category = job.category;
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(job);
    });

    return Object.entries(categoryGroups).map(([category, jobList]) => ({
      title: `${category} Jobs`,
      jobs: jobList,
      category
    }));
  };

  const sections = groupJobsByCategory(jobs);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Nail Tech':
        return <NailTechIcon />;
      case 'Hair Stylist':
        return <HairStylistIcon />;
      case 'Lash Tech':
        return <LashTechIcon />;
      case 'Barber':
        return <BarberIcon />;
      case 'Spa':
        return <SpaIcon />;
      case 'Tattoo':
        return <TattooIcon />;
      case 'Esthetician':
        return <EstheticianIcon />;
      case 'Makeup':
        return <MakeupIcon />;
      case 'Other':
      default:
        return <OtherIcon />;
    }
  };

  const EmptyStateCard = ({ category }: { category: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        {getCategoryIcon(category)}
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
        No {category} Jobs Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to post a {category.toLowerCase()} job opportunity. Connect with qualified professionals in your area.
      </p>
      <Link to="/post-job">
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
          <Plus className="mr-2 h-4 w-4" />
          Post a {category} Job
        </Button>
      </Link>
    </div>
  );

  if (sections.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <OtherIcon />
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
        <div key={section.category} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {getCategoryIcon(section.category)}
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {section.jobs.length} {section.jobs.length === 1 ? 'position' : 'positions'} available
                </p>
              </div>
            </div>
            <Link to="/post-job">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                <Plus className="mr-2 h-4 w-4" />
                Post a {section.category} Job
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
            <EmptyStateCard category={section.category} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BeautyIndustrySections;
