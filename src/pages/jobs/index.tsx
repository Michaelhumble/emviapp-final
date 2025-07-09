
import React, { useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData.ts';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ExpiredJobsSection from '@/components/jobs/ExpiredJobsSection';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const { isSignedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

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
          <p className="text-red-600">Error loading jobs: {error}</p>
          <button 
            onClick={refreshJobs}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
      <div className="container mx-auto px-4 py-8">
        {/* Hero Trust Section */}
        <section className="w-full bg-gradient-to-r from-[#fff2df] via-[#f9eaff] to-[#e6f2ff] py-12 mb-10 rounded-3xl shadow-xl flex flex-col items-center text-center max-w-4xl mx-auto border border-[#e7d1ff] relative overflow-hidden">
          <div className="absolute top-4 right-4 text-5xl animate-pulse select-none pointer-events-none">✨</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#8a55e6] mb-3 tracking-tight drop-shadow-lg leading-tight">
            America's Most Trusted Beauty Job Community.<br className="hidden md:inline" /> Powered by AI & Heart.
          </h1>
          <p className="text-lg md:text-xl text-[#54362e] font-medium mb-3 max-w-xl mx-auto">
            Discover new job opportunities, connect with caring salons and artists, and join a network built for YOU.<br/>  
            Bilingual support, secure by design, and always putting the beauty community first.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            <span className="bg-gradient-to-r from-purple-100 to-purple-300 text-purple-900 px-4 py-1 rounded-full font-semibold text-xs shadow border border-purple-200">AI-Powered, Human-Centered</span>
            <span className="bg-gradient-to-r from-pink-100 to-pink-300 text-pink-900 px-4 py-1 rounded-full font-semibold text-xs shadow border border-pink-200">Vietnamese Language Support</span>
            <span className="bg-gradient-to-r from-yellow-100 to-yellow-300 text-yellow-900 px-4 py-1 rounded-full font-semibold text-xs shadow border border-yellow-200">No Bots, No Spam</span>
            <span className="bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 px-4 py-1 rounded-full font-semibold text-xs shadow border border-blue-200">New Jobs Every Day</span>
            <span className="bg-gradient-to-r from-green-100 to-green-300 text-green-900 px-4 py-1 rounded-full font-semibold text-xs shadow border border-green-200">Community-Safe</span>
          </div>
          <button
            className="bg-[#8a55e6] hover:bg-[#5a359a] text-white font-bold py-3 px-10 rounded-xl shadow-2xl text-lg mt-2 transition-all border border-[#c7b3f6] animate-bounce"
            onClick={() => navigate('/post-job')}
          >
            Post Your First Job FREE ✨
          </button>
          <p className="text-xs text-[#88684c] mt-4 italic">
            "I found my dream team here—and felt supported from day one."<br/>
            <span className="font-semibold">— Linda N., Salon Owner, Houston TX</span>
          </p>
          <p className="mt-2 text-sm text-[#755c8a] font-medium">
            Built by beauty pros. For the community. With AI & heart. 💜
          </p>
        </section>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Latest Job Opportunities</h2>
          <p className="text-gray-600">{jobs?.length || 0} jobs available</p>
        </div>

        {!jobs || jobs.length === 0 ? (
          <>
            {console.log('📭 [JOBS-PAGE] Rendering empty state - no jobs found')}
            <JobEmptyState />
          </>
        ) : (
          <>
            {console.log('📋 [JOBS-PAGE] Rendering jobs grid with jobs:', jobs.map(j => ({ id: j.id, title: j.title })))}
            
            {/* Jobs Grid Container with proper spacing */}
            <div className="relative z-10 mb-20">
              <JobsGrid
                jobs={jobs}
                expirations={{}}
                onRenew={handleRenew}
                isRenewing={false}
                renewalJobId={null}
              />
            </div>
            
            {/* Separator and Expired Jobs Section */}
            <div className="relative z-0 mt-24 mb-16">
              <ExpiredJobsSection />
            </div>
          </>
        )}
      </div>
    );
  } catch (renderError) {
    console.error('💥 [JOBS-PAGE] Render error:', renderError);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600">Unable to load jobs. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default JobsPage;
