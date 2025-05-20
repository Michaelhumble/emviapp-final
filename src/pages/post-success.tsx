
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/types/job'; // Import from central type definition
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LinkIcon, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';

const PostSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('id');
  
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null;
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
        
      if (error) throw error;
      return data as Job;
    },
    enabled: !!jobId,
  });

  const handleShareClick = () => {
    // Use safe navigation with fallback values for properties that might be missing
    const location = job?.location || 'Unknown Location'; 
    const title = job?.title || 'Job Posting';
    const salonName = job?.salonName || job?.company || 'Unknown Salon';
    
    const text = `Check out this ${title} position at ${salonName} in ${location} on EmviApp!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'EmviApp Job Posting',
        text: text,
        url: `https://emviapp.com/jobs/${jobId}`,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(`${text} View it at: https://emviapp.com/jobs/${jobId}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const viewJobDetails = () => {
    navigate(`/jobs/${jobId}`);
  };
  
  const createAnotherJob = () => {
    navigate('/post-job');
  };

  return (
    <Layout>
      <Helmet>
        <title>Post Created Successfully | EmviApp</title>
      </Helmet>
      
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <ConfettiExplosion />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Posting Created Successfully!</h1>
          <p className="text-gray-600">Your job listing is now live and ready to attract qualified candidates.</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="text-center p-8">
                <p>Loading job details...</p>
              </div>
            ) : error ? (
              <div className="text-center p-8 text-red-500">
                <p>Error loading job details. Please try again.</p>
              </div>
            ) : job ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.salonName || job.company || 'Your Business'} • {job.location || 'Unknown Location'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Posting Status</p>
                      <p className="text-green-600 font-semibold">Active</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Plan</p>
                      <p className="font-semibold capitalize">{job.pricingTier || job.pricing_tier || 'Standard'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expires</p>
                      <p className="font-semibold">In 30 days</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p>Job details not found.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Button 
            onClick={viewJobDetails}
            className="flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            View Your Post
          </Button>
          
          <Button 
            onClick={handleShareClick}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Job Post
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={createAnotherJob}
            variant="link"
            className="text-blue-600"
          >
            Create Another Job Post
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccess;
