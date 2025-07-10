
import React, { useEffect, useState } from 'react';
import { useJobsData } from '@/hooks/useJobsData.ts';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ExpiredJobsSection from '@/components/jobs/ExpiredJobsSection';
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';
import FOMONailJobsSection from '@/components/jobs/FOMONailJobsSection';
import DiamondPlanBlock from '@/components/pricing/DiamondPlanBlock';
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
        {/* WORLD-CLASS HERO SECTION */}
        <section className="relative w-full bg-gradient-to-br from-[hsl(var(--pearl-white))] via-[hsl(var(--emvi-offwhite))] to-white dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-32 md:py-40 overflow-hidden">
          {/* Stunning Premium Background */}
          <div className="absolute inset-0">
            {/* Base luxury gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--emvi-accent))]/3 via-[hsl(var(--pearl-white))]/95 to-[hsl(var(--emvi-offwhite))]/90 dark:from-[hsl(var(--emvi-accent))]/8 dark:via-slate-800/90 dark:to-gray-900/95"></div>
            
            {/* Floating orbs with brand colors */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[hsl(var(--emvi-accent))]/12 via-[hsl(var(--emvi-light))]/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-tr from-[hsl(var(--emvi-light))]/10 via-[hsl(var(--emvi-accent))]/12 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-[hsl(var(--emvi-accent))]/6 via-[hsl(var(--emvi-offwhite))]/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Subtle grid pattern for texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--emvi-accent)/0.03)_1px,transparent_1px)] bg-[length:60px_60px] opacity-40"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-[#8A53F8]/20 dark:border-slate-700/50 rounded-full px-6 py-3 mb-8 shadow-lg">
                <div className="w-3 h-3 bg-gradient-to-r from-[#8A53F8] to-[#8A53F8] rounded-full animate-pulse"></div>
                <span className="text-sm font-inter font-medium text-gray-700 dark:text-gray-300">Trusted by 2,800+ Top Salons</span>
              </div>
              
              {/* Hero Headline */}
              <div className="animate-fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-[#8A53F8] to-gray-900 dark:from-white dark:via-[#8A53F8] dark:to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Finding Great Artists
                  </span>
                  <span className="block text-gray-900 dark:text-white mt-2">
                    Is Hard—
                  </span>
                  <span className="block bg-gradient-to-r from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] bg-clip-text text-transparent">
                    EmviApp Makes It Easy.
                  </span>
                </h1>
              </div>
              
              {/* Emotional Subheadline */}
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-inter mb-16 max-w-4xl mx-auto leading-relaxed font-light">
                  Stop wasting time on job boards that don't work. Connect with top nail techs, stylists, and beauty professionals who are serious about their craft—and ready to grow with you.
                </p>
              </div>
              
              {/* Premium CTA Buttons */}
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <button
                    onClick={() => navigate('/post-job')}
                    className="group relative bg-gradient-to-r from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] hover:from-[#8A53F8] hover:via-[#8A53F8] hover:to-[#8A53F8] text-white font-inter font-bold py-6 px-12 rounded-2xl text-xl shadow-[0_25px_50px_rgba(138,83,248,0.25)] hover:shadow-[0_35px_70px_rgba(138,83,248,0.35)] transition-all duration-700 min-w-[280px] overflow-hidden border border-white/20"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Post a Job
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const jobsSection = document.querySelector('#jobs-section');
                      if (jobsSection) {
                        jobsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group relative bg-white/95 hover:bg-[#F6F6F7] dark:bg-slate-800/90 dark:hover:bg-slate-700/90 backdrop-blur-sm text-[#8A53F8] dark:text-white font-inter font-semibold py-6 px-12 rounded-2xl text-xl shadow-[0_20px_40px_rgba(138,83,248,0.15)] hover:shadow-[0_30px_60px_rgba(138,83,248,0.25)] transition-all duration-700 min-w-[280px] overflow-hidden border-2 border-[#8A53F8]/20 hover:border-[#8A53F8]/40"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find My Dream Job
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8A53F8]/5 via-[#F6F6F7]/50 to-[#8A53F8]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </button>
                </div>
                
                {/* Emotional Trust Line */}
                <div className="text-center">
                  <p className="text-lg font-inter text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-[#8A53F8]">1,247 successful hires</span> in the last 30 days. Join the best.
                  </p>
                </div>
              </div>
              
              {/* Premium Trust Indicators */}
              <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <div className="flex flex-wrap justify-center items-center gap-12 text-sm font-inter text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#8A53F8] to-[#8A53F8] rounded-full"></div>
                    <span className="font-medium">Private & Confidential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#8A53F8] to-[#8A53F8] rounded-full"></div>
                    <span className="font-medium">Verified Professionals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#8A53F8] to-[#8A53F8] rounded-full"></div>
                    <span className="font-medium">48hr Average Fill Time</span>
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

        {/* Industry Navigation */}
        <div id="jobs-section" className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
              Explore by Specialty
            </h2>
            <p className="text-xl font-inter text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with the perfect opportunity in your area of expertise
            </p>
          </div>
          
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
                {/* Ultra-Premium Elite Placement Section */}
                <div className="relative bg-gradient-to-br from-slate-50/50 via-white to-gray-50/30 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-gray-900/50 rounded-none p-16 md:p-20 border-t border-b border-slate-200/30 dark:border-slate-700/30 shadow-inner overflow-hidden">
                  {/* Subtle luxury background texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:20px_20px] opacity-20"></div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent"></div>
                  
                  <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                      <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>
                        <span className="text-sm font-inter tracking-[0.2em] text-slate-600 dark:text-slate-400 uppercase">Premium Access</span>
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>
                      </div>
                      <h3 className="text-5xl md:text-6xl font-playfair font-light text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                        Elite Placement & Visibility
                      </h3>
                      <p className="text-xl font-inter font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        For those who demand results—access exclusive visibility and attract the industry's best talent, faster.
                      </p>
                    </div>
                    
                    {/* Sophisticated Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
                      {/* Priority Placement */}
                      <div className="group relative bg-gradient-to-br from-white via-[#F6F6F7]/50 to-white dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm rounded-2xl p-10 border border-[#8A53F8]/20 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(138,83,248,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_64px_rgba(138,83,248,0.15)] dark:hover:shadow-[0_16px_64px_rgba(0,0,0,0.4)] transition-all duration-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(138,83,248,0.25)]">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Priority Placement</h4>
                        <p className="text-gray-500 dark:text-slate-400 font-inter leading-relaxed">Always at the top—seen first by top talent.</p>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-[#F6F6F7]/20 to-[#8A53F8]/5 dark:from-[#8A53F8]/5 dark:via-slate-700/20 dark:to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      </div>
                      
                      {/* Instant Visibility */}
                      <div className="group relative bg-gradient-to-br from-white via-[#F6F6F7]/50 to-white dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm rounded-2xl p-10 border border-[#8A53F8]/20 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(138,83,248,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_64px_rgba(138,83,248,0.15)] dark:hover:shadow-[0_16px_64px_rgba(0,0,0,0.4)] transition-all duration-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(138,83,248,0.25)]">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Instant Visibility</h4>
                        <p className="text-gray-500 dark:text-slate-400 font-inter leading-relaxed">Featured in discovery alerts & searches.</p>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-[#F6F6F7]/20 to-[#8A53F8]/5 dark:from-[#8A53F8]/5 dark:via-slate-700/20 dark:to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      </div>
                      
                      {/* Prestige Badge */}
                      <div className="group relative bg-gradient-to-br from-white via-[#F6F6F7]/50 to-white dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm rounded-2xl p-10 border border-[#8A53F8]/20 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(138,83,248,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_64px_rgba(138,83,248,0.15)] dark:hover:shadow-[0_16px_64px_rgba(0,0,0,0.4)] transition-all duration-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(138,83,248,0.25)]">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Prestige Badge</h4>
                        <p className="text-gray-500 dark:text-slate-400 font-inter leading-relaxed">Build trust instantly with verified status.</p>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-[#F6F6F7]/20 to-[#8A53F8]/5 dark:from-[#8A53F8]/5 dark:via-slate-700/20 dark:to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      </div>
                      
                      {/* Advanced Analytics */}
                      <div className="group relative bg-gradient-to-br from-white via-[#F6F6F7]/50 to-white dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm rounded-2xl p-10 border border-[#8A53F8]/20 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(138,83,248,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_64px_rgba(138,83,248,0.15)] dark:hover:shadow-[0_16px_64px_rgba(0,0,0,0.4)] transition-all duration-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8A53F8] to-[#8A53F8] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(138,83,248,0.25)]">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">Advanced Analytics</h4>
                        <p className="text-gray-500 dark:text-slate-400 font-inter leading-relaxed">Track, measure, and optimize every hire.</p>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8A53F8]/5 via-[#F6F6F7]/20 to-[#8A53F8]/5 dark:from-[#8A53F8]/5 dark:via-slate-700/20 dark:to-[#8A53F8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-20">
                      <button
                        onClick={() => navigate('/post-job')}
                        className="group relative bg-gradient-to-r from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] hover:from-[#8A53F8] hover:via-[#8A53F8] hover:to-[#8A53F8] text-white font-inter font-semibold py-6 px-16 rounded-2xl text-lg shadow-[0_25px_50px_rgba(138,83,248,0.25)] hover:shadow-[0_35px_70px_rgba(138,83,248,0.35)] transition-all duration-700 overflow-hidden border border-[#8A53F8]/30 uppercase tracking-[0.15em]"
                      >
                        <span className="relative z-10 flex items-center gap-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Unlock Elite Access
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8A53F8] via-[#8A53F8] to-[#8A53F8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Ultra-Minimalist Trust Signal */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-none py-4 px-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                      <p className="text-sm font-inter font-light text-slate-600 dark:text-slate-400 tracking-wide">
                        Trusted by 2,800+ salons & studios. Verified by industry leaders.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* FOMO Nail Jobs Section - Show for nails tab or all */}
                {(tab.id === 'all' || tab.id === 'nails') && <FOMONailJobsSection />}
                
                {/* What You Missed Section - Show expired jobs */}
                {tab.id === 'all' && <WhatYouMissedSection />}
                
                {/* Industry-Specific Premium Job Cards - Matching Nails Layout */}
                {(() => {
                  // Only show premium demo listings for specific industry tabs (not 'all')
                  if (tab.id === 'all') {
                    // For 'all' tab, use existing JobsGrid with database jobs
                    const allJobs = jobs;
                    return (
                      <div>
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white">
                            Latest Beauty Industry Opportunities
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {allJobs.length} opportunities • Updated daily
                          </p>
                        </div>
                        <JobsGrid
                          jobs={allJobs}
                          expirations={{}}
                          onRenew={handleRenew}
                          isRenewing={false}
                          renewalJobId={null}
                        />
                      </div>
                    );
                  }

                  // For specific industry tabs, show premium demo listings
                  let industryListings: any[] = [];
                  
                  console.log(`🎯 [JOBS-PAGE] Loading premium listings for ${tab.id} industry...`);
                  
                  switch (tab.id) {
                    case 'nails':
                      // Nails section stays unchanged (protected)
                      industryListings = nailListings.slice(0, 6);
                      break;
                    case 'hair':
                      // Premium Hair listings with mix of active and expired
                      industryListings = [
                        {
                          id: 'hair-premium-1',
                          title: 'Senior Hair Stylist - Beverly Hills Salon',
                          location: 'Beverly Hills, CA',
                          salary: '$2,800–$4,200/week',
                          tier: 'premium',
                          summary: 'Luxury salon seeking experienced stylist for celebrity clientele.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png',
                          rating: 4.8,
                          fullDescription: 'High-end Beverly Hills salon looking for master stylists.'
                        },
                        {
                          id: 'hair-gold-1',
                          title: 'Master Colorist - Manhattan Studio',
                          location: 'New York, NY',
                          salary: '$3,200–$4,800/week',
                          tier: 'gold',
                          summary: 'NYC studio needs expert colorist with 5+ years experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png',
                          rating: 4.9,
                          fullDescription: 'Premier Manhattan hair studio seeking master colorist.'
                        },
                        {
                          id: 'hair-diamond-1',
                          title: 'Celebrity Hair Stylist - Exclusive Salon',
                          location: 'Los Angeles, CA',
                          salary: '$4,500–$6,000/week',
                          tier: 'diamond',
                          summary: 'Elite salon with A-list clientele. Portfolio required.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png',
                          rating: 5.0,
                          fullDescription: 'Exclusive opportunity for celebrity hair stylists.'
                        },
                        {
                          id: 'hair-expired-1',
                          title: 'Hair Stylist - Downtown Salon',
                          location: 'Chicago, IL',
                          salary: '$2,200–$3,200/week',
                          tier: 'featured',
                          summary: 'Full-time stylist position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png',
                          rating: 4.6,
                          isPositionFilled: true,
                          fullDescription: 'This hair stylist position has been filled.'
                        },
                        {
                          id: 'hair-expired-2',
                          title: 'Senior Stylist - Luxury Spa',
                          location: 'Miami, FL',
                          salary: '$2,600–$3,600/week',
                          tier: 'premium',
                          summary: 'Spa stylist position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated.png',
                          rating: 4.7,
                          isPositionFilled: true,
                          fullDescription: 'This senior stylist position has been filled.'
                        }
                      ];
                      break;
                    case 'barber':
                      // Premium Barber listings
                      industryListings = [
                        {
                          id: 'barber-premium-1',
                          title: 'Master Barber - Elite Men\'s Grooming',
                          location: 'New York, NY',
                          salary: '$2,400–$3,800/week',
                          tier: 'premium',
                          summary: 'Upscale barbershop needs master barber with straight razor skills.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png',
                          rating: 4.8,
                          fullDescription: 'Elite men\'s grooming salon seeking master barber.'
                        },
                        {
                          id: 'barber-gold-1',
                          title: 'Celebrity Barber - Hollywood Studio',
                          location: 'Los Angeles, CA',
                          salary: '$3,500–$5,000/week',
                          tier: 'gold',
                          summary: 'Hollywood studio seeking experienced celebrity barber.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(2).png',
                          rating: 4.9,
                          fullDescription: 'Exclusive Hollywood barbershop for celebrity clients.'
                        },
                        {
                          id: 'barber-diamond-1',
                          title: 'Executive Barber - Private Club',
                          location: 'Manhattan, NY',
                          salary: '$4,000–$6,500/week',
                          tier: 'diamond',
                          summary: 'Private gentleman\'s club needs executive barber.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(3).png',
                          rating: 5.0,
                          fullDescription: 'Exclusive private club barbering opportunity.'
                        },
                        {
                          id: 'barber-expired-1',
                          title: 'Barber - Traditional Shop',
                          location: 'Chicago, IL',
                          salary: '$1,800–$2,800/week',
                          tier: 'featured',
                          summary: 'Traditional barbershop position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(4).png',
                          rating: 4.5,
                          isPositionFilled: true,
                          fullDescription: 'This barber position has been filled.'
                        },
                        {
                          id: 'barber-expired-2',
                          title: 'Senior Barber - Men\'s Salon',
                          location: 'San Francisco, CA',
                          salary: '$2,200–$3,200/week',
                          tier: 'premium',
                          summary: 'Men\'s salon barber position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(6).png',
                          rating: 4.6,
                          isPositionFilled: true,
                          fullDescription: 'This senior barber position has been filled.'
                        }
                      ];
                      break;
                    case 'massage':
                      // Premium Massage listings
                      industryListings = [
                        {
                          id: 'massage-premium-1',
                          title: 'Licensed Massage Therapist - Luxury Spa',
                          location: 'Scottsdale, AZ',
                          salary: '$2,200–$3,400/week',
                          tier: 'premium',
                          summary: 'Resort spa seeking licensed massage therapist with hot stone experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
                          rating: 4.8,
                          fullDescription: 'Luxury resort spa massage therapist opportunity.'
                        },
                        {
                          id: 'massage-gold-1',
                          title: 'Senior Therapist - Medical Spa',
                          location: 'Beverly Hills, CA',
                          salary: '$2,800–$4,200/week',
                          tier: 'gold',
                          summary: 'Medical spa needs senior massage therapist with rehabilitation experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png',
                          rating: 4.9,
                          fullDescription: 'High-end medical spa massage therapy position.'
                        },
                        {
                          id: 'massage-diamond-1',
                          title: 'Master Therapist - Elite Wellness Center',
                          location: 'Aspen, CO',
                          salary: '$3,500–$5,200/week',
                          tier: 'diamond',
                          summary: 'Exclusive wellness center for high-net-worth clients.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png',
                          rating: 5.0,
                          fullDescription: 'Elite wellness center master therapist role.'
                        },
                        {
                          id: 'massage-expired-1',
                          title: 'Massage Therapist - Day Spa',
                          location: 'Austin, TX',
                          salary: '$1,600–$2,400/week',
                          tier: 'featured',
                          summary: 'Day spa massage position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png',
                          rating: 4.4,
                          isPositionFilled: true,
                          fullDescription: 'This massage therapist position has been filled.'
                        }
                      ];
                      break;
                    case 'skincare':
                      // Premium Skincare listings
                      industryListings = [
                        {
                          id: 'skincare-premium-1',
                          title: 'Licensed Esthetician - Medical Spa',
                          location: 'Newport Beach, CA',
                          salary: '$2,400–$3,600/week',
                          tier: 'premium',
                          summary: 'Medical spa seeking licensed esthetician with advanced treatments experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png',
                          rating: 4.8,
                          fullDescription: 'Premium medical spa esthetician opportunity.'
                        },
                        {
                          id: 'skincare-gold-1',
                          title: 'Senior Esthetician - Luxury Resort',
                          location: 'Napa Valley, CA',
                          salary: '$2,800–$4,200/week',
                          tier: 'gold',
                          summary: 'Resort spa needs senior esthetician with organic skincare expertise.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png',
                          rating: 4.9,
                          fullDescription: 'Luxury resort spa esthetician position.'
                        },
                        {
                          id: 'skincare-diamond-1',
                          title: 'Master Esthetician - Elite Dermatology',
                          location: 'Manhattan, NY',
                          salary: '$3,800–$5,500/week',
                          tier: 'diamond',
                          summary: 'Elite dermatology practice seeking master esthetician.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png',
                          rating: 5.0,
                          fullDescription: 'Premium dermatology practice esthetician role.'
                        },
                        {
                          id: 'skincare-expired-1',
                          title: 'Esthetician - Day Spa',
                          location: 'Phoenix, AZ',
                          salary: '$1,800–$2,600/week',
                          tier: 'featured',
                          summary: 'Day spa esthetician position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png',
                          rating: 4.5,
                          isPositionFilled: true,
                          fullDescription: 'This esthetician position has been filled.'
                        }
                      ];
                      break;
                    case 'makeup':
                      // Premium Makeup listings
                      industryListings = [
                        {
                          id: 'makeup-premium-1',
                          title: 'Professional Makeup Artist - Bridal Studio',
                          location: 'Santa Barbara, CA',
                          salary: '$2,200–$3,400/week',
                          tier: 'premium',
                          summary: 'Upscale bridal studio seeking makeup artist with airbrush experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png',
                          rating: 4.8,
                          fullDescription: 'Premier bridal makeup artist opportunity.'
                        },
                        {
                          id: 'makeup-gold-1',
                          title: 'Senior Makeup Artist - Fashion Studio',
                          location: 'New York, NY',
                          salary: '$3,000–$4,500/week',
                          tier: 'gold',
                          summary: 'Fashion studio needs makeup artist with editorial experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-46.png',
                          rating: 4.9,
                          fullDescription: 'High-fashion makeup artist position.'
                        },
                        {
                          id: 'makeup-diamond-1',
                          title: 'Celebrity Makeup Artist - Entertainment',
                          location: 'Los Angeles, CA',
                          salary: '$4,200–$6,800/week',
                          tier: 'diamond',
                          summary: 'Entertainment industry makeup artist for film and TV.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-47.png',
                          rating: 5.0,
                          fullDescription: 'Elite entertainment makeup artist role.'
                        },
                        {
                          id: 'makeup-expired-1',
                          title: 'Makeup Artist - Beauty Counter',
                          location: 'Las Vegas, NV',
                          salary: '$1,600–$2,400/week',
                          tier: 'featured',
                          summary: 'Beauty counter makeup position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-48.png',
                          rating: 4.4,
                          isPositionFilled: true,
                          fullDescription: 'This makeup artist position has been filled.'
                        }
                      ];
                      break;
                    case 'brows-lashes':
                      // Premium Brows & Lashes listings
                      industryListings = [
                        {
                          id: 'brows-premium-1',
                          title: 'Certified Lash Extension Specialist',
                          location: 'Miami, FL',
                          salary: '$2,000–$3,200/week',
                          tier: 'premium',
                          summary: 'High-end studio seeking certified lash extension specialist.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png',
                          rating: 4.8,
                          fullDescription: 'Premium lash extension specialist opportunity.'
                        },
                        {
                          id: 'brows-gold-1',
                          title: 'Master Brow Artist - Luxury Salon',
                          location: 'Beverly Hills, CA',
                          salary: '$2,600–$3,800/week',
                          tier: 'gold',
                          summary: 'Luxury salon needs master brow artist with microblading certification.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png',
                          rating: 4.9,
                          fullDescription: 'Elite brow artist with microblading position.'
                        },
                        {
                          id: 'brows-diamond-1',
                          title: 'Celebrity Brow & Lash Specialist',
                          location: 'West Hollywood, CA',
                          salary: '$3,500–$5,200/week',
                          tier: 'diamond',
                          summary: 'Celebrity clientele brow and lash specialist needed.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-13.png',
                          rating: 5.0,
                          fullDescription: 'Exclusive celebrity brow and lash specialist role.'
                        },
                        {
                          id: 'brows-expired-1',
                          title: 'Lash Technician - Beauty Bar',
                          location: 'Seattle, WA',
                          salary: '$1,400–$2,200/week',
                          tier: 'featured',
                          summary: 'Beauty bar lash tech position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-14.png',
                          rating: 4.3,
                          isPositionFilled: true,
                          fullDescription: 'This lash technician position has been filled.'
                        }
                      ];
                      break;
                    case 'tattoo':
                      // Premium Tattoo listings
                      industryListings = [
                        {
                          id: 'tattoo-premium-1',
                          title: 'Professional Tattoo Artist - Custom Studio',
                          location: 'Austin, TX',
                          salary: '$2,400–$3,800/week',
                          tier: 'premium',
                          summary: 'Custom tattoo studio seeking artist with 3+ years experience.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png',
                          rating: 4.8,
                          fullDescription: 'Premium custom tattoo studio artist position.'
                        },
                        {
                          id: 'tattoo-gold-1',
                          title: 'Master Tattoo Artist - Award-Winning Shop',
                          location: 'San Francisco, CA',
                          salary: '$3,200–$4,800/week',
                          tier: 'gold',
                          summary: 'Award-winning shop needs master artist with portfolio.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(2).png',
                          rating: 4.9,
                          fullDescription: 'Elite award-winning tattoo shop position.'
                        },
                        {
                          id: 'tattoo-diamond-1',
                          title: 'Celebrity Tattoo Artist - Exclusive Studio',
                          location: 'Miami Beach, FL',
                          salary: '$4,500–$7,000/week',
                          tier: 'diamond',
                          summary: 'Exclusive studio for celebrity and high-profile clients.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(3).png',
                          rating: 5.0,
                          fullDescription: 'Celebrity tattoo artist exclusive opportunity.'
                        },
                        {
                          id: 'tattoo-expired-1',
                          title: 'Tattoo Artist - Traditional Shop',
                          location: 'Portland, OR',
                          salary: '$1,800–$2,800/week',
                          tier: 'featured',
                          summary: 'Traditional tattoo shop position filled.',
                          imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(4).png',
                          rating: 4.5,
                          isPositionFilled: true,
                          fullDescription: 'This tattoo artist position has been filled.'
                        }
                      ];
                      break;
                    default:
                      industryListings = [];
                  }

                  console.log(`✅ [JOBS-PAGE] ${tab.label} listings loaded: ${industryListings.length} premium jobs`);

                  if (industryListings.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No premium jobs available for this industry.</p>
                      </div>
                    );
                  }

                  // Render premium job cards matching Nails layout exactly
                  return (
                    <div className="space-y-8">
                      {/* Industry Section Header */}
                      <div className="text-center">
                        <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-2">
                          Premium {tab.label} Opportunities
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {(() => {
                              switch (tab.id) {
                                case 'hair': return hairListings.length;
                                case 'barber': return barberListings.length;
                                case 'massage': return massageListings.length;
                                case 'skincare': return facialListings.length;
                                case 'makeup': return makeupListings.length;
                                case 'brows-lashes': return browLashListings.length;
                                case 'tattoo': return tattooListings.length;
                                default: return 0;
                              }
                            })()} jobs
                          </span>
                        </div>
                      </div>
                      
                      {/* Job Cards Grid - matching Nails layout exactly */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industryListings.slice(0, 6).map((job, index) => (
                          <div
                            key={job.id}
                            className={`group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 relative ${
                              job.isPositionFilled ? 'opacity-60' : ''
                            }`}
                          >
                            {/* Expired overlay - matching Nails style */}
                            {job.isPositionFilled && (
                              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                                Position Filled
                              </div>
                            )}
                            
                            {/* Tier badge for active jobs - matching Nails style */}
                            {!job.isPositionFilled && job.tier && job.tier !== 'free' && (
                              <div className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full font-bold z-10 ${
                                job.tier === 'premium' ? 'bg-[#8A53F8]' :
                                job.tier === 'gold' ? 'bg-yellow-500' :
                                job.tier === 'diamond' ? 'bg-blue-600' :
                                'bg-gray-500'
                              }`}>
                                {job.tier === 'premium' ? 'Premium' :
                                 job.tier === 'gold' ? 'Gold' :
                                 job.tier === 'diamond' ? 'Diamond' :
                                 job.tier?.charAt(0).toUpperCase() + job.tier?.slice(1)}
                              </div>
                            )}
                            
                            {/* Job image - use industry-specific images */}
                            {job.imageUrl ? (
                              <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                                <img 
                                  src={job.imageUrl} 
                                  alt={job.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                <tab.icon className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                            
                            <div className="space-y-3">
                              <h4 className="font-playfair font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                                {job.title}
                              </h4>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                                {job.company || job.businessName || 
                                 (tab.id === 'hair' ? 'Hair Salon' :
                                  tab.id === 'barber' ? 'Barber Shop' :
                                  tab.id === 'massage' ? 'Spa & Wellness' :
                                  tab.id === 'skincare' ? 'Spa & Skincare' :
                                  tab.id === 'makeup' ? 'Beauty Studio' :
                                  tab.id === 'brows-lashes' ? 'Brow & Lash Studio' :
                                  tab.id === 'tattoo' ? 'Tattoo Studio' :
                                  'Beauty Business')}
                              </p>
                              
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{job.location}</span>
                              </div>
                              
                              {job.salary && (
                                <div className="text-[#8A53F8] font-bold text-lg">
                                  {job.salary}
                                </div>
                              )}
                              
                              {/* Rating display - 1 decimal place only */}
                              {job.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-500">★</span>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {job.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                              
                              {job.isPositionFilled && (
                                <div className="text-xs text-gray-400 border-t pt-3">
                                  Position Filled • {new Date().toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* View all link - matching Nails style */}
                      <div className="text-center pt-6">
                        <button
                          onClick={() => navigate(getIndustryRoute(tab.label))}
                          className="inline-flex items-center gap-2 text-[#8A53F8] hover:text-[#8A53F8]/80 font-inter font-semibold text-lg transition-colors duration-300 group"
                        >
                          <span>View all {(() => {
                            switch (tab.id) {
                              case 'hair': return hairListings.length;
                              case 'barber': return barberListings.length;
                              case 'massage': return massageListings.length;
                              case 'skincare': return facialListings.length;
                              case 'makeup': return makeupListings.length;
                              case 'brows-lashes': return browLashListings.length;
                              case 'tattoo': return tattooListings.length;
                              default: return 0;
                            }
                          })()} jobs in {tab.label}</span>
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Industry-specific CTA */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
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
                      {/* For non-nail industries, show premium job cards matching Nails layout */}
                      {tab.id !== 'all' && tab.id !== 'nails' ? (
                        <div className="space-y-8">
                          {/* Industry Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <tab.icon className="w-6 h-6 text-[#8A53F8]" />
                              <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white">
                                {tab.label}
                              </h3>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {(() => {
                                  switch (tab.id) {
                                    case 'hair': return hairListings.length;
                                    case 'barber': return barberListings.length;
                                    case 'massage': return massageListings.length;
                                    case 'skincare': return facialListings.length;
                                    case 'makeup': return makeupListings.length;
                                    case 'brows-lashes': return browLashListings.length;
                                    case 'tattoo': return tattooListings.length;
                                    default: return 0;
                                  }
                                })()} jobs
                              </span>
                            </div>
                          </div>
                          
                          {/* Job Cards Grid - matching Nails layout exactly */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {industryListings.slice(0, 6).map((job, index) => (
                              <div
                                key={job.id}
                                className={`group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 relative ${
                                  job.isPositionFilled ? 'opacity-60' : ''
                                }`}
                              >
                                {/* Expired overlay - matching Nails style */}
                                {job.isPositionFilled && (
                                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                                    Position Filled
                                  </div>
                                )}
                                
                                {/* Tier badge for active jobs - matching Nails style */}
                                {!job.isPositionFilled && job.tier && job.tier !== 'free' && (
                                  <div className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full font-bold z-10 ${
                                    job.tier === 'premium' ? 'bg-[#8A53F8]' :
                                    job.tier === 'gold' ? 'bg-yellow-500' :
                                    job.tier === 'diamond' ? 'bg-blue-600' :
                                    'bg-gray-500'
                                  }`}>
                                    {job.tier === 'premium' ? 'Premium' :
                                     job.tier === 'gold' ? 'Gold' :
                                     job.tier === 'diamond' ? 'Diamond' :
                                     job.tier?.charAt(0).toUpperCase() + job.tier?.slice(1)}
                                  </div>
                                )}
                                
                                {/* Job image - use industry-specific images */}
                                {job.imageUrl ? (
                                  <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                                    <img 
                                      src={job.imageUrl} 
                                      alt={job.title}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                    <tab.icon className="w-12 h-12 text-gray-400" />
                                  </div>
                                )}
                                
                                <div className="space-y-3">
                                  <h4 className="font-playfair font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                                    {job.title}
                                  </h4>
                                  
                                  <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                                    {job.company || job.businessName || 
                                     (tab.id === 'hair' ? 'Hair Salon' :
                                      tab.id === 'barber' ? 'Barber Shop' :
                                      tab.id === 'massage' ? 'Spa & Wellness' :
                                      tab.id === 'skincare' ? 'Spa & Skincare' :
                                      tab.id === 'makeup' ? 'Beauty Studio' :
                                      tab.id === 'brows-lashes' ? 'Brow & Lash Studio' :
                                      tab.id === 'tattoo' ? 'Tattoo Studio' :
                                      'Beauty Business')}
                                  </p>
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                                    </svg>
                                    <span>{job.location}</span>
                                  </div>
                                  
                                  {job.salary && (
                                    <div className="text-[#8A53F8] font-bold text-lg">
                                      {job.salary}
                                    </div>
                                  )}
                                  
                                  {job.employmentType && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>{job.employmentType}</span>
                                    </div>
                                  )}
                                  
                                  {/* Rating display - 1 decimal place only */}
                                  {job.rating && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-yellow-500">★</span>
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {job.rating.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {job.isPositionFilled && (
                                    <div className="text-xs text-gray-400 border-t pt-3">
                                      Position Filled • {new Date().toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* View all link - matching Nails style */}
                          <div className="text-center pt-6">
                            <button
                              onClick={() => navigate(getIndustryRoute(tab.label))}
                              className="inline-flex items-center gap-2 text-[#8A53F8] hover:text-[#8A53F8]/80 font-inter font-semibold text-lg transition-colors duration-300 group"
                            >
                              <span>View all {(() => {
                                switch (tab.id) {
                                  case 'hair': return hairListings.length;
                                  case 'barber': return barberListings.length;
                                  case 'massage': return massageListings.length;
                                  case 'skincare': return facialListings.length;
                                  case 'makeup': return makeupListings.length;
                                  case 'brows-lashes': return browLashListings.length;
                                  case 'tattoo': return tattooListings.length;
                                  default: return 0;
                                }
                              })()} jobs in {tab.label}</span>
                              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* For 'all' tab and other cases, use existing JobsGrid */
                        <div>
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white">
                              {tab.id === 'all' ? 'Latest Beauty Industry Opportunities' : `${tab.label} Positions Available`}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                              {allJobs.length} opportunities • Updated daily
                            </p>
                          </div>
                          <JobsGrid
                            jobs={allJobs}
                            expirations={{}}
                            onRenew={handleRenew}
                            isRenewing={false}
                            renewalJobId={null}
                          />
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Industry-specific CTA */}
                {tab.id !== 'all' && (
                  <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 text-center">
                    <h3 className="text-2xl font-playfair font-black text-foreground mb-4">
                      Looking for More {tab.label} Opportunities?
                    </h3>
                    <p className="text-lg font-inter text-muted-foreground mb-8">
                      Explore our complete collection or post your own listing
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={() => navigate(getIndustryRoute(tab.label))}
                        className="btn-luxury bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-black py-4 px-8 rounded-xl text-lg"
                      >
                        Browse All {tab.label} Jobs →
                      </button>
                      <button
                        onClick={() => navigate('/post-job')}
                        className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 font-inter font-bold py-4 px-8 rounded-xl text-lg transition-all"
                      >
                        Post a {tab.label} Job
                      </button>
                    </div>
                  </div>
                )}

                {/* Success Story - After every major section */}
                {tab.id === 'all' && (
                  <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
                      <div className="text-6xl mb-4">🌟</div>
                      <h3 className="text-xl font-playfair font-black text-foreground mb-4">
                        Success Story
                      </h3>
                      <p className="text-lg font-inter italic text-muted-foreground mb-4">
                        "Within 2 weeks of posting here, I hired 3 incredible nail technicians. The quality of candidates is unmatched!"
                      </p>
                      <p className="font-inter font-bold text-foreground">
                        — Jennifer Kim, Owner of Luxe Nail Studio
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
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
