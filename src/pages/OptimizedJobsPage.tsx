import React, { Suspense, lazy, memo, useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, PlusCircle, MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

// Lazy load heavy components for better performance
const VirtualizedJobList = lazy(() => import('@/components/jobs/VirtualizedJobList'));
const JobDetailModal = lazy(() => import('@/components/jobs/JobDetailModal').then(module => ({ default: module.JobDetailModal })));

// Memoized components to prevent unnecessary re-renders
const FilterSection = memo(({ 
  selectedIndustry, 
  onIndustryChange, 
  searchTerm, 
  onSearchChange,
  location,
  onLocationChange,
  resultCount 
}: {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  resultCount: number;
}) => {
  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'nails', label: 'Nail Technology' },
    { value: 'hair', label: 'Hair Styling' },
    { value: 'barber', label: 'Barbering' },
    { value: 'massage', label: 'Massage Therapy' },
    { value: 'skincare', label: 'Skincare & Facials' },
    { value: 'makeup', label: 'Makeup Artistry' },
    { value: 'brows-lashes', label: 'Brows & Lashes' },
    { value: 'tattoo', label: 'Tattoo & Body Art' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Results Count */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {resultCount.toLocaleString()} Job{resultCount !== 1 ? 's' : ''} Available
            </h2>
            {selectedIndustry !== 'all' && (
              <Badge variant="secondary" className="text-sm">
                {industryOptions.find(opt => opt.value === selectedIndustry)?.label}
              </Badge>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Location Filter */}
            <div className="relative w-full sm:w-48">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Industry Filter */}
            <Select value={selectedIndustry} onValueChange={onIndustryChange}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

const LoadingSkeleton = memo(() => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const EmptyState = memo(() => (
  <div className="container mx-auto px-4 py-16 text-center">
    <div className="max-w-md mx-auto">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
      <p className="text-gray-600 mb-6">
        Try adjusting your filters or search terms to find more opportunities.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Clear Filters
      </Button>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

const OptimizedJobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get('industry') || 'all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [listHeight, setListHeight] = useState(600);

  // Debounce search terms to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedLocation = useDebounce(location, 300);

  // Use optimized data hook
  const {
    jobs,
    loading,
    initialLoading,
    error,
    hasMore,
    loadMore,
    refresh
  } = useOptimizedJobsData({
    category: selectedIndustry === 'all' ? undefined : selectedIndustry,
    location: debouncedLocation || undefined,
    searchTerm: debouncedSearchTerm || undefined,
    enableCache: true
  });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedIndustry !== 'all') params.set('industry', selectedIndustry);
    if (searchTerm) params.set('search', searchTerm);
    if (location) params.set('location', location);
    setSearchParams(params);
  }, [selectedIndustry, searchTerm, location, setSearchParams]);

  // Calculate optimal list height based on viewport
  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = 200; // Approximate header height
      const newHeight = Math.max(400, windowHeight - headerHeight);
      setListHeight(newHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Event handlers
  const handleIndustryChange = useCallback((industry: string) => {
    setSelectedIndustry(industry);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleLocationChange = useCallback((loc: string) => {
    setLocation(loc);
  }, []);

  const handleJobClick = useCallback((job: Job) => {
    setSelectedJob(job);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedJob(null);
  }, []);

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-600 mb-4">Error loading jobs: {error}</div>
        <Button onClick={refresh}>Try Again</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Beauty Industry Jobs - High Performance | EmviApp</title>
        <meta 
          name="description" 
          content="Fast-loading beauty industry job listings. Find nail tech, hair stylist, and beauty professional positions with optimized performance." 
        />
        <link rel="preload" as="script" href="/src/components/jobs/VirtualizedJobList.tsx" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Header - Optimized */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Beauty Industry Jobs
              </h1>
              <p className="text-lg text-purple-100 mb-6">
                Find your perfect beauty career opportunity with lightning-fast search
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <FilterSection
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          location={location}
          onLocationChange={handleLocationChange}
          resultCount={jobs.length}
        />

        {/* Jobs List */}
        <div className="container mx-auto px-4 py-6">
          {initialLoading ? (
            <LoadingSkeleton />
          ) : jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200">
              <Suspense fallback={<LoadingSkeleton />}>
                <VirtualizedJobList
                  jobs={jobs}
                  loading={loading}
                  hasNextPage={hasMore}
                  loadNextPage={loadMore}
                  onJobClick={handleJobClick}
                  height={listHeight}
                  width="100%"
                />
              </Suspense>
            </div>
          )}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <Suspense fallback={null}>
            <JobDetailModal
              job={selectedJob}
              isOpen={!!selectedJob}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default memo(OptimizedJobsPage);