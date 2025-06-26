
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ jobFormData, onBack }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Listing',
      price: 0,
      duration: '7 days',
      features: [
        'Basic job posting',
        'Appears in Free Listings section',
        '7-day visibility',
        'Basic contact visibility'
      ],
      popular: false,
      buttonText: 'Post for Free'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 29,
      duration: '30 days',
      features: [
        'Enhanced visibility',
        'Priority placement',
        '30-day listing',
        'Featured in premium section',
        'Advanced analytics'
      ],
      popular: true,
      buttonText: 'Choose Standard'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 59,
      duration: '60 days',
      features: [
        'Maximum visibility',
        'Top placement',
        '60-day listing',
        'Featured across all sections',
        'Priority support',
        'Advanced analytics'
      ],
      popular: false,
      buttonText: 'Choose Premium'
    }
  ];

  const handleFreeSubmission = async () => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the job posting directly in Supabase
      const jobData = {
        title: jobFormData.title || '',
        description: jobFormData.description || '',
        location: jobFormData.location || '',
        compensation_details: jobFormData.salary || '',
        compensation_type: jobFormData.employmentType || 'full-time',
        requirements: jobFormData.requirements?.join(', ') || '',
        contact_info: {
          phone: jobFormData.phone || user.phone || '',
          email: jobFormData.email || user.email || '',
          owner_name: jobFormData.contactName || user.user_metadata?.full_name || ''
        },
        pricing_tier: 'free',
        status: 'active',
        user_id: user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('Error creating job:', error);
        toast.error('Failed to create job posting');
        return;
      }

      // Success - redirect to the new job page or success page
      toast.success('Job posted successfully!');
      navigate(`/post-success?free=true&job_id=${data.id}`);
      
    } catch (error) {
      console.error('Error in free submission:', error);
      toast.error('Failed to create job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaidSubmission = async (planId: string) => {
    // Handle paid submissions - redirect to Stripe checkout
    toast.info('Redirecting to payment...');
    // Implementation for paid plans would go here
  };

  const handlePlanSelection = (planId: string) => {
    if (planId === 'free') {
      handleFreeSubmission();
    } else {
      handlePaidSubmission(planId);
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">Select how you'd like to promote your job posting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? 'border-purple-500 border-2' : 'border-gray-200'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                <span className="text-gray-500 ml-1">/ {plan.duration}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.id === 'free' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                onClick={() => handlePlanSelection(plan.id)}
                disabled={isSubmitting}
              >
                {isSubmitting && plan.id === 'free' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  plan.buttonText
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Preview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Job Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{jobFormData.title}</h3>
              <p className="text-gray-600">{jobFormData.location}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-700">{jobFormData.description}</p>
            </div>
            
            {jobFormData.salary && (
              <div>
                <span className="text-sm font-medium">Salary: </span>
                <span className="text-sm text-gray-700">{jobFormData.salary}</span>
              </div>
            )}
            
            {jobFormData.requirements && jobFormData.requirements.length > 0 && (
              <div>
                <span className="text-sm font-medium">Requirements: </span>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {jobFormData.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingFlow;
