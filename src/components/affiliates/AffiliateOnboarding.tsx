import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ExternalLink, Download, BookOpen, Link as LinkIcon, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  action: string;
  actionLink: string;
  icon: any;
  completed: boolean;
}

const AffiliateOnboarding = ({ affiliateId }: { affiliateId: string }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState<any>(null);
  const [steps, setSteps] = useState<OnboardingStep[]>([]);

  useEffect(() => {
    if (affiliateId) {
      fetchOnboardingProgress();
    }
  }, [affiliateId]);

  const fetchOnboardingProgress = async () => {
    try {
      setLoading(true);
      
      // Get or create onboarding record
      let { data, error } = await supabase
        .from('affiliate_onboarding')
        .select('*')
        .eq('affiliate_id', affiliateId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      // Create if doesn't exist
      if (!data) {
        const { data: newOnboarding, error: insertError } = await supabase
          .from('affiliate_onboarding')
          .insert({ affiliate_id: affiliateId })
          .select()
          .single();

        if (insertError) throw insertError;
        data = newOnboarding;
      }

      setOnboarding(data);

      // Build steps array
      const stepsData: OnboardingStep[] = [
        {
          id: 'connect_stripe',
          title: 'Connect Stripe for Payouts',
          description: 'Set up your payment method to receive commissions',
          action: 'Connect Now',
          actionLink: '/affiliate/settings',
          icon: CreditCard,
          completed: data.connected_stripe || false
        },
        {
          id: 'read_guidelines',
          title: 'Read Affiliate Guidelines',
          description: 'Learn about our policies and best practices',
          action: 'Read Guidelines',
          actionLink: '/affiliate/guidelines',
          icon: BookOpen,
          completed: data.read_guidelines || false
        },
        {
          id: 'create_first_link',
          title: 'Create Your First Link',
          description: 'Generate a tracking link to start promoting',
          action: 'Create Link',
          actionLink: '/affiliate/links',
          icon: LinkIcon,
          completed: data.created_first_link || false
        },
        {
          id: 'download_assets',
          title: 'Download Marketing Assets',
          description: 'Get banners, logos, and promotional materials',
          action: 'Download Assets',
          actionLink: '/affiliate/assets',
          icon: Download,
          completed: data.downloaded_assets || false
        },
        {
          id: 'make_first_promotion',
          title: 'Make Your First Promotion',
          description: 'Start driving traffic with your affiliate link',
          action: 'View Dashboard',
          actionLink: '/affiliate/dashboard',
          icon: ExternalLink,
          completed: data.made_first_promotion || false
        }
      ];

      setSteps(stepsData);

    } catch (error) {
      console.error('Error fetching onboarding:', error);
      toast.error('Failed to load onboarding progress');
    } finally {
      setLoading(false);
    }
  };

  const markStepComplete = async (stepId: string) => {
    try {
      const updates: any = { last_interaction_at: new Date().toISOString() };
      updates[stepId] = true;

      // Calculate new progress
      const completedCount = steps.filter(s => s.completed || s.id === stepId).length;
      updates.progress_percentage = Math.round((completedCount / steps.length) * 100);

      // Check if all complete
      if (completedCount === steps.length) {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('affiliate_onboarding')
        .update(updates)
        .eq('affiliate_id', affiliateId);

      if (error) throw error;

      await fetchOnboardingProgress();
      toast.success('Progress updated!');

    } catch (error) {
      console.error('Error updating onboarding:', error);
      toast.error('Failed to update progress');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Don't show if onboarding is complete
  if (onboarding?.completed_at) {
    return null;
  }

  const completedSteps = steps.filter(s => s.completed).length;
  const progress = onboarding?.progress_percentage || 0;

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Welcome to EmviApp Affiliates!</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedSteps} / {steps.length} completed
          </span>
        </CardTitle>
        <CardDescription>
          Complete these steps to get started and maximize your earnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">{progress}% complete</p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                  step.completed 
                    ? 'bg-white border-green-200' 
                    : 'bg-white border-gray-200 hover:border-violet-300'
                }`}
              >
                <div className="mt-0.5">
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>

                <Button
                  size="sm"
                  variant={step.completed ? 'outline' : 'default'}
                  asChild
                  className="shrink-0"
                >
                  <Link to={step.actionLink}>
                    {step.completed ? 'Review' : step.action}
                    <step.icon className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateOnboarding;
