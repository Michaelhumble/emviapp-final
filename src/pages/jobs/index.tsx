
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
        <section className="relative w-full bg-gradient-to-br from-slate-50 via-pearl-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-24 md:py-32 overflow-hidden">
          {/* Subtle luxury background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-white/40 to-slate-50/30 dark:from-slate-800/40 dark:via-slate-700/20 dark:to-gray-800/30"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-200/10 dark:bg-slate-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gray-100/15 dark:bg-gray-700/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Content - Left aligned on desktop, centered on mobile */}
              <div className="lg:col-span-8 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                  Your Next Move.<br />
                  Someone Else's Dream.<br />
                  <span className="text-slate-600 dark:text-slate-300">— Don't Miss It.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-inter mb-12 max-w-3xl leading-relaxed">
                  Opportunities change lives in a moment. Top salons and artists connect here before the rest of the world even knows. Secure your next step—before it's gone.
                </p>
                
                {/* Ultra-Premium CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-16">
                  <button
                    onClick={() => navigate('/post-job')}
                    className="group relative bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-inter font-semibold py-6 px-12 rounded-none text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 min-w-[200px] overflow-hidden border border-gray-900 dark:border-white"
                  >
                    <span className="relative z-10">Post a Job</span>
                    <div className="absolute inset-0 bg-gray-800 dark:bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                  <button
                    onClick={() => {
                      const jobsSection = document.querySelector('#jobs-section');
                      if (jobsSection) {
                        jobsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-inter font-semibold py-6 px-12 rounded-none text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 min-w-[200px] overflow-hidden border border-gray-900 dark:border-white"
                  >
                    <span className="relative z-10">Find My Dream Job</span>
                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
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

        {/* FOMO Testimonial Slider */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="bg-white dark:bg-gray-900 border-t border-b border-slate-200 dark:border-slate-700 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse-slow">
                <blockquote className="text-2xl md:text-3xl font-playfair italic text-gray-900 dark:text-white mb-8 leading-relaxed">
                  "We hired in 36 hours—no noise, just results. I wish I had found this sooner."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    B
                  </div>
                  <div className="text-left">
                    <p className="font-inter font-semibold text-gray-900 dark:text-white text-lg">Bella Rodriguez</p>
                    <p className="text-gray-600 dark:text-gray-400 font-inter">Salon Owner, Dallas</p>
                  </div>
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
                {/* Premium Features Section */}
                <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
                      💎 Premium Opportunities
                    </h3>
                    <p className="text-xl font-inter text-white/90 mb-8 max-w-3xl mx-auto">
                      Get exclusive access to top-tier positions and premium visibility. Stand out from the crowd.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-white font-inter font-medium">Priority Placement</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-white font-inter font-medium">Instant Visibility</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-2">👑</div>
                        <p className="text-white font-inter font-medium">Premium Badge</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/post-job')}
                      className="bg-white text-purple-600 font-inter font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                    >
                      Get Premium Access
                    </button>
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
