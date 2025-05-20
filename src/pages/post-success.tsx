
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Confetti from '@/components/ui/confetti';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCircle } from 'lucide-react';
import { Job } from '@/types/job';

const PostSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [jobData, setJobData] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  // Get the listing_id from URL or state
  const searchParams = new URLSearchParams(location.search);
  const listingId = searchParams.get('listing_id') || 
    (location.state as { listing_id?: string })?.listing_id;

  useEffect(() => {
    const fetchJobData = async () => {
      if (!listingId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', listingId)
          .single();

        if (error) {
          console.error('Error fetching job details:', error);
        } else if (data) {
          setJobData(data);
        }
      } catch (error) {
        console.error('Error in job fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [listingId]);

  const handleViewPost = () => {
    // Navigate to the job details page if we have a job ID
    if (jobData?.id) {
      navigate(`/jobs/${jobData.id}`);
    } else {
      // Fallback to jobs listing if no specific job
      navigate('/jobs');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        {showConfetti && <Confetti trigger={true} onDone={() => setShowConfetti(false)} />}
        
        <Card className="bg-white border-green-100 shadow-md">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {t({
                  english: "Job Posted Successfully!",
                  vietnamese: "Đăng tin thành công!"
                })}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {t({
                  english: "Your job has been published and is now live.",
                  vietnamese: "Tin của bạn đã được đăng và hiển thị công khai."
                })}
              </p>
              
              {jobData && (
                <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
                  <h2 className="font-medium text-lg">
                    {jobData.title || t({
                      english: "Your Job Listing",
                      vietnamese: "Tin tuyển dụng của bạn"
                    })}
                  </h2>
                  <p className="text-gray-600">
                    {jobData.salonName || t({
                      english: "Unknown Salon",
                      vietnamese: "Tiệm không xác định"
                    })}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleDashboard}
                >
                  {t({
                    english: "Go to Dashboard",
                    vietnamese: "Đến trang tổng quan"
                  })}
                </Button>
                
                <Button 
                  className="flex-1 bg-primary"
                  onClick={handleViewPost}
                >
                  {t({
                    english: "View My Post",
                    vietnamese: "Xem bài đăng của tôi"
                  })}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
