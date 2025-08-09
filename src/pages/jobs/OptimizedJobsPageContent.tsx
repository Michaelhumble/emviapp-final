/** PROTECTED: Do not modify without explicit approval. */
import React, { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Helmet } from 'react-helmet';
import { useTranslation } from '@/hooks/useTranslation';
import { JobCard } from '@/components/jobs/JobCard';
import OptimizedStickyMobileCTA from '@/components/mobile/OptimizedStickyMobileCTA';

// Lazy load non-critical components for better performance
const WhatYouMissedSection = lazy(() => import('@/components/jobs/WhatYouMissedSection'));
const FOMONailJobsSection = lazy(() => import('@/components/jobs/FOMONailJobsSection'));
const DiamondPlanBlock = lazy(() => import('@/components/pricing/DiamondPlanBlock'));
const FeaturedTrendingJobs = lazy(() => import('@/components/jobs/FeaturedTrendingJobs'));
const LiveLeaderboards = lazy(() => import('@/components/jobs/LiveLeaderboards'));
const SuccessStoriesCarousel = lazy(() => import('@/components/jobs/SuccessStoriesCarousel'));
const RealTimeActivity = lazy(() => import('@/components/jobs/RealTimeActivity'));
const TeaserLocked = lazy(() => import('@/components/jobs/TeaserLocked'));
const UrgencyBoosters = lazy(() => import('@/components/jobs/UrgencyBoosters'));
const InviteEarnBanner = lazy(() => import('@/components/jobs/InviteEarnBanner'));

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/telemetry';

