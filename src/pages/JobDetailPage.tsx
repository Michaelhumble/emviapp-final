import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { Job } from '@/types/job';
import { ArrowLeft, MapPin, Briefcase, Clock, User, ExternalLink, PlusCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { supabaseBypass } from '@/types/supabase-bypass';
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';
import { normalizeJobPhotos } from '@/lib/images';
import JobPhotoGallery from '@/components/jobs/JobPhotoGallery';

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading } = useOptimizedJobsData();
  const [job, setJob] = useState<Job | null>(null);

  // Get state from navigation (if coming from global jobs page)
  const { fromGlobalJobs, suggestIndustry } = location.state || {};

  useEffect(() => {
    if (jobs.length > 0 && jobId) {
      const foundJob = jobs.find(j => j.id === jobId);
      setJob(foundJob || null);
    }
  }, [jobs, jobId]);

  // Fallback: if not found in hook, fetch directly by id so expired jobs still render
  useEffect(() => {
    const fetchById = async () => {
      if (!job && jobId && !loading) {
        const { data } = await (supabaseBypass as any)
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .maybeSingle();
        if (data) {
          const j: Job = {
            id: data.id,
            title: data.title,
            description: data.description,
            company: data.title,
            location: data.location,
            compensation_details: data.compensation_details,
            salary_range: data.compensation_details,
            specialties: [],
            category: data.category,
            status: data.status,
            pricing_tier: data.pricing_tier || 'free',
            created_at: data.created_at,
            updated_at: data.updated_at,
            user_id: data.user_id,
            expires_at: data.expires_at,
            contact_info: typeof data.contact_info === 'object' ? (data.contact_info as any) : {},
          };
          setJob(j);
        }
      }
    };
    fetchById();
  }, [job, jobId, loading]);

  const handleBack = () => {
    if (fromGlobalJobs) {
      navigate('/jobs');
    } else {
      navigate(-1);
    }
  };

  const handleViewMoreFromIndustry = () => {
    const industry = job?.category || suggestIndustry || 'nails';
    navigate(`/${industry}`);
  };

  const handleApply = () => {
    // This would typically open an application modal or navigate to application form
    if (job?.contact_info?.email) {
      window.location.href = `mailto:${job.contact_info.email}?subject=Application for ${job.title}`;
    } else {
      // Fallback to a contact form or application page
      navigate('/contact', { 
        state: { 
          jobId: job?.id, 
          jobTitle: job?.title 
        } 
      });
    }
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

  const isNewJob = (createdAt: string) => {
    const jobDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return jobDate > sevenDaysAgo;
  };

  if (loading) {
    return <JobLoadingState />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">This job listing may have expired or been removed.</p>
            <div className="space-x-4">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => navigate('/jobs')}>
                View All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Derive active/expired state per spec
  const now = new Date();
  const createdAt = job.created_at ? new Date(job.created_at) : new Date(0);
  const expiresAt = job.expires_at ? new Date(job.expires_at as any) : null;
  const activeWindow = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  const isActive = job.status === 'active' && ((expiresAt && expiresAt > now) || (!expiresAt && activeWindow > now));
  const isExpired = !isActive;

  const photos = useMemo(() => normalizeJobPhotos(job), [job]);

  // JSON-LD for JobPosting
  const jsonLd = (() => {
    const base: any = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description || '',
      datePosted: job.created_at,
      jobLocation: job.location ? { '@type': 'Place', address: job.location } : undefined,
    } as any;
    if (isExpired) {
      const validThrough = job.expires_at || new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
      base.validThrough = validThrough;
    } else {
      base.hiringOrganization = job.company ? { '@type': 'Organization', name: job.company } : undefined;
    }
    return JSON.stringify(base);
  })();

  return (
    <>
      <Helmet>
        <title>{job.title} - Beauty Industry Job | EmviApp</title>
        <meta 
          name="description" 
          content={`${job.title} position ${job.location ? `in ${job.location}` : ''}. ${job.description?.substring(0, 150) || 'Apply now for this beauty industry opportunity.'}`} 
        />
        <link rel="canonical" href={`${window.location.origin}/jobs/${job.id}`} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <Button 
              onClick={handleBack}
              variant="ghost"
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {fromGlobalJobs ? 'Back to All Jobs' : 'Back'}
            </Button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Job Header Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant="secondary" 
                    className={getIndustryBadgeColor(job.category || 'other')}
                  >
                    {job.category || 'Other'}
                  </Badge>
                  {isExpired && (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                  {isNewJob(job.created_at || '') && (
                    <Badge className="bg-green-100 text-green-800">
                      New
                    </Badge>
                  )}
                  {job.pricing_tier === 'featured' && (
                    <Badge className="bg-orange-100 text-orange-800">
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  {job.location && (
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {job.location}
                    </div>
                  )}
                  {job.compensation_details && (
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      {job.compensation_details}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Posted {formatDistanceToNow(new Date(job.created_at || ''), { addSuffix: true })}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="lg:w-64">
                <Button 
                  onClick={handleApply}
                  size="lg"
                  className={`w-full ${isExpired ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                  disabled={isExpired}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expired banner */}
        {isExpired && (
          <div className="container mx-auto px-4 mt-6">
            <div className="rounded-lg border bg-muted/30 p-4">
              <h2 className="text-lg font-semibold">This job is no longer accepting applications.</h2>
              <p className="text-sm text-muted-foreground mt-1">Recently filled. Sign in to see open roles or post a job to hire faster.</p>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => navigate('/auth/signin?redirect=/jobs')}>Sign in to see open roles</Button>
                <Button variant="outline" onClick={() => navigate('/post-job')}>Post a job</Button>
              </div>
            </div>
          </div>
        )}

        {/* Job Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Photo Gallery */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <JobPhotoGallery urls={photos} />
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                <div className="prose prose-gray max-w-none">
                  {job.description ? (
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {job.description}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No description provided.</p>
                  )}
                </div>
              </div>

              {job.requirements && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {job.requirements}
                    </div>
                  </div>
                </div>
              )}

              {/* Recently filled mini-row */}
              {isExpired && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Recently filled</h3>
                  <WhatYouMissedSection title="" maxJobs={4} />
                </div>
              )}

              {/* More from this industry CTA */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interested in More {job.category} Jobs?
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore other opportunities in the {job.category} industry and find your perfect match.
                </p>
                <Button 
                  onClick={handleViewMoreFromIndustry}
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View More {job.category} Jobs
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
                <Button 
                  onClick={handleApply}
                  className={`w-full mb-4 ${isExpired ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                  disabled={isExpired}
                >
                  Apply for This Position
                </Button>
                <p className="text-sm text-gray-500">
                  Your application will be sent directly to the employer.
                </p>
              </div>

              {/* Contact Info */}
              {job.contact_info && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {job.contact_info.owner_name && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-gray-700">{job.contact_info.owner_name}</span>
                      </div>
                    )}
                    {job.contact_info.phone && (
                      <div className="flex items-center">
                        <span className="text-gray-700">{job.contact_info.phone}</span>
                      </div>
                    )}
                    {job.contact_info.email && (
                      <div className="flex items-center">
                        <span className="text-gray-700">{job.contact_info.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Post Your Own Job */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Looking to Hire?
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Post your job and get maximum visibility across all industry pages.
                </p>
                <Button 
                  onClick={() => navigate('/post-job')}
                  size="sm"
                  className="w-full"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;