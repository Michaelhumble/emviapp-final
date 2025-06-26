
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ jobFormData, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFreePost = async () => {
    try {
      setIsSubmitting(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error('Please sign in to post a job');
        return;
      }

      // Prepare job data for database
      const jobData = {
        title: jobFormData.title,
        description: jobFormData.description,
        location: jobFormData.location,
        compensation_details: jobFormData.salary_range || jobFormData.compensation_details,
        compensation_type: jobFormData.employment_type || jobFormData.compensation_type,
        requirements: Array.isArray(jobFormData.requirements) 
          ? jobFormData.requirements.join('\n') 
          : jobFormData.requirements || '',
        contact_info: {
          phone: jobFormData.contact_info?.phone || '',
          email: jobFormData.contact_info?.email || user.email || '',
          owner_name: jobFormData.contact_info?.owner_name || ''
        },
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      // Insert the job into the database
      const { data: newJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating job:', insertError);
        toast.error('Failed to create job posting');
        return;
      }

      toast.success('Job posted successfully!');
      
      // Redirect to success page with job details
      navigate(`/post-success?free=true&job_id=${newJob.id}`);
      
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripeCheckout = async (priceId: string, tier: string) => {
    try {
      setIsSubmitting(true);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error('Please sign in to continue');
        return;
      }

      // Call existing Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId,
          postType: 'job',
          postDetails: jobFormData,
          pricingOptions: {
            selectedPricingTier: tier,
            isFirstPost: false
          }
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Job Details
        </Button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Choose Your Posting Plan</h1>
          <p className="text-gray-600">Select the best option for your job posting</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card className="border-2 border-green-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 text-sm font-medium">
              Most Popular
            </div>
            <CardContent className="p-6 pt-12">
              <div className="text-center mb-6">
                <Gift className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Free Listing</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">$0</p>
                <p className="text-gray-600">30 days visibility</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Appears in Free Listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>30-day posting duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Contact info protected</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Edit and delete anytime</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleFreePost}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Publishing...' : 'Post for Free'}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <CreditCard className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Premium Listing</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">$29</p>
                <p className="text-gray-600">60 days visibility</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Priority placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>60-day posting duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Featured badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Analytics dashboard</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handleStripeCheckout('price_premium_job', 'premium')}
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? 'Processing...' : 'Choose Premium'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobPostingFlow;
