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
import { ArrowLeft, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OptimizedJobsPageContent = () => {
  const { jobs, loading, error, refresh } = useOptimizedJobsData();
  const { isSignedIn } = useAuth();
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
        <section className="relative w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden py-16 md:py-24">
          {/* Optimized background - reduced complexity */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40"></div>
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              
              {/* Trust/Stats Bar */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/95 backdrop-blur-lg border border-yellow-400/30 rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-2xl">
                  <span className="text-red-500 text-sm sm:text-base">🔥</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800">
                    <span className="hidden sm:inline">12,000+ jobs posted | 10,000+ artists connected | </span>{filteredJobs.length} jobs available
                  </span>
                </div>
              </div>
              
              {/* Headline */}
              <div className="mb-8">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                  <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                    Build Your American Dream
                  </span>
                  <span className="block mt-2 text-white">
                    in Nails & Beauty
                  </span>
                </h1>
                
                <h2 className="text-lg sm:text-xl lg:text-2xl text-purple-100 mb-4 max-w-5xl mx-auto leading-relaxed font-medium">
                  America's most trusted nail & beauty hiring platform.
                  <span className="block mt-2 text-yellow-200 font-semibold text-base sm:text-lg lg:text-xl">
                    Kết nối thợ nails và chủ salon khắp nước Mỹ.
                  </span>
                </h2>
              </div>
              
              {/* CTA Buttons */}
              <div className="mb-12">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <Button
                    onClick={() => navigate('/post-job')}
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 text-white font-black py-6 px-8 sm:px-12 rounded-2xl text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-[280px] sm:min-w-[320px] transform hover:scale-105"
                  >
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
                    Post a Job
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const jobsSection = document.querySelector('#jobs-section');
                      if (jobsSection) {
                        jobsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    variant="outline"
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-bold py-6 px-8 sm:px-12 rounded-2xl text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[280px] sm:min-w-[320px] border-2 border-white/30 hover:border-white/50 transform hover:scale-105"
                  >
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
                    Browse Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOBS SECTION */}
        <section id="jobs-section" className="w-full py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Industry Tabs */}
            <div className="mb-8">
              <Tabs value={activeIndustryTab} onValueChange={setActiveIndustryTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-8">
                  {industryTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-2 text-xs md:text-sm"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden md:inline">{tab.label}</span>
                        <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {industryTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {tab.label} Opportunities
                      </h2>
                      <p className="text-gray-600">
                        {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
                      </p>
                    </div>

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

        {/* LAZY LOADED SECTIONS - Below the fold */}
        <Suspense fallback={<div className="py-8" />}>
          {/* Success Stories */}
          <SuccessStoriesCarousel />
          
          {/* Featured Jobs */}
          <FeaturedTrendingJobs jobs={jobs} />
          
          {/* Real-time Activity */}
          <RealTimeActivity />
          
          {/* FOMO Sections */}
          <WhatYouMissedSection />
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
