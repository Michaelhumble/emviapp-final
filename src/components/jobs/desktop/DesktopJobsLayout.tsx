import React, { useState, useMemo } from 'react';
import { Job } from '@/types/job';
import { sortJobsByTierAndDate } from '@/utils/jobSorting';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter,
  MapPin,
  DollarSign,
  Sparkles,
  Scissors,
  Zap,
  Heart,
  Eye,
  Palette,
  User,
  PenLine,
  Plus
} from 'lucide-react';
import BilingualJobCard from '@/components/jobs/BilingualJobCard';
import QuickJobDetailsPanel from './QuickJobDetailsPanel';
import { useNavigate } from 'react-router-dom';

interface DesktopJobsLayoutProps {
  jobs: Job[];
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
}

const DesktopJobsLayout: React.FC<DesktopJobsLayoutProps> = ({
  jobs,
  onRenew,
  isRenewing,
  renewalJobId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSalary, setSelectedSalary] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Category mappings with premium icons
  const categoryIcons: Record<string, React.ReactNode> = {
    'Nail Tech': <Sparkles className="h-5 w-5 text-pink-600" />,
    'Hair Stylist': <Scissors className="h-5 w-5 text-purple-600" />,
    'Barber': <User className="h-5 w-5 text-blue-600" />,
    'Massage Therapist': <Heart className="h-5 w-5 text-green-600" />,
    'Esthetician': <Eye className="h-5 w-5 text-indigo-600" />,
    'Makeup Artist': <Palette className="h-5 w-5 text-orange-600" />,
    'Lash Tech': <Eye className="h-5 w-5 text-teal-600" />,
    'Tattoo Artist': <PenLine className="h-5 w-5 text-red-600" />,
    'Other': <Zap className="h-5 w-5 text-gray-600" />
  };

  // Get unique categories, locations, and salary ranges
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(jobs.map(job => job.category).filter(Boolean)))];
    return cats;
  }, [jobs]);

  const locations = useMemo(() => {
    const locs = ['all', ...Array.from(new Set(jobs.map(job => job.location).filter(Boolean)))];
    return locs;
  }, [jobs]);

  const salaryRanges = [
    'all',
    'Under $15/hr',
    '$15-25/hr', 
    '$25-35/hr',
    '$35-50/hr',
    '$50+/hr',
    'Commission',
    'Booth Rental'
  ];

  // Filter jobs based on search and filters, then apply mandatory tier sorting
  const filteredJobs = useMemo(() => {
    console.log('🎯 [DESKTOP-LAYOUT] Applying filters and tier sorting');
    
    const filtered = jobs.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      
      // Simple salary matching (would need more sophisticated logic in real app)
      const matchesSalary = selectedSalary === 'all' || 
        job.compensation_details?.toLowerCase().includes(selectedSalary.toLowerCase().replace(/[^a-z0-9]/g, ''));

      return matchesSearch && matchesCategory && matchesLocation && matchesSalary;
    });
    
    // CRITICAL: Apply tier sorting after filtering
    // Diamond > Premium > Gold > Free, newest first within each tier
    const sorted = sortJobsByTierAndDate(filtered);
    console.log(`🎯 [DESKTOP-LAYOUT] Filtered and sorted: ${jobs.length} → ${filtered.length} → ${sorted.length} jobs`);
    
    return sorted;
  }, [jobs, searchQuery, selectedCategory, selectedLocation, selectedSalary]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className={`${showFilters ? 'w-80' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Filter Toggle */}
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-start"
          >
            <Filter className="h-5 w-5" />
            {showFilters && <span className="ml-2">Filters</span>}
          </Button>
        </div>

        {showFilters && (
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Search Jobs</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Job title, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Category</label>
              <div className="space-y-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="w-full justify-start text-left"
                  >
                    {category !== 'all' && categoryIcons[category]}
                    <span className={category !== 'all' ? 'ml-2' : ''}>
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Location</label>
              <div className="space-y-2">
                {locations.slice(0, 8).map(location => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                    className="w-full justify-start text-left text-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="ml-2 truncate">
                      {location === 'all' ? 'All Locations' : location}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Salary Range</label>
              <div className="space-y-2">
                {salaryRanges.map(range => (
                  <Button
                    key={range}
                    variant={selectedSalary === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedSalary(range)}
                    className="w-full justify-start text-left text-sm"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span className="ml-2">
                      {range === 'all' ? 'All Salaries' : range}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Beauty Jobs</h1>
              <Badge variant="outline" className="text-sm">
                {filteredJobs.length} jobs found
              </Badge>
            </div>
            
            {/* Quick Search */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Quick search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              {/* Post Job Button - Always Visible */}
              <Button 
                onClick={() => navigate('/post-job')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post a Job
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 mt-4 overflow-x-auto">
            {categories.slice(0, 8).map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                {category !== 'all' && categoryIcons[category]}
                <span>{category === 'all' ? 'All' : category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="flex-1 flex">
          <div className={`${selectedJob ? 'w-2/3' : 'w-full'} transition-all duration-300 overflow-y-auto p-6`}>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setSelectedSalary('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobClick(job)}
                    className="cursor-pointer"
                  >
                    <BilingualJobCard
                      job={job}
                      onViewDetails={() => handleJobClick(job)}
                      onRenew={() => onRenew(job)}
                      isRenewing={isRenewing && renewalJobId === job.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Details Panel */}
          {selectedJob && (
            <QuickJobDetailsPanel
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </div>
      </div>

      {/* Floating Post Job Button (backup for smaller screens) */}
      <Button
        onClick={() => navigate('/post-job')}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white shadow-lg z-50 lg:hidden"
        size="lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default DesktopJobsLayout;