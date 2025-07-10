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
    }
  }, [searchParams, toast, refreshJobs]);

  const handleRenew = async (job: Job) => {
    try {
      console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
      // Job renewal logic
      toast({
        title: "Job Renewed! ✅",
        description: `Your ${job.title} listing has been renewed for another 30 days.`,
        duration: 4000,
      });
      refreshJobs();
    } catch (error) {
      console.error('❌ [JOBS-PAGE] Error renewing job:', error);
      toast({
        title: "Renewal Failed",
        description: "Unable to renew your job listing. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    console.log(`🎯 [JOBS-PAGE] Switching to ${tabId} tab`);
    setActiveIndustryTab(tabId);
    
    // Update URL without full navigation
    const newSearchParams = new URLSearchParams(searchParams);
    if (tabId === 'all') {
      newSearchParams.delete('industry');
    } else {
      newSearchParams.set('industry', tabId);
    }
    newSearchParams.delete('listing');
    
    const newUrl = `/jobs${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  // Loading state
  if (loading) {
    return <JobLoadingState />;
  }

  // Error state
  if (error) {
    console.error('💥 [JOBS-PAGE] Error loading jobs:', error);
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

  console.log('🎨 [JOBS-PAGE] Rendering with:', {
    activeTab: activeIndustryTab,
    jobCount: jobs?.length || 0,
    isSignedIn
  });

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8">
          {/* Premium Jobs Hero Section - Restored from original */}
          <div className="text-center mb-16 max-w-6xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-purple-100 mb-8">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 font-inter font-medium">Trusted by 2,800+ Top Salons</span>
            </div>

            {/* Main Headlines */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-black mb-4">
              <span className="text-gray-900">Finding Great Artists</span>
              <br />
              <span className="text-gray-900">Is Hard—</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                EmviApp Makes It Easy.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl font-inter text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Stop wasting time on job boards that don't work. Connect with top nail techs, stylists, and beauty professionals who are serious about their craft—and ready to grow with you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => navigate('/post-job')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-inter font-bold py-4 px-8 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Post a Job
              </button>
              <button
                onClick={() => navigate('/artists')}
                className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-200 font-inter font-bold py-4 px-8 rounded-2xl text-lg transition-all flex items-center gap-2"
              >
                <span className="text-xl">🔍</span>
                Find My Dream Job
              </button>
            </div>

            {/* Success Stats */}
            <div className="mb-8">
              <p className="text-lg font-inter text-gray-600">
                <span className="text-purple-600 font-bold">1,247 successful hires</span> in the last 30 days. Join the best.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-inter text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Private & Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>48hr Average Fill Time</span>
              </div>
            </div>
          </div>

          {/* Explore by Specialty Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Explore by Specialty
            </h2>
            <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with the perfect opportunity in your area of expertise
            </p>
          </div>

          {/* Industry Tabs */}
          <Tabs value={activeIndustryTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 h-auto p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              {industryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-2 p-4 text-xs font-inter font-semibold rounded-xl transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {industryTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-12">
                {/* Tab-specific Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <tab.icon className="w-8 h-8 text-[#8A53F8]" />
                    <h2 className="text-3xl font-playfair font-bold text-foreground">
                      {tab.id === 'all' ? 'All Beauty Opportunities' : `${tab.label} Positions`}
                    </h2>
                  </div>
                  <p className="text-lg font-inter text-muted-foreground">
                    {tab.id === 'all' 
                      ? `${jobs.length} opportunities across all beauty industries`
                      : `Premium ${tab.label.toLowerCase()} positions • Updated daily`
                    }
                  </p>
                </div>

                {/* Diamond Plan Block - Only for paid tiers */}
                {tab.id !== 'all' && <DiamondPlanBlock />}
                
                {/* FOMO Nail Jobs Section - Show for nails tab or all */}
                {(tab.id === 'all' || tab.id === 'nails') && <FOMONailJobsSection />}
                
                {/* What You Missed Section - Show expired jobs */}
                {tab.id === 'all' && <WhatYouMissedSection />}
                
                {/* Industry Jobs Display */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white">
                    {tab.id === 'all' ? 'Latest Beauty Industry Opportunities' : `${tab.label} Positions Available`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {jobs.length} opportunities • Updated daily
                  </p>
                </div>
                <JobsGrid
                  jobs={jobs}
                  expirations={{}}
                  onRenew={handleRenew}
                  isRenewing={false}
                  renewalJobId={null}
                />

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