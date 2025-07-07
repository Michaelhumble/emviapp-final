import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from '@/hooks/useJobsData';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import { Plus, Briefcase, TrendingUp, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';
import { toast } from 'sonner';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const { isVietnamese } = useTranslation();
  const [autoRefreshCount, setAutoRefreshCount] = useState(0);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Handle job renewal
  const handleRenewJob = async (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
    
    try {
      setIsRenewing(true);
      setRenewalJobId(job.id);
      
      // Update job expiration date (extend by 30 days)
      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + 30);
      
      const { error } = await supabase
        .from('jobs')
        .update({ 
          expires_at: newExpiresAt.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', job.id);

      if (error) {
        console.error('❌ [JOBS-PAGE] Job renewal failed:', error);
        toast.error('Failed to renew job: ' + error.message);
      } else {
        console.log('✅ [JOBS-PAGE] Job renewed successfully');
        toast.success('Job renewed successfully');
        refreshJobs();
      }
    } catch (error) {
      console.error('💥 [JOBS-PAGE] Unexpected renewal error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsRenewing(false);
      setRenewalJobId(null);
    }
  };

  // Auto-refresh every 30 seconds to catch new jobs
  useEffect(() => {
    console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
    const interval = setInterval(() => {
      refreshJobs();
      setAutoRefreshCount(prev => prev + 1);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refreshJobs]);

  // Set up real-time subscription for new jobs
  useEffect(() => {
    console.log('📡 [JOBS-PAGE] Setting up real-time subscription...');
    
    const subscription = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: 'status=eq.active'
        },
        (payload) => {
          console.log('⚡ [JOBS-PAGE] Real-time update received:', payload);
          refreshJobs();
        }
      )
      .subscribe((status) => {
        console.log('📡 [JOBS-PAGE] Subscription status:', status);
      });

    return () => {
      console.log('📡 [JOBS-PAGE] Cleaning up real-time subscription');
      supabase.removeChannel(subscription);
    };
  }, [refreshJobs]);

  const handleManualRefresh = () => {
    console.log('🔄 [JOBS-PAGE] Manual refresh triggered');
    refreshJobs();
  };

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state...');
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Loading jobs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    console.error('❌ [JOBS-PAGE] Error state:', error);
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading jobs: {error}</p>
            <Button onClick={handleManualRefresh}>Try Again</Button>
          </div>
        </div>
      </Layout>
    );
  }

  console.log('🎉 [JOBS-PAGE] Rendering jobs page with', jobs.length, 'jobs');

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Tìm việc làm trong ngành làm đẹp. Cơ hội nghề nghiệp cho kỹ thuật viên nail, thợ làm tóc, chuyên viên thẩm mỹ."
            : "Find beauty industry jobs. Career opportunities for nail technicians, hair stylists, estheticians."
          }
        />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {isVietnamese ? "Việc Làm Ngành Làm Đẹp" : "Beauty Industry Jobs"}
            </h1>
            <p className="text-xl mb-6 opacity-90">
              {isVietnamese 
                ? "Khám phá cơ hội nghề nghiệp tuyệt vời trong ngành làm đẹp"
                : "Discover amazing career opportunities in the beauty industry"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/post-job-free">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Plus className="mr-2 h-5 w-5" />
                  {isVietnamese ? "Đăng Tin Tuyển Dụng" : "Post a Job"}
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={handleManualRefresh}
              >
                {isVietnamese ? "Làm Mới" : "Refresh Jobs"}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Briefcase className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                  <div className="text-gray-600">{isVietnamese ? "Việc Làm" : "Active Jobs"}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-600">{isVietnamese ? "Cập Nhật" : "Updated"}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">{isVietnamese ? "Nghệ Nhân" : "Professionals"}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600">{isVietnamese ? "Thành Phố" : "Cities"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Listing */}
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {isVietnamese ? "Danh Sách Việc Làm" : "Available Positions"}
            </h2>
            {autoRefreshCount > 0 && (
              <div className="text-sm text-gray-500">
                {isVietnamese ? "Tự động cập nhật" : "Auto-refreshed"} {autoRefreshCount} {isVietnamese ? "lần" : "times"}
              </div>
            )}
          </div>
          
          <UnifiedJobFeed 
            jobs={jobs}
            onRenew={handleRenewJob}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