const OptimizedJobsPageContent = () => {
  const { isSignedIn } = useAuth();
  const { jobs, loading, error, refresh } = useOptimizedJobsData({ isSignedIn, limit: 50 });
  const fomoEnabled = (() => { try { const flag = (window as any)?.__env?.FOMO_LISTING_MODE; if (flag === false || flag === 'false') return false; if (flag === true || flag === 'true') return true; } catch {} return undefined; })();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isVietnamese } = useTranslation();

  // Industry navigation state
  const industryParam = searchParams.get('industry');
  const listingParam = searchParams.get('listing');
  const [activeIndustryTab, setActiveIndustryTab] = useState(industryParam || 'all');

  // Industry tab configuration
  const industryTabs = useMemo(() => [
    { id: 'all', label: 'All Jobs', icon: Sparkles },
    { id: 'nails', label: 'Nail Tech', icon: Sparkles },
    { id: 'hair', label: 'Hair Stylist', icon: Scissors },
    { id: 'barber', label: 'Barber', icon: Scissors },
    { id: 'massage', label: 'Massage', icon: Hand },
    { id: 'skincare', label: 'Skincare', icon: Droplets },
    { id: 'makeup', label: 'Makeup', icon: Palette },
    { id: 'brows-lashes', label: 'Brows & Lashes', icon: Eye },
    { id: 'tattoo', label: 'Tattoo', icon: Brush }
  ], []);

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    if (activeIndustryTab === 'all') return jobs;
    return jobs.filter(job => 
      job.category?.toLowerCase() === activeIndustryTab ||
      job.industry?.toLowerCase() === activeIndustryTab
    );
  }, [jobs, activeIndustryTab]);

  // Handle industry tab pre-selection and deep linking
  useEffect(() => {
    if (industryParam) {
      setActiveIndustryTab(industryParam);
      
      // If there's a specific listing, scroll to it after a brief delay
      if (listingParam) {
        setTimeout(() => {
          const listingElement = document.querySelector(`[data-listing-id="${listingParam}"]`);
          if (listingElement) {
            listingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add temporary highlight
            listingElement.classList.add('ring-4', 'ring-purple-500', 'ring-opacity-50');
            setTimeout(() => {
              listingElement.classList.remove('ring-4', 'ring-purple-500', 'ring-opacity-50');
            }, 3000);
          }
        }, 500);
      }
    }
  }, [industryParam, listingParam]);

  // Handle highlighting newly posted jobs
  useEffect(() => {
    const highlightJobId = location.state?.highlightJobId;
    if (highlightJobId && jobs.length > 0) {
      // Show success toast
      toast({
        title: "Job Posted Successfully!",
        description: "Your job is now live and highlighted below.",
      });

      setTimeout(() => {
        const jobElement = document.querySelector(`[data-job-id="${highlightJobId}"]`);
        if (jobElement) {
          jobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add temporary highlight with green color for new posts
          jobElement.classList.add('ring-4', 'ring-green-500', 'ring-opacity-75', 'bg-green-50');
          setTimeout(() => {
            jobElement.classList.remove('ring-4', 'ring-green-500', 'ring-opacity-75', 'bg-green-50');
          }, 5000);
        }
      }, 1000);

      // Clear the navigation state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [jobs, location.state, toast, navigate, location.pathname]);

  // Check for payment success
  useEffect(() => {
    const payment = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');
    
    if (payment === 'success' && sessionId) {
      toast({
        title: "Payment Successful! 🎉",
        description: "Your job posting is now live and visible to candidates.",
        duration: 5000,
      });
      
      // Refresh jobs to show the new paid job
      setTimeout(() => {
        refresh();
      }, 2000);
      
      // Clear URL parameters
      window.history.replaceState({}, '', '/jobs');
    }
  }, [searchParams, toast, refresh]);

  const handleRenew = (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renew requested for job:', job.id);
    // Renewal logic would go here
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <JobLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600 font-inter">Error loading jobs: {error}</p>
          <Button onClick={refresh} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}
        </title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Duyệt cơ hội việc làm trong ngành làm đẹp. Tìm vị trí dành cho kỹ thuật viên nail, thợ làm tóc, chuyên viên thẩm mỹ, và nhiều hơn nữa."
            : "Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
          }
        />
      </Helmet>

      <div className="w-full">
        {/* OPTIMIZED HERO SECTION - Above the fold content */}
        <section className="relative w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden py-10 sm:py-14 md:py-16">
          {/* Optimized background - reduced complexity */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40"></div>
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl md:max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
              {/* Eyebrow count pill */}
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm mx-auto ${jobs.length > 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted/40 text-muted-foreground border-border'}`}>
                <Briefcase className="h-4 w-4" />
                <span>{jobs.length} job{jobs.length !== 1 ? 's' : ''} available</span>
              </div>

              {/* Headline */}
              <div className="whitespace-normal hyphens-none">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-snug sm:leading-snug lg:leading-tight text-white">
                  <span>Build Your American<wbr /> Dream</span>
                </h1>
                <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white/90">in Nails & Beauty</p>
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-center gap-3 mt-6 flex-col">
                <Button
                  onClick={() => navigate('/post-job')}
                  className="h-11 px-6 text-base rounded-xl shadow-sm"
                >
                  Post a Job
                </Button>
                <Button
                  onClick={() => {
                    const jobsSection = document.querySelector('#jobs-section');
                    if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="outline"
                  className="h-11 px-6 text-base rounded-xl"
                >
                  Browse Jobs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* JOBS SECTION */}
        <section id="jobs-section" className="w-full py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!isSignedIn && fomoEnabled !== false && (
              <div className="mb-6 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                These roles were just filled. Sign in free to see today’s open jobs.
              </div>
            )}
            
            {/* Industry Tabs */}
            <div className="mb-8">
              <Tabs value={activeIndustryTab} onValueChange={setActiveIndustryTab} className="w-full">
                <TabsList className="mt-6 flex justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal flex-nowrap sm:flex-wrap rounded-none bg-transparent p-0 h-auto shadow-none border-0">
                  {industryTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        data-active={activeIndustryTab === tab.id}
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-muted/50 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden md:inline">{tab.label}</span>
                        <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto text-center mt-6 sm:mt-5">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
                </p>

                {industryTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">

                    {/* Use optimized job display */}
                    {filteredJobs.length === 0 ? (
                      <JobEmptyState />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                          <JobCard 
                            key={job.id}
                            job={job} 
                            onRenew={handleRenew}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {isSignedIn && fomoEnabled !== false && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">Recently filled</h2>
            <WhatYouMissedSection title="Recently filled" maxJobs={12} />
          </div>
        )}

        {/* LAZY LOADED SECTIONS - Below the fold */}
        <Suspense fallback={<div className="py-8" />}>
          {/* Success Stories */}
          <SuccessStoriesCarousel />
          
          {/* Featured Jobs */}
          <FeaturedTrendingJobs jobs={jobs} />
          
          {/* Real-time Activity */}
          <RealTimeActivity />
          
          <FOMONailJobsSection />
          
          {/* Premium Plans */}
          <DiamondPlanBlock />
          
          {/* Other sections */}
          <TeaserLocked />
          <UrgencyBoosters jobs={jobs} />
          <LiveLeaderboards />
          <InviteEarnBanner />
        </Suspense>

        {/* Mobile CTA */}
        {isMobile && <OptimizedStickyMobileCTA />}
      </div>
    </>
  );
};

export default OptimizedJobsPageContent;
