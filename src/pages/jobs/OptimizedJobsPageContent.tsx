/** PROTECTED: Do not modify without explicit approval. */
import React, { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useOptimizedJobsData } from '@/hooks/useOptimizedJobsData';

import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Helmet } from 'react-helmet';

import { JobCard } from '@/components/jobs/JobCard';
import OptimizedStickyMobileCTA from '@/components/mobile/OptimizedStickyMobileCTA';
import { useOptimizedArtistsData } from '@/hooks/useOptimizedArtistsData';

// Lazy load non-critical components for better performance
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';
import SalonsForSale from '@/components/home/SalonsForSale';
import ArtistsForHireStrip from '@/components/home/ArtistsForHireStrip';
import FeaturedPaidJobsSection from '@/components/jobs/FeaturedPaidJobsSection';
const FOMONailJobsSection = lazy(() => import('@/components/jobs/FOMONailJobsSection'));
const LiveLeaderboards = lazy(() => import('@/components/jobs/LiveLeaderboards'));
const SuccessStoriesCarousel = lazy(() => import('@/components/jobs/SuccessStoriesCarousel'));
const RealTimeActivity = lazy(() => import('@/components/jobs/RealTimeActivity'));
const TeaserLocked = lazy(() => import('@/components/jobs/TeaserLocked'));
const UrgencyBoosters = lazy(() => import('@/components/jobs/UrgencyBoosters'));
const InviteEarnBanner = lazy(() => import('@/components/jobs/InviteEarnBanner'));

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobsHero from '@/components/jobs/JobsHero';

import { sortJobsByTierAndDate } from '@/utils/jobSorting';

const OptimizedJobsPageContent = () => {
  const { isSignedIn } = useAuth();
  const { jobs, loading, error, refresh } = useOptimizedJobsData({ isSignedIn, limit: 50 });
  const { artists } = useOptimizedArtistsData({ isSignedIn, limit: 6 });
  const fomoEnabled = (() => { try { const flag = (window as any)?.__env?.FOMO_LISTING_MODE; if (flag === false || flag === 'false') return false; if (flag === true || flag === 'true') return true; } catch {} return undefined; })();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

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


  // Featured Paid Jobs: filter tiers diamond/premium/gold, order by tier priority then updated_at desc
  const paidTierPriority: Record<string, number> = useMemo(() => ({ diamond: 3, premium: 2, gold: 1 }), []);
  const normalizeTier = (t?: string | null) => (t || '').toLowerCase();
  const paidJobsSorted = useMemo(() => {
    return [...(jobs || [])]
      .filter(j => paidTierPriority[normalizeTier((j as any).pricing_tier)] && (((j as any).is_active ?? true)))
      .sort((a: any, b: any) => {
        const pa = paidTierPriority[normalizeTier(a.pricing_tier)] || 0;
        const pb = paidTierPriority[normalizeTier(b.pricing_tier)] || 0;
        if (pb !== pa) return pb - pa;
        const ad = new Date(a.updated_at || a.created_at || 0).getTime();
        const bd = new Date(b.updated_at || b.created_at || 0).getTime();
        return bd - ad;
      });
  }, [jobs, paidTierPriority]);
  const paidLimit = isMobile ? 6 : 12;
  const paidJobsToShow = useMemo(() => paidJobsSorted.slice(0, paidLimit), [paidJobsSorted, paidLimit]);
  const remainingCap = Math.max(50 - paidJobsToShow.length, 0);

  // Free jobs for the main feed (exclude all paid tiers)
  const freeJobs = useMemo(() => {
    return [...(jobs || [])].filter(j => !paidTierPriority[normalizeTier((j as any).pricing_tier)]);
  }, [jobs, paidTierPriority]);

  // Industry-filtered free jobs
  const filteredFreeJobs = useMemo(() => {
    if (activeIndustryTab === 'all') return freeJobs;
    return freeJobs.filter((job: any) =>
      job.category?.toLowerCase() === activeIndustryTab ||
      job.industry?.toLowerCase() === activeIndustryTab
    );
  }, [freeJobs, activeIndustryTab]);

  // Sort free jobs by existing sorter (date within free), then respect remaining cap
  const sortedFilteredFreeJobsLimited = useMemo(() => {
    return sortJobsByTierAndDate([...(filteredFreeJobs || [])]).slice(0, remainingCap);
  }, [filteredFreeJobs, remainingCap]);

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


  return (
    <>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Browse verified salon & studio roles across the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
        />
        <link rel="canonical" href={`${window.location.origin}/jobs`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Jobs Page Sections',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Featured Jobs', url: `${window.location.origin}/jobs#featured`, numberOfItems: jobs.filter(j => ['diamond','premium','gold'].includes((j.pricing_tier||'').toLowerCase())).length },
            { '@type': 'ListItem', position: 2, name: 'Artists for Hire', url: `${window.location.origin}/jobs#artists-for-hire`, numberOfItems: artists?.length || 0 },
            { '@type': 'ListItem', position: 3, name: 'Recently Filled', url: `${window.location.origin}/jobs#recently-filled` },
            { '@type': 'ListItem', position: 4, name: 'Salons for Sale', url: `${window.location.origin}/jobs#salons-for-sale` }
          ]
        })}</script>
      </Helmet>

      <div className="w-full">
        {/* JOBS HERO (Above the fold) */}
        <JobsHero jobsCount={jobs?.length ?? 0} />

        {/* Inline error (non-blocking) */}
        {error && (
          <div className="container mx-auto px-4 py-6">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-destructive">Error loading jobs: {error}</p>
              <div className="mt-3">
                <Button onClick={refresh} variant="outline">Try Again</Button>
              </div>
            </div>
          </div>
        )}

        {/* Optional loading state placeholder (below hero only) */}
        {loading && (
          <div className="container mx-auto px-4 py-8">
            <JobLoadingState />
          </div>
        )}

        {/* Featured Paid Jobs (Paid tiers) */}
        <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {paidJobsToShow.length > 0 ? (
            <FeaturedPaidJobsSection jobs={paidJobsToShow} />
          ) : (
            <Suspense fallback={<div className="py-8" />}>
              <FOMONailJobsSection />
            </Suspense>
          )}
        </div>


        {/* Artists Available for Hire */}
        <div id="artists-for-hire">
          <ArtistsForHireStrip />
        </div>

        {/* JOBS SECTION - All Jobs / Free */}
        <div id="browse" />
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
                  {filteredFreeJobs.length} job{filteredFreeJobs.length !== 1 ? 's' : ''} available
                </p>

                {industryTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">

                    {/* Free jobs feed (cap adjusted after paid) */}
                    {filteredFreeJobs.length === 0 ? (
                      <JobEmptyState />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedFilteredFreeJobsLimited.map((job) => (
                          <JobCard 
                            key={job.id}
                            job={job as Job} 
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

        <div id="recently-filled" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Recently filled</h2>
          <WhatYouMissedSection title="Recently filled" maxJobs={12} />
        </div>
        <div id="salons-for-sale">
          <SalonsForSale />
        </div>

        {/* LAZY LOADED SECTIONS - Below the fold */}
        <Suspense fallback={<div className="py-8" />}>
          {/* Success Stories */}
          <SuccessStoriesCarousel />
          
          {/* Featured Jobs moved above */}
          {/* Real-time Activity */}
          <RealTimeActivity />
          
          
          
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
