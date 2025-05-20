
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

const PostSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentLogId = searchParams.get('payment_log_id');
  const isFree = searchParams.get('free') === 'true';
  
  const [postData, setPostData] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPostData = async () => {
      if (!paymentLogId) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('payment_log_id', paymentLogId)
          .single();
        
        if (error) throw error;
        
        // Ensure requirements is an array
        if (data && typeof data.requirements === 'string') {
          data.requirements = data.requirements.split(',').map(s => s.trim());
        }
        
        setPostData(data as Job);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [paymentLogId]);
  
  return (
    <Layout>
      <Helmet>
        <title>Post Created Successfully | EmviApp</title>
        <meta 
          name="description" 
          content="Your post has been created successfully on EmviApp."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 p-6 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-4">
            {isFree ? "Free Post Created Successfully!" : "Thank You for Your Payment!"}
          </h1>
          
          <p className="mb-8 text-gray-600 max-w-lg mx-auto">
            {isFree 
              ? "Your free post has been created and will be reviewed shortly. You'll receive an email when it's live."
              : "Your payment was successful and your post is being processed. You'll receive an email confirmation soon."}
          </p>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : postData ? (
            <div className="mt-8 text-left border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Post Details:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Title:</p>
                  <p>{postData.title}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Type:</p>
                  <p className="capitalize">{postData.type || postData.post_type}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No post details available.</p>
          )}
          
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="/dashboard" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Go to Dashboard
            </a>
            <a 
              href="/post-job" 
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Post Another Job
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
