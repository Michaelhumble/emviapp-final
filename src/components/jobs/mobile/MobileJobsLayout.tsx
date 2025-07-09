import React, { useState } from 'react';
import { Job } from '@/types/job';
import { expiredJobsData } from '@/data/expiredJobsData';
import MobileJobCard from './MobileJobCard';
import MobileCompactJobCard from './MobileCompactJobCard';
import MobileIndustryCarousel from './MobileIndustryCarousel';
import { 
  ChevronRight, 
  Sparkles, 
  Scissors, 
  Zap, 
  Heart, 
  Star, 
  Palette, 
  Pen, 
  Eye,
  Brush
} from 'lucide-react';

interface MobileJobsLayoutProps {
  jobs: Job[];
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onViewDetails: (job: Job) => void;
  onEditJob: (job: Job) => void;
}

const MobileJobsLayout: React.FC<MobileJobsLayoutProps> = ({
  jobs,
  onRenew,
  isRenewing,
  renewalJobId,
  onViewDetails,
  onEditJob
}) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string>('All');

  // Group jobs by industry/category
  const jobsByIndustry = React.useMemo(() => {
    const grouped: Record<string, Job[]> = {};
    
    // Group active jobs by category
    jobs.forEach(job => {
      const category = job.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(job);
    });

    // Group expired jobs by category
    const expiredByCategory: Record<string, any[]> = {};
    expiredJobsData.forEach(job => {
      const category = job.category || 'Other';
      if (!expiredByCategory[category]) {
        expiredByCategory[category] = [];
      }
      expiredByCategory[category].push(job);
    });

    return { active: grouped, expired: expiredByCategory };
  }, [jobs]);

  // Industry order - Nails first
  const industries = [
    'Nail Tech',
    'Hair Stylist', 
    'Barber',
    'Massage Therapist',
    'Esthetician',
    'Makeup Artist',
    'Tattoo Artist',
    'Lash Tech',
    'Brow Tech'
  ];

  const handleJobTap = (job: Job | any) => {
    // For mobile, directly open view details modal
    onViewDetails(job);
  };

  // Get industry icon helper
  const getIndustryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('nail')) return <Sparkles className="h-7 w-7 text-purple-600" />;
    if (lower.includes('hair')) return <Scissors className="h-7 w-7 text-indigo-600" />;
    if (lower.includes('barber')) return <Zap className="h-7 w-7 text-blue-600" />;
    if (lower.includes('massage')) return <Heart className="h-7 w-7 text-pink-600" />;
    if (lower.includes('makeup')) return <Palette className="h-7 w-7 text-rose-600" />;
    if (lower.includes('lash') || lower.includes('brow')) return <Eye className="h-7 w-7 text-emerald-600" />;
    if (lower.includes('tattoo')) return <Pen className="h-7 w-7 text-amber-600" />;
    if (lower.includes('esthetic')) return <Star className="h-7 w-7 text-teal-600" />;
    return <Brush className="h-7 w-7 text-gray-800" />;
  };

  const renderJobSection = (category: string, activeJobs: Job[], expiredJobs: any[]) => {
    const allJobs = [...activeJobs, ...expiredJobs];
    const displayJobs = allJobs.slice(0, 10); // First 10 as full cards
    const compactJobs = allJobs.slice(10); // Rest as compact

    return (
      <div key={category} className="mb-8">
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center gap-3">
            {getIndustryIcon(category)}
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{category}</h3>
          </div>
          <span className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
            {allJobs.length} jobs
          </span>
        </div>

        {/* Horizontal scrolling for full photo cards */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-4 px-4" style={{ minWidth: `${displayJobs.length * 280}px` }}>
            {displayJobs.map((job) => (
              <div key={job.id} className="flex-shrink-0 w-64">
                <MobileJobCard 
                  job={job}
                  onViewDetails={() => handleJobTap(job)}
                  onEditJob={() => onEditJob(job)}
                  onRenew={() => onRenew(job as Job)}
                  isRenewing={isRenewing && renewalJobId === job.id}
                  isExpired={'expired_at' in job}
                />
              </div>
            ))}
            
            {/* Show expired jobs from FOMO data if this is Nail Tech */}
            {category === 'Nail Tech' && expiredJobs.slice(0, Math.max(0, 10 - displayJobs.length)).map((job) => (
              <div key={job.id} className="flex-shrink-0 w-64">
                <MobileJobCard 
                  job={job}
                  onViewDetails={() => handleJobTap(job)}
                  onEditJob={() => onEditJob(job)}
                  onRenew={() => {}}
                  isRenewing={false}
                  isExpired={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Compact list for overflow jobs */}
        {compactJobs.length > 0 && (
          <div className="px-4 space-y-2">
            <div className="text-sm font-semibold text-gray-800 mb-2">
              {compactJobs.length} more jobs in {category}
            </div>
            {compactJobs.map((job) => (
              <MobileCompactJobCard
                key={job.id}
                job={job}
                onTap={() => handleJobTap(job)}
                isExpanded={expandedJob === job.id}
                isExpired={'expired_at' in job}
              />
            ))}
          </div>
        )}

        {/* See All CTA */}
        {allJobs.length > 5 && (
          <div className="px-4 mt-4">
            <button className="flex items-center justify-center w-full py-3 text-purple-600 font-medium border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
              See all {allJobs.length} jobs in {category}
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="block md:hidden"> {/* Only show on mobile */}
      {/* Industry tabs */}
      <MobileIndustryCarousel 
        industries={industries}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
        jobCounts={Object.fromEntries(
          industries.map(industry => [
            industry, 
            (jobsByIndustry.active[industry]?.length || 0) + 
            (jobsByIndustry.expired[industry]?.length || 0)
          ])
        )}
      />

      {/* Job sections */}
      <div className="space-y-6">
        {industries.map(industry => {
          const activeJobs = jobsByIndustry.active[industry] || [];
          const expiredJobs = jobsByIndustry.expired[industry] || [];
          
          if (activeJobs.length === 0 && expiredJobs.length === 0) {
            return null;
          }

          // Show all industries or just the active one
          if (activeIndustry !== 'All' && activeIndustry !== industry) {
            return null;
          }

          return renderJobSection(industry, activeJobs, expiredJobs);
        })}
      </div>

      {/* Expanded job detail modal-like overlay */}
      {expandedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Job Details</h2>
                <button 
                  onClick={() => setExpandedJob(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>
              
              {/* Find and render expanded job */}
              {(() => {
                const allJobs = [...jobs, ...expiredJobsData];
                const job = allJobs.find(j => j.id === expandedJob);
                
                if (!job) return <div>Job not found</div>;
                
                return (
                  <MobileJobCard 
                    job={job}
                    onViewDetails={() => {}}
                    onRenew={() => onRenew(job as Job)}
                    isRenewing={isRenewing && renewalJobId === job.id}
                    isExpired={'expired_at' in job}
                    expanded={true}
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileJobsLayout;