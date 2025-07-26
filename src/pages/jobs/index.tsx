import React, { useEffect, useState } from 'react';
import { useJobsData } from '@/hooks/useJobsData.ts';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
// Removed ExpiredJobsSection - now handled by individual industry pages
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';
import FOMONailJobsSection from '@/components/jobs/FOMONailJobsSection';
import DiamondPlanBlock from '@/components/pricing/DiamondPlanBlock';
import FeaturedTrendingJobs from '@/components/jobs/FeaturedTrendingJobs';
import LiveLeaderboards from '@/components/jobs/LiveLeaderboards';
import SuccessStoriesCarousel from '@/components/jobs/SuccessStoriesCarousel';
import RealTimeActivity from '@/components/jobs/RealTimeActivity';
import TeaserLocked from '@/components/jobs/TeaserLocked';
import UrgencyBoosters from '@/components/jobs/UrgencyBoosters';
import StickyMobileCTA from '@/components/jobs/StickyMobileCTA';
import InviteEarnBanner from '@/components/jobs/InviteEarnBanner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush } from 'lucide-react';
import { getIndustryRoute } from '@/utils/industryRouteMap';
import { 
  nailListings, 
  hairListings, 
  barberListings, 
  massageListings, 
  facialListings, 
  makeupListings, 
  browLashListings, 
  tattooListings 
} from '@/data/industryListings';

// Development validation
if (process.env.NODE_ENV === 'development') {
  import('@/utils/industryRouteValidation').then(({ testIndustryRouting }) => {
    console.log('🔧 [JOBS-PAGE] Running route validation...');
    testIndustryRouting();
  });
}

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const { isSignedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Industry navigation state
  const industryParam = searchParams.get('industry');
  const listingParam = searchParams.get('listing');
  const [activeIndustryTab, setActiveIndustryTab] = useState(industryParam || 'all');

  // Industry tab configuration
  const industryTabs = [
    { id: 'all', label: 'All Jobs', icon: Sparkles },
    { id: 'nails', label: 'Nail Tech', icon: Sparkles },
    { id: 'hair', label: 'Hair Stylist', icon: Scissors },
    { id: 'barber', label: 'Barber', icon: Scissors },
    { id: 'massage', label: 'Massage', icon: Hand },
    { id: 'skincare', label: 'Skincare', icon: Droplets },
    { id: 'makeup', label: 'Makeup', icon: Palette },
    { id: 'brows-lashes', label: 'Brows & Lashes', icon: Eye },
    { id: 'tattoo', label: 'Tattoo', icon: Brush }
  ];

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
      console.log('🎉 [JOBS-PAGE] Payment successful, showing success message');
      toast({
        title: "Payment Successful! 🎉",
        description: "Your job posting is now live and visible to candidates. It may take a moment to appear in the list.",
        duration: 5000,
      });
      
      // Refresh jobs to show the new paid job
      setTimeout(() => {
        console.log('🔄 [JOBS-PAGE] Refreshing jobs after payment success');
        refreshJobs();
      }, 2000);
      
      // Clear URL parameters
      window.history.replaceState({}, '', '/jobs');
    }
  }, [searchParams, toast, refreshJobs]);

  console.log('📊 [JOBS-PAGE] ======= JOBS PAGE RENDERING =======');
  console.log('📊 [JOBS-PAGE] Jobs state:', {
    jobsCount: jobs.length,
    loading,
    error,
    isSignedIn,
    jobsByTier: {
      free: jobs.filter(j => j.pricing_tier === 'free').length,
      premium: jobs.filter(j => j.pricing_tier === 'premium').length,
      gold: jobs.filter(j => j.pricing_tier === 'gold').length,
      diamond: jobs.filter(j => j.pricing_tier === 'diamond').length,
    },
    jobsArray: jobs.map(j => ({
      id: j.id,
      title: j.title,
      status: j.status,
      pricing_tier: j.pricing_tier,
      created_at: j.created_at
    }))
  });

  useEffect(() => {
    console.log('🔄 [JOBS-PAGE] ======= JOBS DATA UPDATED =======');
    console.log('🔄 [JOBS-PAGE] Total jobs loaded:', jobs.length);
    console.log('🔄 [JOBS-PAGE] Jobs breakdown:', {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'active').length,
      draftJobs: jobs.filter(j => j.status === 'draft').length,
      freeJobs: jobs.filter(j => j.pricing_tier === 'free').length,
      paidJobs: jobs.filter(j => j.pricing_tier !== 'free').length,
      jobTitles: jobs.map(j => j.title),
      jobIds: jobs.map(j => j.id),
      fullJobsData: jobs
    });
    
    // Check for new paid jobs posted in the last 5 minutes
    const recentPaidJobs = jobs.filter(job => {
      const jobTime = new Date(job.created_at).getTime();
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
      return job.pricing_tier !== 'free' && 
             job.status === 'active' && 
             jobTime > fiveMinutesAgo;
    });
    
    if (recentPaidJobs.length > 0) {
      console.log('🎉 [JOBS-PAGE] NEW PAID JOBS DETECTED:', recentPaidJobs);
      recentPaidJobs.forEach(job => {
        console.log(`✅ [JOBS-PAGE] Paid job "${job.title}" is live and visible!`);
      });
    }
  }, [jobs]);

  const handleRenew = (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renew requested for job:', {
      jobId: job.id,
      jobTitle: job.title,
      fullJob: job
    });
    // Renewal logic would go here
  };

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state');
    return (
      <div className="container mx-auto px-4 py-8">
        <JobLoadingState />
      </div>
    );
  }

  if (error) {
    console.log('❌ [JOBS-PAGE] Showing error state:', {
      error,
      errorType: typeof error,
      errorMessage: error
    });
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600 font-inter">Error loading jobs: {error}</p>
          <button 
            onClick={refreshJobs}
             className="mt-4 px-4 py-2 bg-purple-600 text-white font-inter font-medium rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  console.log('✅ [JOBS-PAGE] Showing jobs grid with data:', {
    jobsCount: jobs.length,
    emptyState: jobs.length === 0,
    jobsToDisplay: jobs
  });

  try {
    return (
      <div className="w-full">
        {/* VIRAL BILLION-DOLLAR HERO SECTION */}
        <section className="relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
          {/* Stunning Animated Background */}
          <div className="absolute inset-0">
            {/* Dynamic gradient overlay with salon inspiration */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40 animate-pulse"></div>
            
            {/* Floating beauty elements */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/10 via-purple-400/15 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Premium texture pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:60px_60px] opacity-60"></div>
            
            {/* Animated sparkles */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-40 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-40 right-20 w-2 h-2 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center min-h-screen py-20">
            <div className="text-center w-full">
              
              {/* Urgent Trust/Stats Bar */}
              <div className="animate-fade-in mb-8">
                <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border border-yellow-400/30 rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-2xl">
                  <span className="text-red-500 text-sm sm:text-base">🔥</span>
                  <span className="text-xs sm:text-sm font-inter font-bold text-gray-800 dark:text-white">
                    <span className="hidden sm:inline">12,000+ jobs posted | 10,000+ artists connected | </span>98 new jobs this week
                  </span>
                </div>
              </div>
              
              {/* Massive Emotional Headline */}
              <div className="animate-fade-in mb-8" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-black text-white mb-6 leading-[0.9] tracking-tight drop-shadow-2xl">
                  <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Build Your American Dream
                  </span>
                  <span className="block mt-2 text-white">
                    in Nails & Beauty
                  </span>
                </h1>
                
                {/* Bilingual subheadline with trust and urgency */}
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-purple-100 font-inter mb-4 max-w-5xl mx-auto leading-relaxed font-medium">
                  America's most trusted nail & beauty hiring platform.
                  <span className="block mt-2 text-yellow-200 font-semibold text-base sm:text-lg lg:text-xl">
                    Kết nối thợ nails và chủ salon khắp nước Mỹ.
                  </span>
                </h2>
              </div>
              
              {/* Large CTA Buttons */}
              <div className="animate-fade-in mb-12" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <button
                    onClick={() => navigate('/post-job')}
                    className="group relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 text-white font-inter font-black py-6 px-8 sm:px-12 rounded-2xl text-lg sm:text-xl shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_35px_70px_rgba(0,0,0,0.4)] transition-all duration-700 min-w-[280px] sm:min-w-[320px] transform hover:scale-105 animate-pulse"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                      Post a Job
                    </span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const jobsSection = document.querySelector('#jobs-section');
                      if (jobsSection) {
                        jobsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-inter font-bold py-6 px-8 sm:px-12 rounded-2xl text-lg sm:text-xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_30px_60px_rgba(255,255,255,0.15)] transition-all duration-700 min-w-[280px] sm:min-w-[320px] border-2 border-white/30 hover:border-white/50 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse Jobs
                    </span>
                  </button>
                </div>
              </div>
              
              {/* As Seen On - Below Buttons */}
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="text-xs sm:text-sm font-inter text-purple-200 mb-4 sm:mb-6 uppercase tracking-wide">As seen on</p>
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 opacity-80">
                  <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-medium text-sm sm:text-base">YouTube</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.545c0-1.448.839-2.529 1.884-2.529.888 0 1.317.666 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.04.522 1.887 1.549 1.887 1.857 0 3.285-1.958 3.285-4.782 0-2.503-1.799-4.253-4.366-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .9.347 1.863.781 2.391.085.104.098.195.072.301-.079.329-.255 1.006-.289 1.148-.043.183-.142.222-.328.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                    <span className="font-medium text-sm sm:text-base">TikTok</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.443 5.35c.639 0 1.28-.24 1.771-.726C10.278 3.583 10.85 2.4 11.35 1.2l.15-.36c.15-.36.36-.72.63-1.02C12.49-.54 12.97-.72 13.47-.72s.99.18 1.35.54c.27.3.48.66.63 1.02l.15.36c.5 1.2 1.072 2.383 2.136 3.424.491.486 1.132.726 1.771.726 1.277 0 2.315 1.037 2.315 2.315 0 1.277-1.038 2.315-2.315 2.315-.639 0-1.28.24-1.771.726-1.064 1.041-1.636 2.224-2.136 3.424l-.15.36c-.15.36-.36.72-.63 1.02-.36.36-.85.54-1.35.54s-.99-.18-1.35-.54c-.27-.3-.48-.66-.63-1.02l-.15-.36c-.5-1.2-1.072-2.383-2.136-3.424-.491-.486-1.132-.726-1.771-.726-1.277 0-2.315-1.038-2.315-2.315 0-1.278 1.038-2.315 2.315-2.315z"/>
                    </svg>
                    <span className="font-medium text-sm sm:text-base">Instagram</span>
                  </div>
                </div>
              </div>
              
              {/* Urgent Activity Bar */}
              <div className="animate-fade-in mt-12" style={{ animationDelay: '0.8s' }}>
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded-full px-6 py-3 max-w-lg mx-auto border border-yellow-300/50 shadow-xl">
                  <div className="flex items-center justify-center gap-3 text-amber-800 dark:text-amber-200">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="font-inter font-medium text-sm md:text-base">
                      🔥 Hot jobs in khu Mỹ trắng – Tip cao – Lương tuần – Apply now!
                    </span>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORLD-CLASS TESTIMONIALS & HELP SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          {/* We're Here to Help Banner */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] p-[2px] rounded-3xl shadow-[0_20px_40px_rgba(138,83,248,0.2)]">
              <div className="bg-white dark:bg-slate-900 rounded-3xl px-12 py-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
                  We're Here to Help You Hire Faster & Easier
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-inter leading-relaxed max-w-4xl mx-auto">
                  Finding top talent is tough. EmviApp is here to help you connect with the best artists and nail techs—faster, easier, and with real results.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Testimonials Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group relative bg-gradient-to-br from-[#FDFDFD] via-white to-[#F6F6F7] dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 p-8 rounded-3xl shadow-[0_20px_40px_rgba(138,83,248,0.1)] hover:shadow-[0_30px_60px_rgba(138,83,248,0.15)] transition-all duration-500 border border-[#8A53F8]/10 hover:border-[#8A53F8]/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-transparent to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
                  S
                </div>
                <blockquote className="text-xl md:text-2xl font-playfair italic text-gray-900 dark:text-white mb-6 leading-tight">
                  "We hired in 36 hours—no noise, just results."
                </blockquote>
                <div>
                  <p className="font-inter font-bold text-gray-900 dark:text-white text-lg mb-1">Sarah M.</p>
                  <p className="text-gray-500 dark:text-gray-400 font-inter">Salon Owner, Elite Nails</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative bg-gradient-to-br from-[#F6F6F7] via-[#FDFDFD] to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-8 rounded-3xl shadow-[0_20px_40px_rgba(138,83,248,0.1)] hover:shadow-[0_30px_60px_rgba(138,83,248,0.15)] transition-all duration-500 border border-[#8A53F8]/10 hover:border-[#8A53F8]/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-transparent to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
                  M
                </div>
                <blockquote className="text-xl md:text-2xl font-playfair italic text-gray-900 dark:text-white mb-6 leading-tight">
                  "Finally found artists who care about quality as much as we do."
                </blockquote>
                <div>
                  <p className="font-inter font-bold text-gray-900 dark:text-white text-lg mb-1">Maria L.</p>
                  <p className="text-gray-500 dark:text-gray-400 font-inter">Manager, Luxe Beauty Bar</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative bg-gradient-to-br from-white via-[#F6F6F7] to-[#FDFDFD] dark:from-slate-700 dark:via-slate-900 dark:to-slate-800 p-8 rounded-3xl shadow-[0_20px_40px_rgba(138,83,248,0.1)] hover:shadow-[0_30px_60px_rgba(138,83,248,0.15)] transition-all duration-500 border border-[#8A53F8]/10 hover:border-[#8A53F8]/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-transparent to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
                  D
                </div>
                <blockquote className="text-xl md:text-2xl font-playfair italic text-gray-900 dark:text-white mb-6 leading-tight">
                  "Best investment we've made. Our team is stronger than ever."
                </blockquote>
                <div>
                  <p className="font-inter font-bold text-gray-900 dark:text-white text-lg mb-1">David C.</p>
                  <p className="text-gray-500 dark:text-gray-400 font-inter">Owner, Premier Hair Studio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ultra-Premium Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 rounded-none p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:30px_30px] opacity-30"></div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div className="group">
                <p className="text-4xl md:text-5xl font-playfair font-light text-slate-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-500">2,847</p>
                <p className="text-sm font-inter font-light text-slate-600 dark:text-slate-400 tracking-wide uppercase">Active Opportunities</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-playfair font-light text-slate-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-500">156</p>
                <p className="text-sm font-inter font-light text-slate-600 dark:text-slate-400 tracking-wide uppercase">Matches Today</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-playfair font-light text-slate-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-500">94%</p>
                <p className="text-sm font-inter font-light text-slate-600 dark:text-slate-400 tracking-wide uppercase">Success Rate</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-playfair font-light text-slate-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-500">4.9</p>
                <p className="text-sm font-inter font-light text-slate-600 dark:text-slate-400 tracking-wide uppercase">Professional Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div id="jobs-section" className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
          
          <Tabs value={activeIndustryTab} onValueChange={setActiveIndustryTab} className="w-full">
            <div className="overflow-x-auto pb-4 mb-12">
              <TabsList className="inline-flex w-max min-w-full p-3 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                {industryTabs.map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex items-center gap-3 font-inter font-medium text-sm py-4 px-6 rounded-2xl transition-all duration-300 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 data-[state=active]:transform data-[state=active]:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {industryTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-12">
                <div>
                  {(() => {
                    // Get listings for the current industry
                    let industryListings: any[] = [];
                    switch (tab.id) {
                      case 'nails':
                        industryListings = nailListings;
                        break;
                      case 'hair':
                        industryListings = hairListings;
                        break;
                      case 'barber':
                        industryListings = barberListings;
                        break;
                      case 'massage':
                        industryListings = massageListings;
                        break;
                      case 'skincare':
                        industryListings = facialListings;
                        break;
                      case 'makeup':
                        industryListings = makeupListings;
                        break;
                      case 'brows-lashes':
                        industryListings = browLashListings;
                        break;
                      case 'tattoo':
                        industryListings = tattooListings;
                        break;
                      case 'all':
                      default:
                        industryListings = [
                          ...nailListings.slice(0, 2),
                          ...hairListings.slice(0, 2),
                          ...barberListings.slice(0, 2),
                          ...massageListings.slice(0, 2),
                          ...facialListings.slice(0, 2),
                          ...makeupListings.slice(0, 2),
                          ...browLashListings.slice(0, 2),
                          ...tattooListings.slice(0, 2)
                        ];
                        break;
                    }
                    
                    // Convert industry listings to Job format for JobsGrid
                    const convertedJobs: Job[] = industryListings.map(listing => ({
                      id: listing.id,
                      title: listing.title,
                      location: listing.location,
                      description: listing.summary || listing.fullDescription,
                      category: tab.id === 'all' ? 'various' : tab.id,
                      pricing_tier: listing.tier,
                      salary_range: listing.salary,
                      status: listing.isPositionFilled ? 'expired' : 'active',
                      created_at: new Date().toISOString(),
                      imageUrl: listing.imageUrl,
                      contact_info: listing.phone ? { phone: listing.phone } : undefined,
                      type: 'job',
                      rating: listing.rating ? Number(listing.rating.toFixed(1)) : undefined,
                      isPositionFilled: listing.isPositionFilled || false,
                      fomoText: listing.fomoText,
                      urgencyBadge: listing.urgencyBadge
                    }));
                    
                    // Also include user-submitted jobs for this category
                    const userJobs = tab.id === 'all' 
                      ? jobs 
                      : jobs.filter(job => job.category?.toLowerCase().includes(tab.id) || 
                                          job.title?.toLowerCase().includes(tab.id.replace('-', ' ')));
                    
                    // Combine and sort (industry listings first, then user jobs)
                    const allJobs = [...convertedJobs, ...userJobs];
                    
                    if (allJobs.length === 0) {
                      return (
                        <div className="text-center py-16">
                          <div className="max-w-md mx-auto">
                            <div className="text-8xl mb-6">🎯</div>
                            <h3 className="text-2xl font-playfair font-black text-foreground mb-4">
                              No {tab.label} Jobs Yet
                            </h3>
                            <p className="text-lg text-muted-foreground font-inter mb-8">
                              Be the first to post in this category and get maximum visibility!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <button
                                onClick={() => navigate('/post-job')}
                                className="btn-luxury bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-black py-4 px-8 rounded-xl text-lg"
                              >
                                Post First {tab.label} Job
                              </button>
                              <button
                                onClick={() => navigate(getIndustryRoute(tab.label))}
                                className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 font-inter font-bold py-4 px-8 rounded-xl text-lg transition-all"
                              >
                                Browse All {tab.label} Jobs →
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div>
                        <JobsGrid 
                          jobs={allJobs}
                          onRenew={handleRenew}
                        />
                      </div>
                    );
                  })()}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* NEW ENGAGEMENT SECTIONS BELOW TESTIMONIALS */}
        <FeaturedTrendingJobs jobs={jobs} />
        <LiveLeaderboards />
        <SuccessStoriesCarousel />
        <RealTimeActivity />
        <TeaserLocked />
        <UrgencyBoosters jobs={jobs} />
        <InviteEarnBanner />
        <StickyMobileCTA />
      </div>
    );
  } catch (renderError) {
    console.error('💥 [JOBS-PAGE] Render error:', renderError);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600 font-inter">Unable to load jobs. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white font-inter font-medium rounded hover:bg-purple-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default JobsPage;