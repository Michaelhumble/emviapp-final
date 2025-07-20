import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useJobsData } from '@/hooks/useJobsData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { Job } from '@/types/job';
import { Briefcase, MapPin, Clock, Sparkles, TrendingUp, PlusCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

const GlobalJobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get('industry') || 'all');

  // Filter jobs based on selected industry
  const filteredJobs = selectedIndustry === 'all' 
    ? jobs 
    : jobs.filter(job => job.category?.toLowerCase() === selectedIndustry);

  // Mark jobs as new if posted within 7 days
  const isNewJob = (createdAt: string) => {
    const jobDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return jobDate > sevenDaysAgo;
  };

  // Handle industry filter change
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    if (industry === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ industry });
    }
  };

  // Handle job card click
  const handleJobClick = (job: Job) => {
    // Navigate to job detail and suggest more from that industry
    navigate(`/job/${job.id}`, { 
      state: { 
        fromGlobalJobs: true, 
        suggestIndustry: job.category 
      } 
    });
  };

  // Handle view more jobs from industry
  const handleViewMoreFromIndustry = (industry: string) => {
    const industryRoute = `/${industry}`;
    navigate(industryRoute);
  };

  const getIndustryBadgeColor = (category: string) => {
    const colors = {
      nails: 'bg-pink-100 text-pink-800',
      hair: 'bg-purple-100 text-purple-800',
      barber: 'bg-blue-100 text-blue-800',
      massage: 'bg-green-100 text-green-800',
      skincare: 'bg-teal-100 text-teal-800',
      makeup: 'bg-rose-100 text-rose-800',
      'brows-lashes': 'bg-amber-100 text-amber-800',
      tattoo: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <JobLoadingState />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading jobs: {error}</p>
          <Button onClick={refreshJobs} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Beauty Industry Jobs - All Opportunities | EmviApp</title>
        <meta 
          name="description" 
          content="Discover beauty industry jobs across all specialties. Find nail tech, hair stylist, barber, massage, skincare, makeup, and tattoo opportunities." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                All Beauty Industry Jobs
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Discover opportunities across every beauty specialty. From nail technology to hair styling, find your perfect match.
              </p>
              
              {/* Add Job CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/post-job')}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Post a Job
                </Button>
                <Button 
                  onClick={() => navigate('/booking-services')}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Book Services
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Available
                </h2>
                {selectedIndustry !== 'all' && (
                  <Badge variant="secondary" className="text-sm">
                    {industryOptions.find(opt => opt.value === selectedIndustry)?.label}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by industry" />
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

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <JobEmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className={getIndustryBadgeColor(job.category || 'other')}
                        >
                          {job.category || 'Other'}
                        </Badge>
                        
                        {/* New/Featured Badges */}
                        {isNewJob(job.created_at || '') && (
                          <Badge className="bg-green-100 text-green-800">
                            <Sparkles className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        )}
                        
                        {job.pricing_tier === 'featured' && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3">
                    {job.location && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                    )}
                    
                    {job.compensation_details && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.compensation_details}
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Posted {formatDistanceToNow(new Date(job.created_at || ''), { addSuffix: true })}
                    </div>
                  </div>

                  {/* Description Preview */}
                  {job.description && (
                    <p className="text-gray-600 text-sm mt-4 line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  {/* View More from Industry CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMoreFromIndustry(job.category || 'nails');
                      }}
                      className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      View More {job.category} Jobs
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Post Your Job?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get maximum visibility across all industry pages. Your job will appear here and on specialized industry pages for targeted reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/post-job')}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Post a Job Now
              </Button>
              <Button 
                onClick={() => navigate('/pricing')}
                size="lg"
                variant="outline"
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalJobsPage;