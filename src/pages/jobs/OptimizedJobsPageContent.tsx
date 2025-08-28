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
import JobsPageSEO from '@/components/seo/JobsPageSEO';
import RichResultsTestLink from '@/components/seo/RichResultsTestLink';
import SEODevLogger from '@/components/seo/SEODevLogger';

import { JobCard } from '@/components/jobs/JobCard';
import { useOptimizedArtistsData } from '@/hooks/useOptimizedArtistsData';

// Lazy load non-critical components for better performance
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';
import SalonsForSale from '@/components/home/SalonsForSale';
import ArtistsForHireStrip from '@/components/home/ArtistsForHireStrip';
import FeaturedPaidJobsSection from '@/components/jobs/FeaturedPaidJobsSection';

const LiveLeaderboards = lazy(() => import('@/components/jobs/LiveLeaderboards'));

const RealTimeActivity = lazy(() => import('@/components/jobs/RealTimeActivity'));

const UrgencyBoosters = lazy(() => import('@/components/jobs/UrgencyBoosters'));
const InviteEarnBanner = lazy(() => import('@/components/jobs/InviteEarnBanner'));

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush, Quote, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthAction from '@/components/common/AuthAction';
import JobsHero from '@/components/jobs/JobsHero';
import { CITIES, ROLES } from '@/seo/locations/seed';

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

  // Metrics & live feed data (scoped to Jobs page only)
  const activeJobsCount = jobs?.length ?? 0;
  const featuredJobsCount = paidJobsSorted.length;
  const availableArtistsCount = artists?.length ?? 0;

  const recentJobs = useMemo(() => {
    const arr = Array.isArray(jobs) ? [...jobs] : [];
    return arr
      .sort((a: any, b: any) => {
        const bd = new Date(b.updated_at || b.created_at || 0).getTime();
        const ad = new Date(a.updated_at || a.created_at || 0).getTime();
        return bd - ad;
      })
      .slice(0, 8);
  }, [jobs]);
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
      <JobsPageSEO jobs={jobs} />

      <main className="w-full">
        {/* JOBS HERO (Above the fold) */}
        <JobsHero jobsCount={jobs?.length ?? 0} />

        {/* SEO Intro Content */}
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose max-w-none">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Premium Beauty Jobs - High Tips & Khách Sang Clientele</h1>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Discover Your Next Beauty Career Opportunity</h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to EmviApp's premium job marketplace, where beauty professionals discover exceptional opportunities with tip cao earning potential. Our curated platform connects skilled nail technicians, hair stylists, barbers, and massage therapists with upscale salons seeking khách sang service providers.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Every opportunity on our platform is verified, ensuring you connect with legitimate salon owners who value professional excellence. From luxury nail studios in major cities to high-end hair salons with established clientele, we bridge the gap between talented artists and premium establishments that appreciate quality craftsmanship.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Why Top Professionals Choose EmviApp</h2>
                  <p className="text-gray-700 mb-4">
                    Our AI-powered matching system understands both your skills and career aspirations, connecting you with roles that offer genuine growth potential. Whether you're seeking flexible booth rental opportunities, commission-based positions with high earning potential, or full-time roles with comprehensive benefits, EmviApp delivers opportunities that align with your professional goals.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Join thousands of professionals who've found their perfect match through our platform. Browse <a href="/salons" className="text-primary underline">premium salons for sale</a> if you're ready to become an owner, or explore our <a href="/artists" className="text-primary underline">network of top beauty artists</a> to see the caliber of professionals in our community.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Guides & Resources Section */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Guides & Resources</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href="/blog/how-to-find-the-best-beauty-professionals" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-primary">Complete Beauty Professional Guide</h3>
                <p className="text-gray-700 text-sm">Comprehensive guide to finding top nail artists, hair stylists, lash techs, and beauty professionals in major US cities.</p>
              </a>
              <a href="/blog/top-salon-staffing-mistakes-to-avoid" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-primary">Avoid Staffing Mistakes</h3>
                <p className="text-gray-700 text-sm">Learn the top mistakes salon owners make when hiring and how to build a winning team of beauty professionals.</p>
              </a>
              <a href="/blog/why-weekly-pay-attracts-better-artists" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-primary">Weekly Pay Benefits</h3>
                <p className="text-gray-700 text-sm">Discover why weekly pay schedules attract higher-quality artists and improve salon retention rates.</p>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">How do I apply for beauty jobs on EmviApp?</h3>
                <p className="text-gray-700">Browse our curated job listings, click on positions that match your skills, and apply directly through the platform. Verified employers receive your application instantly.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">What types of beauty positions are available?</h3>
                <p className="text-gray-700">We feature nail technician, hair stylist, barber, massage therapist, skincare specialist, makeup artist, and brow & lash technician positions at premium salons with khách sang clientele.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Do EmviApp jobs offer high earning potential?</h3>
                <p className="text-gray-700">Yes! Our platform focuses on tip cao opportunities at upscale salons. Many positions offer commission-based pay, booth rental options, and access to loyal, high-spending clientele.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Is EmviApp free for job seekers?</h3>
                <p className="text-gray-700">Absolutely! Creating your profile and applying for positions is completely free. Employers pay to post premium job listings, ensuring quality opportunities for professionals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular searches (internal-link widgets) */}
        <div className="container mx-auto px-4 mt-4">
          <div className="flex flex-wrap gap-2">
            {CITIES.slice(0,6).map((c) => (
              <a key={`city-${c.slug}`} href={`/jobs/${c.slug}`} className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted/50 transition-colors">
                {`${c.city}, ${c.state}`}
              </a>
            ))}
            {CITIES.slice(0,6).map((c, idx) => {
              const r = ROLES[idx];
              const roleLabel = r.replace('-', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
              return (
                <a key={`rc-${r}-${c.slug}`} href={`/jobs/${r}/${c.slug}`} className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted/50 transition-colors">
                  {`${roleLabel} · ${c.city}, ${c.state}`}
                </a>
              );
            })}
          </div>
        </div>

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
          {paidJobsToShow.length > 0 && (
            <FeaturedPaidJobsSection jobs={paidJobsToShow} />
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
            <header className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Latest Beauty Jobs</h2>
              <p className="mt-2 text-muted-foreground">Find your next opportunity in the beauty industry</p>
            </header>
            {/* Removed FOMO message - same content for all users */}
            {false && !isSignedIn && fomoEnabled !== false && (
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
          {/* 1) Real‑Time Platform Activity */}
          <section id="platform-activity" className="w-full py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Real‑Time Platform Activity</h2>
                <p className="text-muted-foreground mt-1">A quick pulse of EmviApp right now</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active jobs</span>
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-2 text-3xl font-semibold">{activeJobsCount}</div>
                </div>
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Featured jobs</span>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-2 text-3xl font-semibold">{featuredJobsCount}</div>
                </div>
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available artists</span>
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-2 text-3xl font-semibold">{availableArtistsCount}</div>
                </div>
              </div>
            </div>
          </section>

          {/* 2) Live Activity Feed */}
          <section id="live-activity-feed" className="w-full py-12 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Live Activity Feed</h2>
                <p className="text-muted-foreground mt-1">Recent posts from salons and studios</p>
              </header>
              <ul className="rounded-2xl border bg-card shadow-sm divide-y">
                {recentJobs.map((j: any) => (
                  <li key={j.id} className="p-4 sm:p-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{j.title || j.position || 'New role posted'}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {j.city && j.state ? `${j.city}, ${j.state}` : (j.location || '')}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(j.updated_at || j.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </li>
                ))}
                {recentJobs.length === 0 && (
                  <li className="p-5 text-sm text-muted-foreground">No activity yet.</li>
                )}
              </ul>
            </div>
          </section>

          {/* 3) Testimonials */}
          <section id="testimonials" className="w-full py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">What our community says</h2>
                <p className="text-muted-foreground mt-1">Trust from beauty pros and owners across the country</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    quote: "We hired our lead nail tech in 48 hours. The quality is night and day.",
                    author: "Lana • Salon Owner, Houston",
                  },
                  {
                    quote: "As a barber, I love how fast jobs show up near me—so clean and easy.",
                    author: "Marcus • Barber, Phoenix",
                  },
                  {
                    quote: "We filled 3 chairs this month. It’s the platform we’ve been waiting for.",
                    author: "Sarah • Studio Manager, Seattle",
                  },
                ].map((t, i) => (
                  <figure key={i} className="rounded-2xl border bg-card p-6 shadow-sm h-full flex flex-col">
                    <Quote className="h-6 w-6 text-primary" />
                    <blockquote className="mt-3 text-base text-foreground/90">{t.quote}</blockquote>
                    <figcaption className="mt-4 text-sm text-muted-foreground">{t.author}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>


          {/* Other sections (unchanged) */}
          <UrgencyBoosters jobs={jobs} />
          <LiveLeaderboards />
          <InviteEarnBanner />
        </Suspense>

        {/* Rich Results Test Link and Dev Logger */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          <RichResultsTestLink url={`https://www.emvi.app/jobs`} />
        </div>
        <SEODevLogger />
      </main>
    </>
  );
};

export default OptimizedJobsPageContent;
