import React, { useState, useMemo } from 'react';
import { Job } from '@/types/job';
import { expiredJobsData } from '@/data/expiredJobsData';
import MobileJobCard from './mobile/MobileJobCard';
import MobileCompactJobCard from './mobile/MobileCompactJobCard';
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
  Brush,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface UnifiedResponsiveJobsLayoutProps {
  jobs: Job[];
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onViewDetails: (job: Job) => void;
  onEditJob: (job: Job) => void;
}

const UnifiedResponsiveJobsLayout: React.FC<UnifiedResponsiveJobsLayoutProps> = ({
  jobs,
  onRenew,
  isRenewing,
  renewalJobId,
  onViewDetails,
  onEditJob
}) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Group jobs by industry/category
  const jobsByIndustry = useMemo(() => {
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

  // Industry order - Nails first (same across all devices)
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
    onViewDetails(job);
  };

  // Get industry icon helper - Premium icons only
  const getIndustryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('nail')) return <Sparkles className="h-6 w-6 text-purple-600" />;
    if (lower.includes('hair')) return <Scissors className="h-6 w-6 text-indigo-600" />;
    if (lower.includes('barber')) return <Zap className="h-6 w-6 text-blue-600" />;
    if (lower.includes('massage')) return <Heart className="h-6 w-6 text-pink-600" />;
    if (lower.includes('makeup')) return <Palette className="h-6 w-6 text-rose-600" />;
    if (lower.includes('lash') || lower.includes('brow')) return <Eye className="h-6 w-6 text-emerald-600" />;
    if (lower.includes('tattoo')) return <Pen className="h-6 w-6 text-amber-600" />;
    if (lower.includes('esthetic')) return <Star className="h-6 w-6 text-teal-600" />;
    return <Brush className="h-6 w-6 text-gray-800" />;
  };

  // Filter jobs based on search
  const filteredIndustries = useMemo(() => {
    if (!searchQuery) return industries;
    
    return industries.filter(industry => {
      const activeJobs = jobsByIndustry.active[industry] || [];
      const expiredJobs = jobsByIndustry.expired[industry] || [];
      const allJobs = [...activeJobs, ...expiredJobs];
      
      return allJobs.some(job => 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [industries, jobsByIndustry, searchQuery]);

  // Get responsive grid classes
  const getGridCols = () => {
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6";
  };

  const renderJobSection = (category: string, activeJobs: Job[], expiredJobs: any[]) => {
    const allJobs = [...activeJobs, ...expiredJobs];
    
    // Filter jobs based on search query
    const filteredJobs = searchQuery 
      ? allJobs.filter(job =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allJobs;

    if (filteredJobs.length === 0) return null;

    const displayJobs = filteredJobs.slice(0, 12); // First 12 as full cards
    const compactJobs = filteredJobs.slice(12); // Rest as compact

    return (
      <div key={category} className="mb-12">
        <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
          <div className="flex items-center gap-4">
            {getIndustryIcon(category)}
            <h3 className="text-2xl lg:text-3xl font-playfair font-black text-foreground tracking-tight">{category}</h3>
          </div>
          <span className="text-sm font-inter font-bold text-foreground bg-gray-100 px-4 py-2 rounded-full border">
            {filteredJobs.length} jobs
          </span>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Responsive grid */}
        <div className="block lg:hidden overflow-x-auto pb-4 scrollbar-hide">
          {/* Mobile carousel */}
          <div className="flex space-x-4 px-4" style={{ minWidth: `${displayJobs.length * 280}px` }}>
            {displayJobs.map((job) => (
              <div key={job.id} className="flex-shrink-0 w-64 sm:w-72">
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
          </div>
        </div>

        {/* Desktop: Responsive grid (lg and above) */}
        <div className="hidden lg:block px-4 lg:px-0">
          <div className={getGridCols()}>
            {displayJobs.map((job) => (
              <div key={job.id} className="w-full">
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
          </div>
        </div>

        {/* Compact list for overflow jobs - ALL devices */}
        {compactJobs.length > 0 && (
          <div className="px-4 lg:px-0 space-y-3 mt-8">
            <div className="text-base font-inter font-bold text-foreground mb-4">
              {compactJobs.length} more jobs in {category}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
          </div>
        )}

        {/* See All CTA */}
        {filteredJobs.length > 8 && (
          <div className="px-4 lg:px-0 mt-6">
            <button 
              onClick={() => navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`)}
              className="flex items-center justify-center w-full py-4 text-purple-600 font-inter font-bold border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors text-base"
            >
              See all {filteredJobs.length} jobs in {category}
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        )}
        
        {/* FOMO Alert after first 2 sections */}
        {(category === 'Hair Stylist' || (industries.indexOf(category) === 1)) && (
          <div className="max-w-4xl mx-auto px-4 lg:px-0 mt-16 mb-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 shadow-sm">
              <p className="text-red-800 text-base font-inter font-bold text-center">
                🔥 <span className="font-black">FOMO Alert:</span> These great jobs filled up fast! 
                Don't miss the next batch—check back daily for fresh opportunities.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Sticky Header with Search and Post Job - ALL devices */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl lg:text-3xl font-playfair font-black text-foreground">Beauty Jobs</h1>
            
            {/* Desktop: Horizontal layout */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 border-2 font-inter font-medium"
                />
              </div>
              
              <Button 
                onClick={() => navigate('/post-job')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold px-6 py-3 text-base"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post a Job
              </Button>
            </div>

            {/* Mobile: Stack vertically */}
            <div className="lg:hidden">
              <Button 
                onClick={() => navigate('/post-job')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold"
              >
                <Plus className="h-4 w-4 mr-1" />
                Post Job
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full border-2 font-inter font-medium"
              />
            </div>
          </div>

          {/* Industry Category Tabs - Sticky, Bold - ALL devices */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2" style={{ minWidth: 'max-content' }}>
              <button
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-inter font-bold text-sm whitespace-nowrap transition-colors border-2 ${
                  activeIndustry === 'All'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-foreground border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setActiveIndustry('All')}
              >
                <span>All Industries</span>
              </button>
              
              {industries.map(industry => {
                const jobCount = (jobsByIndustry.active[industry]?.length || 0) + 
                               (jobsByIndustry.expired[industry]?.length || 0);
                
                if (jobCount === 0) return null;
                
                return (
                  <button
                    key={industry}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-inter font-bold text-sm whitespace-nowrap transition-colors border-2 ${
                      activeIndustry === industry
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-foreground border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setActiveIndustry(industry)}
                  >
                    {getIndustryIcon(industry)}
                    <span>{industry}</span>
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{jobCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Job sections - Unified design ALL devices */}
      <div className="max-w-7xl mx-auto py-8 space-y-12">
        {filteredIndustries.map(industry => {
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

        {/* No results message */}
        {filteredIndustries.length === 0 && searchQuery && (
          <div className="text-center py-12 px-4">
            <p className="text-muted-foreground font-inter text-lg font-medium mb-4">
              No jobs found for "{searchQuery}"
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="font-inter font-bold"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Floating Post Job Button - Mobile */}
      <Button
        onClick={() => navigate('/post-job')}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white shadow-xl z-50 lg:hidden"
        size="lg"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default UnifiedResponsiveJobsLayout;