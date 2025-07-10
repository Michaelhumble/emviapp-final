
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
        {/* Ultra-Premium Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-24 md:py-32 overflow-hidden">
          {/* Custom Abstract Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100/30 via-white/60 to-slate-50/40 dark:from-slate-800/40 dark:via-slate-700/30 dark:to-gray-800/50"></div>
            <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-100/30 dark:from-blue-900/10 dark:to-indigo-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-gradient-to-tr from-purple-100/20 to-pink-100/30 dark:from-purple-900/10 dark:to-pink-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-gray-100/15 to-slate-100/25 dark:from-gray-800/15 dark:to-slate-800/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Content - Left aligned on desktop, centered on mobile */}
              <div className="lg:col-span-8 text-center lg:text-left">
                <div className="animate-fade-in">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                    <span className="block animate-slide-in-right">Unlock the Beauty Industry's</span>
                    <span className="block animate-slide-in-right" style={{ animationDelay: '0.2s' }}>Best-Kept Secrets.</span>
                    <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-600 dark:text-slate-300 mt-4 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                      Where Top Salons & Artists Connect First—<br />
                      Quietly, Confidently, Successfully.
                    </span>
                  </h1>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-inter mb-12 max-w-4xl leading-relaxed">
                    Trusted by industry leaders. Find your dream artist or your next big move before anyone else knows it's available. No noise. No spam. Just results—built for those who expect the best.
                  </p>
                </div>
                
                {/* Ultra-Premium CTAs */}
                <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-8">
                    <button
                      onClick={() => navigate('/post-job')}
                      className="group relative bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white text-white dark:text-gray-900 font-inter font-bold py-6 px-12 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 min-w-[220px] overflow-hidden border border-gray-800 dark:border-gray-200 animate-pulse hover:animate-none"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Post a Job
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-gray-700 to-slate-800 dark:from-gray-200 dark:via-gray-50 dark:to-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                    <button
                      onClick={() => {
                        const jobsSection = document.querySelector('#jobs-section');
                        if (jobsSection) {
                          jobsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-inter font-semibold py-6 px-12 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-500 min-w-[220px] overflow-hidden border border-slate-300 dark:border-slate-600"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find My Dream Job
                      </span>
                      <div className="absolute inset-0 bg-gray-50/90 dark:bg-slate-700/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </div>
                  
                  {/* Subtle FOMO Line */}
                  <div className="text-center lg:text-left">
                    <p className="text-sm font-inter text-gray-600 dark:text-gray-400 italic">
                      Most positions fill in under 48 hours. Don't wait—top talent moves fast.
                    </p>
                  </div>
                </div>
                
                {/* Elegant Trust Signals */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm font-inter text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span>Used by leaders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span>Loved by talent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span>Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span>Discreet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span>Secure</span>
                  </div>
                </div>
              </div>
              
              {/* Right side - subtle visual element */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-gray-50 dark:from-slate-800 dark:to-gray-900 rounded-none shadow-2xl border border-slate-200 dark:border-slate-700"></div>
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-none shadow-inner border border-slate-100 dark:border-slate-600"></div>
                  <div className="absolute inset-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Testimonial Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl py-16 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/50 to-purple-50/30 dark:from-blue-900/10 dark:via-slate-800/30 dark:to-purple-900/10"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-400 dark:to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-8 shadow-lg">
                  B
                </div>
                <blockquote className="text-3xl md:text-4xl lg:text-5xl font-playfair italic text-gray-900 dark:text-white mb-8 leading-tight">
                  "We hired in 36 hours—no noise, just results."
                </blockquote>
                <div className="text-center">
                  <p className="font-inter font-bold text-gray-900 dark:text-white text-xl mb-2">Bella R.</p>
                  <p className="text-gray-600 dark:text-gray-400 font-inter text-lg">Salon Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <p className="text-4xl font-playfair font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">2,847</p>
                <p className="text-sm font-inter font-medium text-gray-600">Active Opportunities</p>
              </div>
              <div className="group">
                <p className="text-4xl font-playfair font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">156</p>
                <p className="text-sm font-inter font-medium text-gray-600">Matches Today</p>
              </div>
              <div className="group">
                <p className="text-4xl font-playfair font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">94%</p>
                <p className="text-sm font-inter font-medium text-gray-600">Success Rate</p>
              </div>
              <div className="group">
                <p className="text-4xl font-playfair font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">4.9★</p>
                <p className="text-sm font-inter font-medium text-gray-600">Professional Rating</p>
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
                {/* Elite Placement & Visibility Section */}
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-slate-50/30 to-white/20 dark:from-slate-800/20 dark:via-slate-700/30 dark:to-slate-800/20 backdrop-blur-sm"></div>
                  
                  {/* Subtle geometric background elements */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-slate-200/20 to-gray-300/20 dark:from-slate-600/20 dark:to-slate-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-tr from-slate-300/20 to-gray-200/20 dark:from-slate-500/20 dark:to-slate-600/20 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-12">
                      <h3 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Elite Placement & Visibility
                      </h3>
                      <p className="text-xl font-inter text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        For those who demand results—access exclusive visibility and attract the industry's best talent, faster.
                      </p>
                    </div>
                    
                    {/* Premium Feature Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                      {/* Priority Placement */}
                      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Priority Placement</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-inter leading-relaxed">Always at the top—seen first by top talent.</p>
                      </div>
                      
                      {/* Instant Visibility */}
                      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Instant Visibility</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-inter leading-relaxed">Featured in discovery alerts & searches.</p>
                      </div>
                      
                      {/* Prestige Badge */}
                      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Prestige Badge</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-inter leading-relaxed">Build trust instantly with verified status.</p>
                      </div>
                      
                      {/* Advanced Analytics */}
                      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Advanced Analytics</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-inter leading-relaxed">Track, measure, and optimize every hire.</p>
                      </div>
                    </div>
                    
                    {/* Premium CTA */}
                    <div className="text-center">
                      <button
                        onClick={() => navigate('/post-job')}
                        className="group relative bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white text-white dark:text-gray-900 font-inter font-bold py-6 px-12 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-800 dark:border-gray-200"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Unlock Elite Access
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-gray-700 to-slate-800 dark:from-gray-200 dark:via-gray-50 dark:to-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Testimonial Below Premium Section */}
                  <div className="mt-16 text-center">
                    <div className="max-w-4xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/30 dark:border-slate-600/30">
                      <blockquote className="text-lg md:text-xl font-inter italic text-gray-800 dark:text-gray-200 mb-6">
                        "Trusted by 2,800+ salons & studios. Verified by industry leaders."
                      </blockquote>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                          E
                        </div>
                        <div className="text-left">
                          <p className="font-inter font-semibold text-gray-900 dark:text-white">EmviApp Analytics</p>
                          <p className="text-gray-600 dark:text-gray-400 font-inter text-sm">Industry Performance Data</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FOMO Nail Jobs Section - Show for nails tab or all */}
                {(tab.id === 'all' || tab.id === 'nails') && <FOMONailJobsSection />}
                
                {/* What You Missed Section - Show expired jobs */}
                {tab.id === 'all' && <WhatYouMissedSection />}
                
                {/* Filtered Jobs for this industry */}
                {(() => {
                  const filteredJobs = tab.id === 'all' 
                    ? jobs 
                    : jobs.filter(job => job.category?.toLowerCase().includes(tab.id) || 
                                        job.title?.toLowerCase().includes(tab.id.replace('-', ' ')));
                  
                  if (!filteredJobs || filteredJobs.length === 0) {
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
                    <JobsGrid
                      jobs={filteredJobs}
                      expirations={{}}
                      onRenew={handleRenew}
                      isRenewing={false}
                      renewalJobId={null}
                    />
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
