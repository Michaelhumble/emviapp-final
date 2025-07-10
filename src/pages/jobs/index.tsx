
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
        {/* Premium FOMO Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 py-20 mb-16 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-rose-100/30 to-purple-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-12 right-12 text-5xl animate-pulse select-none pointer-events-none opacity-80">💎</div>
            <div className="absolute top-20 left-16 text-3xl animate-pulse select-none pointer-events-none opacity-60" style={{animationDelay: '0.5s'}}>⚡</div>
            <div className="absolute bottom-16 right-20 text-4xl animate-pulse select-none pointer-events-none opacity-70" style={{animationDelay: '1s'}}>🔥</div>
            <div className="absolute bottom-20 left-12 text-2xl animate-pulse select-none pointer-events-none opacity-50" style={{animationDelay: '1.5s'}}>⭐</div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            {/* Urgency Alert Bar */}
            <div className="inline-flex items-center gap-2 bg-red-500/90 text-white px-6 py-3 rounded-full font-inter font-bold text-sm mb-8 shadow-lg animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              LIVE: 847 Active Jobs • 3,429 Artists Searching Now
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-black text-gray-900 mb-6 tracking-tight leading-none">
              Beauty Jobs Don't Wait—<br />
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Land Yours Before Someone Else Does
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 font-inter font-semibold mb-10 max-w-4xl mx-auto leading-tight">
              Top salons and artists hire here first. Instant matches, real results.<br />
              <span className="text-red-600 font-black">Miss your shot—and it's gone.</span>
            </p>
            
            {/* Verification badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <span className="bg-white/90 backdrop-blur-sm text-green-800 px-4 py-2 rounded-full font-inter font-bold text-sm shadow-lg border border-green-300">
                ✅ Verified by Real Salons & Artists
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-purple-800 px-4 py-2 rounded-full font-inter font-bold text-sm shadow-lg border border-purple-300">
                🚀 2,847 Jobs Filled This Month
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-blue-800 px-4 py-2 rounded-full font-inter font-bold text-sm shadow-lg border border-blue-300">
                🔒 100% Secure, Bilingual Support
              </span>
            </div>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => navigate('/post-job')}
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-inter font-black py-6 px-10 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-200 border-0 min-w-[280px]"
              >
                🔥 Post a Job Now—Don't Miss Out
              </button>
              <button
                onClick={() => {
                  const jobsSection = document.querySelector('#jobs-section');
                  if (jobsSection) {
                    jobsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-inter font-black py-6 px-10 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-200 border-0 min-w-[280px]"
              >
                ⚡ Find My Dream Job Today
              </button>
            </div>
            
            {/* FOMO text */}
            <p className="text-base text-gray-600 font-inter font-medium mb-8 italic">
              Seen by thousands—don't let your perfect match slip away.
            </p>
            
            {/* Trust testimonial */}
            <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <p className="text-lg text-gray-800 font-inter font-medium mb-3 italic">
                "I posted here and filled my chair in 2 days—don't wait, jobs go fast. This is where the industry comes to find real talent."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div>
                  <p className="text-base font-inter font-bold text-gray-900">
                    Lisa Chen, Salon Owner
                  </p>
                  <p className="text-sm text-gray-600 font-inter">
                    Elite Nails & Spa, Orange County CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-playfair font-black text-purple-600">2,847</p>
                <p className="text-sm font-inter font-bold text-muted-foreground">Jobs Posted</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-black text-pink-600">156</p>
                <p className="text-sm font-inter font-bold text-muted-foreground">Applied Today</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-black text-blue-600">94%</p>
                <p className="text-sm font-inter font-bold text-muted-foreground">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-black text-green-600">4.9★</p>
                <p className="text-sm font-inter font-bold text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Industry Navigation */}
        <div id="jobs-section" className="max-w-7xl mx-auto px-4 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-playfair font-black text-foreground mb-3">
              Explore by Specialty
            </h2>
            <p className="text-lg font-inter text-muted-foreground">
              Find opportunities in your area of expertise
            </p>
          </div>
          
          <Tabs value={activeIndustryTab} onValueChange={setActiveIndustryTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-8 p-2 bg-gray-50 rounded-2xl border-2 border-gray-200">
              {industryTabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 font-inter font-bold text-sm py-3 px-4 rounded-xl transition-all data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg data-[state=active]:scale-105"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden text-xs">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {industryTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                {/* Diamond Exclusive Section */}
                <div className="mb-12">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-playfair font-black text-white mb-4">
                        💎 Diamond Exclusive Access
                      </h3>
                      <p className="text-xl font-inter text-white/90 mb-6 max-w-2xl mx-auto">
                        Get priority placement, premium visibility, and direct contact with top talent. Only 3 spots available.
                      </p>
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full font-inter font-bold">
                          🎯 5x More Views
                        </span>
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full font-inter font-bold">
                          ⚡ Instant Contact
                        </span>
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full font-inter font-bold">
                          👑 Premium Badge
                        </span>
                      </div>
                      <button
                        onClick={() => navigate('/post-job')}
                        className="btn-diamond text-white font-inter font-black py-4 px-8 rounded-xl text-lg"
                      >
                        Upgrade to Diamond ✨
                      </button>
                      <p className="text-white/80 font-inter mt-3">
                        Only 1 spot left out of 3
                      </p>
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
