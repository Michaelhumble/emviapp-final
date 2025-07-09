
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
        {/* Hero Trust Section */}
        <section className="w-full bg-gradient-to-r from-[#fff2df] via-[#f9eaff] to-[#e6f2ff] py-12 mb-10 shadow-xl flex flex-col items-center text-center max-w-6xl mx-auto border border-[#e7d1ff] relative overflow-hidden mx-4 lg:mx-auto rounded-3xl">
          <div className="absolute top-4 right-4 text-5xl animate-pulse select-none pointer-events-none">✨</div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#8a55e6] mb-3 tracking-tight drop-shadow-lg leading-tight">
            America's Most Trusted Beauty Job Community.<br className="hidden md:inline" /> Powered by AI & Heart.
          </h1>
          <p className="text-lg md:text-xl text-foreground font-inter font-medium mb-3 max-w-xl mx-auto px-4">
            Discover new job opportunities, connect with caring salons and artists, and join a network built for YOU.<br/>  
            Bilingual support, secure by design, and always putting the beauty community first.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-3 px-4">
            <span className="bg-gradient-to-r from-purple-100 to-purple-300 text-purple-900 px-4 py-1 rounded-full font-inter font-semibold text-sm shadow border border-purple-200">AI-Powered, Human-Centered</span>
            <span className="bg-gradient-to-r from-pink-100 to-pink-300 text-pink-900 px-4 py-1 rounded-full font-inter font-semibold text-sm shadow border border-pink-200">Vietnamese Language Support</span>
            <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-yellow-900 px-4 py-1 rounded-full font-inter font-semibold text-sm shadow border border-yellow-200">No Bots, No Spam</span>
            <span className="bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 px-4 py-1 rounded-full font-inter font-semibold text-sm shadow border border-blue-200">New Jobs Every Day</span>
            <span className="bg-gradient-to-r from-green-100 to-green-300 text-green-900 px-4 py-1 rounded-full font-inter font-semibold text-sm shadow border border-green-200">Community-Safe</span>
          </div>
          <button
            className="bg-[#8a55e6] hover:bg-[#5a359a] text-white font-inter font-bold py-3 px-10 rounded-xl shadow-2xl text-lg mt-2 transition-all border border-[#c7b3f6] animate-bounce"
            onClick={() => navigate('/post-job')}
          >
            Post Your First Job FREE ✨
          </button>
          <p className="text-base text-foreground mt-4 italic px-4 font-inter">
            "I found my dream team here—and felt supported from day one."<br/>
            <span className="font-semibold">— Linda N., Salon Owner, Houston TX</span>
          </p>
          <p className="mt-2 text-base text-foreground font-inter font-medium px-4">
            Built by beauty pros. For the community. With AI & heart. 💜
          </p>
        </section>

        {/* Industry Tabs Navigation */}
        <div className="container mx-auto px-4 mb-8">
          <Tabs value={activeIndustryTab} onValueChange={setActiveIndustryTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-6">
              {industryTabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden text-xs">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {industryTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                {/* Diamond Plan - Always at Top */}
                <DiamondPlanBlock spotsLeft={1} maxSpots={3} />
                
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
                      <div className="container mx-auto px-4 py-8">
                        <div className="text-center py-12">
                           <h3 className="text-xl font-playfair font-bold text-foreground mb-4">
                             No {tab.label} jobs available right now
                          </h3>
                          <p className="text-muted-foreground font-inter mb-6">
                            Be the first to know when new {tab.label.toLowerCase()} opportunities are posted.
                          </p>
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={() => navigate('/post-job')}
                               className="bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold py-3 px-6 rounded-xl"
                             >
                              Post a Job
                            </button>
                           <button
                              onClick={() => navigate(getIndustryRoute(tab.label))}
                               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-bold py-3 px-6 rounded-xl"
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
                  <div className="text-center py-8 border-t border-gray-200 pt-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={() => navigate(getIndustryRoute(tab.label))}
                         className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                       >
                        Browse All {tab.label} Jobs →
                      </button>
                      <button
                        onClick={() => navigate('/post-job')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-inter font-bold py-3 px-8 rounded-xl transition-all duration-300"
                      >
                        Post a {tab.label} Job
                      </button>
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
